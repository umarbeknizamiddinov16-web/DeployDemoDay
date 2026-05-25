const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyDgZrK45u-ueZMldcSzldDdQLI099YxRV0";

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

export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return Response.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    const prompt = `
You are Gemini. Answer in Russian.
Use the site knowledge below when the user asks about this site or its modules.
Use general knowledge about space and astronomy when the user asks about cosmic topics.
Do not invent site content that is not listed in the site knowledge.

SITE KNOWLEDGE:
${siteKnowledge}

USER QUESTION:
${question}
`;

    // Try Gemini API first
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );
      const payload = await response.json();
      if (response.ok && payload?.candidates?.[0]?.content?.parts?.[0]?.text) {
        return Response.json({ answer: payload.candidates[0].content.parts[0].text });
      }
    } catch (e) {
      // ignore, fallback below
    }

    // Fallback: answer anything using local logic
    let fallback = "\u0418\u0437\u0432\u0438\u043d\u0438\u0442\u0435, \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u043d\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u0430 \u043a Gemini. ";
    if (/космос|space|вселенн|планет|звезд|астро|галактик|солнечн|орбит|чёрн(ая|ые|ую|ым|ом|ого) дыра|big bang|большой взрыв|экзопланет|телескоп|астронавт|луна|земля|марс|юпитер|сатурн|венера|нептун|уран|меркурий|плутон|комет|метеор|астероид|солнц|звезда|созвезд|спутник|космонавт|исследован|галактик|квазар|пульсар|сверхнов|космическ|вакуум|материя|антивещество|тёмная материя|dark matter|dark energy|dark energy|экзосфера|экзосистема|экзожизнь|экзобиология|экзокосмос/i.test(question)) {
      fallback += "\u041a\u043e\u0441\u043c\u043e\u0441 \u2014 \u044d\u0442\u043e \u0432\u0441\u0435\u043b\u0435\u043d\u043d\u0430\u044f, \u0432 \u043a\u043e\u0442\u043e\u0440\u043e\u0439 \u043d\u0430\u0445\u043e\u0434\u044f\u0442\u0441\u044f \u043f\u043b\u0430\u043d\u0435\u0442\u044b, \u0437\u0432\u0451\u0437\u0434\u044b, \u0433\u0430\u043b\u0430\u043a\u0442\u0438\u043a\u0438 \u0438 \u043c\u043d\u043e\u0433\u043e\u0435 \u0434\u0440\u0443\u0433\u043e\u0435. \u0415\u0451 \u0438\u0437\u0443\u0447\u0430\u044e\u0442 \u0430\u0441\u0442\u0440\u043e\u043d\u043e\u043c\u044b \u0438 \u043a\u043e\u0441\u043c\u043e\u043d\u0430\u0432\u0442\u044b. \u0415\u0441\u043b\u0438 \u043d\u0443\u0436\u043d\u043e \u043a\u043e\u043d\u043a\u0440\u0435\u0442\u043d\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043a\u043e\u0441\u043c\u043e\u0441\u0430 \u0438\u043b\u0438 \u043a\u043e\u0441\u043c\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432 \u2014 \u0441\u043f\u0440\u043e\u0441\u0438 \u043a\u043e\u043d\u043a\u0440\u0435\u0442\u043d\u043e!";
    } else if (/site|сайт|digital universe|модул|страниц|feature|функци|ai|терминал|профиль|настройк|карта|обзор|about|dashboard|login|register|system|universe|tasks|notes|stats|settings|api|gemini|react|next|js|javascript|frontend|backend|node|сервер|клиент|ui|ux|дизайн|архитектур|структур|проект|разработк|код|файл|папк|компонент|layout|shell|header|footer|link|route|api|endpoint|feature|фича|фичи|фич|описан|описание|readme|package|json|config|tailwind|postcss|globals|css|public|favicon|ico|readme|md/i.test(question)) {
      fallback += "Этот сайт — Digital Universe, модульная цифровая вселенная на Next.js. Здесь есть модули: AI, терминал, профиль, настройки, карта, дашборд и другие. Каждый модуль — отдельная страница. Если хочешь узнать про конкретный модуль, задай вопрос!";
    } else {
      fallback += "Я могу отвечать на любые вопросы! Задай что угодно про космос, науку, технологии, программирование, искусственный интеллект, историю, культуру и многое другое.";
    }
    return Response.json({ answer: fallback });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown server error" },
      { status: 500 }
    );
  }
}
