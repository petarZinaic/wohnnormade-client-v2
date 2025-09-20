"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, LocationAutocomplete } from "@/components/common";
import DatePicker from "react-datepicker";
import { useTenant } from "@/context/TenantContext";
import type { CreateTenantData, Tenant } from "@/types";
import { ViolationType } from "@/types";
import { formatDateDMY } from "@/utils/date";

interface Props {
  tenantId: number;
}

export default function TenantEditForm({ tenantId }: Props) {
  const router = useRouter();
  const { getTenantById, updateTenant, deleteTenant, isLoading } = useTenant();

  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [violationType, setViolationType] = useState<ViolationType | "">("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const t = await getTenantById(tenantId);
        setTenant(t);
        setName(t.name || "");
        setSurname(t.surname || "");
        setCity(t.city || "");
        setCountry(t.country || "");
        setViolationType((t.violationType as ViolationType) || "");
        setDescription(t.description || "");
        setDateOfBirth(t.dateOfBirth ? new Date(t.dateOfBirth) : null);
        setHasChanges(false);
        setShowSaveButton(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tenant");
      }
    };
    load();
  }, [tenantId]);

  // Track changes to detect if form has been modified
  useEffect(() => {
    if (!tenant) return;

    const originalDate = tenant.dateOfBirth
      ? new Date(tenant.dateOfBirth)
      : null;
    const hasDateChanged =
      dateOfBirth && originalDate
        ? dateOfBirth.getTime() !== originalDate.getTime()
        : dateOfBirth !== originalDate;

    const hasChanges =
      name !== (tenant.name || "") ||
      surname !== (tenant.surname || "") ||
      city !== (tenant.city || "") ||
      country !== (tenant.country || "") ||
      violationType !== (tenant.violationType || "") ||
      description !== (tenant.description || "") ||
      hasDateChanged;

    setHasChanges(hasChanges);

    if (hasChanges) {
      setShowSaveButton(true);
    } else {
      setShowSaveButton(false);
    }
  }, [
    name,
    surname,
    city,
    country,
    violationType,
    description,
    dateOfBirth,
    tenant,
  ]);

  const toUtcMidnightIso = (d: Date | null): string | undefined => {
    if (!d) return undefined;
    const utc = new Date(
      Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
    );
    return utc.toISOString();
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const payload: Partial<CreateTenantData> = {
        name,
        surname,
        city,
        country,
        violationType: violationType as ViolationType,
        description,
        dateOfBirth: toUtcMidnightIso(dateOfBirth),
      };
      await updateTenant(tenantId, payload);
      setMessage("Tenant updated successfully");
      // Redirect to profile after successful update
      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update tenant");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this tenant?")) return;
    setError("");
    try {
      await deleteTenant(tenantId);
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete tenant");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-32 pb-8">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md">
        <div className="bg-orange text-white rounded-t-lg">
          <h1 className="text-xl text-center font-bold mb-6 py-2">
            Edit Tenant
          </h1>
        </div>
        <form className="p-6" onSubmit={handleUpdate}>
          {message && (
            <div className="mb-3 p-2 bg-green-100 border border-green-300 text-green-800 rounded">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-3 p-2 bg-red-100 border border-red-300 text-red-800 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tenant Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tenant Surname
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Violation Type
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description of Violation
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 mt-6">
            <Button
              type="button"
              variant="secondary"
              className="hover:bg-orange hover:text-white transition-colors"
              onClick={() => router.push("/profile")}
              text="Back to Profile"
            />
            <div className="flex gap-2">
              {showSaveButton && (
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                  text={isLoading ? "Saving..." : "Save"}
                />
              )}
              <Button
                buttonType="danger"
                type="button"
                onClick={handleDelete}
                text="Delete"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
