"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import { ITutorPrivacyPreferences } from "@/src/types/tutorSettings.types"

export default function PrivacySettingsCard() {
  const [privacy, setPrivacy] = useState<ITutorPrivacyPreferences>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("mentorly_tutor_privacy_preferences")
        if (saved) return JSON.parse(saved)
      } catch {
        // Fallback
      }
    }
    return {
      showProfileToStudents: true,
      allowStudentsToContactMe: true,
    }
  })

  const savePrivacy = (updated: ITutorPrivacyPreferences) => {
    setPrivacy(updated)
    if (typeof window !== "undefined") {
      localStorage.setItem("mentorly_tutor_privacy_preferences", JSON.stringify(updated))
    }
    toast.success("Privacy settings updated.")
  }

  const handleToggle = (key: keyof ITutorPrivacyPreferences) => {
    const updated = { ...privacy, [key]: !privacy[key] }
    savePrivacy(updated)
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-outline-variant/20 pb-4">
        <h2 className="text-xl font-bold text-on-surface font-display">Privacy & Profile Visibility</h2>
        <p className="text-xs text-on-surface-variant mt-1">
          Control how your profile appears to students and who can get in touch with you.
        </p>
      </div>

      <div className="space-y-4">
        {/* Toggle 1: Show My Profile to Students */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/30 transition-all">
          <div className="pr-4 space-y-0.5">
            <h4 className="font-semibold text-sm text-on-surface">Show My Profile to Students</h4>
            <p className="text-xs text-on-surface-variant">
              Allow students to discover and view your tutor profile in search results.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={privacy.showProfileToStudents}
            onClick={() => handleToggle("showProfileToStudents")}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              privacy.showProfileToStudents ? "bg-primary" : "bg-outline-variant"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                privacy.showProfileToStudents ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Toggle 2: Allow Students to Contact Me */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/30 transition-all">
          <div className="pr-4 space-y-0.5">
            <h4 className="font-semibold text-sm text-on-surface">Allow Students to Contact Me</h4>
            <p className="text-xs text-on-surface-variant">
              Allow students to contact you regarding tuition opportunities and inquiries.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={privacy.allowStudentsToContactMe}
            onClick={() => handleToggle("allowStudentsToContactMe")}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              privacy.allowStudentsToContactMe ? "bg-primary" : "bg-outline-variant"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                privacy.allowStudentsToContactMe ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
