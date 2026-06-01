"use client";

import { useEffect, useState } from "react";
import UniverseShell from "@/components/UniverseShell";
import { useLanguage } from "@/lib/useLanguage";

const translations = {
  ru: {
    badge: "Profile module",
    title: "Профиль пилота",
    description:
      "Здесь отображается текущий идентификатор пользователя, миссия и состояние синхронизации с браузером.",
    rank: "Ранг",
    rankValue: "Explorer",
    mission: "Миссия",
    missionValue: "Управление орбитой",
    sync: "Синхронизация",
    syncValue: "Local storage",
    pilotIdentity: "Идентичность пилота",
    identityText: "Имя хранится в localStorage и доступно на всех страницах через единый интерфейс.",
    currentMission: "Текущая миссия",
    currentMissionText: "Миссия отражает выбранную цель и используется как контекст для симуляции.",
    defaultMission: "Исследовать систему",
  },
  uz: {
    badge: "Profil moduli",
    title: "Pilot profili",
    description:
      "Bu yerda hozirgi foydalanuvchi identifikatori, missiya va brauzer orqali sinxronlash holati ko‘rsatiladi.",
    rank: "Daraja",
    rankValue: "Explorer",
    mission: "Missiya",
    missionValue: "Orbita boshqaruvi",
    sync: "Sinxronlash",
    syncValue: "Local storage",
    pilotIdentity: "Pilot identifikatsiyasi",
    identityText: "Ism localStorage’da saqlanadi va barcha sahifalarda bir xil interfeys orqali mavjud.",
    currentMission: "Joriy missiya",
    currentMissionText: "Missiya tanlangan maqsadni aks ettiradi va simulyatsiya konteksti sifatida ishlatiladi.",
    defaultMission: "Tizimni o‘rganish",
  },
  en: {
    badge: "Profile module",
    title: "Pilot profile",
    description:
      "This view shows your current user identifier, mission, and the browser sync state for the active profile.",
    rank: "Rank",
    rankValue: "Explorer",
    mission: "Mission",
    missionValue: "Orbit control",
    sync: "Sync",
    syncValue: "Local storage",
    pilotIdentity: "Pilot identity",
    identityText: "The name is stored in localStorage and stays available across the interface.",
    currentMission: "Current mission",
    currentMissionText: "The mission reflects your selected goal and is used as context for the simulation.",
    defaultMission: "Explore the system",
  },
};

export default function ProfilePage() {
  const language = useLanguage();
  const t = translations[language] ?? translations.ru;
  const [pilotName, setPilotName] = useState("Explorer");
  const [mission, setMission] = useState(t.defaultMission);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setPilotName(window.localStorage.getItem("digital-universe-user") || "Explorer");
    setMission(window.localStorage.getItem("digital-universe-mission") || t.defaultMission);
  }, [t.defaultMission]);

  const profileBadges = [
    { label: t.rank, value: t.rankValue },
    { label: t.mission, value: t.missionValue },
    { label: t.sync, value: t.syncValue },
  ];

  return (
    <UniverseShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-cyan-400/20 bg-linear-to-br from-cyan-500/10 to-fuchsia-500/5 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{t.badge}</p>
          <h2 className="mt-4 text-3xl font-black text-white">{t.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200">{t.description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {profileBadges.map((badge) => (
            <div key={badge.label} className="rounded-[22px] border border-cyan-400/20 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{badge.label}</p>
              <p className="mt-3 text-lg font-semibold text-cyan-100">{badge.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[22px] border border-cyan-400/20 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">{t.pilotIdentity}</p>
            <p className="mt-4 text-2xl font-bold text-white">{pilotName}</p>
            <p className="mt-2 text-sm leading-7 text-slate-200">{t.identityText}</p>
          </div>

          <div className="rounded-[22px] border border-fuchsia-400/20 bg-fuchsia-500/5 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-200">{t.currentMission}</p>
            <p className="mt-4 text-lg font-semibold text-white">{mission}</p>
            <p className="mt-2 text-sm leading-7 text-slate-200">{t.currentMissionText}</p>
          </div>
        </div>
      </div>
    </UniverseShell>
  );
}