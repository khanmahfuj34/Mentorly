"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ProfileCompletionResult } from "@/src/lib/profile-completion"

interface ProfileCompletionCardProps {
  completion: ProfileCompletionResult
  isLoading?: boolean
}

export default function ProfileCompletionCard({
  completion,
  isLoading = false,
}: ProfileCompletionCardProps) {
  if (isLoading) {
    return (
      <div className="rounded-[24px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm animate-pulse flex flex-col gap-4">
        <div className="h-6 w-40 bg-surface-container-low rounded-lg" />
        <div className="h-3 w-full bg-surface-container-low rounded-full" />
        <div className="h-4 w-48 bg-surface-container-low rounded-lg" />
      </div>
    )
  }

  const { isComplete, percentage, missingFields } = completion

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-[24px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px] select-none">
              {isComplete ? "verified" : "assignment_late"}
            </span>
          </div>
          <div>
            <h3 className="font-display font-bold text-headline-sm text-on-surface">
              Profile Completion
            </h3>
            <p className="text-xs text-on-surface-variant">
              {isComplete
                ? "Your profile is fully complete! You can now post tuitions."
                : "Complete your profile details to unlock tuition posting."}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-headline-md font-bold text-primary">{percentage}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-3 w-full bg-surface-container-low rounded-full overflow-hidden p-0.5 border border-outline-variant/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-full rounded-full ${
              isComplete ? "bg-primary" : percentage >= 50 ? "bg-primary" : "bg-amber-500"
            }`}
          />
        </div>
      </div>

      {/* Missing Fields list */}
      {!isComplete && missingFields.length > 0 && (
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-600 uppercase tracking-wider">
            Missing Information:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-on-surface-variant">
            {missingFields.map((field) => (
              <li key={field} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                <span>{field}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Button */}
      {!isComplete ? (
        <div className="pt-2">
          <Link
            href="/dashboard/student/profile"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary font-semibold text-sm rounded-xl hover:opacity-95 transition-all shadow-md shadow-primary/20 active:scale-95"
          >
            <span>Complete Profile</span>
            <span className="material-symbols-outlined text-[18px] select-none">
              arrow_forward
            </span>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm pt-2">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>Your profile meets all requirements.</span>
        </div>
      )}
    </motion.div>
  )
}
