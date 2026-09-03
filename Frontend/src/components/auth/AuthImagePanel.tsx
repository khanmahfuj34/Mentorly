"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface GlassCard {
  icon: string
  text: string
  iconColorClass?: string
  bgClass?: string
  fillIcon?: boolean
  /** Tailwind border color class e.g. "border-emerald-400/40" */
  accentBorderClass?: string
  /** Tailwind box-shadow glow via ring e.g. "hover:ring-emerald-400/30" */
  accentRingClass?: string
  /** Card tint background overlay e.g. "bg-emerald-400/5" */
  cardTintClass?: string
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -3, transition: { duration: 0.22 } }}
                className={[
                  "group relative overflow-hidden",
                  "backdrop-blur-[10px]",
                  "bg-white/[0.08]",
                  card.cardTintClass || "",
                  "border",
                  card.accentBorderClass || "border-white/20",
                  "p-4 rounded-[18px]",
                  "flex items-center gap-3.5",
                  "shadow-lg shadow-black/20",
                  "hover:shadow-xl hover:shadow-black/30",
                  "hover:bg-white/[0.13]",
                  card.accentRingClass || "",
                  "hover:ring-2",
                  "transition-all duration-250",
                  "cursor-default",
                ].join(" ")}
              >
                {/* Subtle inner glow strip at top */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                {/* Icon container */}
                <div
                  className={[
                    "shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                    card.bgClass || "bg-primary/25",
                    "border border-white/20",
                    "group-hover:scale-110 transition-transform duration-250",
                    "shadow-sm",
                  ].join(" ")}
                >
                  <span
                    className={`material-symbols-outlined text-[18px] leading-none ${card.iconColorClass || "text-white"}`}
                    style={{ fontVariationSettings: card.fillIcon !== false ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {card.icon}
                  </span>
                </div>

                {/* Label */}
                <span className="text-white font-semibold text-sm tracking-wide drop-shadow-sm">
                  {card.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
