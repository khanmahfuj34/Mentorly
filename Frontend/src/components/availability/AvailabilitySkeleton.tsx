"use client"

import React from "react"

export default function AvailabilitySkeleton() {
  const skeletonRows = Array.from({ length: 7 })

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-outline-variant/30 rounded-lg mb-2"></div>
        <div className="h-4 w-72 sm:w-96 bg-outline-variant/20 rounded-md"></div>
      </div>

      {/* Main Card Skeleton */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Card Subheader */}
        <div className="border-b border-outline-variant/20 pb-5">
          <div className="h-6 w-44 bg-outline-variant/30 rounded-md mb-2"></div>
          <div className="h-4 w-64 bg-outline-variant/20 rounded-md"></div>
        </div>

        {/* Rows */}
        <div className="space-y-4">
          {skeletonRows.map((_, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-surface/60 border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Day & Toggle Skeleton */}
              <div className="flex items-center justify-between sm:justify-start gap-4 sm:w-1/3">
                <div className="h-5 w-24 bg-outline-variant/30 rounded-md"></div>
                <div className="h-6 w-12 bg-outline-variant/30 rounded-full"></div>
              </div>

              {/* Time Inputs Skeleton */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="h-10 w-28 bg-outline-variant/20 rounded-xl"></div>
                <div className="h-4 w-4 bg-outline-variant/30 rounded-full"></div>
                <div className="h-10 w-28 bg-outline-variant/20 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Button Skeleton */}
        <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
          <div className="h-12 w-full sm:w-44 bg-outline-variant/40 rounded-xl"></div>
        </div>
      </div>
    </div>
  )
}
