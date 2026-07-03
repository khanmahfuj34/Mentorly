"use client"

import React from "react"
import { motion } from "framer-motion"
import { SUBJECTS } from "@/constants/subjects"
import SubjectCard from "@/components/cards/SubjectCard"

export default function PopularSubjects() {
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
          <h2 className="font-display text-headline-lg text-on-surface mb-4">Popular Subjects</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Master any subject with specialized guidance from our expert tutors.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {SUBJECTS.map((subject, idx) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <SubjectCard subject={subject} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
