"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tenantData, setTenantData] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("tenantReport");
    if (storedData) {
      try {
        const tenant = JSON.parse(storedData);
        if (typeof tenant === 'object' && tenant !== null) {
          setTenantData(tenant);
        } else {
          console.error("Stored tenant data is not an object:", tenant);
        }
      } catch (error) {
        console.error("Failed to parse tenant data:", error);
      }
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (tenantData) {
      const matches = `${tenantData.tenantName} ${tenantData.tenantSurname}`
        .toLowerCase()
        .includes(value.toLowerCase());
      setSuggestions(matches ? [tenantData] : []);
    }
  };

  const handleSelectTenant = (tenant: any) => {
    router.push(`/tenant-preview?tenant=${encodeURIComponent(JSON.stringify(tenant))}`);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Search reported tenants</h1>
        <div className="w-full max-w-md p-4">
          <input
            type="text"
            placeholder="Search tenant..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={handleSearch}
          />
          <ul className="bg-white border mt-2 w-full rounded-lg shadow-lg">
            {suggestions.length > 0 ? (
              suggestions.map((tenant, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectTenant(tenant)}
                >
                  {tenant.tenantName} {tenant.tenantSurname}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No tenants found</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
