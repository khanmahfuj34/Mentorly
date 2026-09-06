"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { TUTORS } from "@/data/tutors"
import TutorCard from "@/src/components/cards/TutorCard"

export default function FeaturedTutors() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
              Expert Educators
            </span>
            <h2 className="font-display text-display text-on-surface mt-2">
              Find the Right Tutor for You
            </h2>
            <p className="text-on-surface-variant mt-1 text-base">
              Connect with screened, verified tutors across various subjects and educational mediums.
            </p>
          </div>
          <Link
            href="/find-tutors"
            className="text-primary font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all text-sm select-none group py-2"
          >
            View All Tutors
            <span className="material-symbols-outlined select-none text-base leading-none group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TUTORS.slice(0, 4).map((tutor, idx) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <TutorCard tutor={tutor} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
