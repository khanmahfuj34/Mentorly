import React from "react"

export default function StudentJourney() {
  const steps = [
    {
      num: 1,
      title: "Find a Tutor",
      desc: "Browse tutors based on subject, location, class and preferences.",
      icon: "search",
    },
    {
      num: 2,
      title: "Apply / Connect",
      desc: "Choose the right tutor and send your application.",
      icon: "send",
    },
    {
      num: 3,
      title: "Start Learning",
      desc: "Once connected, manage your tutoring journey through Mentorly.",
      icon: "school",
    },
  ]

  return (
    <div className="w-full bg-white p-8 rounded-3xl border border-outline-variant/20 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
          <span className="material-symbols-outlined">person</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-on-surface">For Students</h3>
          <p className="text-xs text-on-surface-variant font-medium">3 simple steps to find your mentor</p>
        </div>
      </div>

      <div className="space-y-6 relative">
        {steps.map((step) => (
          <div key={step.num} className="flex gap-5 items-start relative group">
            <div className="w-11 h-11 rounded-2xl bg-primary text-on-primary flex-shrink-0 flex items-center justify-center font-bold shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-lg">{step.icon}</span>
            </div>
            <div className="flex-1 pt-0.5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
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
