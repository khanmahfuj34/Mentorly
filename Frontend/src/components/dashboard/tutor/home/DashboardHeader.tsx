"use client"

import React from "react"
import Link from "next/link"
import { useAuth } from "@/src/hooks/useAuth"

interface DashboardHeaderProps {
  onRefresh: () => void
  isRefreshing?: boolean
}

export default function DashboardHeader({ onRefresh, isRefreshing }: DashboardHeaderProps) {
  const { user } = useAuth()

  const tutorName = user?.name ? user.name.split(" ")[0] : "Tutor"
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "TU"

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-sm">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/tutor/profile" className="shrink-0 group">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 rounded-2xl object-cover border border-outline-variant shadow-sm group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center text-lg border border-primary/20 shadow-sm group-hover:scale-105 transition-transform select-none">
              {initials}
            </div>
          )}
        </Link>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Welcome back, {tutorName}!
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase text-[10px] tracking-wider border border-primary/20">
              {user?.role || "TUTOR"}
            </span>
          </div>
          <p className="text-sm text-on-surface-variant mt-0.5">
            Here's what's happening with your tutoring activities.
          </p>
        </div>
      </div>

      <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container text-on-surface font-semibold text-xs border border-outline-variant/30 hover:bg-surface-container-high transition-all cursor-pointer disabled:opacity-50 w-fit shrink-0 select-none shadow-xs"
      >
        <span
          className={`material-symbols-outlined text-base text-primary ${
            isRefreshing ? "animate-spin" : ""
          }`}
        >
          refresh
        </span>
        <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
      </button>
    </div>
  )
}
