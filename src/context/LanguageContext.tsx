"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  availableLanguages: { code: string; name: string; nativeName: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>("de");
  const [isInitialized, setIsInitialized] = useState(false);

  const availableLanguages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "de", name: "German", nativeName: "Deutsch" },
  ];

  const changeLanguage = (language: string) => {
    if (typeof window !== "undefined") {
      i18n.changeLanguage(language);
      setCurrentLanguage(language);
      localStorage.setItem("i18nextLng", language);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
    };

    // Wait for i18n to be ready
    if (i18n.isInitialized) {
      setCurrentLanguage(i18n.language || "de");
      setIsInitialized(true);
    } else {
      i18n.on("initialized", () => {
        setCurrentLanguage(i18n.language || "de");
        setIsInitialized(true);
      });
    }

    i18n.on("languageChanged", handleLanguageChange);

    // Set initial language from localStorage or default to 'de'
    const savedLanguage = localStorage.getItem("i18nextLng") || "de";
    if (savedLanguage !== i18n.language && i18n.isInitialized) {
      i18n.changeLanguage(savedLanguage);
    }

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
      i18n.off("initialized", () => {});
    };
  }, [i18n]);

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
