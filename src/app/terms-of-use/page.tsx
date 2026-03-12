import type { Metadata } from "next";
import TermsOfUseContent from "./TermsOfUseContent";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen",
  description: "Nutzungsbedingungen von Wohnnomade.",
  alternates: { canonical: "https://wohnnomade.com/terms-of-use" },
  robots: { index: false, follow: false },
};

export default function TermsOfUsePage() {
  return <TermsOfUseContent />;
}
