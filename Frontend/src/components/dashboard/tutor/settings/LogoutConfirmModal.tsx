"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/src/hooks/useAuth"

interface LogoutConfirmModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LogoutConfirmModal({ isOpen, onClose }: LogoutConfirmModalProps) {
  const { logout } = useAuth()

  if (!isOpen) return null

  const handleLogout = () => {
    onClose()
    logout()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-outline-variant/30 z-10 space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-200">
              <span className="material-symbols-outlined text-2xl">logout</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-on-surface font-display">Confirm Logout</h3>
              <p className="text-xs text-on-surface-variant">Session End</p>
            </div>
          </div>

          <p className="text-sm text-on-surface-variant leading-relaxed">
            Are you sure you want to log out of your Mentorly tutor dashboard session? You will need to log back in to access your teaching schedule and applications.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-high transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-xs hover:bg-red-700 transition-all shadow-md shadow-red-600/20 flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span>Logout</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
