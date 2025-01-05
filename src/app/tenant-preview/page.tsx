"use client"

import { useEffect, useState } from "react";

export default function TenantPreview() {
  const [tenant, setTenant] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tenantDataString = params.get('tenant');

    if (tenantDataString) {
      try {
        const tenantData = JSON.parse(decodeURIComponent(tenantDataString));
        setTenant(tenantData);
      } catch (error) {
        console.error("Failed to parse tenant data:", error);
      }
    }
  }, []);

  if (!tenant) return <p>Loading...</p>;

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Tenant Details</h1>
          <p>
            <strong>Name:</strong> {tenant.tenantName} {tenant.tenantSurname}
          </p>
          <p>
            <strong>City:</strong> {tenant.city}
          </p>
          <p>
            <strong>Country:</strong> {tenant.country}
          </p>
          <p>
            <strong>Violation Type:</strong> {tenant.violationType}
          </p>
          <p>
            <strong>Description:</strong> {tenant.description}
          </p>
        </div>
      </div>
    </>
  );
}
