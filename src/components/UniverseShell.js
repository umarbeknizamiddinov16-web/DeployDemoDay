"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import StarfieldBackground from "./StarfieldBackground";
import { getStoredLanguage, getText, LANGUAGE_EVENT, languages, setStoredLanguage } from "@/lib/i18n";

const protectedRoutes = new Set(["/dashboard", "/ai", "/terminal", "/system", "/profile", "/settings", "/tasks", "/notes", "/stats", "/planet/ai"]);
const publicRoutes = new Set(["/", "/login", "/register", "/about", "/features", "/universe"]);

export default function UniverseShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("Explorer");
  const [isAuthed, setIsAuthed] = useState(false);
  const [language, setLanguageState] = useState(getStoredLanguage());
  const [quickSignals, setQuickSignals] = useState([
    { label: "Signal", value: "ONLINE" },
    { label: "Latency", value: "9 ms" },
    { label: "Modules", value: "9" },
  ]);

  const common = getText(language, "common", "");
  const shell = getText(language, "shell", "");

  const navItems = useMemo(() => {
    const baseNav = [
      { href: "/", label: getText(language, "common", "universe"), description: getText(language, "common", "registerFirst") },
      { href: "/universe", label: getText(language, "common", "universe"), description: getText(language, "common", "chooseOrbit") },
      { href: "/about", label: getText(language, "common", "about"), description: getText(language, "common", "mission") },
      { href: "/features", label: getText(language, "common", "features"), description: getText(language, "common", "openModule") },
    ];

    if (!isAuthed) {
      return baseNav;
    }

    return [
      ...baseNav,
      { href: "/dashboard", label: getText(language, "common", "dashboard"), description: getText(language, "common", "currentModule") },
      { href: "/ai", label: "AI", description: getText(language, "common", "mission") },
      { href: "/terminal", label: getText(language, "common", "terminal"), description: getText(language, "common", "mission") },
      { href: "/system", label: getText(language, "common", "system"), description: getText(language, "common", "currentModule") },
      { href: "/profile", label: getText(language, "common", "profile"), description: getText(language, "common", "mission") },
      { href: "/settings", label: getText(language, "common", "settings"), description: getText(language, "common", "mission") },
    ];
  }, [isAuthed, language]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const syncState = () => {
      const storedUser = window.localStorage.getItem("digital-universe-user");
      const storedAuth = window.localStorage.getItem("digital-universe-auth") === "true";
      setUserName(storedUser || "Explorer");
      setIsAuthed(storedAuth);
    };

    const updateSignals = () => {
      const latency = `${Math.floor(Math.random() * 240) + 1} ms`;
      const modules = `${Math.floor(Math.random() * 42) + 1}`;

      setQuickSignals([
        { label: getText(language, "common", "signal"), value: getText(language, "common", "online") },
        { label: getText(language, "common", "latency"), value: latency },
        { label: getText(language, "common", "modules"), value: modules },
      ]);
    };

    const handleLanguageChange = (event) => {
      setLanguageState(event?.detail || getStoredLanguage());
    };

    syncState();
    updateSignals();
    window.addEventListener("storage", syncState);
    window.addEventListener(LANGUAGE_EVENT, handleLanguageChange);
    const intervalId = window.setInterval(updateSignals, 4000);

    return () => {
      window.removeEventListener("storage", syncState);
      window.removeEventListener(LANGUAGE_EVENT, handleLanguageChange);
      window.clearInterval(intervalId);
    };
  }, [language]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const isAuthorized = window.localStorage.getItem("digital-universe-auth") === "true";
    if (!isAuthorized && protectedRoutes.has(pathname) && !publicRoutes.has(pathname)) {
      router.replace("/register");
    }
  }, [pathname, router]);

  const activeModule = useMemo(() => {
    const match = navItems.find((item) => pathname === item.href);
    return match?.label ?? getText(language, "common", "universe");
  }, [language, navItems, pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("digital-universe-user");
      window.localStorage.removeItem("digital-universe-auth");
      window.localStorage.removeItem("digital-universe-mission");
      setUserName("Explorer");
      setIsAuthed(false);
      window.location.href = "/";
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_35%),linear-gradient(180deg,_#020617,_#000000)] text-white">
      <StarfieldBackground />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] border border-cyan-400/30 bg-white/5 px-5 py-4 shadow-[0_0_35px_rgba(34,211,238,0.1)] backdrop-blur"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Digital Universe</p>
              <h1 className="mt-2 text-2xl font-black text-cyan-200 sm:text-3xl">{shell.title}</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">{shell.subtitle}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100">
                {getText(language, "common", "pilot")}: <span className="font-semibold">{userName}</span>
              </div>
              <div className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">
                {getText(language, "common", "status")}: {getText(language, "common", "online")}
              </div>
              <div className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-cyan-100">
                <span className="uppercase tracking-[0.2em]">{getText(language, "common", "language")}</span>
                <select
                  value={language}
                  onChange={(event) => setStoredLanguage(event.target.value)}
                  className="ml-2 rounded-full border border-cyan-400/20 bg-transparent px-2 py-1 text-white outline-none"
                >
                  {languages.map((item) => (
                    <option key={item.value} value={item.value} className="bg-slate-950 text-white">
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              {isAuthed ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-100 transition hover:border-rose-300 hover:bg-rose-500/20"
                >
                  {getText(language, "common", "exit")}
                </button>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <Link href="/register" className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-50">
                    {getText(language, "common", "register")}
                  </Link>
                  <Link href="/login" className="rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-4 py-2 text-sm font-semibold text-fuchsia-50">
                    {getText(language, "common", "login")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.header>

        <div className="mt-4 flex flex-wrap gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  isActive
                    ? "border-cyan-300 bg-cyan-500/20 text-cyan-50"
                    : "border-cyan-500/20 bg-white/5 text-slate-200 hover:border-cyan-300/60"
                }`}
              >
                <span className="font-semibold">{item.label}</span>
                <span className="ml-2 text-xs text-slate-300">{item.description}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_290px]">
          <motion.main
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-[28px] border border-cyan-400/20 bg-slate-950/70 p-5 shadow-[0_0_40px_rgba(34,211,238,0.06)] backdrop-blur"
          >
            {children}
          </motion.main>

          <aside className="rounded-[28px] border border-cyan-400/20 bg-slate-950/75 p-5 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">{getText(language, "common", "currentModule")}</p>
                <p className="mt-2 text-lg font-semibold text-white">{activeModule}</p>
              </div>
              <span className="rounded-full border border-emerald-400/50 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100">
                {getText(language, "common", "stable")}
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {quickSignals.map((item) => (
                <div key={item.label} className="rounded-2xl border border-cyan-400/20 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-cyan-100">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-200">{getText(language, "common", "missionBriefLabel")}</p>
              <p className="mt-3 text-sm leading-6 text-slate-100">{shell.missionBrief}</p>
            </div>

            {!isAuthed ? (
              <div className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-amber-100">{getText(language, "common", "accessGate")}</p>
                <p className="mt-2 text-sm leading-6 text-slate-100">{getText(language, "common", "onlyRegistration")}</p>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </div>
  );
}
