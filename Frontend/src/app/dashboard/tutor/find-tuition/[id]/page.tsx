"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { getTutorSingleTuition } from "@/src/services/tutor/tuition.service"
import { applyToTuition, getMyApplications } from "@/src/services/tutor/application.service"
import { ITuitionRequest } from "@/src/types/tuition"

export default function TuitionDetailsPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()

  const [tuition, setTuition] = useState<ITuitionRequest | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasApplied, setHasApplied] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch tuition details and user application history
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const [tuitionRes, appsRes] = await Promise.all([
          getTutorSingleTuition(id),
          getMyApplications(),
        ])

        if (tuitionRes?.success) {
          setTuition(tuitionRes.data)
        }

        // Check if tutor already applied to this post
        if (appsRes?.success) {
          const applied = appsRes.data.some((app) => app.tuitionRequestId === id)
          setHasApplied(applied)
        }
      } catch (err) {
        toast.error("Failed to load tuition request details.")
        router.push("/dashboard/tutor/find-tuition")
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      loadData()
    }
  }, [id, router])

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (coverLetter.trim().length < 20) {
      toast.error("Cover letter must be at least 20 characters long.")
      return
    }

    try {
      setIsSubmitting(true)
      const res = await applyToTuition(id, { coverLetter: coverLetter.trim() })
      if (res?.success) {
        toast.success(res.message || "Application submitted successfully.")
        setHasApplied(true)
        setIsModalOpen(false)
        setCoverLetter("")
      }
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string }
      const errMsg = err?.response?.data?.message || err?.message || "Failed to submit application."
      toast.error(errMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[400px]">
        <span className="material-symbols-outlined text-primary text-[48px] animate-spin mb-4 select-none">
          progress_activity
        </span>
        <p className="text-on-surface-variant font-body-md">Loading tuition details...</p>
      </div>
    )
  }

  if (!tuition) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[400px]">
        <span className="material-symbols-outlined text-outline text-[48px] mb-4 select-none">
          error
        </span>
        <p className="text-on-surface-variant font-body-md">Tuition post not found.</p>
        <Link
          href="/dashboard/tutor/find-tuition"
          className="mt-4 text-sm font-bold text-primary hover:underline"
        >
          Back to Marketplace
        </Link>
      </div>
    )
  }

  const {
    subject,
    classLevel,
    medium,
    genderPreference,
    district,
    area,
    salary,
    daysPerWeek,
    description,
    status,
    createdAt,
    student,
  } = tuition

  // Format Salary
  const formattedSalary = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(salary)

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:px-10 space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/tutor/find-tuition"
        className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors select-none"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        <span>Back to Marketplace</span>
      </Link>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6">
            {/* Header info */}
            <div className="space-y-2 border-b border-outline-variant/20 pb-6">
              <h2 className="text-headline-lg font-bold text-on-surface leading-tight">
                {subject}
              </h2>
              <p className="text-on-surface-variant font-medium text-sm">
                For {classLevel} • {medium || "English"} Medium
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="space-y-1">
                <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Salary</span>
                <p className="font-semibold text-headline-sm text-primary">৳{formattedSalary}/mo</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Schedule</span>
                <p className="font-semibold text-title-lg text-on-surface">{daysPerWeek} Days/Week</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Gender Pref.</span>
                <p className="font-semibold text-title-lg text-on-surface capitalize">
                  {genderPreference === "ANY" || !genderPreference ? "Any Gender" : genderPreference.toLowerCase()}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Posted Date</span>
                <p className="font-semibold text-title-lg text-on-surface">
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Location Specs */}
            <div className="border-t border-outline-variant/20 pt-6 space-y-3">
              <h3 className="text-title-md font-bold text-on-surface">Location Details</h3>
              <div className="flex items-start gap-2.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px] text-primary shrink-0 select-none">location_on</span>
                <div className="text-sm font-medium leading-relaxed">
                  <p>{area}, {district}</p>
                  <p className="text-xs text-on-surface-variant/60 font-normal mt-0.5">
                    Specific details will be unlocked once application is accepted.
                  </p>
                </div>
              </div>
            </div>

            {/* Description Requirements */}
            <div className="border-t border-outline-variant/20 pt-6 space-y-3">
              <h3 className="text-title-md font-bold text-on-surface">Description & Requirements</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm font-normal whitespace-pre-line">
                {description || "No additional requirements specified by the student."}
              </p>
            </div>

            {/* Student Info */}
            {student && (
              <div className="border-t border-outline-variant/20 pt-6 space-y-3">
                <h3 className="text-title-md font-bold text-on-surface">Posted By (Student)</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm border border-primary/20 select-none">
                    {student.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-on-surface">{student.name}</p>
                    <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">Guardian Account</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sidebar Actions */}
        <aside className="lg:col-span-4 sticky top-24">
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <div className="space-y-1 pb-4 border-b border-outline-variant/20">
              <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider block">Tuition Salary</span>
              <p className="text-headline-md font-bold text-primary">৳{formattedSalary}</p>
              <span className="text-xs text-on-surface-variant/60 block">BDT / Month (Negotiable)</span>
            </div>

            {/* Status indicators */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant font-medium">Job Status</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant font-medium">Class Level</span>
                <span className="font-semibold text-on-surface">{classLevel}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant font-medium">Days per Week</span>
                <span className="font-semibold text-on-surface">{daysPerWeek} Days</span>
              </div>
            </div>

            {/* Apply Button CTA */}
            {hasApplied ? (
              <button
                disabled
                className="w-full h-14 bg-surface-container-low border border-outline-variant/20 text-outline font-semibold text-sm rounded-xl flex items-center justify-center gap-2 cursor-not-allowed select-none"
              >
                <span className="material-symbols-outlined text-[20px] select-none">check_circle</span>
                <span>Application Submitted</span>
              </button>
            ) : status !== "OPEN" ? (
              <button
                disabled
                className="w-full h-14 bg-surface-container-low border border-outline-variant/20 text-outline font-semibold text-sm rounded-xl flex items-center justify-center gap-2 cursor-not-allowed select-none"
              >
                <span className="material-symbols-outlined text-[20px] select-none">lock</span>
                <span>Job Closed</span>
              </button>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full h-14 bg-primary text-on-primary font-semibold text-sm rounded-xl hover:opacity-95 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] select-none">assignment_turned_in</span>
                <span>Apply Now</span>
              </button>
            )}
          </div>
        </aside>
      </div>

      {/* Application Cover Letter Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div
            onClick={() => !isSubmitting && setIsModalOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-lg bg-white rounded-[28px] border border-outline-variant/30 shadow-2xl p-6 md:p-8 z-10 flex flex-col space-y-6 animate-scale-up">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-headline-sm font-bold text-on-surface">Submit Tuition Application</h3>
              <button
                disabled={isSubmitting}
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-outline hover:text-on-surface cursor-pointer select-none disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block font-label-md text-sm text-on-surface">Cover Letter *</label>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-2">
                  Introduce yourself to the student's guardian. Describe your teaching experience in <strong>{subject}</strong> and explain why you're a good fit.
                </p>
                <textarea
                  required
                  placeholder="I have over 3 years of experience teaching mathematics and physics to high school students..."
                  rows={6}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md placeholder:text-outline text-on-surface resize-none disabled:opacity-50"
                />
                <div className="flex justify-between items-center text-xs text-on-surface-variant/60 font-semibold select-none">
                  <span>Minimum 20 characters required</span>
                  <span className={coverLetter.trim().length >= 20 ? "text-primary font-bold" : ""}>
                    {coverLetter.trim().length} chars
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setIsModalOpen(false)}
                  className="h-12 px-6 border border-outline-variant/30 text-on-surface font-semibold text-sm rounded-xl hover:bg-surface-container-low transition-all disabled:opacity-50 cursor-pointer select-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || coverLetter.trim().length < 20}
                  className="h-12 px-6 bg-primary text-on-primary font-semibold text-sm rounded-xl hover:opacity-95 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? "Submitting..." : "Submit Application"}</span>
                  {isSubmitting ? (
                    <span className="material-symbols-outlined text-[18px] animate-spin select-none">
                      progress_activity
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-[18px] select-none">
                      send
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
