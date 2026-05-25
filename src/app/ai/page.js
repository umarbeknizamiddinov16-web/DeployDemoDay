"use client";

import { useState } from "react";
import UniverseShell from "@/components/UniverseShell";
import { useLanguage } from "@/lib/useLanguage";

const translations = {
  ru: {
    badge: "AI Module",
    title: "Gemini-powered intelligence",
    description:
      "Здесь AI может отвечать про космос и про содержимое Digital Universe, используя Gemini и встроенный контекст сайта.",
    askGemini: "Ask Gemini",
    placeholder: "Например: что находится на этом сайте?",
    send: "Отправить запрос",
    sending: "Отправляю...",
    clear: "Очистить",
    examples: "Примеры запросов",
    answerTitle: "Ответ Gemini",
    understandsTitle: "Что понимает AI",
    bullets: [
      "• все основные страницы Digital Universe",
      "• функции модулей: AI, терминал, профиль, настройки, карта и обзор",
      "• общие знания о космосе, планетах, орбитах и астрофизике",
    ],
    starterQuestions: [
      "Что находится на этом сайте?",
      "Расскажи про модуль AI и его возможности.",
      "Какие страницы есть в Digital Universe?",
      "Скажи, что такое космос в контексте этого проекта.",
    ],
    emptyError: "Введите вопрос перед отправкой.",
    defaultAnswer:
      "Система Gemini готова. Задай вопрос о космосе или о содержимом сайта, и я отвечу на русском.",
    loadingAnswer: "Собираю ответ через Gemini...",
    fallbackAnswer: "Не удалось получить ответ. Проверьте сеть или попробуйте ещё раз.",
  },
  uz: {
    badge: "AI moduli",
    title: "Gemini bilan quvvatlangan intellekt",
    description:
      "Bu yerda AI kosmos va Digital Universe mazmuni haqida Gemini va saytdagi ichki kontekst orqali javob bera oladi.",
    askGemini: "Gemini so‘raydi",
    placeholder: "Masalan: ushbu saytda nima bor?",
    send: "So‘rovni yuborish",
    sending: "Yuborilmoqda...",
    clear: "Tozalash",
    examples: "So‘rov misollari",
    answerTitle: "Gemini javobi",
    understandsTitle: "AI nima tushunadi",
    bullets: [
      "• Digital Universening asosiy sahifalari",
      "• modullar funksiyalari: AI, terminal, profil, sozlamalar, xarita va umumiy ko‘rinish",
      "• kosmos, sayyoralar, orbitalar va astrofizika bo‘yicha umumiy bilimlar",
    ],
    starterQuestions: [
      "Ushbu saytda nima bor?",
      "AI modulini va uning imkoniyatlarini bayon qiling.",
      "Digital Universeda qaysi sahifalar mavjud?",
      "Ushbu loyiha kontekstida kosmos nimani anglatadi?",
    ],
    emptyError: "Yuborishdan oldin savol kiriting.",
    defaultAnswer:
      "Gemini tizimi tayyor. Kosmos yoki sayt mazmuni haqida savol bering, javob beraman.",
    loadingAnswer: "Javob Gemini orqali yig‘ilmoqda...",
    fallbackAnswer: "Javob olinmadi. Tarmoqni tekshiring yoki qayta urinib ko‘ring.",
  },
  en: {
    badge: "AI Module",
    title: "Gemini-powered intelligence",
    description:
      "This AI can answer about space and the contents of Digital Universe using Gemini and the site’s built-in context.",
    askGemini: "Ask Gemini",
    placeholder: "For example: what is on this website?",
    send: "Send request",
    sending: "Sending...",
    clear: "Clear",
    examples: "Sample prompts",
    answerTitle: "Gemini answer",
    understandsTitle: "What AI understands",
    bullets: [
      "• the main pages in Digital Universe",
      "• module functions: AI, terminal, profile, settings, map, and overview",
      "• general knowledge about space, planets, orbits, and astrophysics",
    ],
    starterQuestions: [
      "What is on this website?",
      "Describe the AI module and what it can do.",
      "Which pages exist in Digital Universe?",
      "What does space mean in the context of this project?",
    ],
    emptyError: "Enter a question before sending.",
    defaultAnswer:
      "Gemini is ready. Ask about space or the contents of the site and I will answer.",
    loadingAnswer: "Collecting a response from Gemini...",
    fallbackAnswer: "Could not get a response. Check your network and try again.",
  },
};

export default function AIPage() {
  const language = useLanguage();
  const t = translations[language] ?? translations.ru;
  const [question, setQuestion] = useState(t.starterQuestions[0]);
  const [answer, setAnswer] = useState(t.defaultAnswer);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const askGemini = async () => {
    const trimmed = question.trim();

    if (!trimmed) {
      setError(t.emptyError);
      return;
    }

    setIsLoading(true);
    setError("");
    setAnswer(t.loadingAnswer);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmed }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || t.fallbackAnswer);
      }

      setAnswer(payload.answer);
    } catch (currentError) {
      setError(currentError.message);
      setAnswer(t.fallbackAnswer);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UniverseShell>
      <div className="space-y-6">
        <div className="rounded-[24px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/5 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{t.badge}</p>
          <h2 className="mt-4 text-3xl font-black text-white">{t.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200">{t.description}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[22px] border border-cyan-400/20 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">{t.askGemini}</p>
            <div className="mt-4 space-y-3">
              <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-cyan-400/30 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                placeholder={t.placeholder}
              />
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={askGemini}
                  disabled={isLoading}
                  className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? t.sending : t.send}
                </button>
                <button
                  type="button"
                  onClick={() => setQuestion("")}
                  className="rounded-full border border-cyan-400/40 px-4 py-3 text-sm text-cyan-50 transition hover:bg-cyan-500/10"
                >
                  {t.clear}
                </button>
              </div>

              {error ? (
                <p className="rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                  {error}
                </p>
              ) : null}
            </div>

            <div className="mt-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-300">{t.examples}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.starterQuestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuestion(item)}
                    className="rounded-full border border-cyan-400/20 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 transition hover:border-cyan-200"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-fuchsia-400/20 bg-fuchsia-500/5 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-200">{t.answerTitle}</p>
            <div className="mt-4 rounded-2xl border border-fuchsia-400/20 bg-slate-950/80 p-4">
              <p className="text-sm leading-7 text-slate-100 whitespace-pre-wrap">{answer}</p>
            </div>

            <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-slate-950/80 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">{t.understandsTitle}</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-100">
                {t.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </UniverseShell>
  );
}