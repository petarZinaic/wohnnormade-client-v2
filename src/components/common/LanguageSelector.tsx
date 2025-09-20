"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "react-i18next";

const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = availableLanguages.find(
    (lang) => lang.code === currentLanguage
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    if (typeof window !== "undefined") {
      changeLanguage(languageCode);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 hover:opacity-80 transition-opacity duration-200"
        aria-label={t("language.select")}
      >
        <Image
          src={
            currentLanguage === "en"
              ? "/assets/icons/english-flag.png"
              : "/assets/icons/german-flag.png"
          }
          alt={currentLang?.nativeName || "Language"}
          width={24}
          height={18}
          className="rounded-sm"
        />
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-16 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          <div className="py-1">
            {availableLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex justify-center py-2 hover:bg-gray-100 transition-colors duration-200 ${
                  currentLanguage === language.code ? "bg-blue-50" : ""
                }`}
              >
                <Image
                  src={
                    language.code === "en"
                      ? "/assets/icons/english-flag.png"
                      : "/assets/icons/german-flag.png"
                  }
                  alt={language.nativeName}
                  width={24}
                  height={18}
                  className="rounded-sm"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
