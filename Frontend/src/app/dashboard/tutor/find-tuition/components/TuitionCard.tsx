import React from "react"
import Link from "next/link"
import { ITuitionRequest } from "@/src/types/tuition"

interface TuitionCardProps {
  tuition: ITuitionRequest
}

export default function TuitionCard({ tuition }: TuitionCardProps) {
  const {
    id,
    subject,
    classLevel,
    medium,
    genderPreference,
    district,
    area,
    salary,
    daysPerWeek,
    description,
    createdAt,
  } = tuition

  // Relative time helper
  const getRelativeTime = (dateStr: string) => {
    try {
      const created = new Date(dateStr)
      const now = new Date()
      const diffMs = now.getTime() - created.getTime()
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
      
      if (diffHrs < 1) {
        return "Just now"
      } else if (diffHrs < 24) {
        return `${diffHrs}h ago`
      }
      
      const diffDays = Math.floor(diffHrs / 24)
      if (diffDays === 1) {
        return "Yesterday"
      }
      return `${diffDays} days ago`
    } catch {
      return "Recently"
    }
  }

  // Format Salary
  const formattedSalary = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(salary)

  return (
    <div className="rounded-[28px] border border-outline-variant/30 bg-white/70 backdrop-blur-md p-6 shadow-sm hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between h-[340px] group">
      <div className="space-y-3.5">
        {/* Top Header Row (Status Badge & Salary) */}
        <div className="flex justify-between items-start gap-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Open
          </span>
          <div className="text-right">
            <span className="block font-semibold text-headline-sm text-primary">৳{formattedSalary}</span>
            <span className="block text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider">Per Month</span>
          </div>
        </div>

        {/* Subject & Class */}
        <div className="space-y-1">
          <h4 className="font-display font-bold text-title-lg text-on-surface truncate group-hover:text-primary transition-colors">
            {subject}
          </h4>
          <p className="text-on-surface-variant font-medium text-sm">
            {classLevel} • {medium || "English"} Medium
          </p>
        </div>

        {/* Schedule & Location & Gender Preference Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-surface-container-low text-on-surface border border-outline-variant/15">
            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
            {daysPerWeek} days/week
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-surface-container-low text-on-surface border border-outline-variant/15">
            <span className="material-symbols-outlined text-[14px]">location_on</span>
            {area}, {district}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-surface-container-low text-on-surface border border-outline-variant/15">
            <span className="material-symbols-outlined text-[14px]">person</span>
            {genderPreference === "ANY" || !genderPreference ? "Any Gender" : `${genderPreference.toLowerCase()} tutor`}
          </span>
        </div>

        {/* Short Description */}
        {description && (
          <p className="text-on-surface-variant font-body-sm line-clamp-2 leading-relaxed text-xs">
            {description}
          </p>
        )}
      </div>

      {/* Card Action Row */}
      <div className="flex justify-between items-center border-t border-outline-variant/20 pt-4 mt-4">
        <span className="text-[11px] text-on-surface-variant/60 font-medium flex items-center gap-1 select-none">
          <span className="material-symbols-outlined text-[14px]">schedule</span>
          {getRelativeTime(createdAt)}
        </span>
        
        <Link
          href={`/dashboard/tutor/find-tuition/${id}`}
          className="h-10 px-4 bg-primary/5 hover:bg-primary text-primary hover:text-on-primary font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <span>View Details</span>
          <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  )
}
