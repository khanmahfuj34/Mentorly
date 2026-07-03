"use client"

import React from "react"
import { Tutor } from "@/types/common"

interface TutorCardProps {
  tutor: Tutor
}

export default function TutorCard({ tutor }: TutorCardProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-24 overflow-hidden group hover-lift">
      <div className="h-56 relative overflow-hidden">
        <img
          alt={tutor.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src="/assets/images/student.jpg"
        />
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold flex items-center gap-1 shadow-sm select-none">
          <span className="material-symbols-outlined text-xs text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>{" "}
          {tutor.rating.toFixed(1)}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-bold text-lg text-on-surface">{tutor.name}</h3>
          {tutor.verified && (
            <span className="material-symbols-outlined text-primary text-lg select-none">
              verified
            </span>
          )}
        </div>
        <p className="text-sm text-on-surface-variant mb-4">
          {tutor.subjects} • {tutor.institution}
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs">
            <span className="text-on-surface-variant">Experience</span>
            <span className="font-bold text-on-surface">{tutor.experience}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-on-surface-variant">Classes Taken</span>
            <span className="font-bold text-on-surface">{tutor.classesTaken}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-on-surface-variant">Availability</span>
            <span className="text-secondary font-bold">{tutor.availability}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
          <div>
            <p className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wider">
              Salary/Hr
            </p>
            <p className="text-primary font-bold text-lg">৳{tutor.salary}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-outline-variant rounded-xl text-xs font-bold hover:bg-surface-container transition-all cursor-pointer">
              Profile
            </button>
            <button className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
