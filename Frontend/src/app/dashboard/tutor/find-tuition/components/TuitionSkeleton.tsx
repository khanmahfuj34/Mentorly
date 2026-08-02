import React from "react"

export default function TuitionSkeleton() {
  return (
    <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 shadow-sm flex flex-col justify-between h-[340px] animate-pulse">
      <div className="space-y-4">
        {/* Top Header Row (Status & Salary) */}
        <div className="flex justify-between items-start gap-4">
          <div className="h-6 w-20 bg-outline-variant/30 rounded-full" />
          <div className="h-7 w-28 bg-outline-variant/30 rounded-xl" />
        </div>

        {/* Subject & Class */}
        <div className="space-y-2">
          <div className="h-7 w-2/3 bg-outline-variant/30 rounded-lg" />
          <div className="h-5 w-1/2 bg-outline-variant/30 rounded-lg" />
        </div>

        {/* Detail Chips */}
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="h-6 w-16 bg-outline-variant/20 rounded-lg" />
          <div className="h-6 w-24 bg-outline-variant/20 rounded-lg" />
          <div className="h-6 w-20 bg-outline-variant/20 rounded-lg" />
        </div>

        {/* Short Description */}
        <div className="space-y-1.5 pt-2">
          <div className="h-4 w-full bg-outline-variant/15 rounded" />
          <div className="h-4 w-5/6 bg-outline-variant/15 rounded" />
        </div>
      </div>

      {/* Card Action Row */}
      <div className="flex justify-between items-center border-t border-outline-variant/20 pt-4 mt-4">
        <div className="h-4 w-24 bg-outline-variant/20 rounded" />
        <div className="h-10 w-28 bg-outline-variant/30 rounded-xl" />
      </div>
    </div>
  )
}
