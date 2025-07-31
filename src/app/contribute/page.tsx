import { ReportTennantForm } from "@/components/forms";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function Contribute() {
  return (
    <ProtectedRoute message="You need to be logged in to contribute tenant reports. Redirecting to login...">
      <ReportTennantForm />
    </ProtectedRoute>
  );
}
