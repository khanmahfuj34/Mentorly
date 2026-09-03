"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { IBooking } from "@/src/services/booking/booking.service"

interface ActiveBookingsProps {
  bookings: IBooking[]
}

export default function ActiveBookings({ bookings }: ActiveBookingsProps) {
  // Active bookings filter
  const activeBookings = bookings.filter((b) => b.status === "ACTIVE" || b.status === "PENDING")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            Active Booking
          </span>
        )
      case "PENDING":
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-bold text-[11px] border border-amber-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Pending Booking
          </span>
        )
      case "COMPLETED":
        return (
          <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[11px] border border-indigo-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Completed
          </span>
        )
      default:
        return (
          <span className="px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant text-[11px] font-medium border border-outline-variant/30">
            {status}
          </span>
        )
    }
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
        <div>
          <h2 className="font-display text-xl font-bold text-on-surface">Active Bookings</h2>
          <p className="text-xs text-on-surface-variant mt-0.5">Confirmed tutoring arrangements</p>
        </div>

        <Link
          href="/dashboard/tutor/bookings"
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View All Bookings</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>

      {/* List or Empty State */}
      {activeBookings.length === 0 ? (
        <div className="py-8 text-center space-y-3 bg-surface-container-low/40 rounded-2xl border border-outline-variant/20 p-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-2xl">event_busy</span>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm text-on-surface">No Active Bookings</h4>
            <p className="text-xs text-on-surface-variant mt-1">
              You don't have any active tutoring bookings yet.
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
          {activeBookings.map((booking) => {
            const studentName = booking.student?.name || "Student"
            const subject = booking.tuitionRequest?.subject || "Tutoring Session"
            const classLevel = booking.tuitionRequest?.classLevel || ""
            const district = booking.tuitionRequest?.district || ""
            const area = booking.tuitionRequest?.area || ""
            const location = [area, district].filter(Boolean).join(", ")
            const salary = booking.tuitionRequest?.salary

            const initials = studentName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()

            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest hover:border-primary/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-xs border border-emerald-200 shrink-0 select-none mt-0.5">
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
                      <span>Student: {studentName}</span>
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

                    {salary && (
                      <div className="text-[11px] text-emerald-700 font-bold pt-0.5">
                        ৳{salary.toLocaleString()}/mo
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center sm:flex-col justify-between sm:items-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-outline-variant/10">
                  {getStatusBadge(booking.status)}

                  <Link
                    href={`/dashboard/tutor/bookings/${booking.id}`}
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
