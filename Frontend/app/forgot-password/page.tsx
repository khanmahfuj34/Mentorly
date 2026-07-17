import React from "react"
import { Metadata } from "next"
import AuthImagePanel from "@/components/auth/AuthImagePanel"
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm"

export const metadata: Metadata = {
  title: "Forgot Password | Mentorly",
  description: "Request a password reset link to regain access to your Mentorly account.",
}

const FORGOT_GLASS_CARDS = [
  {
    icon: "verified",
    text: "Verified Tutors",
    iconColorClass: "text-emerald-500",
    bgClass: "bg-emerald-500/10",
  },
  {
    icon: "star",
    text: "4.9 Rating",
    iconColorClass: "text-yellow-500",
    bgClass: "bg-yellow-500/10",
    fillIcon: true,
  },
  {
    icon: "groups",
    text: "10K+ Students",
    iconColorClass: "text-primary",
    bgClass: "bg-primary/10",
  },
  {
    icon: "calendar_today",
    text: "Available Today",
    iconColorClass: "text-emerald-600",
    bgClass: "bg-emerald-500/10",
  },
]

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left side: Visual Panel (55% on desktop, top banner on mobile) */}
      <AuthImagePanel
        imageUrl="/assets/images/student.jpg"
        title="Learn Smarter.<br/>Grow Faster."
        subtitle="Connect with verified tutors and discover the right learning opportunities tailored just for you."
        glassCards={FORGOT_GLASS_CARDS}
        showBrand={false}
      />

      {/* Right side: Form (45% on desktop, below banner on mobile) */}
      <section className="w-full md:w-[45%] flex items-center justify-center p-6 md:p-12 lg:p-20 bg-surface-container-lowest">
        <ForgotPasswordForm />
      </section>
    </main>
  )
}
