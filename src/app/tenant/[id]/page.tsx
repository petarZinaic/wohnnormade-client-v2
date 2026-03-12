import type { Metadata } from "next";
import TenantEditClient from "./TenantEditClient";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = Number(params.id);
  if (!id || isNaN(id)) {
    return { title: "Mieter bearbeiten", robots: { index: false, follow: false } };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tenant/${id}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error("not found");
    const data = await res.json();
    const tenant = data.result ?? data;
    return {
      title: `${tenant.name} ${tenant.surname} bearbeiten`,
      robots: { index: false, follow: false },
    };
  } catch {
    return { title: "Mieter bearbeiten", robots: { index: false, follow: false } };
  }
}

export default function TenantEditPage() {
  return <TenantEditClient />;
}
