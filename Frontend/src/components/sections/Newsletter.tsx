"use client"

import React from "react"
import { motion } from "framer-motion"

export default function Newsletter() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // No-op for frontend only implementation
  }

  return (
    <section className="py-stack-xl bg-surface-container-low/30">
      <div className="max-w-container-max mx-auto px-margin-desktop text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-headline-lg text-on-surface mb-4">Stay Updated</h2>
          <p className="text-on-surface-variant mb-8 max-w-xl mx-auto leading-relaxed">
            Get the latest educational news and tuition updates directly in your inbox.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 px-4 sm:px-0">
            <input
              className="flex-1 rounded-full border border-outline-variant bg-white px-6 py-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder-on-surface-variant text-on-surface"
              placeholder="Enter your email"
              type="email"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-on-primary font-bold rounded-full shadow-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer select-none"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
