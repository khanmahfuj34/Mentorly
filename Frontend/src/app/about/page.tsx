"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/src/components/layout/Navbar"
import Footer from "@/src/components/layout/Footer"
import { HERO_STATS } from "@/data/stats"
import { FAQS } from "@/constants/faq"

export default function AboutPage() {
  const [openFaqId, setOpenFaqId] = useState<string | null>("1")

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id)
  }

  const comparisonRows = [
    {
      feature: "Tutor & Tuition Discovery",
      traditional: "Scattered Facebook groups, street flyers, and unverified word-of-mouth recommendations",
      mentorly: "Organized, searchable marketplace with verified subjects, locations, and rate filters",
    },
    {
      feature: "Verification & Trust",
      traditional: "Self-proclaimed qualifications with no formal background checking",
      mentorly: "Structured profile review process for identity and academic credentials",
    },
    {
      feature: "Application Process",
      traditional: "Manual, fragmented messaging through social media and phone calls",
      mentorly: "Streamlined one-click applications with real-time status updates",
    },
    {
      feature: "Schedule & Booking Management",
      traditional: "Paper notebooks and unstructured informal arrangements",
      mentorly: "Centralized digital dashboard for active bookings, schedules, and class logs",
    },
    {
      feature: "Profile Transparency",
      traditional: "Limited information about tutor background, experience, or student feedback",
      mentorly: "Comprehensive profiles showing institution, experience, subjects, and transparent rates",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-surface text-on-surface">
        {/* A. ABOUT MENTORLY - HERO / OVERVIEW */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 via-surface to-surface border-b border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop text-center">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full inline-block mb-4"
            >
              About Mentorly
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-display text-on-surface max-w-4xl mx-auto leading-tight"
            >
              Transforming Tutoring Connections Across Bangladesh
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-on-surface-variant max-w-3xl mx-auto mt-6 leading-relaxed"
            >
              Mentorly is a modern tutoring platform designed to make finding, connecting with, and managing tutors easier for students, guardians, and tutors. We bridge the gap between ambitious learners and dedicated educators through a centralized, transparent platform.
            </motion.p>
          </div>
        </section>

        {/* B & C. OUR MISSION & OUR VISION */}
        <section className="py-20 bg-white border-b border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 md:p-10 rounded-3xl bg-surface-container-low/40 border border-outline-variant/20 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">track_changes</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-on-surface mb-4">Our Mission</h2>
                <p className="text-on-surface-variant text-base leading-relaxed space-y-3">
                  Our mission is to democratize access to quality education by providing a trusted platform that connects students with the ideal tutors for their specific learning goals. We simplify tutoring management and create sustainable teaching opportunities for skilled tutors.
                </p>
              </div>
              <ul className="mt-8 space-y-2.5 text-sm text-on-surface font-medium">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  Accessible education for every student
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  Transparent and trustworthy tutor profiles
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  Empowering educators with teaching opportunities
                </li>
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 md:p-10 rounded-3xl bg-surface-container-low/40 border border-outline-variant/20 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-2xl">visibility</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-on-surface mb-4">Our Vision</h2>
                <p className="text-on-surface-variant text-base leading-relaxed">
                  Our long-term vision is to build Bangladesh’s premier digital tutoring ecosystem — where finding quality academic guidance is seamless, transparent, and accessible to anyone, anywhere.
                </p>
              </div>
              <ul className="mt-8 space-y-2.5 text-sm text-on-surface font-medium">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                  Trusted nationwide digital tutoring ecosystem
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                  Instant discovery across all academic curriculums
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                  Organized, stress-free booking management
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* D. THE PROBLEM WE SOLVE */}
        <section className="py-20 bg-surface">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
                Real Challenges
              </span>
              <h2 className="font-display text-display text-on-surface mt-3">The Problem We Solve</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto mt-3 text-base">
                Traditional tutoring discovery in Bangladesh relies on fragmented Facebook posts, unverified agencies, and word of mouth. Mentorly replaces uncertainty with structure.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* For Students */}
              <div className="bg-white p-8 rounded-3xl border border-outline-variant/20 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined">person_off</span>
                  </div>
                  <h3 className="font-bold text-xl text-on-surface">Common Student Challenges</h3>
                </div>
                <ul className="space-y-3.5 text-sm text-on-surface-variant">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-500 text-base mt-0.5">cancel</span>
                    <span><strong>Difficult Discovery:</strong> Hard to find tutors with the exact subject expertise and availability needed.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-500 text-base mt-0.5">cancel</span>
                    <span><strong>Lack of Verification:</strong> Unclear academic background, leading to trial-and-error sessions.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-500 text-base mt-0.5">cancel</span>
                    <span><strong>No Rate Standardization:</strong> Rates vary wildly with no clear guidelines or benchmarks.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-500 text-base mt-0.5">cancel</span>
                    <span><strong>Communication Chaos:</strong> Phone calls, SMS, and messaging apps clutter session planning.</span>
                  </li>
                </ul>
              </div>

              {/* For Tutors */}
              <div className="bg-white p-8 rounded-3xl border border-outline-variant/20 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined">work_off</span>
                  </div>
                  <h3 className="font-bold text-xl text-on-surface">Common Tutor Challenges</h3>
                </div>
                <ul className="space-y-3.5 text-sm text-on-surface-variant">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-orange-500 text-base mt-0.5">cancel</span>
                    <span><strong>Scattered Opportunities:</strong> Tuition posts are buried in social media groups with unreliable leads.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-orange-500 text-base mt-0.5">cancel</span>
                    <span><strong>No Professional Profile:</strong> Tutors lack a centralized showcase for qualifications and teaching history.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-orange-500 text-base mt-0.5">cancel</span>
                    <span><strong>Application Tracking:</strong> Difficulty keeping track of where and when applications were submitted.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-orange-500 text-base mt-0.5">cancel</span>
                    <span><strong>Unreliable Booking:</strong> Last-minute cancellations without clear schedule agreements.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* E, F, G. HOW MENTORLY WORKS - ECOSYSTEM BREAKDOWN */}
        <section className="py-20 bg-white border-y border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
                Platform Workflow
              </span>
              <h2 className="font-display text-display text-on-surface mt-3">The Complete Ecosystem</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto mt-3 text-base">
                Mentorly connects students and tutors through a structured multi-step process designed for transparency and ease.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Student Experience */}
              <div>
                <h3 className="font-bold text-xl text-primary mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined">face</span> Student Journey
                </h3>
                <div className="space-y-4">
                  {[
                    { step: "1. Discover", text: "Filter tutors by subject, class level, medium, location, and salary expectations." },
                    { step: "2. View Detailed Profiles", text: "Inspect educational institution, teaching experience, and verified badges." },
                    { step: "3. Apply / Connect", text: "Send a direct application or tuition request specifying your exact requirements." },
                    { step: "4. Get Connected & Book", text: "Once accepted, confirm lesson schedules and manage active bookings." },
                  ].map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-surface-container-low/50 border border-outline-variant/20">
                      <h4 className="font-bold text-sm text-on-surface">{item.step}</h4>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tutor Experience */}
              <div>
                <h3 className="font-bold text-xl text-secondary mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined">school</span> Tutor Journey
                </h3>
                <div className="space-y-4">
                  {[
                    { step: "1. Create Professional Profile", text: "Highlight educational background, teaching expertise, preferred locations, and expected rate." },
                    { step: "2. Browse Tuition Posts", text: "Explore open tuition opportunities posted by students and guardians across your area." },
                    { step: "3. Submit Applications", text: "Apply to relevant tuition posts with customized proposals matching student requirements." },
                    { step: "4. Manage Bookings & Teach", text: "Receive confirmation, track lesson schedules, and organize student sessions." },
                  ].map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-surface-container-low/50 border border-outline-variant/20">
                      <h4 className="font-bold text-sm text-on-surface">{item.step}</h4>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* H. TRUST & SAFETY */}
        <section className="py-20 bg-surface">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 px-3 py-1 bg-emerald-100 rounded-full">
                Safety & Transparency
              </span>
              <h2 className="font-display text-display text-on-surface mt-3">Trust & Safety Approach</h2>
              <p className="text-on-surface-variant mt-3 text-base leading-relaxed">
                We believe trust is built on transparency, accurate information, and structured communication workflow.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-7 bg-white rounded-3xl border border-outline-variant/20">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">badge</span>
                </div>
                <h4 className="font-bold text-base text-on-surface mb-2">Detailed Profiles</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Tutors provide comprehensive academic credentials, university affiliations, and teaching background information.
                </p>
              </div>

              <div className="p-7 bg-white rounded-3xl border border-outline-variant/20">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">rule</span>
                </div>
                <h4 className="font-bold text-base text-on-surface mb-2">Structured Application Workflow</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Applications and tuition requests follow formal status flows so both parties have full clarity at every stage.
                </p>
              </div>

              <div className="p-7 bg-white rounded-3xl border border-outline-variant/20">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <h4 className="font-bold text-base text-on-surface mb-2">User-Controlled Information</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Users retain control over their personal profile information and decide when to share details for booking confirmation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* I. WHY MENTORLY - COMPARISON TABLE */}
        <section className="py-20 bg-white border-y border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
                Comparison
              </span>
              <h2 className="font-display text-display text-on-surface mt-3">Why Mentorly vs Traditional Tutoring</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse bg-white rounded-3xl overflow-hidden shadow-lg border border-outline-variant/20 text-sm">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface border-b border-outline-variant/20">
                    <th className="p-5 text-left font-bold">Feature</th>
                    <th className="p-5 text-left font-bold text-on-surface-variant">Traditional Tutoring</th>
                    <th className="p-5 text-left font-bold text-primary">Mentorly Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-low/20 transition-colors">
                      <td className="p-5 font-bold text-on-surface">{row.feature}</td>
                      <td className="p-5 text-on-surface-variant">{row.traditional}</td>
                      <td className="p-5 text-primary font-bold">{row.mentorly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* J. PLATFORM STATISTICS */}
        <section className="py-16 bg-primary text-on-primary">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {HERO_STATS.map((stat, idx) => (
                <div key={idx} className="p-4">
                  <div className="text-4xl font-extrabold mb-1 tracking-tight text-white">{stat.value}</div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* K. FAQ SECTION */}
        <section id="faq" className="py-20 bg-surface">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
                Help & Answers
              </span>
              <h2 className="font-display text-display text-on-surface mt-3">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id
                return (
                  <div
                    key={faq.id}
                    className="p-6 bg-white rounded-2xl border border-outline-variant/20 hover:border-primary/30 transition-all cursor-pointer select-none"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <h4 className="font-bold text-on-surface text-base">{faq.question}</h4>
                      <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}>
                        add
                      </span>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-on-surface-variant leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* L. FINAL ABOUT CTA */}
        <section id="contact" className="py-20 bg-white text-center border-t border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <h2 className="font-display text-display text-on-surface mb-4">
              Ready to Start Your Mentorly Journey?
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto mb-8 text-base">
              Join thousands of students and tutors transforming private education across Bangladesh.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/find-tutors"
                className="px-8 py-4 rounded-full bg-primary text-on-primary font-bold text-sm hover:opacity-95 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                Find a Tutor
              </Link>
              <Link
                href="/become-tutor"
                className="px-8 py-4 rounded-full border border-outline-variant/80 text-on-surface font-bold text-sm hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
              >
                Become a Tutor
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
