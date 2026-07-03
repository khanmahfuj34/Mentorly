"use client"

import React from "react"
import { motion } from "framer-motion"

const DISTRICTS = [
  { name: "Dhaka", count: "2.4k+ Tutors" },
  { name: "Chattogram", count: "1.1k+ Tutors" },
  { name: "Sylhet", count: "600+ Tutors" },
  { name: "Khulna", count: "450+ Tutors" },
  { name: "Rajshahi", count: "520+ Tutors" },
  { name: "Barishal", count: "280+ Tutors" },
  { name: "Mymensingh", count: "330+ Tutors" },
  { name: "Rangpur", count: "310+ Tutors" },
]

export default function BrowseByLocation() {
  return (
    <section className="py-stack-xl bg-surface">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-headline-lg text-center mb-stack-xl text-on-surface"
        >
          Browse by District
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {DISTRICTS.map((district, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="p-6 bg-white rounded-24 border border-outline-variant/30 hover-lift flex items-center gap-4 cursor-pointer"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined select-none">location_on</span>
              </div>
              <div>
                <h4 className="font-bold text-on-surface text-sm sm:text-base">{district.name}</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">{district.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
