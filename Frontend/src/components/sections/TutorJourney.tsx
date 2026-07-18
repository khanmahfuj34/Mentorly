import React from "react"

export default function TutorJourney() {
  const steps = [
    { num: 1, title: "Register Profile", desc: "Build your academic resume." },
    { num: 2, title: "Get Verified", desc: "Unlock the trust badge." },
    { num: 3, title: "Apply to Jobs", desc: "Connect with students." },
    { num: 4, title: "Teach & Earn", desc: "Start your teaching career." },
  ]

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-secondary mb-8 text-center lg:text-left">For Tutors</h3>
      <div className="space-y-8 relative">
        {steps.map((step) => (
          <div key={step.num} className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex-shrink-0 flex items-center justify-center font-bold relative z-10 select-none shadow">
              {step.num}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-on-surface">{step.title}</h4>
              <p className="text-xs text-on-surface-variant mt-0.5">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
