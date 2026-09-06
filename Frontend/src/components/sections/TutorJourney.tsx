import React from "react"

export default function TutorJourney() {
  const steps = [
    {
      num: 1,
      title: "Create Your Profile",
      desc: "Show your education, experience and teaching expertise.",
      icon: "badge",
    },
    {
      num: 2,
      title: "Find Tuition",
      desc: "Browse tuition opportunities matching your preferences.",
      icon: "work_outline",
    },
    {
      num: 3,
      title: "Start Teaching",
      desc: "Apply, get selected and manage your bookings.",
      icon: "cast_for_education",
    },
  ]

  return (
    <div className="w-full bg-white p-8 rounded-3xl border border-outline-variant/20 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center font-bold">
          <span className="material-symbols-outlined">psychology</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-on-surface">For Tutors</h3>
          <p className="text-xs text-on-surface-variant font-medium">3 simple steps to start teaching</p>
        </div>
      </div>

      <div className="space-y-6 relative">
        {steps.map((step) => (
          <div key={step.num} className="flex gap-5 items-start relative group">
            <div className="w-11 h-11 rounded-2xl bg-secondary text-on-secondary flex-shrink-0 flex items-center justify-center font-bold shadow-md shadow-secondary/20 transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-lg">{step.icon}</span>
            </div>
            <div className="flex-1 pt-0.5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">
                  Step {step.num}
                </span>
                <h4 className="font-bold text-on-surface text-base">{step.title}</h4>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
