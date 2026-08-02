import React from "react"

export default function TuitionSkeleton() {
  return (
    <div className="rounded-[24px] border border-outline-variant/30 bg-white p-6 shadow-sm flex flex-col justify-between h-[380px] animate-pulse">
      {/* Content skeleton */}
      <div className="flex-1 flex flex-col justify-start overflow-hidden space-y-3.5">
        {/* Header */}
        <div className="flex justify-between items-center gap-4 shrink-0">
          <div className="h-6 w-16 bg-outline-variant/25 rounded-full" />
          <div className="h-6 w-24 bg-outline-variant/25 rounded-xl" />
        </div>

        {/* Title */}
        <div className="space-y-2 shrink-0">
          <div className="h-5 w-5/6 bg-outline-variant/25 rounded-lg" />
          <div className="h-4 w-1/2 bg-outline-variant/20 rounded-lg" />
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 shrink-0">
          <div className="h-7 w-20 bg-outline-variant/15 rounded-full" />
          <div className="h-7 w-24 bg-outline-variant/15 rounded-full" />
          <div className="h-7 w-16 bg-outline-variant/15 rounded-full" />
        </div>

        {/* Description */}
        <div className="space-y-1.5 flex-1 pt-1">
          <div className="h-3.5 w-full bg-outline-variant/10 rounded" />
          <div className="h-3.5 w-4/5 bg-outline-variant/10 rounded" />
        </div>

        {/* Address */}
        <div className="h-3.5 w-1/3 bg-outline-variant/15 rounded shrink-0" />
      </div>

      {/* Button */}
      <div className="pt-4 border-t border-outline-variant/15 mt-4 shrink-0">
        <div className="h-11 w-full bg-outline-variant/25 rounded-xl" />
      </div>
    </div>
  )
}
