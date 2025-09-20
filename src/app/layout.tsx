import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { Footer, Navbar } from "@/components/common";
import { AuthProvider } from "@/context/AuthContext";
import { TenantProvider } from "@/context/TenantContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wohnnomade",
  description: "Wohnnomade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/assets/icons/favicon.png" />
      <body className={inter.className}>
        <AuthProvider>
          <TenantProvider>
            <Navbar />
            {children}
            <Footer />
          </TenantProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
