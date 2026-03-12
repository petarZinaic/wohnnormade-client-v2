import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Wohnnomade – Mieter bewerten, Erfahrungen teilen",
  description:
    "Wohnnomade ist die Plattform für Vermieter: Mieter suchen, Berichte einsehen und Erfahrungen mit der Community teilen.",
  alternates: { canonical: "https://wohnnomade.com" },
  openGraph: {
    title: "Wohnnomade – Mieter bewerten, Erfahrungen teilen",
    description:
      "Wohnnomade ist die Plattform für Vermieter: Mieter suchen, Berichte einsehen und Erfahrungen mit der Community teilen.",
    url: "https://wohnnomade.com",
  },
};

export default function Home() {
  return <HomeContent />;
}
