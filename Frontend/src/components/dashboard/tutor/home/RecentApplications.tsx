"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ITutorApplication } from "@/src/types/application.types"

interface RecentApplicationsProps {
  applications: ITutorApplication[]
}

export default function RecentApplications({ applications }: RecentApplicationsProps) {
  // Sort by newest first and limit to max 5
  const recentApps = [...applications]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Accepted
          </span>
        )
      case "REJECTED":
        return (
          <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-bold text-[11px] border border-rose-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Rejected
          </span>
        )
      case "PENDING":
      default:
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-bold text-[11px] border border-amber-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Pending
          </span>
        )
    }
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-5">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
        <div>
          <h2 className="font-display text-xl font-bold text-on-surface">Recent Applications</h2>
          <p className="text-xs text-on-surface-variant mt-0.5">Your latest tuition submissions</p>
        </div>

        <Link
          href="/dashboard/tutor/my-applications"
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View All Applications</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>

      {/* Applications List or Empty State */}
      {recentApps.length === 0 ? (
        <div className="py-8 text-center space-y-3 bg-surface-container-low/40 rounded-2xl border border-outline-variant/20 p-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-2xl">assignment_late</span>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm text-on-surface">No applications yet</h4>
            <p className="text-xs text-on-surface-variant mt-1">
              Start exploring tuition opportunities and apply to suitable posts.
            </p>
          </div>
          <Link
            href="/dashboard/tutor/find-tuition"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">search</span>
            <span>Find Tuition</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {recentApps.map((app) => {
            const studentName = app.tuitionRequest?.student?.name || "Student"
            const subject = app.tuitionRequest?.subject || "Tuition Request"
            const classLevel = app.tuitionRequest?.classLevel || ""
            const district = app.tuitionRequest?.district || ""
            const area = app.tuitionRequest?.area || ""
            const location = [area, district].filter(Boolean).join(", ")
            const salary = app.tuitionRequest?.salary
            const dateStr = new Date(app.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })

            const initials = studentName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()

            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest hover:border-primary/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs border border-primary/20 shrink-0 select-none mt-0.5">
                    {initials}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-sm text-on-surface truncate">{subject}</h4>
                      {classLevel && (
                        <span className="px-2 py-0.5 rounded-md bg-surface-container-low text-on-surface-variant text-[11px] font-medium border border-outline-variant/30">
                          {classLevel}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-on-surface-variant flex items-center gap-2 flex-wrap">
                      <span>Posted by {studentName}</span>
                      {location && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs text-outline">
                              location_on
                            </span>
                            {location}
                          </span>
                        </>
                      )}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-on-surface-variant font-medium pt-0.5">
                      {salary && (
                        <span className="text-primary font-bold">
                          ৳{salary.toLocaleString()}/mo
                        </span>
                      )}
                      <span>Applied: {dateStr}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center sm:flex-col justify-between sm:items-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-outline-variant/10">
                  {getStatusBadge(app.status)}

                  <Link
                    href="/dashboard/tutor/my-applications"
                    className="px-3.5 py-1.5 rounded-xl bg-surface-container text-on-surface font-semibold text-xs hover:bg-primary hover:text-on-primary transition-all cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
