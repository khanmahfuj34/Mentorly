"use client"

import React from "react"
import { motion } from "framer-motion"

const STAGES = [
  "Play / Kinder",
  "Primary",
  "Secondary",
  "SSC / JSC",
  "HSC",
  "O Level / A Level",
  "Uni Admission",
  "Honours / Masters",
  "Professional Skills",
]

export default function EducationLevels() {
  return (
    <section className="py-stack-xl bg-surface-container-low/30">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-headline-lg text-center mb-stack-xl text-on-surface"
        >
          Learning for Every Stage
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {STAGES.map((stage, idx) => (
            <span
              key={idx}
              className="px-6 py-3 bg-white text-on-surface rounded-full border border-outline-variant/30 hover:bg-primary hover:text-on-primary transition-all cursor-pointer font-medium shadow-sm active:scale-95 select-none"
            >
              {stage}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
