import React from "react"

export default function StudentJourney() {
  const steps = [
    { num: 1, title: "Create Account", desc: "Join Mentorly in seconds." },
    { num: 2, title: "Post Tuition", desc: "Describe your needs and budget." },
    { num: 3, title: "Choose Tutor", desc: "Review verified applicants." },
    { num: 4, title: "Start Learning", desc: "Book classes and grow." },
  ]

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-primary mb-8 text-center lg:text-right">For Students</h3>
      <div className="space-y-8 relative">
        {steps.map((step) => (
          <div key={step.num} className="flex items-center gap-6 lg:flex-row-reverse">
            <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex-shrink-0 flex items-center justify-center font-bold relative z-10 select-none shadow">
              {step.num}
            </div>
            <div className="lg:text-right flex-1">
              <h4 className="font-bold text-on-surface">{step.title}</h4>
              <p className="text-xs text-on-surface-variant mt-0.5">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
