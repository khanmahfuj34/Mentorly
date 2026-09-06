"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV_LINKS } from "@/constants/navigation"
import MobileDrawer from "./MobileDrawer"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-outline-variant/20 py-3"
            : "bg-surface/85 backdrop-blur-xl border-b border-outline-variant/10 py-4"
        }`}
      >
        <div className="max-w-container-max mx-auto px-margin-desktop flex justify-between items-center h-12">
          <div className="flex items-center gap-10">
            <Link
              className="text-2xl font-display font-bold text-primary tracking-tight flex items-center gap-2 group"
              href="/"
            >
              <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xl group-hover:scale-105 transition-transform">
                M
              </span>
              Mentorly
            </Link>
            <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
              {NAV_LINKS.map((link, idx) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={idx}
                    href={link.href}
                    className={`text-sm font-medium transition-all relative py-1 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md px-1 ${
                      isActive
                        ? "text-primary font-bold"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-primary rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-outline-variant/60 text-sm font-semibold hover:bg-surface-container transition-all focus:ring-2 focus:ring-primary/20 cursor-pointer text-on-surface"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary text-on-primary text-sm font-semibold hover:opacity-95 hover:shadow-lg active:scale-95 transition-all shadow-md focus:ring-2 focus:ring-primary/40 cursor-pointer"
            >
              Get Started
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open Mobile Menu"
              aria-expanded={isOpen}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20 select-none cursor-pointer"
            >
              <span className="material-symbols-outlined text-on-surface">menu</span>
            </button>
          </div>
        </div>
      </header>
      <MobileDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
