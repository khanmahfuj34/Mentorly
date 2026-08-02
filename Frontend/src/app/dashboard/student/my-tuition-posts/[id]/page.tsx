import React from "react"
import Link from "next/link"

export default function TuitionDetailsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:px-10 space-y-6">
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-3">
          <Link href="/dashboard/student/my-tuition-posts" className="hover:text-primary transition-all">
            My Tuition Posts
          </Link>
          <span className="material-symbols-outlined text-[16px] select-none">chevron_right</span>
          <span className="text-on-surface font-semibold">Details</span>
        </div>
        <h2 className="text-headline-lg font-bold text-on-surface">Tuition Post Details</h2>
      </div>
      <div className="bg-white p-8 rounded-[28px] border border-outline-variant/30 text-center py-16">
        <span className="material-symbols-outlined text-primary text-[48px] mb-4 select-none">info</span>
        <h3 className="text-headline-sm font-bold text-on-surface mb-2">Details View Coming Soon</h3>
        <p className="text-on-surface-variant font-body-md max-w-md mx-auto mb-6">
          The tuition post details view is currently under development. Click below to return to your dashboard.
        </p>
        <Link
          href="/dashboard/student/my-tuition-posts"
          className="px-6 py-3 bg-primary text-on-primary font-semibold text-sm rounded-xl hover:opacity-95 transition-all shadow-md shadow-primary/20 inline-flex items-center gap-2"
        >
          Back to list
        </Link>
      </div>
    </div>
  )
}
