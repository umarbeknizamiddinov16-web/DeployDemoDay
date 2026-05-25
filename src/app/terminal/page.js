"use client";

import { useEffect, useState } from "react";
import UniverseShell from "@/components/UniverseShell";
import { useLanguage } from "@/lib/useLanguage";

const translations = {
  ru: {
    badge: "Terminal module",
    title: "Командная консоль",
    description:
      "Это симуляция терминала: каждая команда возвращает короткий ответ, имитируя работу внутренней системы.",
    placeholder: "Введите команду",
    execute: "Выполнить",
    initialHistory: [
      { type: "system", content: "Digital Universe terminal online." },
      { type: "system", content: "Введите help для списка команд." },
    ],
    commandLibrary: {
      help: [
        "help → показать доступные команды",
        "scan → проверить сеть",
        "whoami → показать пилота",
        "system → открыть карту системы",
        "orbit → показать статус орбиты",
      ],
      scan: "Сканирование завершено. Все узлы связи работают в норме.",
      whoami: "Пилот: текущий пользователь Digital Universe.",
      system: "Система: карта модулей доступна в разделе /system.",
    },
    orbitStatus: (latency) => `Орбита: стабильна, время отклика ${latency}.`,
    unknownCommand: (command) => `Unknown command: ${command}`,
  },
  uz: {
    badge: "Terminal moduli",
    title: "Buyruqlar konsoli",
    description:
      "Bu terminal simulyatsiyasi: har bir buyruq ichki tizim ishini taqlid qilib qisqa javob qaytaradi.",
    placeholder: "Buyruq kiriting",
    execute: "Ijro etish",
    initialHistory: [
      { type: "system", content: "Digital Universe terminal online." },
      { type: "system", content: "Buyruqlar ro‘yxati uchun help ni kiriting." },
    ],
    commandLibrary: {
      help: [
        "help → mavjud buyruqlarni ko‘rsatish",
        "scan → tarmoqni tekshirish",
        "whoami → pilotni ko‘rsatish",
        "system → tizim xaritasini ochish",
        "orbit → orbita holatini ko‘rsatish",
      ],
      scan: "Skaner ishga tushdi. Barcha aloqa tugunlari normal ishlamoqda.",
      whoami: "Pilot: hozirgi Digital Universe foydalanuvchisi.",
      system: "Tizim: modullar xaritasi /system bo‘limida mavjud.",
    },
    orbitStatus: (latency) => `Orbita: barqaror, javob vaqti ${latency}.`,
    unknownCommand: (command) => `Noma’lum buyruq: ${command}`,
  },
  en: {
    badge: "Terminal module",
    title: "Command console",
    description:
      "This is a terminal simulation: each command returns a quick response that mimics the internal system.",
    placeholder: "Enter a command",
    execute: "Execute",
    initialHistory: [
      { type: "system", content: "Digital Universe terminal online." },
      { type: "system", content: "Type help to view the available commands." },
    ],
    commandLibrary: {
      help: [
        "help → show available commands",
        "scan → inspect the network",
        "whoami → display the pilot",
        "system → open the system map",
        "orbit → show orbit status",
      ],
      scan: "Scan complete. All communication nodes are operating normally.",
      whoami: "Pilot: the current Digital Universe user.",
      system: "System: the module map is available in /system.",
    },
    orbitStatus: (latency) => `Orbit: stable, response time ${latency}.`,
    unknownCommand: (command) => `Unknown command: ${command}`,
  },
};

export default function TerminalPage() {
  const language = useLanguage();
  const t = translations[language] ?? translations.ru;
  const [command, setCommand] = useState("");
  const [latency, setLatency] = useState("9 ms");
  const [history, setHistory] = useState(t.initialHistory);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateLatency = () => {
      setLatency(`${Math.floor(Math.random() * 240) + 1} ms`);
    };

    updateLatency();
    const intervalId = window.setInterval(updateLatency, 4500);

    return () => window.clearInterval(intervalId);
  }, []);

  const runCommand = () => {
    const trimmed = command.trim().toLowerCase();

    setHistory((current) => [
      ...current,
      { type: "input", content: `> ${command}` },
      {
        type: "output",
        content:
          trimmed === "orbit"
            ? t.orbitStatus(latency)
            : trimmed in t.commandLibrary
              ? Array.isArray(t.commandLibrary[trimmed])
                ? t.commandLibrary[trimmed].join("\n")
                : t.commandLibrary[trimmed]
              : t.unknownCommand(trimmed),
      },
    ]);

    setCommand("");
  };

  return (
    <UniverseShell>
      <div className="space-y-6">
        <div className="rounded-[24px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/5 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{t.badge}</p>
          <h2 className="mt-4 text-3xl font-black text-white">{t.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200">{t.description}</p>
        </div>

        <div className="rounded-[22px] border border-cyan-400/20 bg-slate-950/80 p-5">
          <div className="max-h-[320px] space-y-3 overflow-y-auto pr-1">
            {history.map((entry, index) => (
              <div
                key={`${entry.type}-${index}`}
                className={`rounded-2xl px-4 py-3 text-sm ${
                  entry.type === "system"
                    ? "border border-cyan-400/20 bg-cyan-500/5 text-cyan-100"
                    : entry.type === "input"
                      ? "border border-fuchsia-400/20 bg-fuchsia-500/5 text-fuchsia-100"
                      : "border border-emerald-400/20 bg-emerald-500/5 text-emerald-50"
                }`}
              >
                <pre className="whitespace-pre-wrap font-mono">{entry.content}</pre>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  runCommand();
                }
              }}
              placeholder={t.placeholder}
              className="flex-1 rounded-2xl border border-cyan-400/30 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500"
            />
            <button
              type="button"
              onClick={runCommand}
              className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {t.execute}
            </button>
          </div>
        </div>
      </div>
    </UniverseShell>
  );
}