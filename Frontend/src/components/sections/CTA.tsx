"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface CTAProps {
  isStudent?: boolean
}

export default function CTA({ isStudent = false }: CTAProps) {
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
            {isStudent ? "Achieve Your Academic Goals Today" : "Start Your Learning Journey Today"}
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-stack-lg mt-4 leading-relaxed">
            {isStudent
              ? "Find verified tutors who match your learning style, curriculum, and goals."
              : "Join the fastest growing education network in Bangladesh."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={isStudent ? "/dashboard/student/find-tutors" : "/register"}
              className="px-10 py-5 rounded-full bg-white text-primary font-bold hover:shadow-2xl transition-all scale-100 hover:scale-105 active:scale-95 cursor-pointer select-none text-center"
            >
              {isStudent ? "Find Tutors Now" : "Find Tutors Now"}
            </Link>
            <Link
              href={isStudent ? "/dashboard/student/my-tuition-posts" : "/register"}
              className="px-10 py-5 rounded-full border border-white/30 text-white font-bold hover:bg-white/10 transition-all active:scale-95 cursor-pointer select-none text-center"
            >
              {isStudent ? "Post Tuition Requirements" : "Become a Tutor"}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
