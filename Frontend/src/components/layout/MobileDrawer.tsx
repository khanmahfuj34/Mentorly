"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { NAV_LINKS } from "@/constants/navigation"

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed top-0 bottom-0 right-0 w-72 bg-white shadow-2xl p-6 flex flex-col justify-between z-10"
          >
            <div>
              <div className="flex justify-between items-center pb-5 border-b border-outline-variant/20 mb-6">
                <Link href="/" onClick={onClose} className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                    M
                  </span>
                  <span className="text-xl font-bold text-primary tracking-tight">Mentorly</span>
                </Link>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onClick={onClose}
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined text-on-surface">close</span>
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link, idx) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={idx}
                      href={link.href}
                      className={`px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between ${
                        isActive
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      }`}
                      onClick={onClose}
                    >
                      {link.label}
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-outline-variant/20">
              <Link
                href="/login"
                onClick={onClose}
                className="w-full py-3 rounded-full border border-outline-variant/60 text-sm font-semibold hover:bg-surface-container transition-all cursor-pointer text-center text-on-surface"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="w-full py-3 rounded-full bg-primary text-on-primary text-sm font-semibold hover:opacity-95 active:scale-95 transition-all shadow-md cursor-pointer text-center"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
