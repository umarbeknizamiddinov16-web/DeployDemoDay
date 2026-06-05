const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.5-mini";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

const hasGeminiKey = typeof GEMINI_API_KEY === "string" && GEMINI_API_KEY.length > 0;
const hasOpenAIKey = typeof OPENAI_API_KEY === "string" && OPENAI_API_KEY.length > 0;

const siteKnowledge = `
Digital Universe is a modular futuristic web interface.
Available top-level routes and their purpose:
- /: home page with launch actions for login and register.
- /login: pilot access page, stores user name in localStorage.
- /register: creates pilot profile, stores user name and mission in localStorage.
- /dashboard: command deck and overview of modules.
- /ai: Gemini-powered AI module for cosmos and site questions.
- /terminal: simulated command console with system responses.
- /system: visual system map of all modules.
- /profile: pilot profile and mission status.
- /settings: simulated configuration options.
- /features: list of implemented features.
- /about: explanation of the Digital Universe concept.
- /universe: galaxy map with links to all modules.
- /planet/ai: placeholder planet module page.

Implemented features:
- modular navigation across pages
- localStorage for pilot identity and mission
- AI module with Gemini integration
- terminal simulator
- dashboard with status cards
- settings module
- galaxy map and system map
- futuristic neon theme

The project is a Next.js application built with React and custom UI.
`;

const normalizeQuestion = (question) => {
  if (!question) return "";
  return question
    .trim()
    .replace(/\s+/g, " ")
    .replace(/([.,!?])(?=[^\s])/g, "$1 ")
    .replace(/\s+([.,!?])/g, "$1")
    .replace(/\s+$/g, "");
};

const detectResponseLanguage = (question) => {
  if (/[а-яА-ЯёЁ]/.test(question)) return "Russian";
  if (/[a-zA-Z]/.test(question)) return "English";
  return "Russian";
};

const callGoogleGemini = async (prompt) => {
  if (!hasGeminiKey) {
    return { answer: null, error: `Ключ GEMINI_API_KEY отсутствует в файле .env` };
  }

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const requestBody = {
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const payload = await response.json();

    if (!response.ok) {
      const errorText = payload?.error?.message || `HTTP ${response.status}`;
      return { answer: null, error: `Google API Error: ${errorText}` };
    }

    const candidateContent = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateContent) {
      return { answer: null, error: `Google вернул пустую структуру ответов.` };
    }

    return { answer: candidateContent, error: null };
  } catch (err) {
    return { answer: null, error: `Сбой сети при запросе к Google: ${err.message}` };
  }
};

const callOpenAI = async (prompt) => {
  if (!hasOpenAIKey) {
    return { answer: null, error: `Ключ OPENAI_API_KEY отсутствует в файле .env` };
  }

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const text = await response.text();
    let payload;

    try {
      payload = JSON.parse(text);
    } catch {
      return { answer: null, error: `OpenAI вернул не JSON: ${text.slice(0, 150)}` };
    }

    if (!response.ok) {
      return { answer: null, error: `OpenAI API Error: ${payload?.error?.message || 'Unknown'}` };
    }

    const answer = payload?.choices?.[0]?.message?.content;
    return { answer, error: answer ? null : "OpenAI вернул пустой текст ответа." };
  } catch (err) {
    return { answer: null, error: `Сбой сети при запросе к OpenAI: ${err.message}` };
  }
};

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid request JSON body" }), { status: 400 });
    }

    const { question } = body;

    if (!question || typeof question !== "string") {
      return new Response(JSON.stringify({ error: "Question is required and must be a string." }), { status: 400 });
    }

    const normalizedQuestion = normalizeQuestion(question);
    const responseLanguage = detectResponseLanguage(question);

    const prompt = `You are Gemini, a helpful AI assistant that answers ALL questions. If the user's text contains typos, spelling mistakes, or small grammar errors, correct them silently and answer the intended meaning. Respond in ${responseLanguage}.
  
Site context: ${siteKnowledge}

User question: ${normalizedQuestion}`;

    let finalAnswer = null;
    let errorsLog = [];

    // 1. Сначала пробуем Gemini, если есть ключ
    if (hasGeminiKey) {
      const geminiResult = await callGoogleGemini(prompt);
      if (geminiResult.answer) {
        finalAnswer = geminiResult.answer;
      } else {
        errorsLog.push(`[Gemini Error]: ${geminiResult.error}`);
      }
    } else {
      errorsLog.push("[Gemini Skip]: Ключ Gemini не задан.");
    }

    // 2. Если Gemini не ответил, но есть ключ OpenAI — пробуем подстраховаться через OpenAI
    if (!finalAnswer && hasOpenAIKey) {
      const openaiResult = await callOpenAI(prompt);
      if (openaiResult.answer) {
        finalAnswer = openaiResult.answer;
      } else {
        errorsLog.push(`[OpenAI Error]: ${openaiResult.error}`);
      }
    } else if (!finalAnswer) {
      errorsLog.push("[OpenAI Skip]: Ключ OpenAI не задан.");
    }

    // Если хоть один ИИ ответил — отдаем успешный результат
    if (finalAnswer) {
      return new Response(JSON.stringify({ answer: finalAnswer }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Если всё сломалось — выводим ПОДРОБНЫЙ лог ошибок прямо на экран
    const combinedErrors = errorsLog.join("\n");
    const debugMessage = `⚠️ ОШИБКА КЛЮЧЕЙ ИЛИ СЕТИ!\n Ни один ИИ не смог ответить.\n\nЛог инспектора:\n${combinedErrors}\n\n👉 Что делать?\n1. Проверьте правильность имен переменных в .env\n2. Перезапустите сервер (npm run dev) в терминале\n3. Если вы в РФ/РБ, включите VPN на ПК (Google блокирует запросы по IP).`;

    return new Response(JSON.stringify({ answer: debugMessage }), {
      status: 200, 
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("--- КРИТИЧЕСКАЯ ОШИБКА НА СЕРВЕРЕ ---");
    console.error(error);
    
    return new Response(
      JSON.stringify({ 
        answer: `Системный сбой: ${error.message}`, 
        error: error.message,
        stack: error.stack 
      }), 
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}