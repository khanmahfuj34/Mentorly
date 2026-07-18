import ProtectedRoute from "@/src/components/auth/ProtectedRoute"

export default function StudentDashboard() {
  return (
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <h1>Student Dashboard</h1>
    </ProtectedRoute>
  )
}