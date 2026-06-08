import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import type { AppLanguage } from "../types";
import { translations } from "./translations";

interface LanguageContextValue {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const languageStorageKey = "study-abroad-toolkit-language";

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<AppLanguage>(() => {
    if (typeof window === "undefined") {
      return "zh";
    }

    const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
    if (requestedLanguage === "en" || requestedLanguage === "zh") {
      return requestedLanguage;
    }

    const savedLanguage = window.localStorage.getItem(languageStorageKey);
    return savedLanguage === "en" || savedLanguage === "zh" ? savedLanguage : "zh";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(languageStorageKey, language);
    }
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key, fallback) => translations[language][key] ?? fallback ?? key
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
