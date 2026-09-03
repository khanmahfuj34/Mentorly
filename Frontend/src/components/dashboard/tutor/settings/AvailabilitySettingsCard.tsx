"use client"

import React, { useState } from "react"
import { toast } from "sonner"

export default function AvailabilitySettingsCard() {
  const [isAvailable, setIsAvailable] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mentorly_tutor_availability_toggle")
      if (saved !== null) {
        return saved === "true"
      }
    }
    return true // Default available
  })

  const handleToggle = () => {
    const nextState = !isAvailable
    setIsAvailable(nextState)

    if (typeof window !== "undefined") {
      localStorage.setItem("mentorly_tutor_availability_toggle", String(nextState))
    }

    if (nextState) {
      toast.success("You are now marked as available for new tuition opportunities!")
    } else {
      toast.info("You are now marked as unavailable for new tuition opportunities.")
    }
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-outline-variant/20 pb-4">
        <h2 className="text-xl font-bold text-on-surface font-display">Tuition Availability</h2>
        <p className="text-xs text-on-surface-variant mt-1">
          Quickly switch whether students can see you as accepting new tuitions.
        </p>
      </div>

      {/* Main Toggle Box */}
      <div className="p-5 rounded-2xl bg-surface/50 border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-semibold text-sm sm:text-base text-on-surface">Available for Tuition</h4>
          <p className="text-xs text-on-surface-variant">
            When enabled, students searching for tutors can view your profile and contact you.
          </p>
        </div>

        {/* Toggle Switch */}
        <button
          type="button"
          role="switch"
          aria-checked={isAvailable}
          onClick={handleToggle}
          className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            isAvailable ? "bg-primary" : "bg-outline-variant/60"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
              isAvailable ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Dynamic Status Display */}
      <div
        className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-2 transition-all ${
          isAvailable
            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
            : "bg-surface-container-low text-on-surface-variant border-outline-variant/30"
        }`}
      >
        <span
          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
            isAvailable ? "bg-emerald-500 shadow-sm shadow-emerald-500/50" : "bg-outline/50"
          }`}
        />
        <span>
          {isAvailable
            ? "You're currently available for new tuition opportunities."
            : "You're currently unavailable for new tuition opportunities."}
        </span>
      </div>
    </div>
  )
}
