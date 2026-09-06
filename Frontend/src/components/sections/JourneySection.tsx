"use client"

import React from "react"
import { motion } from "framer-motion"
import StudentJourney from "@/src/components/sections/StudentJourney"
import TutorJourney from "@/src/components/sections/TutorJourney"

export default function JourneySection() {
  return (
    <section className="py-20 overflow-hidden bg-surface-container-low/30">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
            Simple Process
          </span>
          <h2 className="font-display text-display text-on-surface mt-3">
            How Mentorly Works
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto mt-3 text-base">
            Whether you are seeking a qualified private tutor or looking for tuition opportunities, Mentorly makes the connection effortless.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <StudentJourney />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <TutorJourney />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
