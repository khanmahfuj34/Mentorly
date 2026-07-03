"use client"

import React from "react"
import { motion } from "framer-motion"

export default function CTA() {
  return (
    <section className="max-w-container-max mx-auto px-margin-desktop py-stack-xl">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-primary rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl"
      >
        <div 
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"
          style={{ mixBlendMode: "overlay" }}
        />
        <div className="relative z-10">
          <h2 className="font-display text-display text-white mb-stack-md leading-none tracking-tight">
            Start Your Learning Journey Today
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-stack-lg mt-4 leading-relaxed">
            Join the fastest growing education network in Bangladesh.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-5 rounded-full bg-white text-primary font-bold hover:shadow-2xl transition-all scale-100 hover:scale-105 active:scale-95 cursor-pointer select-none">
              Find Tutors Now
            </button>
            <button className="px-10 py-5 rounded-full border border-white/30 text-white font-bold hover:bg-white/10 transition-all active:scale-95 cursor-pointer select-none">
              Become a Tutor
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
