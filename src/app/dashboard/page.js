"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import UniverseShell from "@/components/UniverseShell";
import { useLanguage } from "@/lib/useLanguage";

const translations = {
  ru: {
    badge: "Command deck",
    title: "Центр управления Digital Universe",
    description:
      "Каждая планета здесь — отдельный модуль. Ты видишь текущий статус, доступные зоны и быстрые переходы в систему.",
    orbitLabel: "Орбита",
    stableLabel: "Стабильна",
    modulesLabel: "Модули",
    signalLabel: "Сигнал",
    onlineLabel: "Онлайн",
    activeOrbitLabel: "Активная орбита",
    planetaryModules: "Планетарные модули",
    quickRoutes: "Быстрые пути",
    missionNote: "Заметка миссии",
    missionNoteText:
      "Система работает как набор орбит. Каждая планета — отдельный модуль, а сам интерфейс держит тебя в одном цифровом пространстве.",
    openModule: "Открыть модуль",
    moduleLabel: "Модуль",
    planets: [
      {
        title: "AI-планета",
        emoji: "🧠",
        description: "Симуляция интеллектуального ядра и текущих рекомендаций.",
        route: "/ai",
        tone: "from-cyan-500/25 to-sky-500/10",
      },
      {
        title: "Орбита терминала",
        emoji: "⌨️",
        description: "Командная консоль для управления системой и сценариями.",
        route: "/terminal",
        tone: "from-fuchsia-500/25 to-violet-500/10",
      },
      {
        title: "Сфера системы",
        emoji: "🧭",
        description: "Карта всех модулей и их связей внутри Digital Universe.",
        route: "/system",
        tone: "from-emerald-500/25 to-teal-500/10",
      },
      {
        title: "Ядро пилота",
        emoji: "👤",
        description: "Профиль пилота, миссия и персональные настройки.",
        route: "/profile",
        tone: "from-amber-500/25 to-orange-500/10",
      },
    ],
    routes: [
      { href: "/ai", text: "AI-планета → перейти к интеллектуальному ядру" },
      { href: "/terminal", text: "Орбита терминала → открыть командную консоль" },
      { href: "/system", text: "Сфера системы → изучить структуру модулей" },
      { href: "/profile", text: "Ядро пилота → посмотреть профиль и миссию" },
    ],
  },
  uz: {
    badge: "Buyruqlar palubasi",
    title: "Digital Universe boshqaruv markazi",
    description:
      "Har bir sayyora alohida modul bo‘lib, siz hozirgi holat, mavjud zonalar va tezkor o‘tish yo‘llarini ko‘rasiz.",
    orbitLabel: "Orbita",
    stableLabel: "Barqaror",
    modulesLabel: "Modullar",
    signalLabel: "Signal",
    onlineLabel: "Online",
    activeOrbitLabel: "Faol orbita",
    planetaryModules: "Planetar modullar",
    quickRoutes: "Tez yo‘llar",
    missionNote: "Missiya eslatmasi",
    missionNoteText:
      "Tizim orbita majmui sifatida ishlaydi. Har bir sayyora alohida modul bo‘lib, interfeys bir xil raqamli makonda saqlanadi.",
    openModule: "Modulni ochish",
    moduleLabel: "Modul",
    planets: [
      {
        title: "AI sayyora",
        emoji: "🧠",
        description: "Intellektual yadro va joriy tavsiyalar simulyatsiyasi.",
        route: "/ai",
        tone: "from-cyan-500/25 to-sky-500/10",
      },
      {
        title: "Terminal orbita",
        emoji: "⌨️",
        description: "Tizim va ssenariylarni boshqarish uchun buyruqlar konsoli.",
        route: "/terminal",
        tone: "from-fuchsia-500/25 to-violet-500/10",
      },
      {
        title: "Tizim sferasi",
        emoji: "🧭",
        description: "Digital Universe ichidagi barcha modullar va ularning aloqalari xaritasi.",
        route: "/system",
        tone: "from-emerald-500/25 to-teal-500/10",
      },
      {
        title: "Pilot markazi",
        emoji: "👤",
        description: "Pilot profili, missiya va shaxsiy sozlamalar.",
        route: "/profile",
        tone: "from-amber-500/25 to-orange-500/10",
      },
    ],
    routes: [
      { href: "/ai", text: "AI sayyora → intellektual yadroga o‘tish" },
      { href: "/terminal", text: "Terminal orbita → buyruqlar konsolini ochish" },
      { href: "/system", text: "Tizim sferasi → modul tuzilmasini o‘rganish" },
      { href: "/profile", text: "Pilot markazi → profil va missiyani ko‘rish" },
    ],
  },
  en: {
    badge: "Command deck",
    title: "Digital Universe control center",
    description:
      "Each planet is a separate module. You can inspect current status, available zones, and quick jumps through the system.",
    orbitLabel: "Orbit",
    stableLabel: "Stable",
    modulesLabel: "Modules",
    signalLabel: "Signal",
    onlineLabel: "Online",
    activeOrbitLabel: "Active orbit",
    planetaryModules: "Planetary modules",
    quickRoutes: "Quick routes",
    missionNote: "Mission note",
    missionNoteText:
      "The system runs as a set of orbits. Each planet is a separate module, and the interface keeps you in one digital space.",
    openModule: "Open module",
    moduleLabel: "Module",
    planets: [
      {
        title: "AI Planet",
        emoji: "🧠",
        description: "A simulation of the intelligence core and its recommendations.",
        route: "/ai",
        tone: "from-cyan-500/25 to-sky-500/10",
      },
      {
        title: "Terminal Orbit",
        emoji: "⌨️",
        description: "A command console for managing the system and scenarios.",
        route: "/terminal",
        tone: "from-fuchsia-500/25 to-violet-500/10",
      },
      {
        title: "System Sphere",
        emoji: "🧭",
        description: "A map of every module and how they connect inside Digital Universe.",
        route: "/system",
        tone: "from-emerald-500/25 to-teal-500/10",
      },
      {
        title: "Pilot Core",
        emoji: "👤",
        description: "Pilot profile, mission, and personal settings.",
        route: "/profile",
        tone: "from-amber-500/25 to-orange-500/10",
      },
    ],
    routes: [
      { href: "/ai", text: "AI Planet → open the intelligence core" },
      { href: "/terminal", text: "Terminal Orbit → open the command console" },
      { href: "/system", text: "System Sphere → inspect the module structure" },
      { href: "/profile", text: "Pilot Core → review your profile and mission" },
    ],
  },
};

export default function DashboardPage() {
  const language = useLanguage();
  const [modulesCount, setModulesCount] = useState(9);
  const t = translations[language] ?? translations.ru;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateModules = () => {
      setModulesCount(Math.floor(Math.random() * 30) + 1);
    };

    updateModules();
    const intervalId = window.setInterval(updateModules, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const orbitStatus = [
    { label: t.orbitLabel, value: t.stableLabel, accent: "text-cyan-100" },
    { label: t.modulesLabel, value: `${modulesCount} ${t.activeOrbitLabel}`, accent: "text-emerald-100" },
    { label: t.signalLabel, value: t.onlineLabel, accent: "text-fuchsia-100" },
  ];

  return (
    <UniverseShell>
      <div className="space-y-6">
        <div className="rounded-[28px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-950/80 to-fuchsia-500/10 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">{t.badge}</p>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">{t.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200">{t.description}</p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {orbitStatus.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[22px] border border-cyan-400/20 bg-slate-950/70 px-4 py-4"
              >
                <p className="text-[11px] uppercase tracking-[0.25em] text-slate-300">{item.label}</p>
                <p className={`mt-3 text-lg font-semibold ${item.accent}`}>{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-cyan-400/20 bg-slate-950/70 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">{t.planetaryModules}</p>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-100">
                {t.activeOrbitLabel}
              </span>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {t.planets.map((planet, index) => (
                <motion.div
                  key={planet.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className={`rounded-[26px] border border-white/10 bg-gradient-to-br ${planet.tone} p-4`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-cyan-100">{t.moduleLabel}</p>
                      <p className="mt-3 text-lg font-bold text-white">{planet.title}</p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-slate-950/65 text-3xl">
                      {planet.emoji}
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-100">{planet.description}</p>
                  <Link
                    href={planet.route}
                    className="mt-4 inline-flex rounded-full border border-cyan-300/40 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:border-cyan-200"
                  >
                    {t.openModule}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-fuchsia-400/20 bg-fuchsia-500/10 p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-200">{t.quickRoutes}</p>
            <div className="mt-4 space-y-3">
              {t.routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="block rounded-[22px] border border-cyan-300/30 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 transition hover:border-cyan-200"
                >
                  {route.text}
                </Link>
              ))}
            </div>

            <div className="mt-5 rounded-[22px] border border-white/10 bg-slate-950/70 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-300">{t.missionNote}</p>
              <p className="mt-3 text-sm leading-7 text-slate-100">{t.missionNoteText}</p>
            </div>
          </div>
        </div>
      </div>
    </UniverseShell>
  );
}