"use client"

import React from "react"
import Link from "next/link"
import { Tutor } from "@/types/common"

interface TutorCardProps {
  tutor: Tutor
  onProtectedAction?: () => void
}

export default function TutorCard({ tutor, onProtectedAction }: TutorCardProps) {
  return (
    <div className="bg-white border border-outline-variant/20 rounded-3xl overflow-hidden group hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="h-52 relative overflow-hidden bg-surface-container">
          <img
            alt={tutor.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={tutor.avatar || "/assets/images/student.jpg"}
          />
          <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold flex items-center gap-1 shadow-sm select-none">
            <span className="material-symbols-outlined text-xs text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>{" "}
            {tutor.rating.toFixed(1)}
          </div>
          {tutor.verified && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-primary/90 backdrop-blur text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-sm select-none">
              <span className="material-symbols-outlined text-xs">verified</span> Verified
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors">
            {tutor.name}
          </h3>
          <p className="text-xs font-semibold text-primary mb-3">
            {tutor.institution}
          </p>

          <div className="space-y-2 mb-5 text-xs">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm text-primary">book</span>
              <span className="font-medium truncate">{tutor.subjects}</span>
            </div>
            {tutor.location && (
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                <span className="truncate">{tutor.location}</span>
              </div>
            )}
            {tutor.medium && (
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-sm text-primary">translate</span>
                <span className="truncate">{tutor.medium}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10 text-[11px]">
              <span className="text-on-surface-variant">Experience: <strong className="text-on-surface">{tutor.experience}</strong></span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">{tutor.availability}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
          <div>
            <p className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider">
              Hourly Rate
            </p>
            <p className="text-primary font-extrabold text-lg">৳{tutor.salary}<span className="text-xs font-normal text-on-surface-variant">/hr</span></p>
          </div>
          <Link
            href="/login"
            onClick={(e) => {
              if (onProtectedAction) {
                e.preventDefault()
                onProtectedAction()
              }
            }}
            className="px-5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-bold shadow-md hover:opacity-95 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1"
          >
            View Profile
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
