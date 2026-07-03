"use client"

import React from "react"
import { motion } from "framer-motion"
import FeatureCard from "@/components/cards/FeatureCard"

const FEATURES_DATA = [
  { icon: "verified", title: "Verified Tutors", desc: "Manual ID and academic document verification." },
  { icon: "psychology", title: "Smart Matching", desc: "Algorithm to find the best tutor for your needs." },
  { icon: "calendar_month", title: "Scheduling", desc: "Integrated calendar for seamless session booking." },
  { icon: "shield_lock", title: "Secure Booking", desc: "Payments held in escrow until session completion." },
  { icon: "reviews", title: "Real Reviews", desc: "Feedback only from students who completed a class." },
  { icon: "notifications_active", title: "Instant Alerts", desc: "SMS & Push notifications for new applications." },
  { icon: "fingerprint", title: "Verification", desc: "Two-factor authentication for data security." },
  { icon: "image", title: "HD Profiles", desc: "Clear professional imagery for every tutor." },
  { icon: "search", title: "Fast Search", desc: "Real-time filters for subject, location, and fee." },
  { icon: "dashboard", title: "Role Dashboards", desc: "Tailored interfaces for students and tutors." },
  { icon: "forum", title: "Real Time Chat", desc: "Direct communication without sharing phone numbers." },
  { icon: "smartphone", title: "Mobile Friendly", desc: "Optimized experience for web and mobile browsers." },
]

export default function Features() {
  return (
    <section className="py-stack-xl bg-surface-container-low/30">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-headline-lg text-center mb-stack-xl text-on-surface"
        >
          Platform Built for Trust
        </motion.h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {FEATURES_DATA.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
            >
              <FeatureCard icon={feat.icon} title={feat.title} description={feat.desc} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
