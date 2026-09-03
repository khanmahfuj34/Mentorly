"use client"

import React, { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import DashboardHeader from "@/src/components/dashboard/tutor/home/DashboardHeader"
import StatsCards from "@/src/components/dashboard/tutor/home/StatsCards"
import ApplicationStatusSummary from "@/src/components/dashboard/tutor/home/ApplicationStatusSummary"
import RecentApplications from "@/src/components/dashboard/tutor/home/RecentApplications"
import ActiveBookings from "@/src/components/dashboard/tutor/home/ActiveBookings"
import FindTuitionCTA from "@/src/components/dashboard/tutor/home/FindTuitionCTA"
import DashboardSkeleton from "@/src/components/dashboard/tutor/home/DashboardSkeleton"

import { getMyApplications } from "@/src/services/application/application.service"
import { getMyBookings, IBooking } from "@/src/services/booking/booking.service"
import { ITutorApplication } from "@/src/types/application.types"

export default function TutorOverviewPage() {
  const [applications, setApplications] = useState<ITutorApplication[]>([])
  const [bookings, setBookings] = useState<IBooking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refreshDashboardData = useCallback(async () => {
    setIsRefreshing(true)
    setError(null)

    try {
      const [appsRes, bookingsRes] = await Promise.allSettled([
        getMyApplications(),
        getMyBookings(),
      ])

      if (appsRes.status === "fulfilled" && appsRes.value.success) {
        setApplications(appsRes.value.data || [])
      } else {
        setApplications([])
      }

      if (bookingsRes.status === "fulfilled" && bookingsRes.value.success) {
        setBookings(bookingsRes.value.data || [])
      } else {
        setBookings([])
      }

      if (appsRes.status === "rejected" && bookingsRes.status === "rejected") {
        setError("Failed to load dashboard data. Please try again.")
        toast.error("Failed to refresh dashboard")
      } else {
        toast.success("Dashboard refreshed")
      }
    } catch (err) {
      console.error("Dashboard data load error:", err)
      setError("Failed to load dashboard data.")
      toast.error("Failed to load dashboard data")
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    Promise.allSettled([getMyApplications(), getMyBookings()])
      .then(([appsRes, bookingsRes]) => {
        if (!isMounted) return

        if (appsRes.status === "fulfilled" && appsRes.value.success) {
          setApplications(appsRes.value.data || [])
        } else {
          setApplications([])
        }

        if (bookingsRes.status === "fulfilled" && bookingsRes.value.success) {
          setBookings(bookingsRes.value.data || [])
        } else {
          setBookings([])
        }

        if (appsRes.status === "rejected" && bookingsRes.status === "rejected") {
          setError("Failed to load dashboard data. Please try again.")
        }
      })
      .catch((err) => {
        if (!isMounted) return
        console.error("Dashboard data load error:", err)
        setError("Failed to load dashboard data.")
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  // Calculate statistics metrics
  const totalApplications = applications.length
  const pendingApplications = applications.filter((a) => a.status === "PENDING").length
  const acceptedApplications = applications.filter((a) => a.status === "ACCEPTED").length
  const rejectedApplications = applications.filter((a) => a.status === "REJECTED").length
  const activeBookingsCount = bookings.filter(
    (b) => b.status === "ACTIVE" || b.status === "PENDING"
  ).length

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* 1. Header */}
      <DashboardHeader
        onRefresh={refreshDashboardData}
        isRefreshing={isRefreshing}
      />

      {/* Error Retry Banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs font-medium text-red-800 flex items-center justify-between gap-4 shadow-xs"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-red-600 text-lg">error</span>
            <span>{error}</span>
          </div>
          <button
            onClick={refreshDashboardData}
            className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-semibold text-xs hover:bg-red-700 transition-all cursor-pointer shrink-0"
          >
            Retry
          </button>
        </motion.div>
      )}

      {/* 2. Quick Statistics Grid */}
      <StatsCards
        totalApplications={totalApplications}
        pendingApplications={pendingApplications}
        acceptedApplications={acceptedApplications}
        activeBookings={activeBookingsCount}
      />

      {/* 3. Main Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Applications & Bookings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Applications */}
          <RecentApplications applications={applications} />

          {/* Active Bookings */}
          <ActiveBookings bookings={bookings} />
        </div>

        {/* Right Column (1 Col): Breakdown & CTA Banner */}
        <div className="space-y-8">
          {/* Application Status Summary */}
          <ApplicationStatusSummary
            pendingCount={pendingApplications}
            acceptedCount={acceptedApplications}
            rejectedCount={rejectedApplications}
            totalCount={totalApplications}
          />

          {/* Find Tuition CTA Banner */}
          <FindTuitionCTA />
        </div>
      </div>
    </div>
  )
}
