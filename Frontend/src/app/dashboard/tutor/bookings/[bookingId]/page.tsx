"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { getSingleBooking, IBookingDetail } from "../../../../../services/booking/booking.service"

/* ─── helpers ─── */
function fmt(date?: string | null) {
  if (!date) return "—"
  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric", month: "long", year: "numeric",
  }).format(new Date(date))
}
function fmtSalary(n?: number | null) {
  if (!n) return "—"
  return `৳${new Intl.NumberFormat("en-IN").format(n)}`
}

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  COMPLETED: "bg-blue-50 text-blue-700 border-blue-200",
  CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
  OPEN: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ASSIGNED: "bg-blue-50 text-blue-700 border-blue-200",
}

/* ─── Small helpers ─── */
function SectionHeading({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 select-none">
      <span className="material-symbols-outlined text-[20px] text-primary">{icon}</span>
      <h3 className="text-title-sm font-bold text-on-surface tracking-tight">{label}</h3>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-bold text-on-surface-variant/55 uppercase tracking-widest select-none">
        {label}
      </span>
      <span className="text-sm font-semibold text-on-surface">
        {value ?? "—"}
      </span>
    </div>
  )
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[24px] border border-outline-variant/30 bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

/* ─── Loading skeleton ─── */
function BookingDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 md:px-10 space-y-6 animate-pulse">
      <div className="h-4 w-36 bg-outline-variant/20 rounded" />
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-5">
          {[180, 160, 220].map((h, i) => (
            <div key={i} className={`rounded-[24px] border border-outline-variant/15 bg-white`} style={{ height: h }} />
          ))}
        </div>
        <div className="lg:col-span-4 space-y-5">
          {[140, 160, 130].map((h, i) => (
            <div key={i} className={`rounded-[24px] border border-outline-variant/15 bg-white`} style={{ height: h }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Main page ─── */
export default function TutorBookingDetailPage() {
  const { bookingId } = useParams() as { bookingId: string }
  const router = useRouter()

  const [booking, setBooking] = useState<IBookingDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const fetchBooking = async () => {
      try {
        const res = await getSingleBooking(bookingId)
        if (!active) return
        if (res.success) {
          setBooking(res.data)
        } else {
          setError("Failed to load booking details.")
        }
      } catch (err) {
        if (!active) return
        const errorResponse = err as { response?: { data?: { message?: string } }; message?: string }
        setError(errorResponse?.response?.data?.message || errorResponse?.message || "Failed to load booking details.")
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    fetchBooking()

    return () => {
      active = false
    }
  }, [bookingId])

  if (isLoading) return <BookingDetailSkeleton />

  /* ── Error ── */
  if (error || !booking) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-[28px] text-rose-500 select-none">error</span>
        </div>
        <h3 className="text-headline-sm font-bold text-on-surface mb-2">Booking Not Found</h3>
        <p className="text-on-surface-variant text-sm mb-8">
          {error || "This booking could not be loaded."}
        </p>
        <Link
          href="/dashboard/tutor/bookings"
          className="h-11 px-6 bg-primary text-on-primary font-semibold text-sm rounded-xl hover:opacity-95 transition-all select-none flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Bookings
        </Link>
      </div>
    )
  }

  const student = booking.student
  const sp = student?.studentProfile
  const req = booking.tuitionRequest
  const bookingStatusStyle = STATUS_STYLES[booking.status] ?? STATUS_STYLES.ACTIVE
  const tuitionStatusStyle = STATUS_STYLES[req?.status ?? "OPEN"] ?? STATUS_STYLES.OPEN
  const studentInitials = student?.name
    ? student.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "ST"

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 md:px-10 space-y-6">

      {/* ── Back ── */}
      <Link
        href="/dashboard/tutor/bookings"
        className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors select-none"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Back to Bookings
      </Link>

      {/* ── Page title ── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface leading-tight">
            Booking Details
          </h2>
          <p className="text-on-surface-variant text-sm font-medium mt-1">
            {req?.subject || "Tuition"} · {req?.classLevel} · {req?.district}
          </p>
        </div>
        <span className={`self-start sm:self-center inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wide select-none ${bookingStatusStyle}`}>
          {booking.status.charAt(0) + booking.status.slice(1).toLowerCase()}
        </span>
      </motion.div>

      {/* ── Main Grid ── */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">

        {/* ══ LEFT COLUMN (8/12) ══ */}
        <div className="lg:col-span-8 space-y-5">

          {/* Student Info Card */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Card>
              <SectionHeading icon="person" label="Student Information" />
              <div className="flex gap-4 items-start pb-5 mb-5 border-b border-outline-variant/15">
                {/* Avatar */}
                {sp?.profilePhoto ? (
                  <img src={sp.profilePhoto} alt={student?.name} className="w-14 h-14 rounded-full object-cover border border-outline-variant shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-lg border border-primary/20 shrink-0 select-none">
                    {studentInitials}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-lg text-on-surface leading-tight">{student?.name || "—"}</h4>
                  <p className="text-sm text-on-surface-variant mt-0.5">{student?.email || "—"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
                <InfoRow label="Email" value={student?.email} />
                <InfoRow label="District" value={sp?.district || req?.district} />
                <InfoRow label="Area" value={sp?.area || req?.area} />
                <InfoRow label="Full Address" value={[sp?.area, sp?.district].filter(Boolean).join(", ") || "—"} />
                <InfoRow label="School / College" value={sp?.schoolCollege} />
                <InfoRow label="Class Level" value={sp?.classLevel} />
              </div>
            </Card>
          </motion.div>

          {/* Guardian Info Card */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <SectionHeading icon="supervisor_account" label="Guardian Information" />
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                <InfoRow label="Guardian Name" value={sp?.guardianName} />
                <InfoRow label="Guardian Phone" value={sp?.guardianPhone} />
              </div>
            </Card>
          </motion.div>

          {/* Tuition Request Card */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card>
              <SectionHeading icon="menu_book" label="Tuition Information" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 mb-5">
                <InfoRow label="Subject" value={req?.subject} />
                <InfoRow label="Class Level" value={req?.classLevel} />
                <InfoRow label="Medium" value={req?.medium} />
                <InfoRow label="Gender Preference" value={req?.genderPreference} />
                <InfoRow label="District" value={req?.district} />
                <InfoRow label="Area" value={req?.area} />
                <InfoRow label="Monthly Salary" value={fmtSalary(req?.salary)} />
                <InfoRow label="Days Per Week" value={req?.daysPerWeek != null ? `${req.daysPerWeek} days/week` : undefined} />
                <InfoRow label="Post Created" value={fmt(req?.createdAt)} />
              </div>

              {/* Tuition status badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold text-on-surface-variant/55 uppercase tracking-widest select-none">
                  Tuition Status
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase select-none ${tuitionStatusStyle}`}>
                  {req?.status?.charAt(0) + (req?.status?.slice(1).toLowerCase() ?? "")}
                </span>
              </div>

              {/* Description */}
              {req?.description && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-on-surface-variant/55 uppercase tracking-widest select-none block">
                    Description
                  </span>
                  <p className="text-sm text-on-surface-variant leading-relaxed bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-4 whitespace-pre-line">
                    {req.description}
                  </p>
                </div>
              )}

              {/* Preferred subjects */}
              {sp?.preferredSubjects && sp.preferredSubjects.length > 0 && (
                <div className="mt-5 space-y-2">
                  <span className="text-[10px] font-bold text-on-surface-variant/55 uppercase tracking-widest select-none block">
                    Student's Preferred Subjects
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sp.preferredSubjects.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface-container text-on-surface border border-outline-variant/15">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* ══ RIGHT COLUMN (4/12) ══ */}
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">

          {/* Student Profile Card */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            <Card>
              <div className="flex flex-col items-center text-center gap-3 pb-5 mb-5 border-b border-outline-variant/15">
                {sp?.profilePhoto ? (
                  <img src={sp.profilePhoto} alt={student?.name} className="w-16 h-16 rounded-full object-cover border border-outline-variant" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xl border border-primary/20 select-none">
                    {studentInitials}
                  </div>
                )}
                <div>
                  <p className="font-bold text-on-surface text-base leading-tight">{student?.name}</p>
                  <p className="text-xs text-on-surface-variant font-medium mt-0.5">{sp?.schoolCollege || "Student"}</p>
                  <p className="text-xs text-on-surface-variant/60 mt-0.5">{sp?.classLevel}</p>
                </div>
              </div>
              <div className="space-y-3 text-xs font-semibold text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[15px] text-outline select-none">mail</span>
                  <span className="truncate">{student?.email || "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[15px] text-outline select-none">location_on</span>
                  <span>{[sp?.area, sp?.district].filter(Boolean).join(", ") || "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[15px] text-outline select-none">call</span>
                  <span>{sp?.guardianPhone || "—"}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Booking Status Card */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
            <Card>
              <SectionHeading icon="bookmark" label="Booking Status" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant font-medium select-none">Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase select-none ${bookingStatusStyle}`}>
                    {booking.status.charAt(0) + booking.status.slice(1).toLowerCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-on-surface-variant select-none">Created</span>
                  <span className="text-on-surface font-semibold">{fmt(booking.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-on-surface-variant select-none">Start Date</span>
                  <span className="text-on-surface font-semibold">{fmt(booking.startDate)}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-on-surface-variant select-none">End Date</span>
                  <span className="text-on-surface font-semibold">{fmt(booking.endDate)}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Summary Card */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
            <Card>
              <SectionHeading icon="summarize" label="Quick Summary" />
              <div className="space-y-3">
                {[
                  { label: "Subject", value: req?.subject },
                  { label: "Class", value: req?.classLevel },
                  { label: "Salary", value: fmtSalary(req?.salary) + "/mo" },
                  { label: "Days / Week", value: req?.daysPerWeek != null ? `${req.daysPerWeek} days` : undefined },
                  { label: "Location", value: req ? `${req.area}, ${req.district}` : undefined },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-xs font-medium">
                    <span className="text-on-surface-variant select-none">{label}</span>
                    <span className="text-on-surface font-semibold text-right">{value ?? "—"}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
