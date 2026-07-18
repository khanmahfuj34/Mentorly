"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { useRouter } from "next/navigation"
import { loginUser } from "@/src/services/auth/auth.service"
import { setAuthData } from "@/src/lib/auth-storage"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await loginUser({
        email,
        password,
      })

      setAuthData(
        result.data.accessToken,
        result.data.refreshToken,
        result.data.user
      )

      const role = result.data.user.role

      if (role === "STUDENT") {
        router.push("/dashboard/student")
      }

      if (role === "TUTOR") {
        router.push("/dashboard/tutor")
      }

      if (role === "ADMIN") {
        router.push("/dashboard/admin")
      }
    } catch (error) {
      console.error(error)
      alert("Login failed")
    }
  }

  return (
    <div className="w-full max-w-[440px] px-4 md:px-0">
      {/* Brand Logo */}
      <div className="mb-8 flex justify-start">
        <Link href="/" className="text-headline-md font-display font-bold text-primary tracking-tight">
          Mentorly
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h2 className="font-display text-headline-lg text-on-surface mb-2">Welcome Back</h2>
        <p className="font-body-md text-on-surface-variant">Login to continue your learning journey.</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div className="space-y-1.5">
          <label
            className={`block font-label-md text-sm transition-colors duration-200 ${emailFocused ? "text-primary" : "text-on-surface-variant"
              }`}
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@company.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            className="w-full h-12 px-4 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md placeholder:text-outline text-on-surface"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label
              className={`block font-label-md text-sm transition-colors duration-200 ${passwordFocused ? "text-primary" : "text-on-surface-variant"
                }`}
              htmlFor="password"
            >
              Password
            </label>
            <Link href="/forgot-password" className="font-label-sm text-xs text-primary hover:underline transition-all">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              className="w-full h-12 pl-4 pr-12 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md placeholder:text-outline text-on-surface"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface cursor-pointer select-none flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-primary bg-surface-container-low border-outline-variant rounded focus:ring-primary cursor-pointer"
          />
          <label htmlFor="remember" className="ml-2 font-label-md text-sm text-on-surface-variant cursor-pointer select-none">
            Remember me
          </label>
        </div>

        {/* Primary Login Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-14 bg-primary text-on-primary font-label-md rounded-xl hover:opacity-90 transition-all duration-300 shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
          type="submit"
        >
          <span className="font-semibold text-sm">Login</span>
          <span className="material-symbols-outlined text-[20px] select-none">arrow_forward</span>
        </motion.button>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant/30"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-surface-container-lowest font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">
              or continue with
            </span>
          </div>
        </div>

        {/* Google Login */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className="w-full h-14 bg-white border border-outline-variant text-on-surface font-label-md rounded-xl hover:bg-surface-container-low transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
        >
          <svg className="w-5 h-5 select-none" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            ></path>
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            ></path>
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            ></path>
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            ></path>
          </svg>
          <span className="font-semibold text-sm">Continue with Google</span>
        </motion.button>
      </form>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="font-body-md text-sm text-on-surface-variant">
          {"Don't have an account? "}
          <Link href="/register" className="text-primary font-bold hover:underline transition-all">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  )
}
