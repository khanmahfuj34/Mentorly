"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { HERO_STATS } from "@/data/stats"
import SearchSection from "@/src/components/sections/SearchSection"

const HERO_IMG = "/assets/images/image copy 2.png"
const STUDENT_IMG = "/assets/images/student.jpg"

interface HeroProps {
  isStudent?: boolean
}

export default function Hero({ isStudent = false }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-surface">
      {/* Hero */}
      <section className="relative pt-32 pb-stack-xl">
        <div className="max-w-container-max mx-auto px-margin-desktop grid lg:grid-cols-2 gap-stack-xl items-center">
          {/* Left – Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-display mb-stack-md text-on-surface leading-[1.1] tracking-[-0.04em]">
              {isStudent ? (
                <>
                  Excel in Your Studies.
                  <br />
                  <span className="text-primary">Find Your Ideal Tutor.</span>
                </>
              ) : (
                <>
                  Find the Right Tutor.
                  <br />
                  <span className="text-primary">Build a Better Future.</span>
                </>
              )}
            </h1>
            <p className="text-lg text-on-surface-variant mb-stack-lg max-w-xl leading-relaxed">
              {isStudent
                ? "Connect with verified tutors, post custom tuition requirements, schedule online or offline lessons, and track your academic progress all from your student dashboard."
                : "Connect with verified tutors, discover tuition opportunities, schedule lessons, and learn with confidence through one trusted platform."}
            </p>
            <div className="flex flex-wrap gap-4 mb-stack-xl">
              <Link
                href={isStudent ? "/dashboard/student/find-tutors" : "/register"}
                className="px-8 py-4 rounded-full bg-primary text-on-primary font-semibold flex items-center gap-2 hover:shadow-lg hover:opacity-95 transition-all active:scale-95 cursor-pointer text-center text-on-primary"
              >
                {isStudent ? "Find Tutors" : "Find a Tutor"}
                <span className="material-symbols-outlined text-sm select-none leading-none">
                  arrow_forward
                </span>
              </Link>
              <Link
                href={isStudent ? "/dashboard/student/my-tuition-posts" : "/register"}
                className="px-8 py-4 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface font-semibold hover:bg-surface-container transition-all active:scale-95 cursor-pointer text-center text-on-surface"
              >
                {isStudent ? "Post Tuition" : "Become a Tutor"}
              </Link>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-stack-lg border-t border-outline-variant/30">
              {HERO_STATS.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-headline-md font-bold text-primary">{stat.value}</div>
                  <div className="text-xs uppercase text-on-surface-variant font-semibold tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right – Platform visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[600px] hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-[40px] overflow-hidden border border-outline-variant/30 shadow-2xl">
              <img
                alt="Platform Preview"
                className="w-full h-full object-cover opacity-80"
                src={HERO_IMG}
              />
            </div>

            {/* Floating card – Verified Tutor */}
            <div className="absolute top-10 -left-10 glass-card p-6 rounded-24 shadow-xl border border-white/50 w-64 animate-float">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary select-none">verified</span>
                </div>
                <div>
                  <div className="font-bold text-sm text-on-surface">Verified Tutor</div>
                  <div className="text-[10px] text-on-surface-variant font-medium">Identity Confirmed</div>
                </div>
              </div>
              <div className="flex gap-1 text-yellow-500 select-none">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-xs"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
            </div>

            {/* Floating card – New Booking */}
            <div className="absolute bottom-20 -right-8 glass-card p-6 rounded-24 shadow-xl border border-white/50 w-72 animate-float-delayed">
              <div className="flex justify-between items-center mb-4">
                <div className="font-bold text-on-surface">New Booking</div>
                <div className="px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] rounded-full font-bold">
                  URGENT
                </div>
              </div>
              <button className="w-full py-2 bg-primary text-on-primary text-sm rounded-xl font-medium hover:opacity-90 active:scale-95 transition-all cursor-pointer">
                Accept Session
              </button>
            </div>
          </motion.div>
        </div>

        {/* Search bar floating below hero */}
        <div className="max-w-container-max mx-auto px-margin-desktop mt-12">
          <SearchSection />
        </div>
      </section>

      {/* Student & Tutor Hero Showcase */}
      <section className="py-stack-xl bg-white">
        <div className="max-w-container-max mx-auto px-margin-desktop grid md:grid-cols-2 gap-12">
          {/* Student */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative group cursor-pointer"
          >
            <div className="rounded-24 overflow-hidden h-[500px] shadow-lg">
              <img
                alt="Student"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={STUDENT_IMG}
              />
            </div>
            <div className="absolute top-8 left-8 glass-card p-5 rounded-24 shadow-lg border border-white/40 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm select-none">
                  ST
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface">Active Learner</p>
                  <p className="text-[10px] text-on-surface-variant font-medium">500+ Classes Attended</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 right-8 glass-card p-5 rounded-24 shadow-lg border border-white/40 animate-float-delayed">
              <p className="text-xs font-bold text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-sm select-none">bolt</span>
                95% Response Rate
              </p>
            </div>
          </motion.div>

          {/* Tutor */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative group cursor-pointer"
          >
            <div className="rounded-24 overflow-hidden h-[500px] shadow-lg">
              <img
                alt="Tutor"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                src={STUDENT_IMG}
              />
            </div>
            <div className="absolute top-8 right-8 glass-card p-5 rounded-24 shadow-lg border border-white/40 animate-float">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary select-none">verified_user</span>
                <div>
                  <p className="font-bold text-sm text-on-surface">Verified Tutor</p>
                  <p className="text-[10px] text-on-surface-variant font-medium">4.9 Overall Rating</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-8 glass-card p-5 rounded-24 shadow-lg border border-white/40 animate-float-delayed">
              <p className="text-xs font-bold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-sm select-none">calendar_today</span>
                Available Today
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
