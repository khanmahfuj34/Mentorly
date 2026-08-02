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
  } = tuition

  // Format Salary
  const formattedSalary = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(salary)

  return (
    <div className="rounded-[24px] border border-outline-variant/30 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/25 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-[380px] group cursor-pointer">
      {/* Content Container */}
      <div className="flex-1 flex flex-col justify-start overflow-hidden space-y-3.5">
        {/* Header: Status + Salary */}
        <div className="flex justify-between items-center gap-4 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-primary/10 text-primary uppercase select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Open
          </span>
          <div className="text-right whitespace-nowrap shrink-0">
            <span className="font-semibold text-title-md text-primary">৳{formattedSalary}/mo</span>
          </div>
        </div>

        {/* Subject & Academic Details */}
        <div className="space-y-1 shrink-0">
          <h4 className="font-display font-bold text-title-md text-on-surface line-clamp-2 group-hover:text-primary transition-colors leading-tight">
            {subject}
          </h4>
          <p className="text-on-surface-variant font-semibold text-xs flex items-center gap-1.5">
            <span>{classLevel}</span>
            <span className="text-outline-variant/60 font-bold select-none">•</span>
            <span>{medium || "English"} Medium</span>
          </p>
        </div>

        {/* Information Chips */}
        <div className="flex flex-wrap gap-2 shrink-0 overflow-hidden max-h-[64px]">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-surface-container-low text-on-surface border border-outline-variant/15 select-none h-7">
            <span className="material-symbols-outlined text-[14px] text-primary">calendar_today</span>
            {daysPerWeek} days/wk
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-surface-container-low text-on-surface border border-outline-variant/15 select-none h-7 max-w-[120px] truncate">
            <span className="material-symbols-outlined text-[14px] text-primary">person</span>
            {genderPreference === "ANY" || !genderPreference ? "Any Gender" : `${genderPreference.toLowerCase()}`}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-surface-container-low text-on-surface border border-outline-variant/15 select-none h-7 max-w-[140px] truncate">
            <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
            {area}
          </span>
        </div>

        {/* Description Requirements */}
        <p className="text-on-surface-variant font-body-sm line-clamp-2 leading-relaxed text-xs flex-1 overflow-hidden">
          {description || "No additional requirements specified by the student."}
        </p>

        {/* One Line Address (Ellipsis if long) */}
        <div className="text-[11px] text-on-surface-variant/60 font-medium flex items-center gap-1.5 shrink-0 select-none truncate">
          <span className="material-symbols-outlined text-[14px] text-outline">map</span>
          <span className="truncate">{area}, {district}</span>
        </div>
      </div>

      {/* Footer Details Button */}
      <div className="pt-4 border-t border-outline-variant/15 mt-4 shrink-0">
        <Link
          href={`/dashboard/tutor/find-tuition/${id}`}
          className="w-full h-11 bg-primary text-on-primary hover:bg-primary/95 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm shadow-primary/10 select-none"
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
