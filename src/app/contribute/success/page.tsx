"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/common";

export default function TenantSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 pt-20">
      <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-2xl bg-white/90 shadow-xl ring-1 ring-gray-100 backdrop-blur text-center px-8 py-12">
        <div className="absolute inset-x-0 top-0 h-1" />

        <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-green-100 ring-8 ring-green-50 shadow-md flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-12 w-12 text-green-600"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-2.59a.75.75 0 1 0-1.22-.92l-3.943 5.23-2.007-2.006a.75.75 0 1 0-1.06 1.06l2.625 2.625c.314.314.82.278 1.092-.079l4.573-5.91Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Tenant report submitted successfully.
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for helping the community.
        </p>
        <div className="flex justify-center">
          <Button text="Go to Search" onClick={() => router.push("/search")} />
        </div>
      </div>
    </div>
  );
}
