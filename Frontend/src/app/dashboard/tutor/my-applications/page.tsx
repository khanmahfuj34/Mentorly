"use client"

import React, { useState } from "react"
import { useTutorApplications } from "../../../../hooks/application/useTutorApplications"
import TutorApplicationCard from "../../../../components/applications/tutor/TutorApplicationCard"
import ApplicationSkeleton from "../../../../components/applications/shared/ApplicationSkeleton"
import EmptyApplicationState from "../../../../components/applications/shared/EmptyApplicationState"
import { ApplicationStatus } from "../../../../types/application.types"
import Link from "next/link"

export default function MyApplicationsPage() {
  const { data, isLoading, refetch } = useTutorApplications()
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "ALL">("ALL")

  // Filter application list
  const filteredData = data.filter((app) => {
    if (statusFilter === "ALL") return true
    return app.status === statusFilter
  })

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 md:px-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface mb-2">My Applications</h2>
          <p className="text-on-surface-variant font-body-md">
            Track the status of all tuition applications you have submitted.
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="h-10 px-4 border border-outline-variant/30 text-on-surface rounded-xl hover:bg-surface-container-low transition-all font-semibold text-xs flex items-center gap-1.5 cursor-pointer select-none"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          <span>Refresh</span>
        </button>
      </div>

      {/* Toolbar Status Filters */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-outline-variant/20">
        {(["ALL", "PENDING", "ACCEPTED", "REJECTED"] as const).map((filter) => {
          const isActive = statusFilter === filter
          return (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`h-9 px-4 rounded-xl font-semibold text-xs border transition-all cursor-pointer select-none ${
                isActive
                  ? "border-primary bg-primary text-on-primary shadow-sm shadow-primary/10"
                  : "border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              {filter === "ALL" ? "All Applications" : filter.toLowerCase()}
            </button>
          )
        })}
      </div>

      {/* Main List */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <ApplicationSkeleton key={i} />)
        ) : filteredData.length > 0 ? (
          filteredData.map((app) => (
            <TutorApplicationCard key={app.id} application={app} />
          ))
        ) : (
          <EmptyApplicationState
            title={statusFilter === "ALL" ? "No Applications Yet" : `No ${statusFilter.toLowerCase()} Applications`}
            subtitle={
              statusFilter === "ALL"
                ? "You haven't submitted any applications for tuition requests yet. Explore open posts to start teaching."
                : `You don't have any applications currently marked as ${statusFilter.toLowerCase()}.`
            }
            icon="assignment"
            actionLabel={statusFilter === "ALL" ? "Find Tuition" : undefined}
            onAction={() => {
              window.location.href = "/dashboard/tutor/find-tuition"
            }}
          />
        )}
      </div>
    </div>
  )
}
