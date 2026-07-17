"use client"

import React from "react"
import { motion } from "framer-motion"

interface RoleSelectorProps {
  selectedRole: "student" | "tutor"
  onChange: (role: "student" | "tutor") => void
}

export default function RoleSelector({ selectedRole, onChange }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Student Option */}
      <button
        onClick={() => onChange("student")}
        className={`text-left p-4 rounded-xl border transition-all flex flex-col gap-3 group cursor-pointer ${
          selectedRole === "student"
            ? "border-primary bg-surface shadow-md shadow-primary/10"
            : "border-outline-variant hover:border-primary/50 bg-white"
        }`}
        type="button"
      >
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 ${
            selectedRole === "student" ? "bg-primary/20" : "bg-surface-container-low"
          }`}
        >
          <span className="material-symbols-outlined text-primary text-xl">person</span>
        </div>
        <div>
          <p className="font-label-md text-on-surface font-semibold text-sm">Student</p>
          <p className="text-[11px] text-on-surface-variant leading-tight mt-0.5">
            I want to learn and grow.
          </p>
        </div>
      </button>

      {/* Tutor Option */}
      <button
        onClick={() => onChange("tutor")}
        className={`text-left p-4 rounded-xl border transition-all flex flex-col gap-3 group cursor-pointer ${
          selectedRole === "tutor"
            ? "border-primary bg-surface shadow-md shadow-primary/10"
            : "border-outline-variant hover:border-primary/50 bg-white"
        }`}
        type="button"
      >
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 ${
            selectedRole === "tutor" ? "bg-secondary-container/30" : "bg-surface-container-low"
          }`}
        >
          <span className="material-symbols-outlined text-secondary text-xl">school</span>
        </div>
        <div>
          <p className="font-label-md text-on-surface font-semibold text-sm">Tutor</p>
          <p className="text-[11px] text-on-surface-variant leading-tight mt-0.5">
            I want to share my knowledge.
          </p>
        </div>
      </button>
    </div>
  )
}
