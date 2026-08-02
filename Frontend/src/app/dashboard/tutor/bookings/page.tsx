"use client"

import React, { useState, useEffect, useCallback } from "react"
import { getMyBookings, IBooking } from "../../../../services/booking/booking.service"
import EmptyApplicationState from "../../../../components/applications/shared/EmptyApplicationState"

export default function TutorBookingsPage() {
  const [bookings, setBookings] = useState<IBooking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBookings = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await getMyBookings()
      if (res.success) {
        setBookings(res.data)
      } else {
        setError("Failed to load bookings")
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to load bookings")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 md:px-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface mb-2">My Bookings</h2>
          <p className="text-on-surface-variant font-body-md">
            Review active teaching contracts, booking schedules, and student info.
          </p>
        </div>
        <button
          onClick={() => fetchBookings()}
          className="h-10 px-4 border border-outline-variant/30 text-on-surface rounded-xl hover:bg-surface-container-low transition-all font-semibold text-xs flex items-center gap-1.5 cursor-pointer select-none"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          <span>Refresh</span>
        </button>
      </div>

      {/* Main List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 w-full bg-outline-variant/15 border border-outline-variant/25 rounded-[24px] animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-rose-600 font-semibold text-sm">
            {error}
          </div>
        ) : bookings.length > 0 ? (
          <div className="rounded-[24px] border border-outline-variant/30 bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-surface-container border-b border-outline-variant/30 text-on-surface-variant font-bold select-none uppercase tracking-wider text-[10px]">
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Student (Guardian)</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Salary</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 font-medium">
                  {bookings.map((booking) => {
                    const req = booking.tuitionRequest
                    return (
                      <tr key={booking.id} className="hover:bg-surface-container-lowest transition-colors">
                        <td className="px-6 py-4 font-bold text-on-surface">
                          {req?.subject || "NCTB Subject"}
                          <span className="block text-[10px] text-on-surface-variant font-medium mt-0.5">
                            {req?.classLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-on-surface">
                          {booking.student?.name || "Student"}
                          <span className="block text-[10px] text-on-surface-variant font-normal mt-0.5">
                            {booking.student?.email}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant">
                          {req?.area || "N/A"}, {req?.district}
                        </td>
                        <td className="px-6 py-4 text-primary font-bold">
                          ৳{req?.salary ? new Intl.NumberFormat("en-IN").format(req.salary) : "N/A"}/mo
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                            booking.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EmptyApplicationState
            title="No Bookings Yet"
            subtitle="Your active bookings will appear here once a student accepts your application for a tuition post."
            icon="event_available"
            actionLabel="My Applications"
            onAction={() => {
              window.location.href = "/dashboard/tutor/my-applications"
            }}
          />
        )}
      </div>
    </div>
  )
}
