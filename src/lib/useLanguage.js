"use client";

import { useEffect, useState } from "react";
import { getStoredLanguage, LANGUAGE_EVENT } from "@/lib/i18n";

export function useLanguage() {
  const [language, setLanguage] = useState(getStoredLanguage());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const syncLanguage = () => {
      setLanguage(getStoredLanguage());
    };

    window.addEventListener(LANGUAGE_EVENT, syncLanguage);
    window.addEventListener("storage", syncLanguage);

    return () => {
      window.removeEventListener(LANGUAGE_EVENT, syncLanguage);
      window.removeEventListener("storage", syncLanguage);
    };
  }, []);

  return language;
}
