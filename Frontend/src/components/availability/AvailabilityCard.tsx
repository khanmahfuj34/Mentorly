"use client"

import React, { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import DayAvailabilityRow from "./DayAvailabilityRow"
import { updateMyAvailability } from "@/src/services/availability/availability.service"
import { DayOfWeek, IAvailabilitySlot, IDayScheduleState } from "@/src/types/availability"

const WEEK_DAYS: DayOfWeek[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]

const DEFAULT_SLOTS: Record<DayOfWeek, { startTime: string; endTime: string }> = {
  MONDAY: { startTime: "17:00", endTime: "20:00" },
  TUESDAY: { startTime: "17:00", endTime: "20:00" },
  WEDNESDAY: { startTime: "16:00", endTime: "19:00" },
  THURSDAY: { startTime: "17:00", endTime: "20:00" },
  FRIDAY: { startTime: "16:00", endTime: "19:00" },
  SATURDAY: { startTime: "10:00", endTime: "14:00" },
  SUNDAY: { startTime: "10:00", endTime: "14:00" },
}

interface AvailabilityCardProps {
  initialData: IAvailabilitySlot[]
}

export default function AvailabilityCard({ initialData }: AvailabilityCardProps) {
  // Initialize 7 days state from initialData or defaults
  const [schedules, setSchedules] = useState<IDayScheduleState[]>(() => {
    const existingMap = new Map<DayOfWeek, IAvailabilitySlot>()
    initialData.forEach((slot) => existingMap.set(slot.day, slot))

    return WEEK_DAYS.map((day) => {
      const existing = existingMap.get(day)
      const defaultTimes = DEFAULT_SLOTS[day]

      return {
        day,
        isAvailable: existing ? existing.isAvailable : false,
        startTime: existing?.startTime || defaultTimes.startTime,
        endTime: existing?.endTime || defaultTimes.endTime,
      }
    })
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleRowChange = (updated: IDayScheduleState) => {
    setSchedules((prev) =>
      prev.map((item) => (item.day === updated.day ? updated : item))
    )
  }

  // Validate form before saving
  const hasValidationErrors = schedules.some(
    (s) => s.isAvailable && (!!s.error || !s.startTime || !s.endTime || s.startTime >= s.endTime)
  )

  const handleSave = async () => {
    if (hasValidationErrors) {
      toast.error("Please fix invalid time ranges before saving.")
      return
    }

    setIsSaving(true)

    try {
      const payload: IAvailabilitySlot[] = schedules.map((s) => ({
        day: s.day,
        isAvailable: s.isAvailable,
        startTime: s.isAvailable ? s.startTime : null,
        endTime: s.isAvailable ? s.endTime : null,
      }))

      const res = await updateMyAvailability(payload)

      if (res.success) {
        toast.success("Availability updated successfully")
        // Update state with returned data if needed
        if (res.data && res.data.length > 0) {
          const updatedMap = new Map<DayOfWeek, IAvailabilitySlot>()
          res.data.forEach((slot) => updatedMap.set(slot.day, slot))

          setSchedules((prev) =>
            prev.map((item) => {
              const updatedSlot = updatedMap.get(item.day)
              if (updatedSlot) {
                return {
                  ...item,
                  isAvailable: updatedSlot.isAvailable,
                  startTime: updatedSlot.startTime || item.startTime,
                  endTime: updatedSlot.endTime || item.endTime,
                  error: undefined,
                }
              }
              return item
            })
          )
        }
      } else {
        toast.error(res.message || "Failed to update availability")
      }
    } catch (err) {
      let errorMsg = "Failed to update availability"
      if (axios.isAxiosError(err)) {
        errorMsg = err.response?.data?.message || err.message || errorMsg
      } else if (err instanceof Error) {
        errorMsg = err.message
      }
      toast.error(errorMsg)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Card Header */}
      <div className="border-b border-outline-variant/20 pb-5">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
          Weekly Availability
        </h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Set the days and times when you are available for tutoring.
        </p>
      </div>

      {/* Days Rows */}
      <div className="space-y-3.5">
        {schedules.map((schedule) => (
          <DayAvailabilityRow
            key={schedule.day}
            schedule={schedule}
            onChange={handleRowChange}
          />
        ))}
      </div>

      {/* Card Footer / Action */}
      <div className="pt-4 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-on-surface-variant/70 hidden sm:inline-block">
          Changes will take effect immediately for new booking requests.
        </span>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || hasValidationErrors}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-label-md font-semibold text-sm bg-primary text-on-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSaving ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">save</span>
              <span>Save Availability</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
