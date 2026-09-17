"use client";

import React from "react";

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-pulse">
      {/* 1. Header Skeleton */}
      <div className="h-44 sm:h-52 rounded-3xl bg-slate-200/80 w-full" />

      {/* 2. Profile Completion Skeleton */}
      <div className="h-28 rounded-3xl bg-slate-200/80 w-full" />

      {/* 3. Stats Skeleton (4 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-white border border-slate-200/80 p-5 space-y-3">
            <div className="flex justify-between items-center">
              <div className="w-10 h-10 rounded-xl bg-slate-200" />
              <div className="w-10 h-8 rounded-lg bg-slate-200" />
            </div>
            <div className="w-24 h-4 rounded bg-slate-200" />
          </div>
        ))}
      </div>

      {/* 4. Recommended Tutors Grid Skeleton */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="w-48 h-6 rounded-lg bg-slate-200" />
          <div className="w-24 h-4 rounded bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-64 rounded-2xl bg-white border border-slate-200/80 p-5 space-y-4">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="w-24 h-4 rounded bg-slate-200" />
                  <div className="w-32 h-3 rounded bg-slate-200" />
                </div>
              </div>
              <div className="w-full h-12 rounded-xl bg-slate-150" />
              <div className="w-full h-8 rounded-xl bg-slate-200" />
            </div>
          ))}
        </div>
      </div>

      {/* 5. Two column layout Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-72 rounded-3xl bg-white border border-slate-200/80 p-6 space-y-4">
          <div className="w-40 h-6 rounded bg-slate-200" />
          <div className="h-16 rounded-2xl bg-slate-100" />
          <div className="h-16 rounded-2xl bg-slate-100" />
        </div>
        <div className="h-72 rounded-3xl bg-white border border-slate-200/80 p-6 space-y-4">
          <div className="w-40 h-6 rounded bg-slate-200" />
          <div className="h-16 rounded-2xl bg-slate-100" />
          <div className="h-16 rounded-2xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
};
