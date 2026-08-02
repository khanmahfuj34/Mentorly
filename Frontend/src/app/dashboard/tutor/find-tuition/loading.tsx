import React from "react"
import TuitionSkeleton from "./components/TuitionSkeleton"

export default function FindTuitionLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:px-10 space-y-8 animate-pulse">
      {/* Title Header */}
      <div className="space-y-2">
        <div className="h-9 w-48 bg-outline-variant/30 rounded-lg" />
        <div className="h-5 w-80 bg-outline-variant/20 rounded" />
      </div>

      {/* Toolbar Search / Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full flex gap-3">
          <div className="h-12 w-full bg-outline-variant/20 rounded-xl" />
          <div className="lg:hidden h-12 w-24 bg-outline-variant/20 rounded-xl shrink-0" />
        </div>
        <div className="h-12 w-full sm:w-[200px] bg-outline-variant/20 rounded-xl shrink-0" />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 space-y-4">
          <div className="h-[400px] w-full bg-outline-variant/15 rounded-[28px] border border-outline-variant/25" />
        </aside>

        {/* Right Cards Grid */}
        <div className="lg:col-span-9 space-y-4">
          <div className="h-4 w-32 bg-outline-variant/25 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <TuitionSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
