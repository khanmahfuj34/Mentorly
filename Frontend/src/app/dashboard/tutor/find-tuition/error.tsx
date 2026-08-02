"use client"

import React, { useEffect } from "react"
import Link from "next/link"

interface FindTuitionErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function FindTuitionError({ error, reset }: FindTuitionErrorProps) {
  useEffect(() => {
    console.error("Find Tuition Route Error:", error)
  }, [error])

  return (
    <div className="max-w-md mx-auto px-6 py-20 flex flex-col items-center justify-center text-center h-[calc(100vh-160px)]">
      <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl select-none">error_med</span>
      </div>
      <h3 className="text-headline-sm font-bold text-on-surface mb-2">Something Went Wrong</h3>
      <p className="text-on-surface-variant font-body-md max-w-sm mb-8 leading-relaxed">
        An error occurred while loading the tuition marketplace. Please try refreshing or checking your connection.
      </p>
      <div className="flex gap-4 items-center">
        <button
          onClick={reset}
          className="h-12 px-6 bg-primary text-on-primary font-semibold text-sm rounded-xl hover:opacity-95 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px] select-none font-bold">refresh</span>
          <span>Try Again</span>
        </button>
        <Link
          href="/dashboard/tutor/overview"
          className="h-12 px-6 border border-outline-variant/30 text-on-surface font-semibold text-sm rounded-xl hover:bg-surface-container-low transition-all flex items-center justify-center"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
