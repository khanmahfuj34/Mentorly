"use client"

import React, { createContext, useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { IUser } from "@/src/types/auth.types"
import { getUser, getAccessToken, clearAuthData } from "@/src/lib/auth-storage"

export interface AuthContextType {
  user: IUser | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  const refreshAuth = () => {
    try {
      const storedUser = getUser()
      const storedToken = getAccessToken()
      setUser(storedUser)
      setToken(storedToken)
    } catch (error) {
      console.error("Error reading auth data from storage:", error)
    }
  }

  // Load auth data on mount and whenever the path changes
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = getUser()
        const storedToken = getAccessToken()
        setUser(storedUser)
        setToken(storedToken)
      } catch (error) {
        console.error("Error reading auth data from storage:", error)
      } finally {
        setLoading(false)
      }
    }
    initAuth()
  }, [pathname])

  const logout = () => {
    clearAuthData()
    setUser(null)
    setToken(null)
    router.push("/login")
  }

  const isAuthenticated = !!token && !!user

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
