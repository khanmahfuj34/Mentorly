"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/hooks/useAuth"
import LoadingScreen from "@/src/components/ui/LoadingScreen"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ("STUDENT" | "TUTOR" | "ADMIN")[]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (!isAuthenticated) {
      router.replace("/login")
      return
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      router.replace("/access-denied")
    }
  }, [isAuthenticated, user, loading, allowedRoles, router])

  if (loading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return null
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
