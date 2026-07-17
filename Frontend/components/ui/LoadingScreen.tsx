"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [loadingTextIndex, setLoadingTextIndex] = useState(0)

  const loadingTexts = [
    "Loading Mentorly...",
    "Securing your connection...",
    "Optimizing your space...",
    "Preparing verified mentors...",
  ]

  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length)
    }, 1800)

    return () => clearInterval(textInterval)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface select-none">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-secondary/5 rounded-full blur-[80px]" />

      <div className="flex flex-col items-center space-y-8 z-10">
        {/* Animated Custom Orbit Spinner */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Inner pulse */}
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-8 h-8 rounded-full bg-primary/20"
          />

          {/* Core circle */}
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/45"
          />

          {/* Spinner Ring 1 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-t-primary border-r-primary border-b-transparent border-l-transparent"
          />

          {/* Spinner Ring 2 (Counter-rotated, slower, larger) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 rounded-full border border-t-outline-variant/30 border-r-transparent border-b-secondary border-l-transparent"
          />
        </div>

        {/* Branding */}
        <div className="text-center space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-headline-md font-display font-bold text-primary tracking-tight"
          >
            Mentorly
          </motion.h1>

          {/* Loading texts rotating with crossfades */}
          <div className="h-6 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={loadingTextIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="text-xs font-label-md text-on-surface-variant font-medium tracking-wide uppercase"
              >
                {loadingTexts[loadingTextIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
