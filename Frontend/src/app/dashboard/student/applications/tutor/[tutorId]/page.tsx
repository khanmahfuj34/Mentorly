"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { getTutorProfileById } from "@/src/services/tutor/tutor.service"
import { ITutorProfile } from "@/src/types/tutor"

export default function TutorPublicProfilePage() {
  const { tutorId } = useParams() as { tutorId: string }
  const router = useRouter()

  const [profile, setProfile] = useState<ITutorProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true)
        const res = await getTutorProfileById(tutorId)
        if (res.success) {
          setProfile(res.data)
        } else {
          toast.error("Failed to load tutor profile.")
          router.push("/dashboard/student/applications")
        }
      } catch (err: any) {
        toast.error(err?.response?.data?.message || err?.message || "Failed to load profile details.")
        router.push("/dashboard/student/applications")
      } finally {
        setIsLoading(false)
      }
    }

    if (tutorId) {
      loadProfile()
    }
  }, [tutorId, router])

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[400px]">
        <span className="material-symbols-outlined text-primary text-[48px] animate-spin mb-4 select-none">
          progress_activity
        </span>
        <p className="text-on-surface-variant font-body-md">Loading tutor profile...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[400px]">
        <span className="material-symbols-outlined text-outline text-[48px] mb-4 select-none">
          error
        </span>
        <p className="text-on-surface-variant font-body-md">Tutor profile not found.</p>
        <Link
          href="/dashboard/student/applications"
          className="mt-4 text-sm font-bold text-primary hover:underline"
        >
          Back to Applications
        </Link>
      </div>
    )
  }

  const {
    user,
    bio,
    profilePhoto,
    phoneNumber,
    university,
    department,
    currentInstitution,
    teachingSubjects = [],
    preferredClasses = [],
    medium = [],
    experienceYears,
    hourlyRate,
    teachingStyle,
    demoClassOffered,
    district,
    area,
    rating = 0,
    totalReviews = 0,
  } = profile

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "TR"

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 md:px-10 space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/student/applications"
        className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors select-none"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        <span>Back to Applications</span>
      </Link>

      {/* Main Profile Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Avatar, Basic Details & Bio */}
        <div className="lg:col-span-8 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6"
          >
            {/* Header Basic Details */}
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center pb-6 border-b border-outline-variant/20">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={user?.name}
                  className="w-20 h-20 rounded-full object-cover border border-outline-variant shadow-sm"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-2xl border border-primary/20 shadow-sm select-none">
                  {initials}
                </div>
              )}
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-headline-sm font-bold text-on-surface truncate">
                    {user?.name}
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 uppercase select-none">
                    Verified Tutor
                  </span>
                </div>
                <p className="text-sm font-semibold text-on-surface-variant">
                  {university || "NCTB Tutor"} {department ? `• ${department}` : ""}
                </p>
                {currentInstitution && (
                  <p className="text-xs text-on-surface-variant/60 font-medium">
                    Current Institution: {currentInstitution}
                  </p>
                )}
              </div>
            </div>

            {/* About / Bio */}
            <div className="space-y-3">
              <h3 className="text-title-md font-bold text-on-surface flex items-center gap-2 select-none">
                <span className="material-symbols-outlined text-[20px] text-primary">person_outline</span>
                <span>About Tutor</span>
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-sm font-normal whitespace-pre-line bg-surface-container-lowest border border-outline-variant/20 p-4 rounded-2xl">
                {bio || "No biography details shared yet."}
              </p>
            </div>

            {/* Teaching Style */}
            {teachingStyle && (
              <div className="space-y-3 border-t border-outline-variant/20 pt-6">
                <h3 className="text-title-md font-bold text-on-surface flex items-center gap-2 select-none">
                  <span className="material-symbols-outlined text-[20px] text-primary">model_training</span>
                  <span>Teaching Approach</span>
                </h3>
                <p className="text-on-surface-variant leading-relaxed text-sm font-normal">
                  {teachingStyle}
                </p>
              </div>
            )}

            {/* Teaching subjects & Preferences */}
            <div className="border-t border-outline-variant/20 pt-6 space-y-5">
              {/* Subjects */}
              {teachingSubjects.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider block select-none">
                    Subjects Taught
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {teachingSubjects.map((sub) => (
                      <span
                        key={sub}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-surface-container text-on-surface border border-outline-variant/15"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Preferred Classes */}
              {preferredClasses.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider block select-none">
                    Preferred Classes
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {preferredClasses.map((cls) => (
                      <span
                        key={cls}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-surface-container text-on-surface border border-outline-variant/15"
                      >
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Mediums */}
              {medium.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider block select-none">
                    Mediums Supported
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {medium.map((med) => (
                      <span
                        key={med}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-surface-container text-on-surface border border-outline-variant/15"
                      >
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Key Details Sidebar Cards */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-[28px] border border-outline-variant/30 bg-white p-6 shadow-sm space-y-6"
          >
            {/* Rates & Experience */}
            <div className="grid grid-cols-2 gap-4 pb-5 border-b border-outline-variant/20">
              <div className="space-y-1">
                <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider block select-none">
                  Hourly Rate
                </span>
                <p className="text-title-lg font-bold text-primary">৳{hourlyRate || "N/A"}/hr</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider block select-none">
                  Experience
                </span>
                <p className="text-title-lg font-bold text-on-surface">{experienceYears || 0} Years</p>
              </div>
            </div>

            {/* Ratings & Reviews */}
            <div className="grid grid-cols-2 gap-4 pb-5 border-b border-outline-variant/20">
              <div className="space-y-1">
                <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider block select-none">
                  Rating
                </span>
                <p className="text-title-lg font-bold text-amber-500 flex items-center gap-0.5 select-none">
                  <span className="material-symbols-outlined text-[18px] fill-amber-500">star</span>
                  {rating.toFixed(1)}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider block select-none">
                  Total Reviews
                </span>
                <p className="text-title-lg font-bold text-on-surface">{totalReviews} Reviews</p>
              </div>
            </div>

            {/* Location Specs */}
            <div className="pb-5 border-b border-outline-variant/20 space-y-2">
              <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider block select-none">
                Preferred Area
              </span>
              <p className="text-sm font-semibold text-on-surface flex items-center gap-1.5 select-none">
                <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                <span>{area}, {district}</span>
              </p>
            </div>

            {/* Demo Class Indicator */}
            <div className="pb-5 border-b border-outline-variant/20 flex justify-between items-center text-sm font-semibold">
              <span className="text-on-surface-variant font-medium select-none">Demo Class Offered</span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border uppercase select-none ${
                demoClassOffered
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-surface-container text-on-surface-variant border-outline-variant/25"
              }`}>
                {demoClassOffered ? "Yes" : "No"}
              </span>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider block select-none">
                Contact Information
              </span>
              <div className="space-y-2.5 text-xs font-semibold text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-outline select-none">mail</span>
                  <span className="truncate">{user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-outline select-none">call</span>
                  <span>{phoneNumber || "Not Provided"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
