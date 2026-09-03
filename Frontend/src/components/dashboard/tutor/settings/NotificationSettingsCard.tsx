"use client"

import React, { useState } from "react"
import { toast } from "sonner"

interface ITutorNotificationState {
  newApplications: boolean
  applicationStatusUpdates: boolean
  bookingUpdates: boolean
  systemNotifications: boolean
}

export default function NotificationSettingsCard() {
  const [prefs, setPrefs] = useState<ITutorNotificationState>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("mentorly_tutor_notification_preferences")
        if (saved) return JSON.parse(saved)
      } catch {
        // Fallback
      }
    }
    return {
      newApplications: true,
      applicationStatusUpdates: true,
      bookingUpdates: true,
      systemNotifications: true,
    }
  })

  // Master toggle state: true if all 4 are true
  const isAllEnabled =
    prefs.newApplications &&
    prefs.applicationStatusUpdates &&
    prefs.bookingUpdates &&
    prefs.systemNotifications

  const savePrefs = (updated: ITutorNotificationState) => {
    setPrefs(updated)
    if (typeof window !== "undefined") {
      localStorage.setItem("mentorly_tutor_notification_preferences", JSON.stringify(updated))
    }
    toast.success("Notification preferences updated.")
  }

  const handleMasterToggle = () => {
    const nextState = !isAllEnabled
    const updated: ITutorNotificationState = {
      newApplications: nextState,
      applicationStatusUpdates: nextState,
      bookingUpdates: nextState,
      systemNotifications: nextState,
    }
    savePrefs(updated)
  }

  const handleSingleToggle = (key: keyof ITutorNotificationState) => {
    const updated: ITutorNotificationState = {
      ...prefs,
      [key]: !prefs[key],
    }
    savePrefs(updated)
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-outline-variant/20 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-on-surface font-display">Notification Preferences</h2>
          <p className="text-xs text-on-surface-variant mt-1">
            Choose which alerts and updates you want to receive on your dashboard.
          </p>
        </div>

        {/* Master Enable All Toggle */}
        <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2.5 rounded-2xl border border-outline-variant/30 w-fit">
          <span className="text-xs font-semibold text-on-surface">Enable All Notifications</span>
          <button
            type="button"
            role="switch"
            aria-checked={isAllEnabled}
            onClick={handleMasterToggle}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
              isAllEnabled ? "bg-primary" : "bg-outline-variant"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isAllEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Toggles List */}
      <div className="space-y-3">
        {[
          {
            key: "newApplications",
            label: "New Applications",
            desc: "Get notified when a student submits a new application or request to hire you.",
          },
          {
            key: "applicationStatusUpdates",
            label: "Application Status Updates",
            desc: "Receive alerts when students accept or respond to your tuition applications.",
          },
          {
            key: "bookingUpdates",
            label: "Booking Updates",
            desc: "Status alerts on active student bookings, schedules, and completion requests.",
          },
          {
            key: "systemNotifications",
            label: "System Notifications",
            desc: "Platform updates, maintenance announcements, and important safety guidelines.",
          },
        ].map((item) => {
          const isChecked = prefs[item.key as keyof ITutorNotificationState]
          return (
            <div
              key={item.key}
              className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/30 transition-all"
            >
              <div className="pr-4 space-y-0.5">
                <h4 className="font-semibold text-sm text-on-surface">{item.label}</h4>
                <p className="text-xs text-on-surface-variant">{item.desc}</p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={isChecked}
                onClick={() => handleSingleToggle(item.key as keyof ITutorNotificationState)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isChecked ? "bg-primary" : "bg-outline-variant"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isChecked ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
