"use client"

import React from "react"
import Link from "next/link"
import { Tuition } from "@/types/common"

interface TuitionCardProps {
  tuition: Tuition
  onProtectedAction?: () => void
}

export default function TuitionCard({ tuition, onProtectedAction }: TuitionCardProps) {
  return (
    <div className="bg-white p-6 md:p-7 rounded-3xl border border-outline-variant/20 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
      <div className="flex-1 space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <h4 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors">
            {tuition.title}
          </h4>
          {tuition.isNew && (
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-extrabold rounded-full tracking-wide">
              NEW
            </span>
          )}
          {tuition.status && (
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
              {tuition.status}
            </span>
          )}
        </div>

        {/* Detailed Info Chips */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-on-surface-variant">
          {tuition.subject && (
            <span className="flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-sm text-primary">book</span>
              {tuition.subject}
            </span>
          )}
          {tuition.classLevel && (
            <span className="flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-sm text-primary">school</span>
              {tuition.classLevel}
            </span>
          )}
          {tuition.medium && (
            <span className="flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-sm text-primary">translate</span>
              {tuition.medium}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-primary">location_on</span>
            {tuition.location}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-primary">calendar_month</span>
            {tuition.schedule}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant/10">
        <div className="text-left md:text-right">
          <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Salary Offer</p>
          <p className="text-primary font-extrabold text-lg">{tuition.salary}</p>
        </div>

        <div className="flex gap-2.5">
          <Link
            href="/login"
            onClick={(e) => {
              if (onProtectedAction) {
                e.preventDefault()
                onProtectedAction()
              }
            }}
            className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs shadow-md hover:opacity-95 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1"
          >
            Apply Now
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
