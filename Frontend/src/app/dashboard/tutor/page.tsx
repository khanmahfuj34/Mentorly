"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TutorDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/dashboard/tutor/overview")
  }, [router])

  return null
}
