import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Navbar } from '@/components/custom';

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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
