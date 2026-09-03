import React from "react"
import { Metadata } from "next"
import AuthImagePanel from "@/src/components/auth/AuthImagePanel"
import LoginForm from "@/src/components/auth/LoginForm"

export const metadata: Metadata = {
  title: "Login | Mentorly",
  description: "Login to your Mentorly account to continue learning or teaching.",
}

const LOGIN_GLASS_CARDS = [
  {
    icon: "verified",
    text: "Verified Tutors",
    iconColorClass: "text-emerald-300",
    bgClass: "bg-emerald-500/25",
    fillIcon: true,
    accentBorderClass: "border-emerald-400/40",
    accentRingClass: "hover:ring-emerald-400/25",
    cardTintClass: "bg-emerald-400/[0.04]",
  },
  {
    icon: "star",
    text: "4.9 Rating",
    iconColorClass: "text-amber-300",
    bgClass: "bg-amber-400/25",
    fillIcon: true,
    accentBorderClass: "border-amber-400/40",
    accentRingClass: "hover:ring-amber-400/25",
    cardTintClass: "bg-amber-400/[0.04]",
  },
  {
    icon: "groups",
    text: "10K+ Students",
    iconColorClass: "text-indigo-300",
    bgClass: "bg-indigo-500/25",
    fillIcon: true,
    accentBorderClass: "border-indigo-400/40",
    accentRingClass: "hover:ring-indigo-400/25",
    cardTintClass: "bg-indigo-400/[0.04]",
  },
  {
    icon: "calendar_today",
    text: "Available Today",
    iconColorClass: "text-teal-300",
    bgClass: "bg-teal-500/25",
    fillIcon: true,
    accentBorderClass: "border-teal-400/40",
    accentRingClass: "hover:ring-teal-400/25",
    cardTintClass: "bg-teal-400/[0.04]",
  },
]

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left side: Visual Panel (55% on desktop, top banner on mobile) */}
      <AuthImagePanel
        imageUrl="/assets/images/student.jpg"
        title="Learn Smarter.<br/>Grow Faster."
        subtitle="Connect with verified tutors and discover the right learning opportunities tailored just for you."
        glassCards={LOGIN_GLASS_CARDS}
        showBrand={false}
      />

      {/* Right side: Form (45% on desktop, below banner on mobile) */}
      <section className="w-full md:w-[45%] flex items-center justify-center p-6 md:p-12 lg:p-20 bg-surface-container-lowest">
        <LoginForm />
      </section>
    </main>
  )
}
