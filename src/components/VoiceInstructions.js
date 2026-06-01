"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getStoredLanguage, LANGUAGE_EVENT } from "@/lib/i18n";

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
    listen: "🎧 Слушать команды",
    listening: "Слушаю...",
    statusReady: "Инструкция готова к озвучиванию.",
    statusSpeaking: "Сейчас инструкция озвучивается.",
    unsupported: "Ваш браузер не поддерживает озвучивание текста.",
    lang: "ru-RU",
    registerNow: "Зарегистрироваться",
    bullets: [
      "Регистрация — создаёт пилота и открывает доступ к системе.",
      "Вход — продолжает миссию, если профиль уже есть.",
      "Вселенная — открыть карту галактики и выбрать следующий сектор.",
      "AI — отвечать на вопросы о сайте и о космосе.",
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
    listen: "🎧 Listen for commands",
    listening: "Listening...",
    statusReady: "The instructions are ready to be spoken.",
    statusSpeaking: "The instructions are being spoken now.",
    unsupported: "Your browser does not support text-to-speech.",
    lang: "en-US",
    registerNow: "Register now",
    bullets: [
      "Registration creates a pilot and unlocks the full system.",
      "Login continues the mission if a profile already exists.",
      "Universe opens the galaxy map and lets you choose the next sector.",
      "AI answers questions about the site and the cosmos.",
    ],
  },
};

export default function VoiceInstructions({ language: languageProp, onRegister, showRegisterCheckbox = true }) {
  const router = useRouter();
  const [language, setLanguage] = useState(languageProp || getStoredLanguage());
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechStatus, setSpeechStatus] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const [aiMode, setAiMode] = useState(false);
  const aiStageRef = useRef(0); // 0=waiting,1=askedFollowup
  const aiTimerRef = useRef(null);

  const instructions = instructionsByLanguage[language] ?? instructionsByLanguage.ru;

  useEffect(() => {
    const currentLang = languageProp || getStoredLanguage();
    setLanguage(currentLang);
  }, [languageProp]);

  useEffect(() => {
    const syncLanguage = (event) => {
      setLanguage(event?.detail || getStoredLanguage());
    };
    window.addEventListener(LANGUAGE_EVENT, syncLanguage);
    return () => window.removeEventListener(LANGUAGE_EVENT, syncLanguage);
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  const getBestVoice = (lang, voiceName = "") => {
    if (typeof window === "undefined" || !window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();

    // If user selected a specific voice, use it
    if (voiceName) {
      const selectedVoice = voices.find((v) => v.name === voiceName);
      if (selectedVoice) return selectedVoice;
    }

    // Otherwise prefer voices matching the language
    let voice = voices.find((v) => v.lang.startsWith(lang.split("-")[0]));
    if (!voice) voice = voices.find((v) => v.lang.includes("en"));
    if (!voice && voices.length > 0) voice = voices[0];

    return voice;
  };

  const getSpeechOptions = () => {
    if (typeof window === "undefined") {
      return { voiceName: "", volume: 1.0, pitch: 1.0 };
    }
    const voiceName = window.localStorage.getItem("digital-universe-voice") || "";
    const volumeValue = parseFloat(window.localStorage.getItem("digital-universe-voice-volume"));
    const pitchValue = parseFloat(window.localStorage.getItem("digital-universe-voice-pitch"));

    const rateValue = parseFloat(window.localStorage.getItem("digital-universe-voice-rate"));
    return {
      voiceName,
      volume: Number.isFinite(volumeValue) ? Math.min(Math.max(volumeValue, 0.1), 1.0) : 1.0,
      pitch: Number.isFinite(pitchValue) ? Math.min(Math.max(pitchValue, 0.5), 2.0) : 1.0,
      rate: Number.isFinite(rateValue) ? Math.min(Math.max(rateValue, 0.4), 1.5) : 0.65,
    };
  };

  const normalizeSpeechText = (text) => {
    if (!text) return "";
    return text
      .replace(/;/g, ". ")
      .replace(/\s*\.\s*/g, ". ")
      .replace(/\s*,\s*/g, ", ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const playFeedbackTone = () => {
    if (typeof window === "undefined" || !window.AudioContext) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = 520;
      gain.gain.value = 0.08;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
      osc.onended = () => ctx.close();
    } catch (e) {
      // ignore audio errors
    }
  };

  const speakInstructions = () => {
    if (typeof window === "undefined") return;
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

    const { voiceName, volume, pitch, rate } = getSpeechOptions();
    const text = normalizeSpeechText([instructions.intro, instructions.summary, instructions.aiText, instructions.bullets.join(" ")].join(" "));

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = instructions.lang;
    utterance.voice = getBestVoice(instructions.lang, voiceName);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

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

    playFeedbackTone();
    synth.cancel();
    synth.speak(utterance);
  };

  const startListening = () => {
    if (isListening) {
      stopListening();
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechStatus(instructions.unsupported);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = instructions.lang || "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setSpeechStatus(instructions.listening);
      setTranscript("");
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript || "";
      setTranscript(text);
      handleVoiceCommand(text.toLowerCase());
    };

    recognition.onerror = () => {
      setIsListening(false);
      setSpeechStatus(instructions.unsupported);
    };

    recognition.onend = () => {
      setIsListening(false);
      setSpeechStatus("");
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
    setSpeechStatus("");
  };

  const handleVoiceCommand = (text) => {
    // Basic keyword matching per language
    const maps = {
      ru: {
        register: ["регистрац", "зарегистр"],
        login: ["вход", "зайти", "войти"],
        universe: ["галакт", "вселен"],
        ai: ["ай", "искусств", " интеллект"],
        terminal: ["терминал", "консоль"],
      },
      en: {
        register: ["register"],
        login: ["login", "sign in"],
        universe: ["universe", "galaxy"],
        ai: ["ai", "assistant", "gemini"],
        terminal: ["terminal", "console"],
      },
    };

    const map = maps[language] || maps.en;

    // Detect "NEXUS AI" trigger: user asked to open AI mode
    const nexusTriggers = ["nexus ai", "nexus", "нексус"];
    const hasNexus = nexusTriggers.some((k) => text.includes(k));
    const hasAi = text.includes("ai") || text.includes("ай");
    if (hasNexus && hasAi) {
      startAIMode();
      return;
    }

    for (const action of Object.keys(map)) {
      for (const kw of map[action]) {
        if (text.includes(kw)) {
          performAction(action);
          return;
        }
      }
    }
  };

  const speakText = (text) => {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || !window.speechSynthesis) {
        resolve();
        return;
      }
      const { voiceName, volume, pitch, rate } = getSpeechOptions();
      const utterance = new SpeechSynthesisUtterance(normalizeSpeechText(text));
      utterance.lang = instructions.lang || "en-US";
      utterance.voice = getBestVoice(instructions.lang || "en", voiceName);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      playFeedbackTone();
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    });
  };

  const startAIMode = async () => {
    if (aiMode) return;
    setAiMode(true);
    aiStageRef.current = 0;

    const listenPhrase = language === "ru" ? "Слушаю, сэр." : "Listening, sir.";
    const followupPhrase = language === "ru" ? "Как вы себя чувствуете, сэр?" : "How are you feeling, sir?";
    const exitPhrase = language === "ru" ? "Выход из режима AI." : "Exiting AI mode.";

    await speakText(listenPhrase);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechStatus(instructions.unsupported);
      setAiMode(false);
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }

    const recog = new SpeechRecognition();
    recog.lang = instructions.lang || "en-US";
    recog.interimResults = false;
    recog.maxAlternatives = 1;

    let replied = false;

    recog.onresult = async (event) => {
      replied = true;
      const text = event.results[0][0].transcript || "";
      setTranscript(text);
      const ack = language === "ru" ? "Принято, сэр." : "Acknowledged, sir.";
      await speakText(ack + " " + text);
      cleanupAI();
    };

    recog.onerror = () => {};
    recog.onend = () => {};

    recognitionRef.current = recog;
    try {
      recog.start();
    } catch (e) {}

    aiTimerRef.current = setTimeout(async () => {
      if (replied) return;
      await speakText(followupPhrase);
      aiStageRef.current = 1;

      try {
        recog.stop();
      } catch (e) {}
      const recog2 = new SpeechRecognition();
      recog2.lang = instructions.lang || "en-US";
      recog2.interimResults = false;
      recog2.maxAlternatives = 1;

      let replied2 = false;
      recog2.onresult = async (event) => {
        replied2 = true;
        const text = event.results[0][0].transcript || "";
        setTranscript(text);
        const ack2 = language === "ru" ? "Спасибо, сэр." : "Thank you, sir.";
        await speakText(ack2 + " " + text);
        cleanupAI();
      };
      recog2.onerror = () => {};
      recognitionRef.current = recog2;
      try {
        recog2.start();
      } catch (e) {}

      aiTimerRef.current = setTimeout(async () => {
        if (replied2) return;
        await speakText(exitPhrase);
        cleanupAI();
      }, 5000);
    }, 5000);
  };

  const cleanupAI = () => {
    if (aiTimerRef.current) {
      clearTimeout(aiTimerRef.current);
      aiTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
    aiStageRef.current = 0;
    setAiMode(false);
  };

  const performAction = (action) => {
    if (action === "register") {
      if (typeof onRegister === "function") {
        onRegister();
      } else {
        router.push("/register");
      }
    } else if (action === "login") {
      router.push("/login");
    } else if (action === "universe") {
      router.push("/universe");
    } else if (action === "ai") {
      router.push("/ai");
    } else if (action === "terminal") {
      router.push("/terminal");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">{instructions.title}</p>
          <p className="mt-2 text-sm leading-7 text-slate-200">{instructions.intro}</p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={speakInstructions}
            className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-500/20"
          >
            {isSpeaking ? instructions.stop : instructions.speak}
          </button>

          <button
            type="button"
            onClick={startListening}
            className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${isListening ? "bg-emerald-500/20 border-emerald-400" : "border-white/10"}`}
          >
            {isListening ? instructions.listening : instructions.listen}
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-[22px] border border-fuchsia-400/20 bg-fuchsia-500/5 p-4">
        <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-200">{instructions.summary}</p>
        <p className="mt-3 text-sm leading-7 text-slate-100">{instructions.aiText}</p>
      </div>

      <div className="mt-4 space-y-3">
        {instructions.bullets.map((item) => (
          <div key={item} className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-slate-100">
            {item}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        {showRegisterCheckbox ? (
          <label className="flex items-center gap-3 text-sm text-slate-100">
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) performAction("register");
              }}
              className="h-4 w-4 rounded border bg-slate-900"
            />
            <span>{instructions.registerNow}</span>
          </label>
        ) : null}

        {speechStatus ? <p className="text-sm text-cyan-100">{speechStatus}</p> : null}
        {transcript ? <p className="text-sm text-slate-300">{transcript}</p> : null}
      </div>
    </div>
  );
}
