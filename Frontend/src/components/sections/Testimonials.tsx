"use client"

import React from "react"
import { motion } from "framer-motion"
import { TESTIMONIALS } from "@/constants/testimonials"
import TestimonialCard from "@/src/components/cards/TestimonialCard"

export default function Testimonials() {
  return (
    <section className="py-stack-xl bg-surface-container-low/20">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-headline-lg text-center mb-stack-xl text-on-surface"
        >
          Loved by Everyone
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: testimonial.delay }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
