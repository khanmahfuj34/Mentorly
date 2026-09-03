"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IDayScheduleState } from "@/src/types/availability"

interface DayAvailabilityRowProps {
  schedule: IDayScheduleState
  onChange: (updated: IDayScheduleState) => void
}

// Generate time slots from 6:00 AM to 11:30 PM in 30-min intervals
const TIME_OPTIONS = Array.from({ length: 36 }).map((_, i) => {
  const totalMinutes = 6 * 60 + i * 30 // starts at 6:00 AM (360 mins)
  const hours24 = Math.floor(totalMinutes / 60) % 24
  const minutes = totalMinutes % 60
  const period = hours24 >= 12 ? "PM" : "AM"
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12

  const pad = (n: number) => n.toString().padStart(2, "0")
  const value24 = `${pad(hours24)}:${pad(minutes)}`
  const label12 = `${pad(hours12)}:${pad(minutes)} ${period}`

  return { value: value24, label: label12 }
})

export default function DayAvailabilityRow({ schedule, onChange }: DayAvailabilityRowProps) {
  const { day, isAvailable, startTime, endTime, error } = schedule

  // Format day display name (e.g., MONDAY -> Monday)
  const formattedDay = day.charAt(0) + day.slice(1).toLowerCase()

  const handleToggle = () => {
    const nextAvailable = !isAvailable
    onChange({
      ...schedule,
      isAvailable: nextAvailable,
      // Clear error when turning off
      error: nextAvailable ? schedule.error : undefined,
    })
  }

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStart = e.target.value
    let newErr: string | undefined = undefined

    if (endTime) {
      if (newStart >= endTime) {
        newErr = "End time must be later than start time."
      }
    }

    onChange({
      ...schedule,
      startTime: newStart,
      error: newErr,
    })
  }

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEnd = e.target.value
    let newErr: string | undefined = undefined

    if (startTime) {
      if (newEnd <= startTime) {
        newErr = "End time must be later than start time."
      }
    }

    onChange({
      ...schedule,
      endTime: newEnd,
      error: newErr,
    })
  }

  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        isAvailable
          ? "bg-white border-primary/20 shadow-sm"
          : "bg-surface/50 border-outline-variant/30 opacity-80"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Day Label & Availability Toggle */}
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                isAvailable ? "bg-emerald-500 shadow-sm shadow-emerald-500/50" : "bg-outline/40"
              }`}
            />
            <span className="font-display font-semibold text-base sm:text-lg text-on-surface">
              {formattedDay}
            </span>
          </div>

          {/* Toggle Button */}
          <button
            type="button"
            role="switch"
            aria-checked={isAvailable}
            onClick={handleToggle}
            className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
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

        {/* Right: Time Range Inputs or Status message */}
        <div className="flex-1 sm:flex-initial">
          <AnimatePresence mode="wait">
            {isAvailable ? (
              <motion.div
                key="time-inputs"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Start Time Select */}
                  <div className="flex-1 sm:flex-initial">
                    <label className="block text-[11px] font-medium text-on-surface-variant mb-1 sm:hidden">
                      Start Time
                    </label>
                    <div className="relative">
                      <select
                        value={startTime || "17:00"}
                        onChange={handleStartTimeChange}
                        className="w-full sm:w-36 px-3 py-2 text-sm font-medium rounded-xl bg-surface border border-outline-variant/50 text-on-surface hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer appearance-none pr-8"
                      >
                        {TIME_OPTIONS.map((opt) => (
                          <option key={`start-${opt.value}`} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined text-outline text-lg pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
                        expand_more
                      </span>
                    </div>
                  </div>

                  <span className="text-on-surface-variant font-medium text-sm pt-4 sm:pt-0">→</span>

                  {/* End Time Select */}
                  <div className="flex-1 sm:flex-initial">
                    <label className="block text-[11px] font-medium text-on-surface-variant mb-1 sm:hidden">
                      End Time
                    </label>
                    <div className="relative">
                      <select
                        value={endTime || "20:00"}
                        onChange={handleEndTimeChange}
                        className="w-full sm:w-36 px-3 py-2 text-sm font-medium rounded-xl bg-surface border border-outline-variant/50 text-on-surface hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer appearance-none pr-8"
                      >
                        {TIME_OPTIONS.map((opt) => (
                          <option key={`end-${opt.value}`} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined text-outline text-lg pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="unavailable-msg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant/70 italic py-2 sm:py-0"
              >
                <span className="material-symbols-outlined text-sm">block</span>
                <span>Not available for tutoring</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Validation Error Banner */}
      {isAvailable && error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-xs text-red-600 font-medium mt-2 flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm text-red-500">error</span>
          <span>{error}</span>
        </motion.p>
      )}
    </motion.div>
  )
}
