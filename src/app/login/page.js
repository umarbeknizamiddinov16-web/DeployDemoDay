"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UniverseShell from "@/components/UniverseShell";
import { getStoredLanguage, getText, LANGUAGE_EVENT } from "@/lib/i18n";

export default function LoginPage() {
  const router = useRouter();
  const [pilotName, setPilotName] = useState("");
  const [language, setLanguage] = useState(getStoredLanguage());

  useEffect(() => {
    const syncLanguage = (event) => {
      setLanguage(event?.detail || getStoredLanguage());
    };

    setLanguage(getStoredLanguage());
    window.addEventListener(LANGUAGE_EVENT, syncLanguage);

    return () => window.removeEventListener(LANGUAGE_EVENT, syncLanguage);
  }, []);

  const handleLogin = () => {
    if (!pilotName.trim()) {
      return;
    }

    window.localStorage.setItem("digital-universe-user", pilotName.trim());
    window.localStorage.setItem("digital-universe-auth", "true");
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
            <div className="absolute h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(103,232,249,0.95),rgba(14,116,144,0.88)_45%,rgba(15,23,42,0.98)_100%)] shadow-[0_0_80px_rgba(34,211,238,0.4)]" />
            <div className="relative text-center">
              <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-100">{getText(language, "login", "badge")}</p>
              <p className="mt-4 text-3xl font-black text-white">DU</p>
              <p className="mt-2 text-sm text-cyan-50">{getText(language, "login", "entryOrbitReady")}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">{getText(language, "login", "badge")}</p>
            <h2 className="mt-4 text-3xl font-black text-white">{getText(language, "login", "title")}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-200">{getText(language, "login", "description")}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-[30px] border border-fuchsia-400/20 bg-[linear-gradient(135deg,rgba(244,114,182,0.16),rgba(15,23,42,0.9))] p-6"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-200">{getText(language, "login", "formTitle")}</p>
          <div className="mt-4 space-y-4">
            <label className="block text-sm text-slate-100">
              {getText(language, "login", "nameLabel")}
              <input
                value={pilotName}
                onChange={(event) => setPilotName(event.target.value)}
                placeholder={getText(language, "login", "namePlaceholder")}
                className="mt-2 w-full rounded-2xl border border-cyan-400/30 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              />
            </label>

            <button
              type="button"
              onClick={handleLogin}
              disabled={!pilotName.trim()}
              className="w-full rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-200"
            >
              {getText(language, "login", "submit")}
            </button>
          </div>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-300">{getText(language, "login", "hints")}</p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-100">
              <li>{getText(language, "login", "hint1")}</li>
              <li>{getText(language, "login", "hint2")}</li>
              <li>{getText(language, "login", "hint3")}</li>
            </ul>
            <p className="mt-3 text-sm leading-6 text-slate-100">{getText(language, "login", "note")}</p>
          </div>
        </motion.div>
      </div>
    </UniverseShell>
  );
}