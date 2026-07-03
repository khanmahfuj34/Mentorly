"use client"

import React from "react"
import { NAV_LINKS } from "@/constants/navigation"

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      {/* Content */}
      <div className="fixed top-0 bottom-0 right-0 w-64 bg-white shadow-2xl p-6 flex flex-col gap-6 z-10 transition-transform duration-300">
        <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30">
          <span className="text-xl font-bold text-primary">Menu</span>
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container select-none cursor-pointer"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-on-surface">close</span>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className={`font-label-md text-base ${
                link.active 
                  ? "text-primary font-bold border-b-2 border-primary pb-1 self-start" 
                  : "text-on-surface-variant hover:text-primary transition-colors"
              }`}
              onClick={onClose}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-outline-variant/30">
          <button className="w-full py-3 rounded-full border border-outline text-label-md font-semibold hover:bg-surface-container transition-all cursor-pointer">
            Login
          </button>
          <button className="w-full py-3 rounded-full bg-primary text-on-primary text-label-md font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}
