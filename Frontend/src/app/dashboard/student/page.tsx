"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function StudentDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/dashboard/student/home")
  }, [router])

  return null
}