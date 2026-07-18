import React from "react"
import { UNIVERSITIES } from "@/constants/universities"
import UniversityCard from "@/src/components/cards/UniversityCard"

export default function TrustedUniversities() {
  return (
    <section className="py-stack-lg bg-surface-container-low/50">
      <div className="max-w-container-max mx-auto px-margin-desktop text-center">
        <p className="text-xs uppercase font-bold text-on-surface-variant mb-stack-md tracking-widest select-none">
          Tutors from top universities
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          {UNIVERSITIES.map((uni, idx) => (
            <UniversityCard key={idx} name={uni} />
          ))}
        </div>
      </div>
    </section>
  )
}
