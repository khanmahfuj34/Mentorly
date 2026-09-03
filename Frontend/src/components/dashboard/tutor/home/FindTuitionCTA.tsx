"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function FindTuitionCTA() {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-indigo-700 p-6 sm:p-8 text-on-primary shadow-lg shadow-primary/20 space-y-4"
    >
      {/* Decorative Background Accents */}
      <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/10 blur-xl pointer-events-none" />
      <div className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-white/10 blur-lg pointer-events-none" />

      <div className="relative z-10 space-y-2">
        <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
          <span className="material-symbols-outlined text-xl text-white">search</span>
        </div>
        <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
          Find Your Next Tuition
        </h3>
        <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-sm">
          Explore available tuition opportunities across Bangladesh and apply to the ones that match your skills and schedule.
        </p>
      </div>

      <div className="relative z-10 pt-2">
        <Link
          href="/dashboard/tutor/find-tuition"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-label-md font-bold text-xs shadow-md hover:bg-surface-container-low transition-all cursor-pointer select-none"
        >
          <span>Find Tuition</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </div>
    </motion.div>
  )
}
