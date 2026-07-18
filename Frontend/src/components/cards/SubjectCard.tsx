import React from "react"
import { Subject } from "@/types/common"

interface SubjectCardProps {
  subject: Subject
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <div className="p-6 bg-white rounded-24 border border-outline-variant/30 hover-lift text-center">
      <span className="material-symbols-outlined text-primary text-3xl mb-3 block select-none">
        {subject.icon}
      </span>
      <h4 className="font-bold text-sm text-on-surface">{subject.name}</h4>
      <p className="text-[10px] text-on-surface-variant mt-1">{subject.tutorCount}</p>
    </div>
  )
}
