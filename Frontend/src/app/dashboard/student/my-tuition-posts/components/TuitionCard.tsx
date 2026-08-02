import React from "react"
import Link from "next/link"
import { ITuitionRequest } from "@/src/types/tuition"
import TuitionStatusBadge from "./TuitionStatusBadge"

interface TuitionCardProps {
  tuition: ITuitionRequest
}

export default function TuitionCard({ tuition }: TuitionCardProps) {
  const formattedDate = tuition.createdAt
    ? new Date(tuition.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A"

  return (
    <div className="bg-white p-6 md:p-8 rounded-[28px] border border-outline-variant/30 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex-1 space-y-4">
        {/* Top: Status and Subject */}
        <div className="flex flex-wrap items-center gap-3">
          <h4 className="font-bold text-headline-sm text-on-surface">{tuition.subject}</h4>
          <TuitionStatusBadge status={tuition.status} />
          {tuition.medium && (
            <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant text-xs font-semibold rounded-full border border-outline-variant/20">
              {tuition.medium}
            </span>
          )}
        </div>

        {/* Middle: Details Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-6 text-sm text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px] select-none">school</span>
            <span className="font-medium text-on-surface">{tuition.classLevel}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px] select-none">location_on</span>
            <span className="font-medium text-on-surface">
              {tuition.area}, {tuition.district}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px] select-none">payments</span>
            <span className="font-bold text-primary">
              ৳{tuition.salary.toLocaleString()}/month
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px] select-none">calendar_month</span>
            <span className="font-medium text-on-surface">{tuition.daysPerWeek} days/week</span>
          </div>
        </div>

        {/* Gender Preference if exists */}
        {tuition.genderPreference && tuition.genderPreference !== "Any" && (
          <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-primary/70 select-none">person_search</span>
            <span>Preferred Tutor Gender: <strong className="text-on-surface">{tuition.genderPreference}</strong></span>
          </div>
        )}
      </div>

      {/* Action and Posted Time */}
      <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-6 border-t md:border-t-0 border-outline-variant/20 pt-4 md:pt-0">
        <div className="text-left md:text-right">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mb-0.5">Posted On</p>
          <p className="text-sm font-semibold text-on-surface">{formattedDate}</p>
        </div>
        
        <Link
          href={`/dashboard/student/my-tuition-posts/${tuition.id}/edit`}
          className="px-6 py-3 border border-outline-variant/50 rounded-xl font-bold text-sm text-on-surface hover:bg-surface-container-low transition-all duration-200 cursor-pointer flex items-center gap-2 active:scale-95 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px] select-none">edit</span>
          <span>Edit Post</span>
        </Link>
      </div>
    </div>
  )
}
