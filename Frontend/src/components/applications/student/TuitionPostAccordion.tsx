"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ITuitionRequest } from "../../../types/tuition"
import { ITutorApplication } from "../../../types/application.types"
import { formatAppliedDate } from "../../../lib/application-utils"

/* ─────────────────────── Types ─────────────────────── */

interface TuitionPostAccordionProps {
  post: ITuitionRequest
  applicants: ITutorApplication[] | undefined
  isLoading: boolean | undefined
  error: string | null | undefined
  onExpand: () => void
  onAccept: (appId: string) => void
  onReject: (appId: string) => void
}

/* ─────────────────────── Status config ─────────────────────── */

const STATUS_STYLES: Record<string, string> = {
  OPEN: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ASSIGNED: "bg-blue-50 text-blue-700 border-blue-200",
  COMPLETED: "bg-surface-container text-on-surface-variant border-outline-variant/25",
  CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
}

/* ─────────────────────── TutorCard ─────────────────────── */

function TutorCard({
  application,
  onAccept,
  onReject,
}: {
  application: ITutorApplication
  onAccept: (id: string) => void
  onReject: (id: string) => void
}) {
  const { id: appId, status, coverLetter, createdAt, tutor } = application
  if (!tutor) return null

  const profile = tutor.tutorProfile
  const initials = tutor.name
    ? tutor.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "TR"

  const isPending = status === "PENDING"
  const isAccepted = status === "ACCEPTED"
  const isRejected = status === "REJECTED"

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border bg-white p-4 flex flex-col gap-3.5 transition-shadow hover:shadow-md ${
        isAccepted
          ? "border-emerald-200 bg-gradient-to-br from-emerald-50/40 to-white"
          : isRejected
          ? "border-outline-variant/20 opacity-55"
          : "border-outline-variant/30"
      }`}
    >
      {/* Row 1: Avatar + Core details + Status badge */}
      <div className="flex gap-3 items-start">
        {/* Avatar */}
        <div className="shrink-0">
          {profile?.profilePhoto ? (
            <img
              src={profile.profilePhoto}
              alt={tutor.name}
              className="w-11 h-11 rounded-full object-cover border border-outline-variant/50"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm border border-primary/20 select-none">
              {initials}
            </div>
          )}
        </div>

        {/* Name + University + Department */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="font-bold text-sm text-on-surface leading-tight truncate">
                {tutor.name}
              </h4>
              <p className="text-[11px] text-on-surface-variant font-medium mt-0.5 truncate">
                {[profile?.university, profile?.department].filter(Boolean).join(" · ") || "Independent Tutor"}
              </p>
            </div>

            {/* Application status badge */}
            <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wide select-none ${
              isAccepted
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : isRejected
                ? "bg-rose-50 text-rose-700 border-rose-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}>
              {isAccepted && <span className="material-symbols-outlined text-[10px]">check_circle</span>}
              {isRejected && <span className="material-symbols-outlined text-[10px]">cancel</span>}
              {isPending && <span className="material-symbols-outlined text-[10px]">schedule</span>}
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </span>
          </div>

          {/* Stats: rating · experience · hourly rate · applied date */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-2 text-[11px] font-semibold">
            <span className="flex items-center gap-0.5 text-amber-500 select-none">
              <span className="material-symbols-outlined text-[12px]">star</span>
              {profile?.rating?.toFixed(1) ?? "5.0"}
            </span>
            <span className="text-outline-variant/40 select-none">·</span>
            <span className="text-on-surface-variant">
              {profile?.experienceYears ?? 0} yrs exp
            </span>
            <span className="text-outline-variant/40 select-none">·</span>
            <span className="text-primary font-bold">
              ৳{profile?.hourlyRate
                ? new Intl.NumberFormat("en-IN").format(profile.hourlyRate)
                : "N/A"}/hr
            </span>
            <span className="text-outline-variant/40 select-none">·</span>
            <span className="text-on-surface-variant/55 font-medium">
              {formatAppliedDate(createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Cover letter */}
      {coverLetter && (
        <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-xl px-3.5 py-2.5">
          <span className="text-[9px] text-on-surface-variant/50 font-bold uppercase tracking-widest block mb-1 select-none">
            Cover Letter
          </span>
          <p className="text-[11px] text-on-surface-variant leading-relaxed line-clamp-3 font-normal">
            {coverLetter}
          </p>
        </div>
      )}

      {/* Row 3: Action buttons */}
      <div className="flex items-center gap-2 pt-0.5 border-t border-outline-variant/12 flex-wrap">
        <Link
          href={`/dashboard/student/applications/tutor/${tutor.id}`}
          className="h-8 px-3 border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low font-semibold text-[11px] rounded-lg flex items-center gap-1 cursor-pointer select-none transition-colors"
        >
          <span className="material-symbols-outlined text-[13px]">open_in_new</span>
          <span>View Profile</span>
        </Link>

        {isPending && (
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => onReject(appId)}
              className="h-8 px-3 border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold text-[11px] rounded-lg flex items-center gap-1 cursor-pointer select-none transition-colors"
            >
              <span className="material-symbols-outlined text-[13px]">close</span>
              <span>Reject</span>
            </button>
            <button
              onClick={() => onAccept(appId)}
              className="h-8 px-3 bg-primary text-on-primary hover:bg-primary/90 font-semibold text-[11px] rounded-lg flex items-center gap-1 cursor-pointer select-none transition-colors shadow-sm shadow-primary/15"
            >
              <span className="material-symbols-outlined text-[13px]">check</span>
              <span>Accept</span>
            </button>
          </div>
        )}

        {isAccepted && (
          <span className="ml-auto h-8 px-3 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[11px] rounded-lg flex items-center gap-1 select-none">
            <span className="material-symbols-outlined text-[13px]">check_circle</span>
            Accepted
          </span>
        )}

        {isRejected && (
          <span className="ml-auto h-8 px-3 bg-rose-50 border border-rose-200 text-rose-700 font-bold text-[11px] rounded-lg flex items-center gap-1 select-none">
            <span className="material-symbols-outlined text-[13px]">cancel</span>
            Rejected
          </span>
        )}
      </div>
    </motion.div>
  )
}

/* ─────────────────────── Main Accordion ─────────────────────── */

export default function TuitionPostAccordion({
  post,
  applicants,
  isLoading,
  error,
  onExpand,
  onAccept,
  onReject,
}: TuitionPostAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    const next = !isOpen
    setIsOpen(next)
    if (next) onExpand()
  }

  const salary = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(post.salary)
  const count = applicants?.length ?? 0
  const statusStyle = STATUS_STYLES[post.status] ?? STATUS_STYLES.OPEN

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-[24px] border bg-white overflow-hidden shadow-sm transition-all duration-300 ${
        isOpen
          ? "border-primary/25 shadow-md shadow-primary/5"
          : "border-outline-variant/30 hover:border-primary/20"
      }`}
    >
      {/* ── Clickable Header ── */}
      <button
        onClick={handleToggle}
        className="w-full px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-3.5 bg-white hover:bg-surface-container-lowest transition-colors text-left cursor-pointer"
      >
        {/* Left: metadata */}
        <div className="flex-1 min-w-0 space-y-1.5">
          {/* Badge row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wide select-none ${statusStyle}`}>
              {post.status.charAt(0) + post.status.slice(1).toLowerCase()}
            </span>
            <span className="text-[10px] font-semibold select-none text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full border border-outline-variant/20">
              {post.classLevel}
            </span>
            {count > 0 && (
              <span className="text-[10px] font-bold select-none text-primary bg-primary/8 border border-primary/15 px-2.5 py-0.5 rounded-full">
                {count} Applicant{count !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Subject */}
          <h3 className="font-display font-bold text-title-md text-on-surface leading-snug truncate">
            {post.subject}
          </h3>

          {/* Location + Salary */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-on-surface-variant font-medium select-none">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-outline">location_on</span>
              {post.area}, {post.district}
            </span>
            <span className="text-outline-variant/40">·</span>
            <span className="font-bold text-on-surface">৳{salary}/month</span>
          </div>
        </div>

        {/* Right: toggle chevron */}
        <div className="shrink-0 flex items-center gap-3 self-end sm:self-center">
          {!isOpen && count === 0 && !isLoading && (
            <span className="text-[10px] text-on-surface-variant/45 font-medium select-none hidden sm:block">
              No applicants yet
            </span>
          )}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant"
          }`} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
            <span className="material-symbols-outlined text-[18px] select-none">keyboard_arrow_down</span>
          </div>
        </div>
      </button>

      {/* ── Expandable Content ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-outline-variant/15 bg-surface-container-lowest px-6 py-5 space-y-4">

              {/* Section label */}
              <div className="flex items-center justify-between select-none">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Tutor Applications
                </span>
                {count > 0 && (
                  <span className="text-[10px] text-on-surface-variant/50 font-medium">
                    {count} result{count !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {/* Loading skeletons */}
              {isLoading && (
                <div className="space-y-3">
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-outline-variant/20 bg-white p-4 space-y-3 animate-pulse"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="w-11 h-11 rounded-full bg-outline-variant/20 shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-36 bg-outline-variant/20 rounded-full" />
                          <div className="h-2.5 w-52 bg-outline-variant/15 rounded-full" />
                          <div className="h-2 w-44 bg-outline-variant/10 rounded-full" />
                        </div>
                      </div>
                      <div className="h-10 w-full bg-outline-variant/10 rounded-xl" />
                      <div className="h-8 w-full bg-outline-variant/8 rounded-lg" />
                    </div>
                  ))}
                </div>
              )}

              {/* Error state */}
              {!isLoading && error && (
                <div className="flex items-center gap-2.5 text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs font-semibold">
                  <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Empty state */}
              {!isLoading && !error && applicants !== undefined && applicants.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center mb-3 border border-outline-variant/20">
                    <span className="material-symbols-outlined text-[26px] text-outline select-none">
                      person_search
                    </span>
                  </div>
                  <p className="text-sm font-bold text-on-surface mb-1">No Applicants Yet</p>
                  <p className="text-xs text-on-surface-variant/65 font-medium max-w-[220px] leading-relaxed">
                    Tutors who apply to this post will appear here once they submit an application.
                  </p>
                </div>
              )}

              {/* Tutor cards */}
              {!isLoading && !error && applicants && applicants.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {applicants.map((app) => (
                    <TutorCard
                      key={app.id}
                      application={app}
                      onAccept={onAccept}
                      onReject={onReject}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
