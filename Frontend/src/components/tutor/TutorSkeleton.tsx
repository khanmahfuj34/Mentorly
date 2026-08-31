import React from "react";

export function TutorCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-outline-variant/30 p-6 flex flex-col justify-between shadow-sm animate-pulse min-h-[380px]">
      <div>
        {/* Header: Avatar + Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-surface-container-low shrink-0" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-5 bg-surface-container-low rounded-md w-3/4" />
            <div className="h-4 bg-surface-container-low rounded-md w-1/2" />
            <div className="h-3 bg-surface-container-low rounded-md w-2/3" />
          </div>
        </div>

        {/* Badges / Chips */}
        <div className="space-y-2 my-4">
          <div className="flex gap-2">
            <div className="h-6 bg-surface-container-low rounded-full w-20" />
            <div className="h-6 bg-surface-container-low rounded-full w-24" />
            <div className="h-6 bg-surface-container-low rounded-full w-16" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 bg-surface-container-low rounded-full w-28" />
            <div className="h-6 bg-surface-container-low rounded-full w-20" />
          </div>
        </div>

        {/* Location & Experience */}
        <div className="space-y-2 py-2 border-t border-outline-variant/20">
          <div className="h-4 bg-surface-container-low rounded w-1/2" />
          <div className="h-4 bg-surface-container-low rounded w-2/3" />
        </div>
      </div>

      {/* Footer: Rate + Button */}
      <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between mt-4">
        <div className="h-6 bg-surface-container-low rounded w-24" />
        <div className="h-10 bg-surface-container-low rounded-xl w-28" />
      </div>
    </div>
  );
}

export function TutorProfileSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-pulse p-4 md:p-8">
      {/* Banner Skeleton */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/30 flex flex-col md:flex-row gap-6 items-center">
        <div className="w-28 h-28 rounded-full bg-surface-container-low shrink-0" />
        <div className="flex-1 space-y-3 w-full text-center md:text-left">
          <div className="h-8 bg-surface-container-low rounded-lg w-1/2 mx-auto md:mx-0" />
          <div className="h-4 bg-surface-container-low rounded w-1/3 mx-auto md:mx-0" />
          <div className="flex justify-center md:justify-start gap-3 pt-2">
            <div className="h-6 bg-surface-container-low rounded-full w-24" />
            <div className="h-6 bg-surface-container-low rounded-full w-32" />
          </div>
        </div>
      </div>

      {/* Detail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-outline-variant/30 space-y-4">
          <div className="h-6 bg-surface-container-low rounded w-1/4" />
          <div className="h-4 bg-surface-container-low rounded w-full" />
          <div className="h-4 bg-surface-container-low rounded w-5/6" />
          <div className="h-4 bg-surface-container-low rounded w-2/3" />
        </div>
        <div className="bg-white rounded-3xl p-6 border border-outline-variant/30 space-y-4">
          <div className="h-6 bg-surface-container-low rounded w-1/2" />
          <div className="h-4 bg-surface-container-low rounded w-3/4" />
          <div className="h-4 bg-surface-container-low rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}
