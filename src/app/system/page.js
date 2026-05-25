"use client";

import Link from "next/link";
import UniverseShell from "@/components/UniverseShell";
import { useLanguage } from "@/lib/useLanguage";

const translations = {
  ru: {
    badge: "System map",
    title: "Структура Digital Universe",
    description:
      "Без графиков — но с четкой системой орбит. Каждый модуль оформлен как отдельная планета, которую можно открыть и изучить.",
    orbitalPlanets: [
      {
        title: "Core Hub",
        status: "Главное управление",
        text: "Базовая точка запуска и главная зона управления системой.",
        route: "/dashboard",
        tone: "from-cyan-500/20 to-sky-500/10",
        emoji: "🛰️",
      },
      {
        title: "AI Planet",
        status: "Аналитик",
        text: "Симуляция интеллекта, рекомендаций и текущего состояния.",
        route: "/ai",
        tone: "from-fuchsia-500/20 to-violet-500/10",
        emoji: "🧠",
      },
      {
        title: "Terminal Orbit",
        status: "Узел команд",
        text: "Командная консоль для управления сценариями и быстрых действий.",
        route: "/terminal",
        tone: "from-emerald-500/20 to-teal-500/10",
        emoji: "⌨️",
      },
      {
        title: "Pilot Core",
        status: "Личный",
        text: "Миссия, профиль пользователя и персональные настройки.",
        route: "/profile",
        tone: "from-amber-500/20 to-orange-500/10",
        emoji: "👤",
      },
      {
        title: "Settings Sphere",
        status: "Настройки системы",
        text: "Контроль интерфейса, визуального режима и поведения системы.",
        route: "/settings",
        tone: "from-rose-500/20 to-pink-500/10",
        emoji: "⚙️",
      },
    ],
  },
  uz: {
    badge: "Tizim xaritasi",
    title: "Digital Universe tuzilmasi",
    description:
      "Grafiksiz, lekin aniq orbitalar tizimi bilan. Har bir modul alohida sayyora shaklida yaratilgan va ochib o‘rganish mumkin.",
    orbitalPlanets: [
      {
        title: "Core Hub",
        status: "Asosiy boshqaruv",
        text: "Ishga tushirish nuqtasi va tizim boshqaruvining asosiy zonasi.",
        route: "/dashboard",
        tone: "from-cyan-500/20 to-sky-500/10",
        emoji: "🛰️",
      },
      {
        title: "AI Planet",
        status: "Analitik",
        text: "Intellekt, tavsiyalar va joriy holat simulyatsiyasi.",
        route: "/ai",
        tone: "from-fuchsia-500/20 to-violet-500/10",
        emoji: "🧠",
      },
      {
        title: "Terminal Orbit",
        status: "Buyruq tuguni",
        text: "Ssenariy va tezkor harakatlar uchun buyruqlar konsoli.",
        route: "/terminal",
        tone: "from-emerald-500/20 to-teal-500/10",
        emoji: "⌨️",
      },
      {
        title: "Pilot Core",
        status: "Shaxsiy",
        text: "Missiya, pilot profili va shaxsiy sozlamalar.",
        route: "/profile",
        tone: "from-amber-500/20 to-orange-500/10",
        emoji: "👤",
      },
      {
        title: "Settings Sphere",
        status: "Tizimsozlamalar",
        text: "Interfeys, vizual rejim va tizim xatti-harakatlarini boshqarish.",
        route: "/settings",
        tone: "from-rose-500/20 to-pink-500/10",
        emoji: "⚙️",
      },
    ],
  },
  en: {
    badge: "System map",
    title: "Digital Universe structure",
    description:
      "No charts here — just a clear orbit system. Each module is a planet you can open and inspect.",
    orbitalPlanets: [
      {
        title: "Core Hub",
        status: "Main control",
        text: "The launch point and the system’s central control zone.",
        route: "/dashboard",
        tone: "from-cyan-500/20 to-sky-500/10",
        emoji: "🛰️",
      },
      {
        title: "AI Planet",
        status: "Analyst",
        text: "A simulation of intelligence, recommendations, and current status.",
        route: "/ai",
        tone: "from-fuchsia-500/20 to-violet-500/10",
        emoji: "🧠",
      },
      {
        title: "Terminal Orbit",
        status: "Command node",
        text: "The command console for managing scenarios and quick actions.",
        route: "/terminal",
        tone: "from-emerald-500/20 to-teal-500/10",
        emoji: "⌨️",
      },
      {
        title: "Pilot Core",
        status: "Personal",
        text: "Mission, pilot profile, and personal settings.",
        route: "/profile",
        tone: "from-amber-500/20 to-orange-500/10",
        emoji: "👤",
      },
      {
        title: "Settings Sphere",
        status: "System config",
        text: "Control the interface, visual mode, and system behavior.",
        route: "/settings",
        tone: "from-rose-500/20 to-pink-500/10",
        emoji: "⚙️",
      },
    ],
  },
};

export default function SystemPage() {
  const language = useLanguage();
  const t = translations[language] ?? translations.ru;

  return (
    <UniverseShell>
      <div className="space-y-6">
        <div className="rounded-[28px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-950/85 to-fuchsia-500/10 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{t.badge}</p>
          <h2 className="mt-4 text-3xl font-black text-white">{t.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200">{t.description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {t.orbitalPlanets.map((planet, index) => (
            <Link
              key={planet.title}
              href={planet.route}
              className={`rounded-[30px] border border-white/10 bg-gradient-to-br ${planet.tone} p-4 transition hover:border-cyan-200`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-100">Orbit {index + 1}</p>
                  <p className="mt-3 text-lg font-bold text-white">{planet.title}</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-slate-950/65 text-3xl">
                  {planet.emoji}
                </div>
              </div>

              <p className="mt-3 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-emerald-100 inline-flex">
                {planet.status}
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-100">{planet.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </UniverseShell>
  );
}