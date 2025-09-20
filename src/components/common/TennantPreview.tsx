"use client";

import { useEffect, useState } from "react";
import UserAvatarIcon from "@/components/icons/UserAvatarIcon";

export default function TennantPreview() {
  const [tenant, setTenant] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tenantDataString = params.get("tenant");

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

  const name = tenant.name || tenant.tenantName;
  const surname = tenant.surname || tenant.tenantSurname;
  const city = tenant.city;
  const country = tenant.country;
  const dateOfBirth = tenant.dateOfBirth
    ? new Date(tenant.dateOfBirth).toLocaleDateString()
    : undefined;
  const violationType = tenant.violationType;
  const description = tenant.description;
  const createdAt = tenant.createdAt
    ? new Date(tenant.createdAt).toLocaleString()
    : undefined;
  const reporter = tenant.createdBy || null;
  const reporterName = reporter
    ? `${(reporter.name || "").trim()} ${reporter.surname || ""}`.trim()
    : undefined;
  const reporterEmail = reporter?.email;
  const reporterInitials = reporterName
    ? `${reporter.name?.[0] || ""}${reporter.surname?.[0] || ""}`.toUpperCase()
    : "?";

  const getBadgeClasses = (type: string) => {
    const t = (type || "").toLowerCase();
    if (t.includes("rent"))
      return "bg-yellow-100 text-yellow-800 ring-yellow-200";
    return "bg-rose-100 text-rose-800 ring-rose-200";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-2xl bg-white/90 shadow-xl ring-1 ring-gray-100 backdrop-blur">
        <div className="px-8 py-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-orange text-white shadow-md">
              <UserAvatarIcon className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                Tenant Details
              </h1>
              {createdAt && (
                <p className="text-sm text-gray-500">Reported at {createdAt}</p>
              )}
            </div>
            {violationType && (
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ${getBadgeClasses(
                  violationType
                )}`}
              >
                {violationType}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Full name
              </div>
              <div className="mt-1 text-gray-900">
                {name} {surname}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Date of Birth
              </div>
              <div className="mt-1 text-gray-900">{dateOfBirth || "-"}</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                City
              </div>
              <div className="mt-1 text-gray-900">{city}</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Country
              </div>
              <div className="mt-1 text-gray-900">{country}</div>
            </div>
            <div className="md:col-span-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Description of Violation
              </div>
              <div className="mt-1 text-gray-900 leading-relaxed">
                {description}
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 font-semibold">
                {reporterInitials}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  {reporterName || "Unknown reporter"}
                  {reporter && (
                    <span className="inline-flex items-center rounded-full border border-gray-300 px-2 py-0.5 text-[11px] font-medium text-gray-700">
                      Landlord
                    </span>
                  )}
                </div>
                {reporterEmail && (
                  <div className="text-sm text-gray-500">{reporterEmail}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
