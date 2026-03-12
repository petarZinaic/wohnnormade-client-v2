import type { Metadata } from "next";
import RegisterForm from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Registrieren",
  description: "Erstellen Sie Ihr kostenloses Wohnnomade-Konto.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return <RegisterForm />;
}
