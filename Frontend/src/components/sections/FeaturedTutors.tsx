"use client"

import React from "react"
import { motion } from "framer-motion"
import { TUTORS } from "@/data/tutors"
import TutorCard from "@/src/components/cards/TutorCard"

export default function FeaturedTutors() {
  return (
    <section className="py-stack-xl bg-white">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-stack-xl gap-4"
        >
          <div>
            <h2 className="font-display text-headline-lg text-on-surface">Top Rated Tutors</h2>
            <p className="text-on-surface-variant mt-1">Selected experts with proven track records.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 hover:underline cursor-pointer select-none">
            View All Tutors{" "}
            <span className="material-symbols-outlined select-none text-sm leading-none">arrow_forward</span>
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {TUTORS.map((tutor, idx) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <TutorCard tutor={tutor} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
