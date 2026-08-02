import React from "react"
import Link from "next/link"
import { ITutorApplication } from "../../../types/application.types"
import { formatAppliedDate } from "../../../lib/application-utils"

interface TutorApplicantCardProps {
  application: ITutorApplication
  onAccept: (appId: string) => void
  onReject: (appId: string) => void
}

export default function TutorApplicantCard({
  application,
  onAccept,
  onReject,
}: TutorApplicantCardProps) {
  const { id: appId, status, coverLetter, createdAt, tutor } = application

  if (!tutor) return null

  const profile = tutor.tutorProfile
  const initials = tutor.name
    ? tutor.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "TR"

  return (
    <div className="rounded-2xl border border-outline-variant/30 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
      {/* Top Section: Photo & Credentials */}
      <div className="flex gap-4 items-start">
        {/* Avatar */}
        {profile?.profilePhoto ? (
          <img
            src={profile.profilePhoto}
            alt={tutor.name}
            className="w-12 h-12 rounded-full object-cover border border-outline-variant shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm border border-primary/20 shrink-0 select-none">
            {initials}
          </div>
        )}

        {/* Credentials */}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center justify-between gap-4">
            <h4 className="font-display font-bold text-title-md text-on-surface truncate">
              {tutor.name}
            </h4>
            <span className="text-[10px] text-on-surface-variant/60 font-semibold select-none whitespace-nowrap">
              {formatAppliedDate(createdAt)}
            </span>
          </div>

          <p className="text-xs text-on-surface-variant font-medium truncate">
            {profile?.university || "NCTB Tutor"} • {profile?.department || "General"}
          </p>

          {/* Rating & Rate Info */}
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-0.5 text-amber-500 select-none">
              <span className="material-symbols-outlined text-[15px] fill-amber-500">star</span>
              {profile?.rating?.toFixed(1) || "5.0"}
            </span>
            <span className="text-outline-variant/60 font-bold select-none">•</span>
            <span className="text-on-surface-variant">
              Exp: {profile?.experienceYears || 0} years
            </span>
            <span className="text-outline-variant/60 font-bold select-none">•</span>
            <span className="text-primary font-bold">
              ৳{profile?.hourlyRate || "N/A"}/hr
            </span>
          </div>
        </div>
      </div>

      {/* Teaching Subjects */}
      {profile?.teachingSubjects && profile.teachingSubjects.length > 0 && (
        <div className="flex flex-wrap gap-1.5 shrink-0 max-h-[64px] overflow-hidden">
          {profile.teachingSubjects.slice(0, 3).map((sub) => (
            <span
              key={sub}
              className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-surface-container text-on-surface-variant select-none border border-outline-variant/10"
            >
              {sub}
            </span>
          ))}
          {profile.teachingSubjects.length > 3 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-surface-container text-on-surface-variant/60 select-none">
              +{profile.teachingSubjects.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Cover Letter Block */}
      {coverLetter && (
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-3">
          <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider block mb-1">
            Cover Letter
          </span>
          <p className="text-xs text-on-surface-variant font-normal leading-relaxed line-clamp-2">
            {coverLetter}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-2 border-t border-outline-variant/15 justify-end">
        <Link
          href={`/dashboard/student/applications/tutor/${tutor.id}`}
          className="h-9 px-4 border border-outline-variant/30 text-on-surface hover:bg-surface-container-low font-semibold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer select-none"
        >
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          <span>View Profile</span>
        </Link>

        {status === "PENDING" && (
          <>
            <button
              onClick={() => onReject(appId)}
              className="h-9 px-4 border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer select-none"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
              <span>Reject</span>
            </button>
            <button
              onClick={() => onAccept(appId)}
              className="h-9 px-4 bg-primary text-on-primary hover:bg-primary/95 font-semibold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer select-none shadow-sm shadow-primary/10"
            >
              <span className="material-symbols-outlined text-[16px]">check</span>
              <span>Accept</span>
            </button>
          </>
        )}

        {status === "ACCEPTED" && (
          <span className="h-9 px-4 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1 select-none">
            <span className="material-symbols-outlined text-[16px] fill-emerald-700">check_circle</span>
            <span>Accepted</span>
          </span>
        )}

        {status === "REJECTED" && (
          <span className="h-9 px-4 bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1 select-none">
            <span className="material-symbols-outlined text-[16px]">cancel</span>
            <span>Rejected</span>
          </span>
        )}
      </div>
    </div>
  )
}
