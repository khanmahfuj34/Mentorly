"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import RoleSelector from "./RoleSelector"

export default function RegisterForm() {
  const [role, setRole] = useState<"student" | "tutor">("student")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [terms, setTerms] = useState(false)

  const [nameFocused, setNameFocused] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Frontend UI only - no authentication logic as per objective
    console.log("Registration submitted:", { role, name, email, password, confirmPassword, terms })
  }

  return (
    <div className="w-full max-w-md px-4 md:px-0">
      {/* Mobile Branding (Desktop hidden, handled by AuthImagePanel) */}
      <div className="md:hidden flex flex-col items-center gap-2 mb-8 text-center">
        <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          school
        </span>
        <h2 className="font-display text-headline-lg text-on-surface">Mentorly</h2>
      </div>

      {/* Registration Card Header */}
      <div className="text-center md:text-left space-y-2 mb-8">
        <h2 className="font-display text-headline-lg text-on-surface">Create Your Account</h2>
        <p className="font-body-md text-on-surface-variant">Join the Mentorly community.</p>
      </div>

      {/* Role Selection */}
      <div className="mb-6">
        <label className="block font-label-md text-sm text-on-surface-variant mb-2">Select Your Role</label>
        <RoleSelector selectedRole={role} onChange={setRole} />
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label
            className={`block font-label-sm text-xs transition-colors duration-200 px-1 ${
              nameFocused ? "text-primary font-semibold" : "text-on-surface-variant"
            }`}
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
            className="w-full px-4 py-3.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none placeholder:text-outline text-on-surface text-sm"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            className={`block font-label-sm text-xs transition-colors duration-200 px-1 ${
              emailFocused ? "text-primary font-semibold" : "text-on-surface-variant"
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
            className="w-full px-4 py-3.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none placeholder:text-outline text-on-surface text-sm"
          />
        </div>

        {/* Password & Confirm Password Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              className={`block font-label-sm text-xs transition-colors duration-200 px-1 ${
                passwordFocused ? "text-primary font-semibold" : "text-on-surface-variant"
              }`}
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              className="w-full px-4 py-3.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none placeholder:text-outline text-on-surface text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label
              className={`block font-label-sm text-xs transition-colors duration-200 px-1 ${
                confirmPasswordFocused ? "text-primary font-semibold" : "text-on-surface-variant"
              }`}
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setConfirmPasswordFocused(true)}
              onBlur={() => setConfirmPasswordFocused(false)}
              className="w-full px-4 py-3.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none placeholder:text-outline text-on-surface text-sm"
            />
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 py-2">
          <input
            id="terms"
            type="checkbox"
            required
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer"
          />
          <label htmlFor="terms" className="text-label-md text-xs text-on-surface-variant leading-snug cursor-pointer select-none">
            I agree to the{" "}
            <Link href="#" className="text-primary hover:underline font-medium">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-primary hover:underline font-medium">
              Privacy Policy
            </Link>
            .
          </label>
        </div>

        {/* Submit and Auth buttons */}
        <div className="space-y-4 pt-2">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary text-white font-label-md font-semibold py-4 rounded-xl shadow-lg hover:opacity-95 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            type="submit"
          >
            Create Account
          </motion.button>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-outline-variant/30"></div>
            <span className="flex-shrink mx-4 text-label-sm text-xs text-outline uppercase tracking-wider">OR</span>
            <div className="flex-grow border-t border-outline-variant/30"></div>
          </div>

          {/* Google Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="w-full bg-white border border-outline-variant text-on-surface font-label-md rounded-xl py-4 hover:bg-surface-container-low transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
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
        </div>
      </form>

      {/* Footer */}
      <p className="text-center font-body-md text-sm text-on-surface-variant mt-8">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-bold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  )
}
