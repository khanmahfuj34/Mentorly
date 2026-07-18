import ProtectedRoute from "@/src/components/auth/ProtectedRoute"

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <h1>Admin Dashboard</h1>
    </ProtectedRoute>
  )
}
