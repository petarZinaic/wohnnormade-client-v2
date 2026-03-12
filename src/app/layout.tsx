import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { Footer, Navbar } from "@/components/common";
import { AuthProvider } from "@/context/AuthContext";
import { TenantProvider } from "@/context/TenantContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { I18nProvider } from "@/components/providers/I18nProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://wohnnomade.com"),
  title: {
    default: "Wohnnomade",
    template: "%s | Wohnnomade",
  },
  description:
    "Wohnnomade – Die Plattform für Vermieter, um Mieter zu bewerten und Erfahrungen zu teilen.",
  icons: { icon: "/assets/icons/favicon.png" },
  openGraph: {
    type: "website",
    siteName: "Wohnnomade",
    locale: "de_DE",
    url: "https://wohnnomade.com",
    title: "Wohnnomade",
    description:
      "Wohnnomade – Die Plattform für Vermieter, um Mieter zu bewerten und Erfahrungen zu teilen.",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "Wohnnomade" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wohnnomade",
    description:
      "Wohnnomade – Die Plattform für Vermieter, um Mieter zu bewerten und Erfahrungen zu teilen.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <I18nProvider>
          <LanguageProvider>
            <AuthProvider>
              <TenantProvider>
                <Navbar />
                {children}
                <Footer />
              </TenantProvider>
            </AuthProvider>
          </LanguageProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
