"use client"

import React from "react"

interface PasswordStrengthProps {
  password: string
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = () => {
    let score = 0
    if (!password) return { score, label: "", colorClass: "bg-outline-variant/30" }

    const criteria = [
      password.length >= 8, // Length >= 8
      /[A-Z]/.test(password), // Has uppercase
      /[a-z]/.test(password), // Has lowercase
      /[0-9]/.test(password), // Has digit
      /[^A-Za-z0-9]/.test(password), // Has special char
    ]

    score = criteria.filter(Boolean).length

    if (score <= 2) {
      return { score, label: "Weak Password", colorClass: "bg-red-500" }
    } else if (score === 3) {
      return { score, label: "Fair Password", colorClass: "bg-yellow-500" }
    } else if (score === 4) {
      return { score, label: "Strong Password", colorClass: "bg-emerald-500" }
    } else {
      return { score, label: "Very Strong Password", colorClass: "bg-indigo-500" }
    }
  }

  const { score, label, colorClass } = getStrength()

  const rules = [
    { label: "At least 8 characters long", met: password.length >= 8 },
    { label: "At least one uppercase letter (A-Z)", met: /[A-Z]/.test(password) },
    { label: "At least one lowercase letter (a-z)", met: /[a-z]/.test(password) },
    { label: "At least one number (0-9)", met: /[0-9]/.test(password) },
    { label: "At least one special character (@$!%*?&)", met: /[^A-Za-z0-9]/.test(password) },
  ]

  return (
    <div className="space-y-3 mt-2 text-xs">
      {/* Progress Bars */}
      <div className="flex justify-between items-center">
        <span className="font-semibold text-on-surface-variant font-label-sm">Strength:</span>
        <span className={`font-bold transition-colors ${
          score <= 2 ? "text-red-500" : score === 3 ? "text-yellow-600" : score === 4 ? "text-emerald-500" : "text-indigo-500"
        }`}>
          {label || "Enter password"}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 h-1.5">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`h-full rounded-full transition-all duration-300 ${
              index <= score ? colorClass : "bg-outline-variant/20"
            }`}
          />
        ))}
      </div>

      {/* Criteria Checklist */}
      <ul className="space-y-1.5 text-[11px] text-on-surface-variant">
        {rules.map((rule, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span
              className={`material-symbols-outlined text-[14px] leading-none transition-colors select-none ${
                rule.met ? "text-emerald-500 font-bold" : "text-outline-variant"
              }`}
              style={{ fontVariationSettings: rule.met ? "'FILL' 1" : "'FILL' 0" }}
            >
              {rule.met ? "check_circle" : "circle"}
            </span>
            <span className={rule.met ? "text-on-surface font-medium" : "text-on-surface-variant/80"}>
              {rule.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
