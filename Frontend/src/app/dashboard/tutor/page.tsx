import ProtectedRoute from "@/src/components/auth/ProtectedRoute"

export default function TutorDashboard() {
  return (
    <ProtectedRoute allowedRoles={["TUTOR"]}>
      <h1>Tutor Dashboard</h1>
    </ProtectedRoute>
  )
}
