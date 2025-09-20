import { ReportTennantForm } from "@/components/forms";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function Contribute() {
  return (
    <ProtectedRoute>
      <ReportTennantForm />
    </ProtectedRoute>
  );
}
