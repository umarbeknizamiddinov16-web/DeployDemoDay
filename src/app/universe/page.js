"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import StarfieldBackground from "@/components/StarfieldBackground";
import { getStoredLanguage, getText, LANGUAGE_EVENT } from "@/lib/i18n";

const planets = [
  { name: "AI", href: "/ai", tone: "from-cyan-500/70 to-sky-500/40", position: "top-[12%] left-[8%]", size: "w-32 h-32" },
  { name: "TASKS", href: "/tasks", tone: "from-purple-500/75 to-violet-500/40", position: "top-[34%] left-[28%]", size: "w-24 h-24" },
  { name: "NOTES", href: "/notes", tone: "from-pink-500/75 to-rose-500/40", position: "top-[18%] right-[14%]", size: "w-28 h-28" },
  { name: "SYSTEM", href: "/system", tone: "from-emerald-500/80 to-teal-500/40", position: "bottom-[24%] left-[36%]", size: "w-36 h-36" },
  { name: "STATS", href: "/stats", tone: "from-amber-500/70 to-orange-500/40", position: "bottom-[12%] right-[10%]", size: "w-24 h-24" },
];

export default function UniversePage() {
  const [language, setLanguage] = useState(getStoredLanguage());

  useEffect(() => {
    const syncLanguage = (event) => {
      setLanguage(event?.detail || getStoredLanguage());
    };

    setLanguage(getStoredLanguage());
    window.addEventListener(LANGUAGE_EVENT, syncLanguage);

    return () => window.removeEventListener(LANGUAGE_EVENT, syncLanguage);
  }, []);

  const destinationCards = useMemo(
    () => [
      { title: getText(language, "universe", "registerCard"), text: getText(language, "common", "registerFirst"), href: "/register", accent: "border-cyan-400/30 bg-cyan-500/10" },
      { title: getText(language, "universe", "loginCard"), text: getText(language, "common", "onlyRegistration"), href: "/login", accent: "border-fuchsia-400/30 bg-fuchsia-500/10" },
      { title: getText(language, "universe", "dashboardCard"), text: "Центр управления и быстрый обзор всех орбит.", href: "/dashboard", accent: "border-emerald-400/30 bg-emerald-500/10" },
      { title: getText(language, "universe", "aiCard"), text: "Проверь интеллект, космос и ответы Gemini.", href: "/ai", accent: "border-violet-400/30 bg-violet-500/10" },
      { title: getText(language, "universe", "terminalCard"), text: "Симуляция командной консоли и системных ответов.", href: "/terminal", accent: "border-sky-400/30 bg-sky-500/10" },
      { title: getText(language, "universe", "mapCard"), text: "Подробная карта модулей и их связей.", href: "/system", accent: "border-rose-400/30 bg-rose-500/10" },
    ],
    [language],
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_35%),linear-gradient(180deg,_#020617,_#000000)] text-white">
      <StarfieldBackground />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-cyan-400/25 bg-slate-950/65 px-6 py-5 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">{getText(language, "universe", "badge")}</p>
          <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">{getText(language, "universe", "title")}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">{getText(language, "universe", "description")}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/register" className="rounded-full bg-cyan-400 px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-300">
              {getText(language, "common", "createPilot")}
            </Link>
            <Link href="/login" className="rounded-full border border-cyan-400/70 px-5 py-3 text-center font-semibold text-cyan-50 transition hover:bg-cyan-500/10">
              {getText(language, "common", "login")}
            </Link>
            <Link href="/about" className="rounded-full border border-white/10 px-5 py-3 text-center font-semibold text-slate-100 transition hover:border-cyan-200">
              {getText(language, "universe", "about")}
            </Link>
          </div>
        </div>

        <div className="relative mt-6 min-h-[520px] rounded-[30px] border border-cyan-400/20 bg-slate-950/55 px-4 py-8 backdrop-blur">
          <div className="absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.1),transparent_20%),radial-gradient(circle_at_80%_30%,rgba(244,114,182,0.08),transparent_22%)]" />

          {planets.map((planet) => (
            <Link
              key={planet.name}
              href={planet.href}
              className={`absolute ${planet.position} ${planet.size} rounded-full bg-gradient-to-br ${planet.tone} border-4 border-white/20 shadow-[0_0_70px_rgba(255,255,255,0.18)] transition duration-300 hover:scale-105 flex items-center justify-center font-bold text-white`}
            >
              {planet.name}
            </Link>
          ))}
        </div>

        <div className="rounded-[24px] border border-white/10 bg-slate-950/80 p-5 mt-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-300">{getText(language, "universe", "selectSector")}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {destinationCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className={`rounded-[22px] border px-4 py-3 transition hover:border-cyan-200 ${card.accent}`}
              >
                <p className="text-sm font-bold text-white">{card.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-100">{card.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}