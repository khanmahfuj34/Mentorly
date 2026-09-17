"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IDashboardUpcomingBooking } from "@/src/types/studentDashboard.types";
import { getTutorProfileImage } from "@/src/utils/tutorAvatar";

interface UpcomingBookingCardProps {
  booking: IDashboardUpcomingBooking | null;
}

export const UpcomingBookingCard: React.FC<UpcomingBookingCardProps> = ({ booking }) => {
  if (!booking) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">event_available</span>
            Upcoming Booking
          </h2>
          <span className="text-xs text-slate-500 font-medium">0 active sessions</span>
        </div>

        <div className="py-8 px-4 text-center space-y-3 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-2xl">
            <span className="material-symbols-outlined">calendar_today</span>
          </div>
          <h3 className="font-bold text-sm text-slate-800">No upcoming bookings</h3>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            You don't have any active tutoring sessions scheduled. Connect with a tutor to begin your learning journey.
          </p>
          <Link
            href="/dashboard/student/find-tutors"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">search</span>
            <span>Find a Tutor</span>
          </Link>
        </div>
      </div>
    );
  }

  const tutorName = booking.tutor?.name || "Tutor Mentor";
  const tutorProfile = booking.tutor?.tutorProfile;
  const profileImage = getTutorProfileImage({ ...tutorProfile, name: tutorName });
  const subject = booking.tuitionRequest?.subject || "Tutoring Session";
  const classLevel = booking.tuitionRequest?.classLevel || "";
  const location = booking.tuitionRequest
    ? `${booking.tuitionRequest.area}, ${booking.tuitionRequest.district}`
    : "Online / In-Person";
  const rate = booking.tuitionRequest?.salary ? `৳${booking.tuitionRequest.salary.toLocaleString()}/mo` : "Active";

  const startDateText = booking.startDate
    ? new Date(booking.startDate).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "Scheduled Active Session";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-5 relative overflow-hidden"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold tracking-tight text-slate-900 font-display flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-500 text-xl">event_available</span>
          Upcoming Active Booking
        </h2>
        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
          {booking.status}
        </span>
      </div>

      <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50/60 via-indigo-50/40 to-slate-50 border border-purple-100/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={profileImage}
              alt={tutorName}
              className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 shadow-md shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/assets/images/tutors/asifur-rahman.png";
              }}
            />
            <div className="space-y-0.5">
              <h3 className="font-bold text-base text-slate-900 font-display">
                {tutorName}
              </h3>
              <p className="text-xs text-primary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">book</span>
                {subject} {classLevel && `(${classLevel})`}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-extrabold text-slate-900 block">
              {startDateText}
            </span>
            <span className="text-[11px] text-slate-600">
              Rate: <strong className="text-emerald-600">{rate}</strong>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-purple-100/60 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 truncate">
            <span className="material-symbols-outlined text-sm text-rose-500 shrink-0">location_on</span>
            <span className="truncate">{location}</span>
          </div>

          <Link
            href="/dashboard/student/bookings"
            className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer inline-flex items-center gap-1"
          >
            <span>View Booking</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
