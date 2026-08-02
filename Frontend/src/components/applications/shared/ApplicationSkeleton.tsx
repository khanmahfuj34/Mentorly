import React from "react"

export default function ApplicationSkeleton() {
  return (
    <div className="rounded-[24px] border border-outline-variant/30 bg-white p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-pulse w-full">
      <div className="space-y-3 flex-1">
        <div className="flex items-center gap-3">
          <div className="h-6 w-20 bg-outline-variant/20 rounded-full" />
          <div className="h-5 w-32 bg-outline-variant/15 rounded" />
        </div>
        <div className="h-6 w-2/3 bg-outline-variant/25 rounded-md" />
        <div className="flex gap-4">
          <div className="h-4 w-24 bg-outline-variant/15 rounded" />
          <div className="h-4 w-28 bg-outline-variant/15 rounded" />
        </div>
      </div>
      <div className="h-11 w-full md:w-32 bg-outline-variant/20 rounded-xl shrink-0" />
    </div>
  )
}
