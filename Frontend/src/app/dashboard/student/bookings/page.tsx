"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { getMyBookings, IBooking } from "../../../../services/booking/booking.service"

/* ── Status badge config ── */
const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  COMPLETED: "bg-blue-50 text-blue-700 border-blue-200",
  CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
}

/* ── Skeleton row ── */
function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="h-3 w-28 bg-outline-variant/20 rounded mb-1" />
        <div className="h-2.5 w-16 bg-outline-variant/12 rounded" />
      </td>
      <td className="px-6 py-4">
        <div className="h-3 w-32 bg-outline-variant/20 rounded mb-1" />
        <div className="h-2.5 w-40 bg-outline-variant/12 rounded" />
      </td>
      <td className="px-6 py-4">
        <div className="h-3 w-24 bg-outline-variant/15 rounded" />
      </td>
      <td className="px-6 py-4">
        <div className="h-3 w-20 bg-outline-variant/15 rounded" />
      </td>
      <td className="px-6 py-4">
        <div className="h-5 w-16 bg-outline-variant/20 rounded-full" />
      </td>
    </tr>
  )
}

export default function StudentBookingsPage() {
  const [bookings, setBookings] = useState<IBooking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBookings = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await getMyBookings()
      if (res.success) {
        // res.data is directly the bookings array after the controller fix
        setBookings(Array.isArray(res.data) ? res.data : [])
      } else {
        setError("Failed to load bookings. Please try again.")
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load bookings. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const activeCount = bookings.filter((b) => b.status === "ACTIVE").length

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 md:px-10 space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface mb-1.5">My Bookings</h2>
          <p className="text-on-surface-variant font-body-md leading-relaxed">
            Review your active tutor assignments and learning schedules.
          </p>
        </div>
        <button
          onClick={fetchBookings}
          disabled={isLoading}
          className="h-10 px-4 border border-outline-variant/30 text-on-surface rounded-xl hover:bg-surface-container-low transition-all font-semibold text-xs flex items-center gap-1.5 cursor-pointer select-none disabled:opacity-50"
        >
          <span className={`material-symbols-outlined text-[18px] ${isLoading ? "animate-spin" : ""}`}>
            refresh
          </span>
          <span>Refresh</span>
        </button>
      </div>

      {/* ── Summary stat ── */}
      {!isLoading && bookings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { label: "Total Bookings", value: bookings.length, icon: "event_note", color: "text-on-surface" },
            { label: "Active", value: activeCount, icon: "check_circle", color: "text-emerald-600" },
            { label: "Completed", value: bookings.filter((b) => b.status === "COMPLETED").length, icon: "task_alt", color: "text-blue-600" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="rounded-2xl border border-outline-variant/25 bg-white px-4 py-3.5 flex items-center gap-3 shadow-sm">
              <span className={`material-symbols-outlined text-[22px] select-none ${color}`}>{icon}</span>
              <div>
                <p className={`text-xl font-bold leading-none ${color}`}>{value}</p>
                <p className="text-[10px] text-on-surface-variant font-semibold mt-0.5 select-none uppercase tracking-wider">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* ── Content ── */}
      <div>
        {isLoading ? (
          <div className="rounded-[24px] border border-outline-variant/30 bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-surface-container border-b border-outline-variant/30 text-on-surface-variant font-bold select-none uppercase tracking-wider text-[10px]">
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Tutor</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Salary</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/15">
                  {[0, 1, 2].map((i) => <SkeletonRow key={i} />)}
                </tbody>
              </table>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 text-rose-600 bg-rose-50 border border-rose-200 rounded-2xl px-5 py-4 text-sm font-semibold">
            <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
            <span>{error}</span>
          </div>
        ) : bookings.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[24px] border border-outline-variant/30 bg-white overflow-hidden shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-surface-container border-b border-outline-variant/30 text-on-surface-variant font-bold select-none uppercase tracking-wider text-[10px]">
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Tutor</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Salary</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/15 font-medium">
                  {bookings.map((booking) => {
                    const req = booking.tuitionRequest
                    const statusStyle = STATUS_STYLES[booking.status] ?? STATUS_STYLES.ACTIVE
                    return (
                      <tr key={booking.id} className="hover:bg-surface-container-lowest transition-colors">
                        <td className="px-6 py-4 font-bold text-on-surface">
                          {req?.subject || "—"}
                          <span className="block text-[10px] text-on-surface-variant font-medium mt-0.5">
                            {req?.classLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-on-surface">
                          {booking.tutor?.name || "—"}
                          <span className="block text-[10px] text-on-surface-variant font-normal mt-0.5">
                            {booking.tutor?.email}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant">
                          {req ? `${req.area}, ${req.district}` : "—"}
                        </td>
                        <td className="px-6 py-4 text-primary font-bold">
                          {req?.salary
                            ? `৳${new Intl.NumberFormat("en-IN").format(req.salary)}/mo`
                            : "—"}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${statusStyle}`}>
                            {booking.status.charAt(0) + booking.status.slice(1).toLowerCase()}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/8 border border-primary/15 flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-4xl text-primary select-none">event_note</span>
            </div>
            <h3 className="text-headline-sm font-bold text-on-surface mb-2">No Bookings Yet</h3>
            <p className="text-on-surface-variant font-body-md max-w-sm mb-8 leading-relaxed">
              Once you accept a tutor application, the booking will appear here automatically.
            </p>
            <Link
              href="/dashboard/student/applications"
              className="h-12 px-6 bg-primary text-on-primary font-semibold text-sm rounded-xl hover:opacity-95 transition-all shadow-md shadow-primary/20 flex items-center gap-2 select-none"
            >
              <span className="material-symbols-outlined text-[18px]">people</span>
              <span>View Applicants</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
