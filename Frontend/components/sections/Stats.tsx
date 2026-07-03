"use client"

import React from "react"
import { motion } from "framer-motion"
import { SUCCESS_STATS } from "@/data/stats"

export default function Stats() {
  return (
    <section className="py-stack-xl bg-primary text-on-primary">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center"
        >
          {SUCCESS_STATS.map((stat, idx) => (
            <div key={idx} className="select-none">
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm opacity-85 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
