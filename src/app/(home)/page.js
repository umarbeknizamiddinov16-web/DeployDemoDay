
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import UniverseShell from "@/components/UniverseShell";
import VoiceInstructions from "@/components/VoiceInstructions";
import { getStoredLanguage, getText, LANGUAGE_EVENT } from "@/lib/i18n";

const instructionsByLanguage = {
  ru: {
    title: "Инструкция по запуску",
    intro:
      "Сначала послушай краткую карту сайта: регистрация открывает доступ, AI отвечает на вопросы, терминал имитирует команды, а карта системы показывает структуру модулей.",
    summary: "Что умеет AI",
    aiText:
      "AI может отвечать про космос, рассказывать, что находится на сайте, и помогать понять, куда идти дальше.",
    speak: "🎙️ Пересказать инструкцию",
    stop: "⏹️ Остановить",
    statusReady: "Инструкция готова к озвучиванию.",
    statusSpeaking: "Сейчас инструкция озвучивается.",
    unsupported: "Ваш браузер не поддерживает озвучивание текста.",
    lang: "ru-RU",
    bullets: [
      "Регистрация — создаёт пилота и открывает доступ к системе.",
      "Вход — продолжает миссию, если профиль уже есть.",
      "Вселенная — открыть карту галактики и выбрать следующий сектор.",
      "AI — отвечать на вопросы о сайте и о космосе.",
      "Терминал — симулировать команды и быстро получать ответы.",
      "Система — видеть структуру всех модулей.",
      "Профиль, настройки и дашборд — управлять миссией и состоянием системы.",
      "О проекте и возможности — узнать, что внутри Digital Universe.",
    ],
  },
  uz: {
    title: "Ishga tushirish bo‘yicha ko‘rsatma",
    intro:
      "Avval sayt xaritasini qisqacha tinglang: ro‘yxatdan o‘tish tizimga kirishni ochadi, AI savollarga javob beradi, terminal buyruqlarni taqlid qiladi, tizim xaritasi esa modullar tuzilmasini ko‘rsatadi.",
    summary: "AI nima qiladi",
    aiText:
      "AI kosmos va saytda nima borligi haqida javob bera oladi hamda keyingi qaysi yo‘nalishga borishni tushuntiradi.",
    speak: "🎙️ Ko‘rsatmani aytib berish",
    stop: "⏹️ To‘xtatish",
    statusReady: "Ko‘rsatma eshitishga tayyor.",
    statusSpeaking: "Hozir ko‘rsatma eshitilmoqda.",
    unsupported: "Brauzeringiz matnni og‘zaki aytib bera olmaydi.",
    lang: "uz-UZ",
    bullets: [
      "Ro‘yxatdan o‘tish — pilot yaratadi va tizimga kirishni ochadi.",
      "Kirish — allaqachon mavjud profil bo‘lsa missiyani davom ettiradi.",
      "Koinot — galaktika xaritasini ochib keyingi sektorni tanlash.",
      "AI — sayt va kosmos haqida savollarga javob berish.",
      "Terminal — buyruqlarni simulyatsiya qilish va tez javob olish.",
      "Tizim — barcha modullar tuzilmasini ko‘rish.",
      "Profil, sozlamalar va boshqaruv paneli — missiya va tizim holatini boshqarish.",
      "Loyiha haqida va xususiyatlar — Digital Universe ichidagi imkoniyatlarni bilish.",
    ],
  },
  en: {
    title: "Launch instructions",
    intro:
      "Start by listening to a quick map of the site: registration unlocks access, AI answers questions, terminal simulates commands, and the system map shows how the modules are connected.",
    summary: "What AI can do",
    aiText:
      "AI can answer questions about space, explain what is on the website, and help you choose your next destination.",
    speak: "🎙️ Read the instructions",
    stop: "⏹️ Stop",
    statusReady: "The instructions are ready to be spoken.",
    statusSpeaking: "The instructions are being spoken now.",
    unsupported: "Your browser does not support text-to-speech.",
    lang: "en-US",
    bullets: [
      "Registration creates a pilot and unlocks the full system.",
      "Login continues the mission if a profile already exists.",
      "Universe opens the galaxy map and lets you choose the next sector.",
      "AI answers questions about the site and the cosmos.",
      "Terminal simulates commands and returns quick responses.",
      "System shows the structure of all modules.",
      "Profile, settings, and dashboard help you manage mission and system state.",
      "About and features explain what is inside Digital Universe.",
    ],
  },
};

export default function Home() {
  const [language, setLanguage] = useState(getStoredLanguage());
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechStatus, setSpeechStatus] = useState("");

  useEffect(() => {
    const syncLanguage = (event) => {
      setLanguage(event?.detail || getStoredLanguage());
    };

    setLanguage(getStoredLanguage());
    window.addEventListener(LANGUAGE_EVENT, syncLanguage);

    return () => window.removeEventListener(LANGUAGE_EVENT, syncLanguage);
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const instructions = instructionsByLanguage[language] ?? instructionsByLanguage.ru;

  const launchCards = useMemo(
    () => [
      {
        title: getText(language, "home", "createPilot"),
        text: getText(language, "home", "createPilotText"),
        href: "/register",
        tone: "border-cyan-400/30 bg-cyan-500/10",
      },
      {
        title: getText(language, "home", "login"),
        text: getText(language, "home", "loginText"),
        href: "/login",
        tone: "border-fuchsia-400/30 bg-fuchsia-500/10",
      },
      {
        title: getText(language, "home", "openGalaxy"),
        text: getText(language, "home", "openGalaxyText"),
        href: "/universe",
        tone: "border-emerald-400/30 bg-emerald-500/10",
      },
    ],
    [language],
  );

  const orbitCards = useMemo(
    () => [
      { title: "AI Orbit", description: "Запросы к Gemini и интеллектуальный анализ.", href: "/ai", emoji: "🧠" },
      { title: "Terminal Orbit", description: "Симуляция командной консоли и быстрых операций.", href: "/terminal", emoji: "⌨️" },
      { title: "System Sphere", description: "Структура модулей и визуальная карта проекта.", href: "/system", emoji: "🧭" },
      { title: "Pilot Core", description: "Профиль, миссия и параметры пользователя.", href: "/profile", emoji: "👤" },
      { title: "Signal Hub", description: "Текущий статус, латентность и активные модули.", href: "/dashboard", emoji: "📡" },
      { title: "Settings Orbit", description: "Настройки интерфейса и поведения системы.", href: "/settings", emoji: "⚙️" },
    ],
    [],
  );

  const speakInstructions = () => {
    if (typeof window === "undefined") {
      return;
    }

    const synth = window.speechSynthesis;

    if (!synth) {
      setSpeechStatus(instructions.unsupported);
      return;
    }

    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      setSpeechStatus(instructions.statusReady);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      [instructions.intro, instructions.summary, instructions.aiText, instructions.bullets.join(" ")].join(" "),
    );

    utterance.lang = instructions.lang;
    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeechStatus(instructions.statusSpeaking);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeechStatus(instructions.statusReady);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeechStatus(instructions.unsupported);
    };

    synth.cancel();
    synth.speak(utterance);
  };

  return (
    <UniverseShell>
      <div className="space-y-6">
        <div className="rounded-[28px] border border-cyan-400/25 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(15,23,42,0.96),rgba(244,114,182,0.12))] p-6 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">{getText(language, "home", "badge")}</p>
              <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">{getText(language, "home", "title")}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">{getText(language, "home", "description")}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/70 px-5 py-4 backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.35em] text-slate-300">{getText(language, "home", "accessGateTitle")}</p>
              <p className="mt-2 text-sm leading-7 text-slate-100">{getText(language, "home", "accessGateText")}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {launchCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className={`rounded-3xl border px-4 py-4 transition hover:-translate-y-0.5 hover:border-cyan-200 ${card.tone}`}
              >
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-100">{getText(language, "home", "start")}</p>
                <p className="mt-3 text-lg font-bold text-white">{card.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-100">{card.text}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[26px] border border-cyan-400/20 bg-slate-950/70 p-5">
            <VoiceInstructions language={language} />
          </div>

          <div className="rounded-[26px] border border-cyan-400/20 bg-slate-950/70 p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">{getText(language, "home", "chooseOrbit")}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {orbitCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-200"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-bold text-white">{card.title}</p>
                    <span className="text-2xl">{card.emoji}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-200">{card.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[26px] border border-fuchsia-400/20 bg-fuchsia-500/10 p-5">
          <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-200">{getText(language, "home", "missionChecklist")}</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-[22px] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-100">
              {getText(language, "home", "checklist1")}
            </div>
            <div className="rounded-[22px] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-100">
              {getText(language, "home", "checklist2")}
            </div>
            <div className="rounded-[22px] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-100">
              {getText(language, "home", "checklist3")}
            </div>
          </div>

          <div className="mt-5 rounded-[22px] border border-cyan-400/20 bg-slate-950/70 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">{getText(language, "home", "quickNoteTitle")}</p>
            <p className="mt-3 text-sm leading-7 text-slate-100">{getText(language, "home", "quickNote")}</p>
          </div>
        </div>
      </div>
    </UniverseShell>
  );
}