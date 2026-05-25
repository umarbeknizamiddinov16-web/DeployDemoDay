"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import UniverseShell from "@/components/UniverseShell";
import VoiceInstructions from "@/components/VoiceInstructions";
import { getStoredLanguage, getText, LANGUAGE_EVENT } from "@/lib/i18n";

const sectorCards = [
  { id: "launch", titleKey: "sector1Title", textKey: "sector1Text" },
  { id: "ai", titleKey: "sector2Title", textKey: "sector2Text" },
  { id: "command", titleKey: "sector3Title", textKey: "sector3Text" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [pilotName, setPilotName] = useState("");
  const [mission, setMission] = useState("");
  const [selectedSector, setSelectedSector] = useState("launch");
  const nameInputRef = useRef(null);
  const [language, setLanguage] = useState(getStoredLanguage());

  useEffect(() => {
    const syncLanguage = (event) => {
      setLanguage(event?.detail || getStoredLanguage());
    };

    setLanguage(getStoredLanguage());
    window.addEventListener(LANGUAGE_EVENT, syncLanguage);

    return () => window.removeEventListener(LANGUAGE_EVENT, syncLanguage);
  }, []);

  const handleRegister = () => {
    if (!pilotName.trim()) {
      return;
    }

    window.localStorage.setItem("digital-universe-user", pilotName.trim());
    window.localStorage.setItem("digital-universe-auth", "true");
    window.localStorage.setItem("digital-universe-mission", mission.trim() || "Explore the system");
    router.push("/dashboard");
  };

  return (
    <UniverseShell>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[30px] border border-cyan-400/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(15,23,42,0.88))] p-6"
        >
          <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[26px] border border-white/10 bg-slate-950/70">
            <div className="absolute h-[18rem] w-[18rem] rounded-full border border-cyan-300/20" />
            <div className="absolute h-[13rem] w-[13rem] rounded-full border border-fuchsia-300/10" />
            <div className="absolute h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(244,114,182,0.95),rgba(162,28,175,0.85)_45%,rgba(15,23,42,0.98)_100%)] shadow-[0_0_80px_rgba(244,114,182,0.35)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.16),transparent_55%)]" />
            <div className="relative text-center">
              <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-100">{getText(language, "register", "badge")}</p>
              <p className="mt-4 text-3xl font-black text-white">DU</p>
              <p className="mt-2 text-sm text-fuchsia-50">{getText(language, "register", "launchSequence")}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">{getText(language, "register", "badge")}</p>
            <h2 className="mt-4 text-3xl font-black text-white">{getText(language, "register", "title")}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-200">{getText(language, "register", "description")}</p>
          </div>

          <div className="mt-6 grid gap-3">
            {sectorCards.map((card) => {
              const isActive = selectedSector === card.id;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => {
                    setSelectedSector(card.id);
                    setMission(getText(language, "register", card.titleKey));
                  }}
                  className={`rounded-[22px] border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-cyan-300 bg-cyan-500/10"
                      : "border-white/10 bg-slate-950/60 hover:border-cyan-200"
                  }`}
                >
                  <p className="text-sm font-bold text-white">{getText(language, "register", card.titleKey)}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-100">{getText(language, "register", card.textKey)}</p>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-[30px] border border-emerald-400/20 bg-[linear-gradient(135deg,rgba(74,222,128,0.16),rgba(15,23,42,0.9))] p-6"
        >
          <div className="mb-4">
            <VoiceInstructions
              language={language}
              onRegister={() => {
                // If name is filled, perform register; otherwise focus name input
                if (pilotName.trim()) {
                  handleRegister();
                } else if (nameInputRef.current) {
                  nameInputRef.current.focus();
                }
              }}
            />
          </div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">{getText(language, "register", "formTitle")}</p>
          <div className="mt-4 space-y-4">
            <label className="block text-sm text-slate-100">
              {getText(language, "register", "nameLabel")}
              <input
                ref={nameInputRef}
                value={pilotName}
                onChange={(event) => setPilotName(event.target.value)}
                placeholder={getText(language, "register", "namePlaceholder")}
                className="mt-2 w-full rounded-2xl border border-cyan-400/30 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              />
            </label>

            <label className="block text-sm text-slate-100">
              {getText(language, "register", "missionLabel")}
              <input
                value={mission}
                onChange={(event) => setMission(event.target.value)}
                placeholder={getText(language, "register", "missionPlaceholder")}
                className="mt-2 w-full rounded-2xl border border-cyan-400/30 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              />
            </label>

            <button
              type="button"
              onClick={handleRegister}
              disabled={!pilotName.trim()}
              className="w-full rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-200"
            >
              {getText(language, "register", "submit")}
            </button>
          </div>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-300">{getText(language, "register", "missionReady")}</p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-100">
              <li>{getText(language, "register", "ready1")}</li>
              <li>{getText(language, "register", "ready2")}</li>
              <li>{getText(language, "register", "ready3")}</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </UniverseShell>
  );
}