"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { translations, Lang } from "./translations";

const STORAGE_KEY = "app_lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** Достаёт значение перевода по ключу через точку, напр. t("header.nav.home") */
  t: (key: string) => any;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

function getByPath(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => (acc == null ? acc : acc[part]), obj);
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Lang>("ru");

  // Читаем сохранённый язык из localStorage после монтирования (чтобы избежать hydration mismatch)
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "ru" || saved === "uz") {
        setLangState(saved);
      }
    } catch {
      // localStorage недоступен (SSR/приватный режим) — остаёмся на языке по умолчанию
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // игнорируем ошибки записи в localStorage
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "ru" ? "uz" : "ru");
  }, [lang, setLang]);

  useEffect(() => {
    document.documentElement.lang = lang === "uz" ? "uz" : "ru";
  }, [lang]);

  const t = useCallback(
    (key: string) => {
      const value = getByPath(translations[lang], key);
      if (value === undefined) {
        // Фолбэк на русский, если ключ не найден в текущем языке
        return getByPath(translations.ru, key) ?? key;
      }
      return value;
    },
    [lang]
  );

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t }),
    [lang, setLang, toggleLang, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage должен использоваться внутри LanguageProvider");
  }
  return ctx;
}
