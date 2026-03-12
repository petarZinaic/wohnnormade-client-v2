import type { MetadataRoute } from "next";

const BASE_URL = "https://wohnnomade.com";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface UserEntry {
  id: number;
  updatedAt?: string;
}

async function getLandlords(): Promise<UserEntry[]> {
  try {
    const res = await fetch(`${API_URL}/users`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const list: UserEntry[] = data.result ?? data.users ?? data;
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const landlords = await getLandlords();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-use`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const landlordRoutes: MetadataRoute.Sitemap = landlords.map((u) => ({
    url: `${BASE_URL}/landlord/${u.id}`,
    lastModified: u.updatedAt ? new Date(u.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...landlordRoutes];
}
