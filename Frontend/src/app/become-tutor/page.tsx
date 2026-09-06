"use client"

import React from "react"
import Link from "next/link"
import Navbar from "@/src/components/layout/Navbar"
import Footer from "@/src/components/layout/Footer"

export default function BecomeTutorPage() {
  const benefits = [
    {
      icon: "travel_explore",
      title: "Explore Open Tuition Opportunities",
      desc: "Access verified tuition posts matching your subject expertise, preferred locations, and target salary.",
    },
    {
      icon: "badge",
      title: "Build Your Professional Profile",
      desc: "Showcase your educational institution, qualifications, subjects, and teaching history to attract serious students.",
    },
    {
      icon: "send",
      title: "Streamlined Application Management",
      desc: "Submit direct applications, track proposal statuses, and receive instant updates when chosen.",
    },
    {
      icon: "dashboard",
      title: "Dedicated Tutor Dashboard",
      desc: "Organize session schedules, track active bookings, and maintain clear records of all your classes.",
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: "Register Your Tutor Account",
      desc: "Sign up in under 2 minutes with your basic details and academic specialization.",
    },
    {
      step: "02",
      title: "Complete Profile & Verification",
      desc: "Upload academic credentials and university ID to earn the Verified Tutor badge.",
    },
    {
      step: "03",
      title: "Apply to Tuition Openings",
      desc: "Browse tuition posts in your area and submit tailored teaching proposals.",
    },
    {
      step: "04",
      title: "Start Teaching & Grow",
      desc: "Get selected, manage bookings via your dashboard, and build your teaching reputation.",
    },
  ]

  const requirements = [
    "Minimum HSC / A-Levels completion or current enrollment in a recognized university",
    "Strong subject matter knowledge in your chosen teaching areas",
    "Valid Student ID or National Identity Card (NID) for identity verification",
    "Dedication to student progress, punctual class delivery, and professional communication",
  ]

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-surface min-h-screen text-on-surface">
        {/* Hero Banner */}
        <section className="bg-gradient-to-b from-primary/10 via-surface to-surface py-20 border-b border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full inline-block mb-4">
              Join Our Educator Network
            </span>
            <h1 className="font-display text-display text-on-surface max-w-3xl mx-auto leading-tight">
              Turn Your Knowledge Into Opportunity
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mt-4 leading-relaxed">
              Join 3,000+ tutors on Mentorly. Connect with students looking for dedicated tutors, build your teaching profile, and grow your education career.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="px-8 py-4 rounded-full bg-primary text-on-primary font-bold text-sm hover:opacity-95 shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                Become a Tutor Now
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 bg-white border-b border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
                Why Teach With Us
              </span>
              <h2 className="font-display text-display text-on-surface mt-3">Benefits of Joining Mentorly</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-surface-container-low/40 border border-outline-variant/20 flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">{benefit.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-on-surface mb-2">{benefit.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 bg-surface">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
                Getting Started
              </span>
              <h2 className="font-display text-display text-on-surface mt-3">How to Become a Mentorly Tutor</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((stepItem, idx) => (
                <div key={idx} className="bg-white p-7 rounded-3xl border border-outline-variant/20 relative group hover:border-primary/30 transition-all">
                  <div className="text-3xl font-extrabold text-primary/30 group-hover:text-primary transition-colors mb-4">
                    {stepItem.step}
                  </div>
                  <h3 className="font-bold text-base text-on-surface mb-2">{stepItem.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{stepItem.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements & Call to Action */}
        <section className="py-20 bg-white border-t border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
                Requirements
              </span>
              <h2 className="font-display text-display text-on-surface mt-3 mb-6">What We Look For</h2>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-emerald-600 text-lg mt-0.5">check_circle</span>
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary p-10 md:p-12 rounded-3xl text-on-primary text-center shadow-xl">
              <h3 className="font-display text-2xl font-bold text-white mb-3">Ready to Start Teaching?</h3>
              <p className="text-white/80 text-sm mb-8 leading-relaxed">
                Create your tutor account today and start browsing tuition opportunities tailored to your expertise.
              </p>
              <Link
                href="/register"
                className="px-8 py-4 rounded-full bg-white text-primary font-bold text-sm hover:shadow-xl active:scale-95 transition-all inline-block"
              >
                Create Tutor Profile
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
