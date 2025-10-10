import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslations from "./locales/en.json";
import deTranslations from "./locales/de.json";

const resources = {
  en: {
    translation: enTranslations,
  },
  de: {
    translation: deTranslations,
  },
};

// Only initialize on client side
if (typeof window !== "undefined") {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: "de", // Set explicit default language
      fallbackLng: "de",
      debug: process.env.NODE_ENV === "development",

      detection: {
        order: ["localStorage"], // Only use localStorage, ignore browser language
        caches: ["localStorage"],
      },

      interpolation: {
        escapeValue: false, // React already does escaping
      },
    });
} else {
  // Server-side initialization without browser-specific features
  i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "de",
    lng: "de",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
