"use client";

import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-blueDark mb-6 pb-4 border-b-2 border-orange">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg font-bold text-white bg-blueLight px-4 py-2 rounded-md mb-4 mt-8">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-semibold text-blueLight mb-2 mt-5 flex items-center gap-2">
      <span className="w-1 h-4 bg-orange rounded-full inline-block flex-shrink-0" />
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-gray text-sm leading-7 mb-3">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-blueDark">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 space-y-2 ml-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 space-y-2 ml-1 list-none">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-gray text-sm leading-7 flex items-start gap-2">
      <span className="text-orange font-bold mt-0.5 flex-shrink-0 text-base leading-6">
        ›
      </span>
      <span>{children}</span>
    </li>
  ),
  hr: () => <hr className="border-none h-px bg-orange opacity-20 my-8" />,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-orange hover:text-orangeDark underline transition-colors"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-orange pl-4 my-4 bg-orangeLight rounded-r-md py-3 italic text-gray text-sm">
      {children}
    </blockquote>
  ),
};

interface DocumentPageLayoutProps {
  content: string;
}

export default function DocumentPageLayout({
  content,
}: DocumentPageLayoutProps) {
  return (
    <div className="min-h-screen bg-blueDark">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Accent bar */}
          <div className="h-1.5 bg-orange w-full" />

          <article className="px-8 py-10 md:px-14 md:py-12">
            <ReactMarkdown components={markdownComponents}>
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}
