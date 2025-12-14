import React, { createContext, useContext, useEffect, useState } from "react";
import en from "./locales/en.json";
import am from "./locales/am.json";

const locales = { en, am };

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("cyber_lang") || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cyber_lang", lang);
    } catch (e) {}
  }, [lang]);

  function t(key) {
    const parts = key.split(".");
    const value = parts.reduce(
      (acc, p) => (acc && acc[p] != null ? acc[p] : null),
      locales[lang]
    );
    if (value != null) return value;
    const fallback = parts.reduce(
      (acc, p) => (acc && acc[p] != null ? acc[p] : null),
      locales["en"]
    );
    return fallback || key;
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}

export default I18nProvider;
