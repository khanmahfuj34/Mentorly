"use client"

import React from "react"
import { motion } from "framer-motion"
import FeatureCard from "@/src/components/cards/FeatureCard"

const FEATURES_DATA = [
  {
    icon: "verified_user",
    title: "Trusted Tutors",
    desc: "Every tutor is screened for academic qualifications and background verified.",
  },
  {
    icon: "travel_explore",
    title: "Easy Tuition Discovery",
    desc: "Browse opportunities by subject, class, medium, and preferred location.",
  },
  {
    icon: "send",
    title: "Simple Application Process",
    desc: "Apply to tuition openings or connect with tutors with just a few clicks.",
  },
  {
    icon: "event_available",
    title: "Flexible Learning",
    desc: "Choose online or offline sessions based on your convenience and schedule.",
  },
  {
    icon: "badge",
    title: "Transparent Profiles",
    desc: "View comprehensive qualifications, ratings, experience, and fee structures.",
  },
  {
    icon: "dashboard_customize",
    title: "Easy Booking Management",
    desc: "Track schedules, lesson progress, and session histories from one dashboard.",
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
            Platform Benefits
          </span>
          <h2 className="font-display text-display text-on-surface mt-3">
            Why Choose Mentorly?
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto mt-3 text-base leading-relaxed">
            Built to provide students, guardians, and tutors with a secure, efficient, and transparent learning ecosystem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <FeatureCard icon={feat.icon} title={feat.title} description={feat.desc} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
