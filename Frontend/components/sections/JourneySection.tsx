"use client"

import React from "react"
import { motion } from "framer-motion"
import StudentJourney from "@/components/sections/StudentJourney"
import TutorJourney from "@/components/sections/TutorJourney"

export default function JourneySection() {
  return (
    <section className="py-stack-xl overflow-hidden bg-surface">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-headline-lg text-center mb-stack-xl text-on-surface"
        >
          Your Success Journey
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16 relative">
          {/* Central divider line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-outline-variant/30 transform -translate-x-1/2" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <StudentJourney />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <TutorJourney />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
