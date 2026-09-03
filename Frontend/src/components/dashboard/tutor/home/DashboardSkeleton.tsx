"use client"

import React from "react"

export default function DashboardSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-outline-variant/30 rounded-xl" />
          <div className="h-4 w-80 bg-outline-variant/20 rounded-md" />
        </div>
        <div className="h-10 w-32 bg-outline-variant/30 rounded-xl" />
      </div>

      {/* Stats Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-outline-variant/30 space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-outline-variant/20" />
              <div className="w-12 h-4 bg-outline-variant/20 rounded-full" />
            </div>
            <div className="space-y-1">
              <div className="h-4 w-24 bg-outline-variant/20 rounded" />
              <div className="h-8 w-16 bg-outline-variant/30 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Applications & Bookings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Applications List Skeleton */}
          <div className="bg-white rounded-3xl p-6 border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
              <div className="h-6 w-40 bg-outline-variant/30 rounded" />
              <div className="h-4 w-20 bg-outline-variant/20 rounded" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-outline-variant/20 bg-surface/50 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-outline-variant/30" />
                    <div className="space-y-1">
                      <div className="h-4 w-28 bg-outline-variant/30 rounded" />
                      <div className="h-3 w-40 bg-outline-variant/20 rounded" />
                    </div>
                  </div>
                  <div className="h-8 w-24 bg-outline-variant/20 rounded-xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Bookings List Skeleton */}
          <div className="bg-white rounded-3xl p-6 border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
              <div className="h-6 w-36 bg-outline-variant/30 rounded" />
              <div className="h-4 w-20 bg-outline-variant/20 rounded" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-outline-variant/20 bg-surface/50 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-outline-variant/30" />
                    <div className="space-y-1">
                      <div className="h-4 w-32 bg-outline-variant/30 rounded" />
                      <div className="h-3 w-44 bg-outline-variant/20 rounded" />
                    </div>
                  </div>
                  <div className="h-8 w-24 bg-outline-variant/20 rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Summary & CTA Skeleton */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-6 border border-outline-variant/30 space-y-4">
            <div className="h-5 w-36 bg-outline-variant/30 rounded" />
            <div className="h-4 w-full bg-outline-variant/20 rounded-full" />
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full bg-outline-variant/20 rounded" />
              <div className="h-3 w-full bg-outline-variant/20 rounded" />
            </div>
          </div>

          <div className="bg-primary/10 rounded-3xl p-6 border border-primary/20 space-y-4">
            <div className="h-6 w-48 bg-primary/20 rounded" />
            <div className="h-4 w-full bg-primary/10 rounded" />
            <div className="h-10 w-full bg-primary/30 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
