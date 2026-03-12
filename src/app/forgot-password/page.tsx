import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Passwort vergessen",
  description: "Setzen Sie Ihr Wohnnomade-Passwort zurück.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
