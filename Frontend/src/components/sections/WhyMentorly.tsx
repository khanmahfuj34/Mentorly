"use client"

import React from "react"
import { motion } from "framer-motion"

const COMPARISON_ROWS = [
  {
    feature: "Tutor Source",
    traditional: "Facebook / Local Flyers",
    mentorly: "Verified Central Platform",
  },
  {
    feature: "Verification",
    traditional: "Self-proclaimed claims",
    mentorly: "Academic & ID Documents Verified",
  },
  {
    feature: "Selection Process",
    traditional: "Luck-based / Random",
    mentorly: "Rating & Review Comparison",
  },
  {
    feature: "Security",
    traditional: "Cash (High Risk)",
    mentorly: "Secure Escrow Protection",
  },
  {
    feature: "Management",
    traditional: "Personal phone / Pen-paper",
    mentorly: "Smart Digital Dashboard",
  },
]

export default function WhyMentorly() {
  return (
    <section className="py-stack-xl bg-white">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-headline-lg text-center mb-stack-xl text-on-surface"
        >
          The Better Way to Learn
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[700px] border-collapse bg-white rounded-24 overflow-hidden shadow-xl border border-outline-variant/20">
            <thead>
              <tr className="bg-surface-container select-none">
                <th className="p-6 text-left font-bold text-on-surface border-b border-outline-variant/10">
                  Features
                </th>
                <th className="p-6 text-left font-bold text-on-surface-variant border-b border-outline-variant/10">
                  Traditional Method
                </th>
                <th className="p-6 text-left font-bold text-primary border-b border-outline-variant/10">
                  Mentorly Platform
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-surface-container-low/20 transition-colors ${
                    idx < COMPARISON_ROWS.length - 1 ? "border-b border-outline-variant/10" : ""
                  }`}
                >
                  <td className="p-6 font-semibold text-on-surface">{row.feature}</td>
                  <td className="p-6 text-on-surface-variant">{row.traditional}</td>
                  <td className="p-6 text-primary font-bold">{row.mentorly}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
