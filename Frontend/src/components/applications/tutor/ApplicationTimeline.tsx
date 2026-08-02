import React from "react"
import { ITutorApplication } from "../../../types/application.types"
import { formatAppliedDate } from "../../../lib/application-utils"

interface ApplicationTimelineProps {
  application: ITutorApplication
}

export default function ApplicationTimeline({ application }: ApplicationTimelineProps) {
  const { status, createdAt, updatedAt } = application

  return (
    <div className="border border-outline-variant/30 rounded-2xl p-5 bg-white space-y-4">
      <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider select-none">
        Application Progress
      </h4>
      <div className="relative border-l border-outline-variant/50 pl-5 ml-2.5 space-y-5 text-xs font-medium">
        {/* Step 1: Submission */}
        <div className="relative">
          <span className="absolute -left-[27px] top-0 w-3.5 h-3.5 rounded-full bg-primary border-2 border-white select-none" />
          <p className="text-on-surface font-bold">Application Submitted</p>
          <p className="text-[10px] text-on-surface-variant/60 font-semibold">{formatAppliedDate(createdAt)}</p>
        </div>
        {/* Step 2: Under Review */}
        <div className="relative">
          <span className={`absolute -left-[27px] top-0 w-3.5 h-3.5 rounded-full border-2 border-white select-none ${
            status === "PENDING" ? "bg-amber-500 animate-pulse" : "bg-primary"
          }`} />
          <p className="text-on-surface font-bold">Under Review</p>
          <p className="text-[10px] text-on-surface-variant/60 font-semibold">Profile details shared with student</p>
        </div>
        {/* Step 3: Decision */}
        {status !== "PENDING" && (
          <div className="relative">
            <span className={`absolute -left-[27px] top-0 w-3.5 h-3.5 rounded-full border-2 border-white select-none ${
              status === "ACCEPTED" ? "bg-emerald-500" : "bg-rose-500"
            }`} />
            <p className="text-on-surface font-bold">
              Application {status === "ACCEPTED" ? "Accepted" : "Rejected"}
            </p>
            <p className="text-[10px] text-on-surface-variant/60 font-semibold">{formatAppliedDate(updatedAt)}</p>
          </div>
        )}
      </div>
    </div>
  )
}
