"use client"

import React, { useState } from "react"
import { NAV_LINKS } from "@/constants/navigation"
import MobileDrawer from "./MobileDrawer"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-desktop flex justify-between items-center h-20">
          <div className="flex items-center gap-12">
            <a className="text-headline-md font-display font-bold text-primary" href="#">
              Mentorly
            </a>
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link, idx) => (
                <a
                  key={idx}
                  className={`font-label-md transition-all ${
                    link.active
                      ? "text-primary font-bold border-b-2 border-primary pb-1"
                      : "text-on-surface-variant hover:text-primary transition-colors"
                  }`}
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:inline-block px-6 py-2 rounded-full border border-outline text-label-md font-semibold hover:bg-surface-container transition-all cursor-pointer">
              Login
            </button>
            <button className="hidden sm:inline-block px-6 py-2 rounded-full bg-primary text-on-primary text-label-md font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer">
              Get Started
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container select-none cursor-pointer"
            >
              <span className="material-symbols-outlined text-on-surface">menu</span>
            </button>
          </div>
        </div>
      </nav>
      <MobileDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
