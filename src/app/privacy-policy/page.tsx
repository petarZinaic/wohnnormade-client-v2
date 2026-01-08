"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

export default function PrivacyPolicyPage() {
  const { i18n } = useTranslation();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const fileName = i18n.language === "de" ? "datenschutzerklaerung-de.md" : "privacy-policy-en.md";
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
      <div className="min-h-screen bg-gray-100 py-12 px-4 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <article className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
