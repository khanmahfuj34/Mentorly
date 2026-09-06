"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { TUITIONS } from "@/data/tuition"
import TuitionCard from "@/src/components/cards/TuitionCard"

export default function FeaturedTuition() {
  return (
    <section className="py-20 bg-surface-container-low/30">
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
              Latest Tuition Posts
            </span>
            <h2 className="font-display text-display text-on-surface mt-2">
              Explore Tuition Opportunities
            </h2>
            <p className="text-on-surface-variant mt-1 text-base">
              Find active tuition requests from students and guardians across Bangladesh.
            </p>
          </div>
          <Link
            href="/find-tuition"
            className="text-primary font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all text-sm select-none group py-2"
          >
            Find More Tuition
            <span className="material-symbols-outlined select-none text-base leading-none group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </motion.div>

        <div className="grid gap-5">
          {TUITIONS.slice(0, 4).map((tuition, idx) => (
            <motion.div
              key={tuition.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <TuitionCard tuition={tuition} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
