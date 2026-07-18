"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [emailFocused, setEmailFocused] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
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

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="forgot-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header */}
            <div className="mb-8">
              <h2 className="font-display text-headline-lg text-on-surface mb-2">Forgot Password?</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label
                  className={`block font-label-md text-sm transition-colors duration-200 ${
                    emailFocused ? "text-primary font-medium" : "text-on-surface-variant"
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

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-14 bg-primary text-on-primary font-label-md rounded-xl hover:opacity-90 transition-all duration-300 shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
                type="submit"
              >
                <span className="font-semibold text-sm">Send Reset Link</span>
                <span className="material-symbols-outlined text-[20px] select-none">mail</span>
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="forgot-success"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="text-center md:text-left"
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 text-emerald-500 mx-auto md:mx-0">
              <span className="material-symbols-outlined text-4xl select-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                mark_email_read
              </span>
            </div>

            <h2 className="font-display text-headline-lg text-on-surface mb-3">Check Your Email</h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed mb-8">
              We have sent a password reset link to <strong className="text-on-surface font-semibold">{email}</strong>. Please check your inbox and spam folder.
            </p>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsSubmitted(false)}
              className="w-full h-14 border border-outline-variant bg-white text-on-surface font-label-md rounded-xl hover:bg-surface-container-low transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              type="button"
            >
              <span className="font-semibold text-sm">Resend Reset Link</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer link to Login */}
      <div className="mt-12 text-center md:text-left border-t border-outline-variant/30 pt-6">
        <Link href="/login" className="inline-flex items-center gap-2 text-primary font-bold hover:underline transition-all">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span className="text-sm font-semibold">Back to Login</span>
        </Link>
      </div>
    </div>
  )
}
