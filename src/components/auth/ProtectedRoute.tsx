"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  message?: string;
}

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
  message,
}: ProtectedRouteProps) {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  const defaultMessage = message || t("contribute.authMessage");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        router.push(redirectTo);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">{t("contribute.loading")}</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <div className="text-orange-500 text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t("contribute.authRequired")}
          </h2>
          <p className="text-gray-600 mb-4">{defaultMessage}</p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
