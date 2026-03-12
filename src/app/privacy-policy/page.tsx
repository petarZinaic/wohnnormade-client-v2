import type { Metadata } from "next";
import PrivacyPolicyContent from "./PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Wohnnomade.",
  alternates: { canonical: "https://wohnnomade.com/privacy-policy" },
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
