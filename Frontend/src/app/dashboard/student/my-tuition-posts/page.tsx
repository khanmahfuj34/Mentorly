"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { getMyStudentProfile } from "@/src/services/student/student.service"
import {
  checkStudentProfileCompletion,
  ProfileCompletionResult,
} from "@/src/lib/profile-completion"

export default function MyTuitionPostsPage() {
  const [completion, setCompletion] = useState<ProfileCompletionResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true)
        const res = await getMyStudentProfile()
        const comp = checkStudentProfileCompletion(res?.data)
        setCompletion(comp)
      } catch (err) {
        setCompletion(checkStudentProfileCompletion(null))
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[400px]">
        <span className="material-symbols-outlined text-primary text-[48px] animate-spin mb-4 select-none">
          progress_activity
        </span>
        <p className="text-on-surface-variant font-body-md">Checking profile requirements...</p>
      </div>
    )
  }

  // If profile is incomplete, render warning state
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

          {/* Heading */}
          <h2 className="text-headline-md font-bold text-on-surface mb-3">
            Complete Your Profile First
          </h2>

          {/* Subtitle */}
          <p className="text-on-surface-variant font-body-md max-w-lg mb-8 leading-relaxed">
            You must complete your Academic Information, Location Details, and Guardian Information
            before posting a tuition request.
          </p>

          {/* Checklist Box */}
          <div className="w-full max-w-md bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 mb-8 text-left space-y-4">
            <p className="text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider">
              Missing Information:
            </p>

            <div className="space-y-3">
              {/* Academic */}
              <div className="flex items-center gap-3">
                <span
                  className={`material-symbols-outlined text-[22px] select-none ${
                    completion?.sectionStatus.academic ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {completion?.sectionStatus.academic ? "check_circle" : "cancel"}
                </span>
                <span
                  className={`text-sm font-medium ${
                    completion?.sectionStatus.academic
                      ? "text-on-surface"
                      : "text-red-600 font-semibold"
                  }`}
                >
                  Academic Information
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <span
                  className={`material-symbols-outlined text-[22px] select-none ${
                    completion?.sectionStatus.location ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {completion?.sectionStatus.location ? "check_circle" : "cancel"}
                </span>
                <span
                  className={`text-sm font-medium ${
                    completion?.sectionStatus.location
                      ? "text-on-surface"
                      : "text-red-600 font-semibold"
                  }`}
                >
                  Location Details
                </span>
              </div>

              {/* Guardian */}
              <div className="flex items-center gap-3">
                <span
                  className={`material-symbols-outlined text-[22px] select-none ${
                    completion?.sectionStatus.guardian ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {completion?.sectionStatus.guardian ? "check_circle" : "cancel"}
                </span>
                <span
                  className={`text-sm font-medium ${
                    completion?.sectionStatus.guardian
                      ? "text-on-surface"
                      : "text-red-600 font-semibold"
                  }`}
                >
                  Guardian Information
                </span>
              </div>
            </div>
          </div>

          {/* Action Link Button */}
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

  // Profile is 100% complete: render My Tuition Posts page
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:px-10 space-y-8">
      {/* Header with Post New Tuition Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/30 pb-6">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface mb-2">My Tuition Posts</h2>
          <p className="text-on-surface-variant font-body-md">
            Manage your active tuition requests and track tutor applications.
          </p>
        </div>
        <div>
          <button className="px-6 py-3.5 bg-primary text-on-primary font-semibold text-sm rounded-xl hover:opacity-95 transition-all shadow-md shadow-primary/20 flex items-center gap-2 cursor-pointer active:scale-95">
            <span className="material-symbols-outlined text-[20px] select-none">add</span>
            <span>Post New Tuition</span>
          </button>
        </div>
      </div>

      {/* Tuition Posts Content / List */}
      <div className="rounded-[28px] border border-outline-variant/30 bg-white p-8 shadow-sm text-center py-16">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-3xl select-none">post_add</span>
        </div>
        <h3 className="text-headline-sm font-bold text-on-surface mb-2">No Active Tuition Posts</h3>
        <p className="text-on-surface-variant font-body-md max-w-md mx-auto mb-6">
          You haven't posted any tuition requirements yet. Click below to create your first post!
        </p>
        <button className="px-6 py-3 bg-primary text-on-primary font-semibold text-sm rounded-xl hover:opacity-95 transition-all shadow-md shadow-primary/20 inline-flex items-center gap-2 cursor-pointer">
          <span className="material-symbols-outlined text-[18px] select-none">add</span>
          <span>Create First Post</span>
        </button>
      </div>
    </div>
  )
}
