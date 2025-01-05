"use client"

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

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

    if(value.trim() === "") {
      setSuggestions([]);
      return;
    }

    if (tenantData) {
      const matches = `${tenantData.tenantName} ${tenantData.tenantSurname}`
        .toLowerCase()
        .includes(value.toLowerCase());
      setSuggestions(matches ? [tenantData] : []);

      return;
    }
  };

  const handleSelectTenant = (tenant: any) => {
    router.push(`/tenant-preview?tenant=${encodeURIComponent(JSON.stringify(tenant))}`);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-1">Search reported <span className="text-orange">Tenants</span></h1>
        <div className="w-full max-w-md p-4">
          <input
            type="text"
            placeholder="Search tenant..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={handleSearch}
          />
          {suggestions.length > 0 && (
            <ul className="bg-white border mt-2 w-full rounded-lg shadow-lg">{
              suggestions.map((tenant, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectTenant(tenant)}
                >
                  {tenant.tenantName} {tenant.tenantSurname}
                </li>
              ))
            }
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
