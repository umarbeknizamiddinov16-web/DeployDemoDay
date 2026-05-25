"use client";

import { useEffect, useState } from "react";
import UniverseShell from "@/components/UniverseShell";
import { getStoredLanguage, getText, LANGUAGE_EVENT } from "@/lib/i18n";

const translations = {
  ru: {
    badge: "Модуль настроек",
    title: "Настройки системы",
    description: "Здесь можно настроить профиль, язык, параметры системы и визуальные эффекты.",
    profileTitle: "Профиль пилота",
    nameLabel: "Имя пилота",
    namePlaceholder: "Введите имя",
    missionLabel: "Текущая миссия",
    missionPlaceholder: "Введите описание миссии",
    languageLabel: "Язык интерфейса",
    voiceLabel: "Голос синтеза речи",
    volumeLabel: "Громкость речи",
    pitchLabel: "Тембр голоса",
    speedLabel: "Скорость речи",
    voicePreviewButton: "Проверить голос",
    voicePreviewText: "Я слушаю, сэр.",
    settingsTitle: "Параметры системы",
    toggles: [
      { label: "Автосинхронизация", description: "Поддерживать связь между модулями." },
      { label: "Пульсирующее свечение", description: "Включить энергичную визуальную подсветку." },
      { label: "Подсказки миссии", description: "Показывать подсказки по текущей миссии." },
    ],
    saveButton: "Сохранить",
    successMessage: "Изменения сохранены!",
  },
  uz: {
    badge: "Sozlamalar moduli",
    title: "Tizim sozlamalari",
    description: "Bu yerda profil, til, tizim parametrlari va vizual effektlarni sozlash mumkin.",
    profileTitle: "Pilot profili",
    nameLabel: "Pilot nomi",
    namePlaceholder: "Nomini kiriting",
    missionLabel: "Joriy missiya",
    missionPlaceholder: "Missiya tavsifini kiriting",
    languageLabel: "Interfeys tili",
    voiceLabel: "Nutq ovozi",
    volumeLabel: "Ovoz hajmi",
    pitchLabel: "Ovoz timbri",
    speedLabel: "Nutq tezligi",
    voicePreviewButton: "Ovozini tekshirish",
    voicePreviewText: "Men tinglayapman, janob.",
    settingsTitle: "Tizim parametrlari",
    toggles: [
      { label: "Avtosinxronlash", description: "Modullar orasidagi aloqani saqlab turish." },
      { label: "Pulsatsiyali porlash", description: "Energetik vizual yoritishni yoqish." },
      { label: "Missiya maslahatlari", description: "Joriy missiya bo'yicha maslahatlarni ko'rsatish." },
    ],
    saveButton: "Saqlash",
    successMessage: "O'zgarishlar saqlandi!",
  },
  en: {
    badge: "Settings module",
    title: "System settings",
    description: "Adjust your profile, language, system parameters, and visual effects here.",
    profileTitle: "Pilot profile",
    nameLabel: "Pilot name",
    namePlaceholder: "Enter your name",
    missionLabel: "Current mission",
    missionPlaceholder: "Describe your mission",
    languageLabel: "Interface language",
    voiceLabel: "Speech voice",
    volumeLabel: "Speech volume",
    pitchLabel: "Voice pitch",
    speedLabel: "Speech speed",
    voicePreviewButton: "Preview voice",
    voicePreviewText: "I am listening, sir.",
    settingsTitle: "System parameters",
    toggles: [
      { label: "Auto sync", description: "Keep the modules connected and in sync." },
      { label: "Pulse glow", description: "Enable a stronger neon visual pulse." },
      { label: "Mission tips", description: "Show contextual guidance for the current mission." },
    ],
    saveButton: "Save",
    successMessage: "Changes saved!",
  },
};

export default function SettingsPage() {
  const [language, setLanguage] = useState(getStoredLanguage());
  const [pilotName, setPilotName] = useState("");
  const [mission, setMission] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [voiceRate, setVoiceRate] = useState(0.65);
  const [voiceVolume, setVoiceVolume] = useState(1.0);
  const [voicePitch, setVoicePitch] = useState(1.0);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [toggles, setToggles] = useState({
    autoSync: true,
    pulseGlow: true,
    missionTips: true,
  });
  const [saved, setSaved] = useState(false);

  const t = translations[language] ?? translations.ru;

  useEffect(() => {
    const syncLanguage = (event) => {
      setLanguage(event?.detail || getStoredLanguage());
    };
    setLanguage(getStoredLanguage());
    window.addEventListener(LANGUAGE_EVENT, syncLanguage);
    return () => window.removeEventListener(LANGUAGE_EVENT, syncLanguage);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = window.localStorage.getItem("digital-universe-user") || "";
      const savedMission = window.localStorage.getItem("digital-universe-mission") || "";
      const savedLang = window.localStorage.getItem("digital-universe-language") || language;
      const savedToggles = JSON.parse(window.localStorage.getItem("digital-universe-settings") || "{}");
      const savedVoice = window.localStorage.getItem("digital-universe-voice") || "";
      const savedVoiceVolume = parseFloat(window.localStorage.getItem("digital-universe-voice-volume"));
      const savedVoicePitch = parseFloat(window.localStorage.getItem("digital-universe-voice-pitch"));
      const savedVoiceRate = parseFloat(window.localStorage.getItem("digital-universe-voice-rate"));

      setPilotName(savedName);
      setMission(savedMission);
      setSelectedLanguage(savedLang);
      setSelectedVoice(savedVoice);
      setVoiceVolume(Number.isFinite(savedVoiceVolume) ? Math.min(Math.max(savedVoiceVolume, 0.1), 1.0) : 1.0);
      setVoicePitch(Number.isFinite(savedVoicePitch) ? Math.min(Math.max(savedVoicePitch, 0.5), 2.0) : 1.0);
      setVoiceRate(Number.isFinite(savedVoiceRate) ? Math.min(Math.max(savedVoiceRate, 0.4), 1.5) : 0.65);
      if (Object.keys(savedToggles).length > 0) {
        setToggles({ ...toggles, ...savedToggles });
      }

      // Load available voices
      if (window.speechSynthesis) {
        const loadVoices = () => {
          const voices = window.speechSynthesis.getVoices();
          setAvailableVoices(voices);
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const handleSave = () => {
    window.localStorage.setItem("digital-universe-user", pilotName.trim() || "Explorer");
    window.localStorage.setItem("digital-universe-mission", mission.trim());
    window.localStorage.setItem("digital-universe-language", selectedLanguage);
    window.localStorage.setItem("digital-universe-voice", selectedVoice);
    window.localStorage.setItem("digital-universe-voice-volume", String(voiceVolume));
    window.localStorage.setItem("digital-universe-voice-pitch", String(voicePitch));
    window.localStorage.setItem("digital-universe-voice-rate", String(voiceRate));
    window.localStorage.setItem("digital-universe-settings", JSON.stringify(toggles));

    // Dispatch language change event if language was changed
    if (selectedLanguage !== language) {
      window.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, { detail: selectedLanguage }));
      setLanguage(selectedLanguage);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleToggle = (key) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
  };

  const getBestVoice = (voiceName = "") => {
    if (typeof window === "undefined" || !window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    if (voiceName) {
      const selectedVoice = voices.find((voice) => voice.name === voiceName);
      if (selectedVoice) return selectedVoice;
    }
    let voice = voices.find((voice) => voice.lang.startsWith(selectedLanguage.split("-")[0]));
    if (!voice) voice = voices.find((voice) => voice.lang.includes("en"));
    return voice || voices[0] || null;
  };

  const cycleVoiceRate = () => {
    const values = [0.5, 0.65, 0.8, 1.0, 1.25, 1.5];
    const nextIndex = (values.indexOf(voiceRate) + 1) % values.length;
    setVoiceRate(values[nextIndex]);
  };

  const speakVoicePreview = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const phrase = t.voicePreviewText;
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = selectedLanguage === "ru" ? "ru-RU" : selectedLanguage === "uz" ? "uz-UZ" : "en-US";
    utterance.voice = getBestVoice(selectedVoice);
    utterance.volume = voiceVolume;
    utterance.pitch = voicePitch;
    utterance.rate = voiceRate;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <UniverseShell>
      <div className="space-y-6">
        <div className="rounded-[24px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/5 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{t.badge}</p>
          <h2 className="mt-4 text-3xl font-black text-white">{t.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200">{t.description}</p>
        </div>

        <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-500/5 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">{t.profileTitle}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-100">
              {t.nameLabel}
              <input
                type="text"
                value={pilotName}
                onChange={(e) => setPilotName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="mt-2 w-full rounded-2xl border border-cyan-400/30 bg-slate-950 px-4 py-2 text-white outline-none placeholder:text-slate-500"
              />
            </label>
            <label className="block text-sm text-slate-100">
              {t.missionLabel}
              <input
                type="text"
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                placeholder={t.missionPlaceholder}
                className="mt-2 w-full rounded-2xl border border-cyan-400/30 bg-slate-950 px-4 py-2 text-white outline-none placeholder:text-slate-500"
              />
            </label>
          </div>

          <label className="mt-4 block text-sm text-slate-100">
            {t.languageLabel}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-cyan-400/30 bg-slate-950 px-4 py-2 text-white outline-none"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="uz">O'zbekcha</option>
            </select>
          </label>

          <label className="mt-4 block text-sm text-slate-100">
            {t.voiceLabel}
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-cyan-400/30 bg-slate-950 px-4 py-2 text-white outline-none"
            >
              <option value="">Автоматический выбор</option>
              {availableVoices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </label>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={speakVoicePreview}
              className="inline-flex items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-500/20"
            >
              {t.voicePreviewButton}
            </button>
            <button
              type="button"
              onClick={cycleVoiceRate}
              className="inline-flex items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-50 transition hover:bg-violet-500/20"
            >
              {t.speedLabel}: {voiceRate.toFixed(2)}
            </button>
          </div>

          <label className="mt-4 block text-sm text-slate-100">
            {t.volumeLabel} — {Math.round(voiceVolume * 100)}%
            <input
              type="range"
              min="0.2"
              max="1.0"
              step="0.05"
              value={voiceVolume}
              onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
              className="mt-2 w-full accent-cyan-400"
            />
          </label>

          <label className="mt-4 block text-sm text-slate-100">
            {t.pitchLabel} — {voicePitch.toFixed(2)}
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.05"
              value={voicePitch}
              onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
              className="mt-2 w-full accent-cyan-400"
            />
          </label>
        </div>

        <div className="rounded-[24px] border border-cyan-400/20 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{t.settingsTitle}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {t.toggles.map((toggle, idx) => {
              const keys = ["autoSync", "pulseGlow", "missionTips"];
              const key = keys[idx];
              return (
                <div key={key} className="rounded-[22px] border border-cyan-400/20 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-white">{toggle.label}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">{toggle.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle(key)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                        toggles[key]
                          ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
                          : "border-slate-400/40 bg-slate-500/10 text-slate-100"
                      }`}
                    >
                      {toggles[key] ? "ON" : "OFF"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            {t.saveButton}
          </button>
          {saved && <p className="text-sm text-emerald-100">{t.successMessage}</p>}
        </div>
      </div>
    </UniverseShell>
  );
}
