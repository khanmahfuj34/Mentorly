"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { getMyStudentProfile } from "@/src/services/student/student.service"
import { createTuitionRequest } from "@/src/services/student/tuition.service"
import { getLocationOptions, getUpazilasByDistrict } from "@/src/lib/location-utils"
import { getAcademicLevels, getSubjectsByLevel } from "@/src/lib/academic-utils"
import {
  checkStudentProfileCompletion,
  ProfileCompletionResult,
} from "@/src/lib/profile-completion"

export default function NewTuitionPostPage() {
  const router = useRouter()

  // Profile status states
  const [completion, setCompletion] = useState<ProfileCompletionResult | null>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)

  // Form states
  const [classLevel, setClassLevel] = useState("")
  const [subject, setSubject] = useState("")
  const [medium, setMedium] = useState("")
  const [genderPreference, setGenderPreference] = useState("Any")
  const [district, setDistrict] = useState("")
  const [area, setArea] = useState("")
  const [address, setAddress] = useState("")
  const [salary, setSalary] = useState("")
  const [daysPerWeek, setDaysPerWeek] = useState("")
  const [description, setDescription] = useState("")

  // Submission and error states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Dropdown lists
  const { districts: allDistricts } = getLocationOptions()
  const availableAreas = district ? getUpazilasByDistrict(district) : []
  const allAcademicLevels = getAcademicLevels()
  const availableSubjects = classLevel ? getSubjectsByLevel(classLevel) : []

  // Fetch profile to verify completion and pre-fill form
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoadingProfile(true)
        const res = await getMyStudentProfile()
        const comp = checkStudentProfileCompletion(res?.data)
        setCompletion(comp)

        if (comp.isComplete && res?.data) {
          const profile = res.data
          setClassLevel(profile.classLevel || "")
          setDistrict(profile.district || "")
          setArea(profile.area || "")

          // Prefill subject with first preferred subject if available
          if (profile.preferredSubjects && profile.preferredSubjects.length > 0) {
            setSubject(profile.preferredSubjects[0])
          }
        }
      } catch (err) {
        setCompletion(checkStudentProfileCompletion(null))
      } finally {
        setIsLoadingProfile(false)
      }
    }

    fetchProfile()
  }, [])

  const handleDistrictChange = (selectedDistrict: string) => {
    setDistrict(selectedDistrict)
    setArea("")
    if (errors.district) {
      setErrors((prev) => ({ ...prev, district: "" }))
    }
  }

  const handleClassLevelChange = (selectedLevel: string) => {
    setClassLevel(selectedLevel)
    setSubject("") // Reset subject selection when class level changes
    if (errors.classLevel) {
      setErrors((prev) => ({ ...prev, classLevel: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!subject) newErrors.subject = "Subject is required"
    if (!classLevel) newErrors.classLevel = "Class level is required"
    if (!district) newErrors.district = "District is required"
    if (!area) newErrors.area = "Area/Thana is required"
    if (!address.trim()) newErrors.address = "Full address is required"
    
    if (!salary) {
      newErrors.salary = "Monthly salary is required"
    } else if (isNaN(Number(salary)) || Number(salary) <= 0) {
      newErrors.salary = "Salary must be a positive number"
    }

    if (!daysPerWeek) {
      newErrors.daysPerWeek = "Days per week is required"
    } else {
      const days = Number(daysPerWeek)
      if (isNaN(days) || days < 1 || days > 7) {
        newErrors.daysPerWeek = "Days per week must be between 1 and 7"
      }
    }

    if (!description.trim()) newErrors.description = "Description is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fix all errors before submitting.")
      return
    }

    try {
      setIsSubmitting(true)
      
      // Combine address and description for the backend payload
      const combinedDescription = `Address: ${address.trim()}\n\nDescription: ${description.trim()}`

      const payload = {
        subject,
        classLevel,
        medium: medium || undefined,
        genderPreference: genderPreference || undefined,
        district,
        area,
        salary: Number(salary),
        daysPerWeek: Number(daysPerWeek),
        description: combinedDescription,
      }

      const res = await createTuitionRequest(payload)
      
      toast.success(res?.message || "Tuition posted successfully.")
      router.push("/dashboard/student/my-tuition-posts")
      
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string }
      const errorMessage =
        err?.response?.data?.message || err?.message || "Failed to post tuition request."
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoadingProfile) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[400px]">
        <span className="material-symbols-outlined text-primary text-[48px] animate-spin mb-4 select-none">
          progress_activity
        </span>
        <p className="text-on-surface-variant font-body-md">Checking profile requirements...</p>
      </div>
    )
  }

  // If profile is incomplete, render warning state and block access
  if (!completion?.isComplete) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-white border border-outline-variant/30 rounded-[28px] p-8 md:p-12 shadow-sm flex flex-col items-center"
        >
          {/* Warning Icon Badge */}
          <div className="w-20 h-20 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-4xl select-none">lock</span>
          </div>

          <h2 className="text-headline-md font-bold text-on-surface mb-3">
            Complete Your Profile First
          </h2>

          <p className="text-on-surface-variant font-body-md max-w-lg mb-8 leading-relaxed">
            You must complete your Academic Information, Location Details, and Guardian Information
            before posting a tuition request.
          </p>

          <div className="w-full max-w-md bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 mb-8 text-left space-y-4">
            <p className="text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider">
              Missing Information:
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-[22px] select-none ${completion?.sectionStatus.academic ? "text-emerald-600" : "text-red-500"}`}>
                  {completion?.sectionStatus.academic ? "check_circle" : "cancel"}
                </span>
                <span className={`text-sm font-medium ${completion?.sectionStatus.academic ? "text-on-surface" : "text-red-600 font-semibold"}`}>
                  Academic Information
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-[22px] select-none ${completion?.sectionStatus.location ? "text-emerald-600" : "text-red-500"}`}>
                  {completion?.sectionStatus.location ? "check_circle" : "cancel"}
                </span>
                <span className={`text-sm font-medium ${completion?.sectionStatus.location ? "text-on-surface" : "text-red-600 font-semibold"}`}>
                  Location Details
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-[22px] select-none ${completion?.sectionStatus.guardian ? "text-emerald-600" : "text-red-500"}`}>
                  {completion?.sectionStatus.guardian ? "check_circle" : "cancel"}
                </span>
                <span className={`text-sm font-medium ${completion?.sectionStatus.guardian ? "text-on-surface" : "text-red-600 font-semibold"}`}>
                  Guardian Information
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard/student/profile"
            className="px-8 py-4 bg-primary text-on-primary font-semibold text-sm rounded-xl hover:opacity-95 transition-all shadow-md shadow-primary/20 flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>Go To Profile</span>
            <span className="material-symbols-outlined text-[18px] select-none">
              arrow_forward
            </span>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:px-10">
      {/* Breadcrumbs and Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-3">
          <Link href="/dashboard/student/my-tuition-posts" className="hover:text-primary transition-all">
            My Tuition Posts
          </Link>
          <span className="material-symbols-outlined text-[16px] select-none">chevron_right</span>
          <span className="text-on-surface font-semibold">Post New Tuition</span>
        </div>
        <h2 className="text-headline-lg font-bold text-on-surface mb-2">Create a New Tuition Request</h2>
        <p className="text-on-surface-variant font-body-md">
          Provide your tuition requirements to get custom applications from experienced tutors.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Form Body */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Academic Information */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
              <span className="material-symbols-outlined text-primary text-[28px] select-none">school</span>
              <h3 className="text-headline-sm font-bold text-on-surface">Academic Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Class Level */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">Class Level *</label>
                <select
                  value={classLevel}
                  onChange={(e) => handleClassLevelChange(e.target.value)}
                  className={`w-full h-12 px-4 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface cursor-pointer ${
                    errors.classLevel ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                  }`}
                >
                  <option value="">Select Class Level</option>
                  {allAcademicLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
                {errors.classLevel && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.classLevel}</p>
                )}
              </div>

              {/* Subject selection */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">Subject *</label>
                <select
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value)
                    if (errors.subject) setErrors((prev) => ({ ...prev, subject: "" }))
                  }}
                  disabled={!classLevel}
                  className={`w-full h-12 px-4 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                    errors.subject ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                  }`}
                >
                  <option value="">{classLevel ? "Select Subject" : "Select Class Level First"}</option>
                  {availableSubjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.subject}</p>
                )}
              </div>
            </div>

            {/* Medium */}
            <div className="space-y-1.5">
              <label className="block font-label-md text-sm text-on-surface">Medium</label>
              <select
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface cursor-pointer"
              >
                <option value="">Select Medium</option>
                <option value="Bangla Medium">Bangla Medium</option>
                <option value="English Medium">English Medium</option>
                <option value="English Version">English Version</option>
              </select>
            </div>
          </div>

          {/* Section 2: Tutor Preference */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
              <span className="material-symbols-outlined text-primary text-[28px] select-none">person_search</span>
              <h3 className="text-headline-sm font-bold text-on-surface">Tutor Preference</h3>
            </div>

            <div className="space-y-1.5">
              <label className="block font-label-md text-sm text-on-surface">Preferred Tutor Gender</label>
              <div className="flex flex-wrap gap-4">
                {["Any", "Male", "Female"].map((gender) => (
                  <label
                    key={gender}
                    className={`flex-1 flex items-center justify-center h-12 rounded-xl border text-sm font-semibold cursor-pointer transition-all duration-200 select-none ${
                      genderPreference === gender
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-low"
                    }`}
                  >
                    <input
                      type="radio"
                      name="genderPreference"
                      value={gender}
                      checked={genderPreference === gender}
                      onChange={() => setGenderPreference(gender)}
                      className="sr-only"
                    />
                    <span>{gender}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Location */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
              <span className="material-symbols-outlined text-primary text-[28px] select-none">location_on</span>
              <h3 className="text-headline-sm font-bold text-on-surface">Location Details</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* District */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">District *</label>
                <select
                  value={district}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className={`w-full h-12 px-4 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface cursor-pointer ${
                    errors.district ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                  }`}
                >
                  <option value="">Select District</option>
                  {allDistricts.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.district}</p>
                )}
              </div>

              {/* Area / Thana */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">Area / Thana *</label>
                <select
                  value={area}
                  onChange={(e) => {
                    setArea(e.target.value)
                    if (errors.area) setErrors((prev) => ({ ...prev, area: "" }))
                  }}
                  disabled={!district}
                  className={`w-full h-12 px-4 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                    errors.area ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                  }`}
                >
                  <option value="">{district ? "Select Area" : "Select District First"}</option>
                  {availableAreas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                {errors.area && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.area}</p>
                )}
              </div>
            </div>

            {/* Full Address */}
            <div className="space-y-1.5">
              <label className="block font-label-md text-sm text-on-surface">Full Address *</label>
              <textarea
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value)
                  if (errors.address) setErrors((prev) => ({ ...prev, address: "" }))
                }}
                placeholder="Enter your specific address (e.g. Apt 4B, House 12, Road 5, Sector 4, Uttara, Dhaka)"
                rows={3}
                className={`w-full px-4 py-3 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md placeholder:text-outline text-on-surface resize-none ${
                  errors.address ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs font-semibold mt-1">{errors.address}</p>
              )}
            </div>
          </div>

          {/* Section 4: Tuition Details */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
              <span className="material-symbols-outlined text-primary text-[28px] select-none">payments</span>
              <h3 className="text-headline-sm font-bold text-on-surface">Tuition Details</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Monthly Salary */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">Monthly Salary (BDT) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-outline">৳</span>
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => {
                      setSalary(e.target.value)
                      if (errors.salary) setErrors((prev) => ({ ...prev, salary: "" }))
                    }}
                    placeholder="e.g. 5000"
                    className={`w-full h-12 pl-8 pr-4 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface ${
                      errors.salary ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                    }`}
                  />
                </div>
                {errors.salary && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.salary}</p>
                )}
              </div>

              {/* Days Per Week */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">Days Per Week *</label>
                <select
                  value={daysPerWeek}
                  onChange={(e) => {
                    setDaysPerWeek(e.target.value)
                    if (errors.daysPerWeek) setErrors((prev) => ({ ...prev, daysPerWeek: "" }))
                  }}
                  className={`w-full h-12 px-4 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface cursor-pointer ${
                    errors.daysPerWeek ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                  }`}
                >
                  <option value="">Select Days</option>
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "day" : "days"} per week
                    </option>
                  ))}
                </select>
                {errors.daysPerWeek && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.daysPerWeek}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 5: Description */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
              <span className="material-symbols-outlined text-primary text-[28px] select-none">description</span>
              <h3 className="text-headline-sm font-bold text-on-surface">Description</h3>
            </div>

            <div className="space-y-1.5">
              <label className="block font-label-md text-sm text-on-surface">Tuition Requirements *</label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                  if (errors.description) setErrors((prev) => ({ ...prev, description: "" }))
                }}
                placeholder="Describe your tuition requirements (e.g., student's weak topics, preferred background of tutor, schedule requirements, exam preparations, etc.)..."
                rows={5}
                className={`w-full px-4 py-3 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md placeholder:text-outline text-on-surface resize-none ${
                  errors.description ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs font-semibold mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Link
              href="/dashboard/student/my-tuition-posts"
              className="h-14 px-8 border border-outline-variant/50 text-on-surface font-semibold text-sm rounded-xl hover:bg-surface-container-low transition-all duration-200 flex items-center justify-center active:scale-95 cursor-pointer"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-10 bg-primary text-on-primary font-semibold text-sm rounded-xl hover:opacity-95 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? "Posting..." : "Post Tuition"}</span>
              {isSubmitting ? (
                <span className="material-symbols-outlined text-[20px] animate-spin select-none">
                  progress_activity
                </span>
              ) : (
                <span className="material-symbols-outlined text-[20px] select-none">
                  send
                </span>
              )}
            </button>
          </div>
        </form>

        {/* Live Preview Panel (Desktop only) */}
        <aside className="lg:col-span-4 hidden lg:block sticky top-24">
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="text-headline-sm font-bold text-on-surface">Live Preview</h3>
            
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 space-y-4">
              <div>
                <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Subject</span>
                <p className="font-bold text-headline-sm text-primary leading-tight mt-0.5">{subject || "Not specified"}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-outline-variant/20">
                {/* Class */}
                <div className="flex items-center gap-2.5 text-sm text-on-surface">
                  <span className="material-symbols-outlined text-[20px] text-primary select-none">school</span>
                  <span className="font-medium">Class: <strong className="text-on-surface">{classLevel || "Not specified"}</strong></span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2.5 text-sm text-on-surface">
                  <span className="material-symbols-outlined text-[20px] text-primary select-none">location_on</span>
                  <span className="font-medium">
                    Location:{" "}
                    <strong className="text-on-surface">
                      {area && district ? `${area}, ${district}` : "Not specified"}
                    </strong>
                  </span>
                </div>

                {/* Salary */}
                <div className="flex items-center gap-2.5 text-sm text-on-surface">
                  <span className="material-symbols-outlined text-[20px] text-primary select-none">payments</span>
                  <span className="font-medium">
                    Salary:{" "}
                    <strong className="text-primary">
                      {salary ? `৳${Number(salary).toLocaleString()}/month` : "Not specified"}
                    </strong>
                  </span>
                </div>

                {/* Schedule */}
                <div className="flex items-center gap-2.5 text-sm text-on-surface">
                  <span className="material-symbols-outlined text-[20px] text-primary select-none">calendar_month</span>
                  <span className="font-medium">
                    Schedule:{" "}
                    <strong className="text-on-surface">
                      {daysPerWeek ? `${daysPerWeek} days/week` : "Not specified"}
                    </strong>
                  </span>
                </div>

                {/* Preferred Gender */}
                <div className="flex items-center gap-2.5 text-sm text-on-surface">
                  <span className="material-symbols-outlined text-[20px] text-primary select-none">person_search</span>
                  <span className="font-medium">
                    Preferred Gender: <strong className="text-on-surface">{genderPreference}</strong>
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant/70 text-center leading-relaxed">
              This preview shows how your tuition request will look to tutors matching your requirements.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
