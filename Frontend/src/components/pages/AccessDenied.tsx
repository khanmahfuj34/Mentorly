"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6 md:p-12 lg:p-24 relative overflow-hidden select-none">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-xl text-center space-y-8 z-10">
        {/* Animated Premium SVG Padlock Illustration */}
        <div className="relative flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="w-48 h-48 bg-white border border-outline-variant/30 rounded-full shadow-2xl flex items-center justify-center relative hover:scale-105 transition-transform duration-300"
          >
            {/* Padlock SVG */}
            <svg
              className="w-24 h-24 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Lock Shackle */}
              <motion.path
                initial={{ pathLength: 0, y: -2 }}
                animate={{ pathLength: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0V10.5m9 0h-9"
              />
              {/* Lock Body */}
              <rect
                x="4.5"
                y="10.5"
                width="15"
                height="10.5"
                rx="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Keyhole */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14.25v2.25"
              />
              <circle cx="12" cy="14.25" r="0.75" fill="currentColor" />
            </svg>

            {/* Glowing Restricted Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="absolute -bottom-2 -right-2 bg-red-500 text-white font-label-sm text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full shadow-lg border border-white"
            >
              Restricted
            </motion.div>
          </motion.div>
        </div>

        {/* 403 Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full font-bold text-red-500 tracking-wider text-xs uppercase"
        >
          Error Code: 403
        </motion.div>

        {/* Access Denied Content */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-display text-display text-on-surface leading-tight"
          >
            Access Denied
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-body-md text-on-surface-variant max-w-md mx-auto leading-relaxed"
          >
            You don't have permission to access this page. This page might be restricted to specific account roles, premium tiers, or internal mentors only.
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
          <Link
            href="#"
            className="px-8 py-4 rounded-full border border-outline bg-white text-on-surface text-label-md font-semibold hover:bg-surface-container transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
            <span>Contact Support</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
