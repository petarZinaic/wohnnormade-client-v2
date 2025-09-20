"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, LocationAutocomplete } from "@/components/common";
import DatePicker from "react-datepicker";
import { useTenant } from "@/context/TenantContext";
import type { CreateTenantData } from "@/types";
import { ViolationType } from "@/types";

export default function ReportTennantForm() {
  const { createTenant, isLoading } = useTenant();
  const router = useRouter();
  const [tenantName, setTenantName] = useState("");
  const [tenantSurname, setTenantSurname] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [violationType, setViolationType] = useState<ViolationType | "">("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const toUtcMidnightIso = (d: Date | null): string | undefined => {
      if (!d) return undefined;
      const utc = new Date(
        Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
      );
      return utc.toISOString();
    };

    const data: CreateTenantData = {
      name: tenantName,
      surname: tenantSurname,
      city,
      country,
      violationType: violationType as ViolationType,
      description,
      dateOfBirth: toUtcMidnightIso(dateOfBirth),
    };

    try {
      await createTenant(data);
      router.push("/contribute/success");
      setTenantName("");
      setTenantSurname("");
      setCity("");
      setCountry("");
      setViolationType("");
      setDateOfBirth(null);
      setDescription("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit report");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-10">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md max-h-screen overflow-y-auto">
        <div className="bg-orange text-white rounded-t-lg">
          <h1 className="text-xl text-center font-bold mb-6 py-2">
            Report Tenant
          </h1>
        </div>
        <form className="p-4" onSubmit={handleSubmit}>
          {error && (
            <div className="mb-3 p-2 bg-red-100 border border-red-300 text-red-800 rounded">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tenantName"
              >
                Tenant Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Tenant Name"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tenantSurname"
              >
                Tenant Surname
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="surname"
                type="text"
                placeholder="Tenant Surname"
                value={tenantSurname}
                onChange={(e) => setTenantSurname(e.target.value)}
              />
            </div>
            <LocationAutocomplete
              value={city}
              onChange={setCity}
              placeholder="Enter city"
              label="City"
            />
            <LocationAutocomplete
              value={country}
              onChange={setCountry}
              placeholder="Enter country"
              label="Country"
            />
            <div className="mb-4 col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date of Birth
              </label>
              <DatePicker
                selected={dateOfBirth}
                onChange={(d) => setDateOfBirth(d)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select date of birth"
                className="shadow appearance-none border rounded w-full h-10 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                isClearable
              />
            </div>
            <div className="mb-4 col-span-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="violationType"
              >
                Violation Type
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="violationType"
                value={violationType}
                onChange={(e) =>
                  setViolationType(e.target.value as ViolationType)
                }
              >
                <option value="" disabled>
                  Select Violation Type
                </option>
                <option value={ViolationType.RentNotPaid}>Rent Not Paid</option>
                <option value={ViolationType.PropetryWrecked}>
                  Propetry Wrecked
                </option>
              </select>
            </div>
            <div className="mb-4 col-span-1 md:col-span-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description of Violation
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
              text={isLoading ? "Submitting..." : "Submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
