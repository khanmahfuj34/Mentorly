import React from "react"
import Link from "next/link"
import { ITutorApplication } from "../../../types/application.types"
import ApplicationStatusBadge from "../shared/ApplicationStatusBadge"
import { formatAppliedDate } from "../../../lib/application-utils"

interface TutorApplicationCardProps {
  application: ITutorApplication
}

export default function TutorApplicationCard({ application }: TutorApplicationCardProps) {
  const {
    status,
    createdAt,
    tuitionRequest,
  } = application

  if (!tuitionRequest) return null

  const {
    id: tuitionRequestId,
    subject,
    classLevel,
    district,
    area,
    salary,
    student,
  } = tuitionRequest

  const formattedSalary = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(salary)

  return (
    <div className="rounded-[24px] border border-outline-variant/30 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
      {/* Detail Block */}
      <div className="space-y-3 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <ApplicationStatusBadge status={status} />
          <span className="text-xs font-semibold text-on-surface-variant/60 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">schedule</span>
            Applied {formatAppliedDate(createdAt)}
          </span>
        </div>

        <div className="space-y-1">
          <h4 className="font-display font-bold text-title-md text-on-surface group-hover:text-primary transition-colors truncate">
            {subject}
          </h4>
          <p className="text-on-surface-variant font-medium text-xs flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>For {classLevel}</span>
            <span className="text-outline-variant/60 font-bold select-none">•</span>
            <span>Post by {student?.name || "Student"}</span>
          </p>
        </div>

        {/* Location & Rate Info Row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-on-surface-variant font-medium">
          <span className="flex items-center gap-1 select-none">
            <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
            {area}, {district}
          </span>
          <span className="flex items-center gap-1 select-none">
            <span className="material-symbols-outlined text-[16px] text-primary">payments</span>
            ৳{formattedSalary}/mo
          </span>
        </div>
      </div>

      {/* Button Action */}
      <div className="w-full md:w-auto shrink-0 pt-2 md:pt-0">
        {status === "ACCEPTED" ? (
          <Link
            href="/dashboard/tutor/bookings"
            className="w-full md:w-auto h-11 px-5 bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-emerald-600/10 cursor-pointer select-none"
          >
            <span className="material-symbols-outlined text-[16px]">event</span>
            <span>View Booking</span>
          </Link>
        ) : (
          <Link
            href={`/dashboard/tutor/find-tuition/${tuitionRequestId}`}
            className="w-full md:w-auto h-11 px-5 border border-outline-variant/30 text-on-surface hover:bg-surface-container-low font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none"
          >
            <span>View Tuition</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        )}
      </div>
    </div>
  )
}
