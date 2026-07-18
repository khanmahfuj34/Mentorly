"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import PasswordStrength from "./PasswordStrength"

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [passwordFocused, setPasswordFocused] = useState(false)
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false)

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    // Simulated check: passwords must match
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.")
      return
    }

    // Simulated check: password strength check (need at least 3 rules met)
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const score = [password.length >= 8, hasUpperCase, hasLowerCase, hasNumber].filter(Boolean).length

    if (score < 3) {
      setErrorMsg("Please choose a stronger password.")
      return
    }

    // Success simulation
    setIsSubmitted(true)
  }

  return (
    <div className="w-full max-w-[440px] px-4 md:px-0">
      {/* Brand Logo */}
      <div className="mb-8 flex justify-start">
        <Link href="/" className="text-headline-md font-display font-bold text-primary tracking-tight">
          Mentorly
        </Link>
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="reset-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header */}
            <div className="mb-8">
              <h2 className="font-display text-headline-lg text-on-surface mb-2">Reset Password</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Choose a secure password with a mix of letters, numbers, and symbols.
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px] select-none">error</span>
                <span className="font-medium">{errorMsg}</span>
              </motion.div>
            )}

            {/* Reset Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div className="space-y-1.5">
                <label
                  className={`block font-label-md text-sm transition-colors duration-200 ${
                    passwordFocused ? "text-primary" : "text-on-surface-variant"
                  }`}
                  htmlFor="password"
                >
                  New Password
                </label>
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
                    className="w-full h-12 pl-4 pr-12 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md placeholder:text-outline text-on-surface text-sm"
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

                {/* Password Strength Indicator */}
                <PasswordStrength password={password} />
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label
                  className={`block font-label-md text-sm transition-colors duration-200 ${
                    confirmPasswordFocused ? "text-primary" : "text-on-surface-variant"
                  }`}
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setConfirmPasswordFocused(true)}
                    onBlur={() => setConfirmPasswordFocused(false)}
                    className="w-full h-12 pl-4 pr-12 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md placeholder:text-outline text-on-surface text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface cursor-pointer select-none flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showConfirmPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-14 bg-primary text-on-primary font-label-md rounded-xl hover:opacity-90 transition-all duration-300 shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer pt-2"
                type="submit"
              >
                <span className="font-semibold text-sm">Reset Password</span>
                <span className="material-symbols-outlined text-[20px] select-none">lock_reset</span>
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="reset-success"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="text-center md:text-left"
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 text-emerald-500 mx-auto md:mx-0">
              <span className="material-symbols-outlined text-4xl select-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>

            <h2 className="font-display text-headline-lg text-on-surface mb-3">Password Reset Complete</h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed mb-8">
              Your password has been successfully updated. You can now log in using your new credentials.
            </p>

            <Link
              href="/login"
              className="w-full h-14 bg-primary text-on-primary font-label-md rounded-xl hover:opacity-90 transition-all duration-300 shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer text-center font-semibold text-sm"
            >
              <span>Back to Login</span>
              <span className="material-symbols-outlined text-[20px] select-none">arrow_forward</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Login Anchor */}
      {!isSubmitted && (
        <div className="mt-12 text-center md:text-left border-t border-outline-variant/30 pt-6">
          <Link href="/login" className="inline-flex items-center gap-2 text-primary font-bold hover:underline transition-all">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span className="text-sm font-semibold">Back to Login</span>
          </Link>
        </div>
      )}
    </div>
  )
}
