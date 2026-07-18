"use client"

import React from "react"
import { motion } from "framer-motion"

export default function DownloadApp() {
  return (
    <section className="py-stack-xl bg-surface">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-inverse-surface text-on-primary-container rounded-24 p-12 flex flex-col md:flex-row items-center gap-12 shadow-2xl"
        >
          <div className="flex-1">
            <h2 className="text-headline-lg font-bold mb-4 text-white">Mentorly Mobile App</h2>
            <p className="opacity-70 mb-8 max-w-md text-white/80 leading-relaxed text-sm sm:text-base">
              Access tuitions and manage your schedule on the go. Coming soon to all mobile platforms.
            </p>
            <div className="flex flex-wrap gap-4 opacity-50 grayscale">
              <button className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl flex items-center gap-2 cursor-not-allowed select-none text-white font-medium">
                <span className="material-symbols-outlined text-sm">play_store</span> Play Store
              </button>
              <button className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl flex items-center gap-2 cursor-not-allowed select-none text-white font-medium">
                <span className="material-symbols-outlined text-sm">apple</span> App Store
              </button>
            </div>
          </div>
          <div className="w-48 h-48 bg-white p-4 rounded-24 flex flex-col items-center justify-center text-on-surface gap-3 shadow-lg flex-shrink-0">
            <div className="w-32 h-32 bg-surface-container rounded-lg border-2 border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant select-none">
              <span className="material-symbols-outlined text-4xl">qr_code_2</span>
            </div>
            <p className="text-[10px] font-bold text-center text-on-surface select-none">
              Scan to Join Waitlist
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
