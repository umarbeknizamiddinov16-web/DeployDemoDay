"use client";

import UniverseShell from "@/components/UniverseShell";
import { useLanguage } from "@/lib/useLanguage";

const translations = {
  ru: {
    badge: "Features",
    title: "Что уже реализовано",
    description:
      "Digital Universe уже умеет выполнять главный сценарий: вход, сохранение пилота, переходы между модулями и визуализацию цифровой системы.",
    features: [
      { title: "Модульная навигация", text: "Каждая страница — отдельная часть вселенной с понятной связкой." },
      { title: "Локальное сохранение", text: "Имя пилота и миссия сохраняются в localStorage браузера." },
      { title: "Симуляция AI", text: "Небольшой интеллектуальный блок с анализом и рекомендациями." },
      { title: "Терминал", text: "Команды и ответы, имитирующие работу системы." },
      { title: "Карта системы", text: "Визуализация структуры модулей в виде связей." },
      { title: "Единый стиль", text: "Глубокая визуальная концепция: темная тема, неон, высоты и футуризм." },
    ],
  },
  uz: {
    badge: "Xususiyatlar",
    title: "Hozirga qadar amalga oshirilganlar",
    description:
      "Digital Universe hozirda asosiy ssenariyni bajara oladi: kirish, pilotni saqlash, modullar orasida o‘tish va raqamli tizim vizualizatsiyasi.",
    features: [
      { title: "Modulli navigatsiya", text: "Har bir sahifa aniq bog‘langan alohida koinot qismi." },
      { title: "Lokal saqlash", text: "Pilot ismi va missiya brauzerning localStorage’da saqlanadi." },
      { title: "AI simulyatsiyasi", text: "Tahlil va tavsiyalar beradigan kichik intellekt blok." },
      { title: "Terminal", text: "Tizimni taqlid qiluvchi buyruqlar va javoblar." },
      { title: "Tizim xaritasi", text: "Modullar tuzilmasini bog‘lanish ko‘rinishida vizualizatsiya." },
      { title: "Yagona uslub", text: "Chuqur vizual konsepsiya: qorong‘i mavzu, neon, balandlik va futurologiya." },
    ],
  },
  en: {
    badge: "Features",
    title: "What is already implemented",
    description:
      "Digital Universe already supports the core flow: registration, pilot persistence, module navigation, and a visual system map.",
    features: [
      { title: "Modular navigation", text: "Each page is a distinct part of the universe with clear connections." },
      { title: "Local persistence", text: "Pilot name and mission are saved in the browser localStorage." },
      { title: "AI simulation", text: "A compact intelligence block for analysis and recommendations." },
      { title: "Terminal", text: "Commands and responses that mimic system behavior." },
      { title: "System map", text: "A visual representation of the module structure and links." },
      { title: "Unified style", text: "A deep futuristic visual language with dark UI and neon accents." },
    ],
  },
};

export default function FeaturesPage() {
  const language = useLanguage();
  const t = translations[language] ?? translations.ru;

  return (
    <UniverseShell>
      <div className="space-y-6">
        <div className="rounded-[24px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/5 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">{t.badge}</p>
          <h2 className="mt-4 text-3xl font-black text-white">{t.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200">{t.description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {t.features.map((feature) => (
            <div key={feature.title} className="rounded-[22px] border border-cyan-400/20 bg-white/5 p-4">
              <p className="text-lg font-semibold text-white">{feature.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </UniverseShell>
  );
}