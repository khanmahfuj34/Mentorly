"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface GlassCard {
  icon: string
  text: string
  iconColorClass?: string
  bgClass?: string
  fillIcon?: boolean
}

interface AuthImagePanelProps {
  imageUrl: string
  title: string
  subtitle: string
  glassCards: GlassCard[]
  showBrand?: boolean
}

export default function AuthImagePanel({
  imageUrl,
  title,
  subtitle,
  glassCards,
  showBrand = false,
}: AuthImagePanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current || window.innerWidth <= 768) return

      const { clientX, clientY } = e
      const moveX = (clientX - window.innerWidth / 2) / 80
      const moveY = (clientY - window.innerHeight / 2) / 80

      imageRef.current.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full md:w-[55%] h-[360px] md:h-screen overflow-hidden bg-on-background select-none"
    >
      {/* Background Image with scale transition */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={imageRef}
          className="w-full h-full bg-cover bg-center transition-transform duration-[1200ms] ease-out"
          style={{
            backgroundImage: `url('${imageUrl}')`,
            transform: "scale(1.1) translate(0px, 0px)",
          }}
        />
        {/* Dark overlay: gradient to top/right to ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 md:bg-gradient-to-r md:from-black/80 md:via-black/55 md:to-transparent z-10" />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full z-20 w-full flex flex-col justify-end md:justify-between p-6 md:p-12 lg:p-20 text-white">
        {/* Brand Anchor (Visible on desktop if showBrand is true) */}
        {showBrand ? (
          <div className="hidden md:flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary-fixed text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              school
            </span>
            <span className="font-display text-headline-md font-bold text-surface-bright tracking-tight">
              Mentorly
            </span>
          </div>
        ) : (
          <div className="hidden md:block" />
        )}

        {/* Headline & Subheading */}
        <div className="max-w-xl mb-4 md:mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-display text-white mb-4 leading-tight"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-body-lg text-white/90 leading-relaxed max-w-md"
          >
            {subtitle}
          </motion.p>

          {/* Floating Glass Cards (Desktop only) */}
          <div className="hidden lg:grid grid-cols-2 gap-4 mt-8 max-w-lg">
            {glassCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                className="glass-card backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-xl flex items-center gap-3 hover:-translate-y-1 hover:bg-white/15 transition-all duration-300"
              >
                <div className={`${card.bgClass || "bg-primary/20"} p-2 rounded-full flex items-center justify-center`}>
                  <span
                    className={`material-symbols-outlined text-sm ${card.iconColorClass || "text-primary-fixed"}`}
                    style={{ fontVariationSettings: card.fillIcon ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {card.icon}
                  </span>
                </div>
                <span className="text-surface-bright font-label-md">{card.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
