"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/src/hooks/useAuth"
import { getLocationOptions, getUpazilasByDistrict } from "@/src/lib/location-utils"

const SUBJECT_LIST = [
  "Mathematics",
  "Higher Math",
  "Physics",
  "Chemistry",
  "Biology",
  "ICT",
  "English",
  "Bangla",
]

export default function ProfilePage() {
  const { user } = useAuth()

  // Profile Form States
  const [classLevel, setClassLevel] = useState("")
  const [schoolCollege, setSchoolCollege] = useState("")
  const [preferredSubjects, setPreferredSubjects] = useState<string[]>([])
  const [district, setDistrict] = useState("")
  const [area, setArea] = useState("")
  const [guardianName, setGuardianName] = useState("")
  const [guardianPhone, setGuardianPhone] = useState("")

  // Location lists
  const { districts: allDistricts } = getLocationOptions()
  const availableAreas = district ? getUpazilasByDistrict(district) : []

  // Simulate reading from local storage or prefilled defaults for demo/UI-only state
  useEffect(() => {
    // Attempt to load mock defaults to show form interactions
    setClassLevel("")
    setSchoolCollege("")
    setPreferredSubjects([])
    setDistrict("")
    setArea("")
    setGuardianName("")
    setGuardianPhone("")
  }, [])

  const handleDistrictChange = (selectedDistrict: string) => {
    setDistrict(selectedDistrict)
    setArea("")
  }

  const handleSubjectToggle = (subject: string) => {
    if (preferredSubjects.includes(subject)) {
      setPreferredSubjects(preferredSubjects.filter((s) => s !== subject))
    } else {
      setPreferredSubjects([...preferredSubjects, subject])
    }
  }

  // Profile completion calculation
  const completionFields = [
    { label: "Class Level", completed: !!classLevel },
    { label: "School / College", completed: !!schoolCollege },
    { label: "Preferred Subjects", completed: preferredSubjects.length > 0 },
    { label: "District", completed: !!district },
    { label: "Area", completed: !!area },
    { label: "Guardian Name", completed: !!guardianName },
    { label: "Guardian Phone", completed: !!guardianPhone },
  ]

  const completedCount = completionFields.filter((f) => f.completed).length
  const totalFields = completionFields.length
  const completionPercentage = Math.round((completedCount / totalFields) * 100)

  // Color selection based on progress strength
  let progressColorClass = "bg-red-500"
  let progressTextClass = "text-red-500"
  let profileStrength = "Weak Profile"

  if (completionPercentage >= 80) {
    progressColorClass = "bg-primary"
    progressTextClass = "text-primary"
    profileStrength = "Strong Profile"
  } else if (completionPercentage >= 40) {
    progressColorClass = "bg-yellow-500"
    progressTextClass = "text-yellow-500"
    profileStrength = "Moderate Profile"
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:px-10">
      {/* Header Summary */}
      <div className="mb-8">
        <h2 className="text-headline-lg font-bold text-on-surface mb-2">My Student Profile</h2>
        <p className="text-on-surface-variant font-body-md">
          Keep your academic and location details up to date to get matched with the best tutors.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Form Area */}
        <form onSubmit={(e) => e.preventDefault()} className="lg:col-span-8 space-y-8">
          {/* Section 1: Basic Information */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-[28px] select-none">badge</span>
              <h3 className="text-headline-sm font-bold text-on-surface">Basic Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface-variant">Full Name</label>
                <input
                  type="text"
                  value={user?.name || "Mahfuj Khan"}
                  disabled
                  className="w-full h-12 px-4 bg-surface-container-low border border-outline-variant/30 rounded-xl font-body-md text-outline cursor-not-allowed outline-none select-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface-variant">Email Address</label>
                <input
                  type="email"
                  value={user?.email || "mahfuj@gmail.com"}
                  disabled
                  className="w-full h-12 px-4 bg-surface-container-low border border-outline-variant/30 rounded-xl font-body-md text-outline cursor-not-allowed outline-none select-none"
                />
              </div>
            </div>
            <p className="text-xs text-on-surface-variant/70 mt-4 leading-relaxed">
              * Basic account details are managed at the account registration level and are read-only.
            </p>
          </div>

          {/* Section 2: Academic Information */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-[28px] select-none">school</span>
              <h3 className="text-headline-sm font-bold text-on-surface">Academic Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">Class Level *</label>
                <input
                  type="text"
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                  placeholder="e.g. HSC 2027"
                  className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md placeholder:text-outline text-on-surface"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">School / College *</label>
                <input
                  type="text"
                  value={schoolCollege}
                  onChange={(e) => setSchoolCollege(e.target.value)}
                  placeholder="e.g. Notre Dame College"
                  className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md placeholder:text-outline text-on-surface"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Preferred Subjects */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-[28px] select-none">library_books</span>
              <h3 className="text-headline-sm font-bold text-on-surface">Preferred Subjects</h3>
            </div>
            <p className="text-sm text-on-surface-variant mb-6">
              Select the subjects you require assistance with. Tutors matching these subjects will be prioritized.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SUBJECT_LIST.map((subject) => {
                const isChecked = preferredSubjects.includes(subject)
                return (
                  <label
                    key={subject}
                    className={`flex items-center gap-3 rounded-2xl border p-4 cursor-pointer transition-all duration-200 select-none ${isChecked
                        ? "border-primary bg-primary/10 text-primary font-semibold shadow-sm"
                        : "border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-low"
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleSubjectToggle(subject)}
                      className="w-4 h-4 text-primary bg-surface-container-low border-outline-variant rounded focus:ring-primary cursor-pointer accent-primary"
                    />
                    <span className="text-sm">{subject}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Section 4: Location */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-[28px] select-none">location_on</span>
              <h3 className="text-headline-sm font-bold text-on-surface">Location Details</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">District *</label>
                <select
                  value={district}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface cursor-pointer"
                >
                  <option value="">Select District</option>
                  {allDistricts.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">Area / Thana *</label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  disabled={!district}
                  className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <option value="">{district ? "Select Area" : "Select District First"}</option>
                  {availableAreas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 5: Guardian Information */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-[28px] select-none">supervisor_account</span>
              <h3 className="text-headline-sm font-bold text-on-surface">Guardian Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">Guardian Name</label>
                <input
                  type="text"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  placeholder="Enter guardian's full name"
                  className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md placeholder:text-outline text-on-surface"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">Guardian Phone</label>
                <input
                  type="text"
                  value={guardianPhone}
                  onChange={(e) => setGuardianPhone(e.target.value)}
                  placeholder="e.g. 017XXXXXXXX"
                  className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md placeholder:text-outline text-on-surface"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Action Section */}
          <div className="flex justify-end pt-4">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="h-14 px-10 bg-primary text-on-primary font-label-md rounded-xl hover:opacity-95 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
              type="button"
            >
              <span className="font-semibold text-sm">Update Profile</span>
              <span className="material-symbols-outlined text-[20px] select-none">check_circle</span>
            </motion.button>
          </div>
        </form>

        {/* Profile Completion Panel (Desktop only) */}
        <aside className="lg:col-span-4 hidden lg:block sticky top-24">
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="text-headline-sm font-bold text-on-surface">Profile Strength</h3>

            {/* Circular/Radial strength container */}
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* Circular track SVG */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="#EFF4FF"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="var(--color-primary)"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 60}
                    strokeDashoffset={2 * Math.PI * 60 * (1 - completionPercentage / 100)}
                    className="transition-all duration-500 ease-out"
                    style={{ stroke: "color-mix(in srgb, var(--color-primary) 100%, transparent)" }}
                  />
                </svg>
                {/* Center text percentage */}
                <div className="absolute text-center">
                  <span className="text-headline-lg font-bold text-on-surface">{completionPercentage}%</span>
                  <p className="text-[10px] text-on-surface-variant font-bold tracking-wider uppercase mt-0.5">
                    Completed
                  </p>
                </div>
              </div>

              {/* Profile Strength text badge */}
              <span className={`px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider ${progressTextClass} bg-surface-container-low border border-outline-variant/10 shadow-sm`}>
                {profileStrength}
              </span>
            </div>

            {/* Checklist */}
            <div className="border-t border-outline-variant/30 pt-6 space-y-4">
              <h4 className="font-semibold text-sm text-on-surface">Details Checklist</h4>
              <ul className="space-y-3.5">
                {completionFields.map((field, index) => (
                  <li key={index} className="flex items-center gap-3.5">
                    <span className={`material-symbols-outlined text-[20px] select-none ${field.completed ? "text-primary" : "text-outline/40"
                      }`}>
                      {field.completed ? "check_circle" : "radio_button_unchecked"}
                    </span>
                    <span className={`text-sm ${field.completed ? "text-on-surface" : "text-on-surface-variant/60"
                      }`}>
                      {field.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}