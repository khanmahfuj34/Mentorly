"use client"

import React from "react"
import { motion } from "framer-motion"
import { HERO_STATS } from "@/data/stats"

export default function Stats() {
  return (
    <section className="py-14 bg-gradient-to-r from-primary via-indigo-600 to-primary text-on-primary shadow-inner">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {HERO_STATS.map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 hover:bg-white/15 transition-all"
            >
              <div className="text-3xl md:text-4xl font-extrabold mb-1 tracking-tight text-white">{stat.value}</div>
              <div className="text-xs md:text-sm font-semibold uppercase tracking-wider text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
