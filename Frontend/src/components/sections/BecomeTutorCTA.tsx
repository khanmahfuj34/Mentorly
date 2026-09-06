"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function BecomeTutorCTA() {
  const benefits = [
    "Find relevant tuition opportunities matching your expertise",
    "Build your verified professional tutor profile",
    "Track and manage all student applications effortlessly",
    "Schedule classes and organize bookings in one place",
    "Grow your teaching reputation and student network",
  ]

  return (
    <section className="py-20 bg-inverse-surface text-on-inverse-surface relative overflow-hidden">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Headline & Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-secondary-container px-3 py-1 bg-secondary-container/10 border border-secondary-container/20 rounded-full">
              For Educators & Tutors
            </span>
            <h2 className="font-display text-display text-white mt-4 leading-tight">
              Turn Your Knowledge Into Opportunity.
            </h2>
            <p className="text-on-inverse-surface/80 text-lg mt-4 leading-relaxed max-w-xl">
              Join Mentorly and connect with students looking for dedicated tutors like you.
            </p>

            <ul className="mt-8 space-y-3.5">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-white/90">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 text-secondary-container flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/register"
                className="px-8 py-4 rounded-full bg-primary text-on-primary font-bold text-sm hover:opacity-95 hover:shadow-xl active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                Become a Tutor
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link
                href="/become-tutor"
                className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-sm hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Visual Card Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8 shadow-2xl relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-indigo-400 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                  <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white">Join 3,000+ Tutors</h4>
                  <p className="text-xs text-white/70">Teaching over 15,000 completed sessions</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-emerald-400">verified</span>
                    <span className="text-xs font-semibold text-white">Identity & Credentials Verified</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">Active Badge</span>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-amber-400">star</span>
                    <span className="text-xs font-semibold text-white">Direct Applications & Requests</span>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded">Instant Notification</span>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-indigo-400">today</span>
                    <span className="text-xs font-semibold text-white">Smart Schedule & Booking Dashboard</span>
                  </div>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded">Organized</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
