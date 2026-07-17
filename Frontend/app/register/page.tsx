import React from "react"
import { Metadata } from "next"
import AuthImagePanel from "@/components/auth/AuthImagePanel"
import RegisterForm from "@/components/auth/RegisterForm"

export const metadata: Metadata = {
  title: "Register - Mentorly",
  description: "Create an account on Mentorly to start learning or tutoring.",
}

const REGISTER_GLASS_CARDS = [
  {
    icon: "verified",
    text: "Verified Tutors",
    iconColorClass: "text-emerald-500",
    bgClass: "bg-emerald-500/10",
    fillIcon: true,
  },
  {
    icon: "group",
    text: "3000+ Tutors",
    iconColorClass: "text-primary",
    bgClass: "bg-primary/10",
    fillIcon: true,
  },
  {
    icon: "history_edu",
    text: "15000+ Sessions",
    iconColorClass: "text-primary",
    bgClass: "bg-primary/10",
    fillIcon: true,
  },
  {
    icon: "star",
    text: "Trusted Platform",
    iconColorClass: "text-emerald-500",
    bgClass: "bg-emerald-500/10",
    fillIcon: true,
  },
]

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left side: Visual Panel (55% on desktop, top banner on mobile) */}
      <AuthImagePanel
        imageUrl="/assets/images/student.jpg"
        title="Start Your<br/>Journey Today"
        subtitle="Join thousands of students and tutors already using Mentorly to unlock their potential and achieve academic excellence."
        glassCards={REGISTER_GLASS_CARDS}
        showBrand={true}
      />

      {/* Right side: Form (45% on desktop, below banner on mobile) */}
      <section className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-20 bg-surface-container-lowest overflow-y-auto">
        <RegisterForm />
      </section>
    </main>
  )
}
