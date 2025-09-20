"use client";

import { useEffect } from "react";
import "@/i18n";

interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  useEffect(() => {
    // Ensure i18n is initialized on client side
    if (typeof window !== "undefined") {
      import("@/i18n");
    }
  }, []);

  return <>{children}</>;
};
