import React from "react"

export default function MyTuitionPostsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:px-10 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/30 pb-6">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-outline-variant/30 rounded-lg"></div>
          <div className="h-4 w-80 bg-outline-variant/30 rounded-lg"></div>
        </div>
        <div className="h-12 w-44 bg-outline-variant/30 rounded-xl"></div>
      </div>

      {/* Filter Bar Skeleton */}
      <div className="h-16 w-full bg-outline-variant/10 rounded-2xl"></div>

      {/* Cards List Skeleton */}
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-6 md:p-8 rounded-[28px] border border-outline-variant/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-6 w-36 bg-outline-variant/30 rounded-md"></div>
                <div className="h-6 w-16 bg-outline-variant/30 rounded-full"></div>
                <div className="h-6 w-24 bg-outline-variant/30 rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-6">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-4 w-28 bg-outline-variant/20 rounded-md"></div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-6">
              <div className="space-y-1">
                <div className="h-3 w-16 bg-outline-variant/20 rounded-sm"></div>
                <div className="h-4 w-24 bg-outline-variant/20 rounded-sm"></div>
              </div>
              <div className="h-11 w-32 bg-outline-variant/30 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
