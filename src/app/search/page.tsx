import { SearchTennant } from "@/components/common";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function Search() {
  return (
    <ProtectedRoute message="You need to be logged in to search tenant reports. Redirecting to login...">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-1">
          Search reported <span className="text-orange">Tenants</span>
        </h1>
        <SearchTennant />
      </div>
    </ProtectedRoute>
  );
}
