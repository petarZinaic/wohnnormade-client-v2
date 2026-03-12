import type { Metadata } from "next";
import LandlordDetailsClient from "./LandlordDetailsClient";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = Number(params.id);
  if (!id || isNaN(id)) {
    return { title: "Vermieter" };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) throw new Error("not found");
    const data = await res.json();
    const user = data.result ?? data.user ?? data;
    const tenantCount: number = user.tenants?.length ?? 0;
    const location: string = user.city ? ` aus ${user.city}` : "";

    return {
      title: `${user.name} ${user.surname}`,
      description: `Vermieter-Profil von ${user.name} ${user.surname}${location}. ${tenantCount} gemeldete Mieter auf Wohnnomade.`,
      alternates: {
        canonical: `https://wohnnomade.com/landlord/${id}`,
      },
      openGraph: {
        title: `${user.name} ${user.surname} | Wohnnomade`,
        description: `Vermieter-Profil von ${user.name} ${user.surname}${location}.`,
        url: `https://wohnnomade.com/landlord/${id}`,
        type: "profile",
      },
    };
  } catch {
    return { title: "Vermieter" };
  }
}

export default function LandlordDetailsPage() {
  return <LandlordDetailsClient />;
}
