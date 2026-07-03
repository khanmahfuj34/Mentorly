import React from "react"
import { Tuition } from "@/types/common"

interface TuitionCardProps {
  tuition: Tuition
}

export default function TuitionCard({ tuition }: TuitionCardProps) {
  return (
    <div className="bg-white p-6 rounded-24 border border-outline-variant/30 flex flex-wrap md:flex-nowrap justify-between items-center gap-6 hover:shadow-lg transition-all">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="font-bold text-lg text-primary">{tuition.title}</h4>
          {tuition.isNew && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded">
              NEW
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm select-none">location_on</span>{" "}
            {tuition.location}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm select-none">payments</span>{" "}
            {tuition.salary}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm select-none">calendar_month</span>{" "}
            {tuition.schedule}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold">Posted</p>
          <p className="text-sm font-bold">{tuition.postedTime}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2 border border-outline-variant rounded-xl font-bold text-sm hover:bg-surface-container transition-all cursor-pointer">
            Details
          </button>
          <button className="px-6 py-2 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-md hover:opacity-90 cursor-pointer transition-all">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}
