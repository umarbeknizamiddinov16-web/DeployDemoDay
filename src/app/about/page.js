"use client";

import UniverseShell from "@/components/UniverseShell";
import { useLanguage } from "@/lib/useLanguage";

const translations = {
  ru: {
    badge: "О проекте",
    title: "Что такое Digital Universe",
    description:
      "Это не обычный сайт, а имитация цифровой системы. Продукт сделан так, чтобы ощущать себя как операционная среда с модулями, из которых можно переходить между разными частями вселенной.",
    points: [
      "Единый интерфейс для входа, управления и симуляции системы.",
      "Каждая страница — отдельный модуль цифровой вселенной.",
      "Пользователь и миссия сохраняются локально в браузере.",
    ],
  },
  uz: {
    badge: "Loyiha haqida",
    title: "Digital Universe nimadan iborat?",
    description:
      "Bu oddiy veb-sayt emas, balki raqamli tizim simulyatsiyasi. Mahsulot operatsion muhit singari taassurot qoldirish uchun yaratilgan va unda modullar orasida o‘tish mumkin.",
    points: [
      "Kirish, boshqaruv va simulyatsiya uchun yagona interfeys.",
      "Har bir sahifa alohida raqamli koinot moduli.",
      "Foydalanuvchi va missiya brauzerda lokal saqlanadi.",
    ],
  },
  en: {
    badge: "About",
    title: "What is Digital Universe",
    description:
      "This is not a regular website — it is a simulated operational system. Each module is designed to feel like a distinct part of a larger digital universe.",
    points: [
      "A single interface for access, control, and simulation.",
      "Each page is a distinct module inside the digital universe.",
      "The pilot and mission are stored locally in the browser.",
    ],
  },
};

export default function AboutPage() {
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

        <div className="grid gap-4 md:grid-cols-3">
          {t.points.map((point) => (
            <div key={point} className="rounded-[22px] border border-cyan-400/20 bg-white/5 p-4 text-sm leading-7 text-slate-100">
              {point}
            </div>
          ))}
        </div>
      </div>
    </UniverseShell>
  );
}