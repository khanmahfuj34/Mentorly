"use client"

import React from "react"
import { motion } from "framer-motion"

const STUDENT_DASHBOARD = "/assets/images/image.png"
const TUTOR_DASHBOARD = "/assets/images/image copy.png"

export default function DashboardPreview() {
  return (
    <section className="py-stack-xl bg-surface">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-stack-xl"
        >
          <h2 className="font-display text-headline-lg text-on-surface mb-4">Powerful Role-Based Dashboards</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Complete control over your academic journey, whether you are teaching or learning.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Student Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-bold text-primary mb-4 flex items-center gap-2 select-none">
              <span className="material-symbols-outlined">person</span> Student Dashboard
            </p>
            <div className="bg-white rounded-24 border border-outline-variant/30 shadow-2xl overflow-hidden p-4 group">
              <img
                alt="Student Dashboard"
                className="w-full h-auto rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                src={STUDENT_DASHBOARD}
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="text-xs px-3 py-1 bg-surface-container text-primary font-bold rounded-full select-none">
                Active Bookings
              </div>
              <div className="text-xs px-3 py-1 bg-surface-container text-primary font-bold rounded-full select-none">
                Payment History
              </div>
              <div className="text-xs px-3 py-1 bg-surface-container text-primary font-bold rounded-full select-none">
                Analytics
              </div>
            </div>
          </motion.div>

          {/* Tutor Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-bold text-secondary mb-4 flex items-center gap-2 select-none">
              <span className="material-symbols-outlined">school</span> Tutor Dashboard
            </p>
            <div className="bg-inverse-surface rounded-24 border border-outline-variant/30 shadow-2xl overflow-hidden p-4 group">
              <img
                alt="Tutor Dashboard"
                className="w-full h-auto rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                src={TUTOR_DASHBOARD}
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="text-xs px-3 py-1 bg-surface-container text-secondary font-bold rounded-full select-none">
                Today&apos;s Classes
              </div>
              <div className="text-xs px-3 py-1 bg-surface-container text-secondary font-bold rounded-full select-none">
                Earnings Tracking
              </div>
              <div className="text-xs px-3 py-1 bg-surface-container text-secondary font-bold rounded-full select-none">
                Reviews
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
