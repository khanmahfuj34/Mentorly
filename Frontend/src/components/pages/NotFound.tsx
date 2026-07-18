"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function NotFound() {
  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history.back()
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6 md:p-12 lg:p-24 relative overflow-hidden select-none">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-xl text-center space-y-8 z-10">
        {/* Animated Premium SVG Magnifying Glass Illustration */}
        <div className="relative flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="w-48 h-48 bg-white border border-outline-variant/30 rounded-full shadow-2xl flex items-center justify-center relative hover:scale-105 transition-transform duration-300"
          >
            {/* Search illustration SVG */}
            <svg
              className="w-24 h-24 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Magnifying Glass Handle */}
              <motion.path
                initial={{ pathLength: 0, x: -3, y: -3 }}
                animate={{ pathLength: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197"
              />
              {/* Magnifying Glass Loop */}
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                cx="11.5"
                cy="11.5"
                r="6.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Internal Lost Sparkles */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75h.008v.008H9.75V9.75zm3.5 3.5h.008v.008h-.008v-.008z"
                strokeWidth="2"
              />
            </svg>

            {/* Glowing Restricted Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="absolute -bottom-2 -right-2 bg-primary text-white font-label-sm text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full shadow-lg border border-white"
            >
              Lost
            </motion.div>
          </motion.div>
        </div>

        {/* 404 Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full font-bold text-primary tracking-wider text-xs uppercase"
        >
          Error Code: 404
        </motion.div>

        {/* Not Found Content */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-display text-display text-on-surface leading-tight"
          >
            Page Not Found
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-body-md text-on-surface-variant max-w-md mx-auto leading-relaxed"
          >
            Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or the URL might have a typo.
          </motion.p>
        </div>

        {/* Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
        >
          <Link
            href="/"
            className="px-8 py-4 rounded-full bg-primary text-on-primary text-label-md font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span>Go Home</span>
          </Link>
          <button
            onClick={handleGoBack}
            className="px-8 py-4 rounded-full border border-outline bg-white text-on-surface text-label-md font-semibold hover:bg-surface-container transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span>Go Back</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
