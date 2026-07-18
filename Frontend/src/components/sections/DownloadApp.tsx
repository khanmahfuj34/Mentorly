"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

export default function DownloadApp() {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl flex items-center gap-2 hover:bg-white/20 transition-all cursor-pointer text-white font-medium active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">play_store</span> Play Store
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl flex items-center gap-2 hover:bg-white/20 transition-all cursor-pointer text-white font-medium active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">apple</span> App Store
              </button>
            </div>
          </div>
          <div
            onClick={() => setIsModalOpen(true)}
            className="w-48 h-48 bg-white p-4 rounded-24 flex flex-col items-center justify-center text-on-surface gap-3 shadow-lg flex-shrink-0 cursor-pointer hover:scale-105 transition-all"
          >
            <div className="w-32 h-32 bg-surface-container rounded-lg border-2 border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant select-none">
              <span className="material-symbols-outlined text-4xl">qr_code_2</span>
            </div>
            <p className="text-[10px] font-bold text-center text-on-surface select-none">
              Scan to Join Waitlist
            </p>
          </div>
        </motion.div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white border border-outline-variant/30 rounded-[32px] p-8 max-w-sm w-full text-center shadow-2xl z-10 relative flex flex-col items-center gap-6"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">phone_iphone</span>
            </div>
            <div>
              <h3 className="text-headline-md font-bold text-on-surface mb-2">Mentorly Mobile App</h3>
              <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">
                Mentorly Mobile App is Coming Soon! We are working hard to bring the ultimate learning experience to your mobile device.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-3 bg-primary text-on-primary rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all cursor-pointer text-sm"
            >
              Okay, Got it
            </button>
          </motion.div>
        </div>
      )}
    </section>
  )
}
