"use client"

import React from "react"
import { motion } from "framer-motion"
import { TUITIONS } from "@/data/tuition"
import TuitionCard from "@/components/cards/TuitionCard"

export default function FeaturedTuition() {
  return (
    <section className="py-stack-xl bg-surface-container-low/20">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-headline-lg text-center mb-stack-xl text-on-surface"
        >
          Latest Tuition Jobs
        </motion.h2>
        <div className="grid gap-6">
          {TUITIONS.map((tuition, idx) => (
            <motion.div
              key={tuition.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <TuitionCard tuition={tuition} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
