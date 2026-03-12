import type { Metadata } from "next";
import LoginForm from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Anmelden",
  description: "Melden Sie sich bei Ihrem Wohnnomade-Konto an.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginForm />;
}
