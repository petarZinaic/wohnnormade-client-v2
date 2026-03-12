"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DocumentPageLayout from "@/components/common/DocumentPageLayout";

export default function TermsOfUsePage() {
  const { i18n } = useTranslation();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const fileName = i18n.language === "de" ? "agb-de.md" : "terms-of-use-en.md";
        const response = await fetch(`/documents/${fileName}`);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error("Error loading document:", error);
        setContent("Error loading document");
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [i18n.language]);

  if (loading) {
    return (
      <div className="min-h-screen bg-blueDark flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-orange border-t-transparent rounded-full animate-spin" />
          <span className="text-white text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  return <DocumentPageLayout content={content} />;
}
