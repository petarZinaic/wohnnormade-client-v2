"use client";

import { useTranslation } from "react-i18next";
import { SearchTennant } from "@/components/common";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function Search() {
  const { t } = useTranslation();

  return (
    <ProtectedRoute message={t("search.authMessage")}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-1">
          {t("search.title")}{" "}
          <span className="text-orange">{t("search.titleSpan")}</span>
        </h1>
        <SearchTennant />
      </div>
    </ProtectedRoute>
  );
}
