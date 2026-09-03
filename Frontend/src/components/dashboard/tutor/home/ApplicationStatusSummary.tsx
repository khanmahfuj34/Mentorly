"use client"

import React from "react"

interface ApplicationStatusSummaryProps {
  pendingCount: number
  acceptedCount: number
  rejectedCount: number
  totalCount: number
}

export default function ApplicationStatusSummary({
  pendingCount,
  acceptedCount,
  rejectedCount,
  totalCount,
}: ApplicationStatusSummaryProps) {
  const pendingPct = totalCount > 0 ? Math.round((pendingCount / totalCount) * 100) : 0
  const acceptedPct = totalCount > 0 ? Math.round((acceptedCount / totalCount) * 100) : 0
  const rejectedPct = totalCount > 0 ? Math.round((rejectedCount / totalCount) * 100) : 0

  return (
    <div className="bg-white rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
        <h3 className="font-display font-bold text-base text-on-surface">Application Breakdown</h3>
        <span className="text-xs text-on-surface-variant font-medium">Total: {totalCount}</span>
      </div>

      {totalCount === 0 ? (
        <p className="text-xs text-on-surface-variant/70 italic text-center py-2">
          No application activity recorded yet.
        </p>
      ) : (
        <div className="space-y-4">
          {/* Multi-segment Progress Bar */}
          <div className="h-3 w-full bg-surface-container-low rounded-full overflow-hidden flex shadow-inner">
            {acceptedCount > 0 && (
              <div
                style={{ width: `${acceptedPct}%` }}
                className="bg-emerald-500 h-full transition-all duration-500"
                title={`Accepted: ${acceptedCount}`}
              />
            )}
            {pendingCount > 0 && (
              <div
                style={{ width: `${pendingPct}%` }}
                className="bg-amber-500 h-full transition-all duration-500"
                title={`Pending: ${pendingCount}`}
              />
            )}
            {rejectedCount > 0 && (
              <div
                style={{ width: `${rejectedPct}%` }}
                className="bg-rose-500 h-full transition-all duration-500"
                title={`Rejected: ${rejectedCount}`}
              />
            )}
          </div>

          {/* Breakdown Badges */}
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="p-2 rounded-2xl bg-amber-50 border border-amber-100">
              <span className="block text-[11px] font-semibold text-amber-700">Pending</span>
              <span className="text-sm font-bold text-amber-900">{pendingCount}</span>
              <span className="text-[10px] text-amber-600 block">({pendingPct}%)</span>
            </div>

            <div className="p-2 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="block text-[11px] font-semibold text-emerald-700">Accepted</span>
              <span className="text-sm font-bold text-emerald-900">{acceptedCount}</span>
              <span className="text-[10px] text-emerald-600 block">({acceptedPct}%)</span>
            </div>

            <div className="p-2 rounded-2xl bg-rose-50 border border-rose-100">
              <span className="block text-[11px] font-semibold text-rose-700">Rejected</span>
              <span className="text-sm font-bold text-rose-900">{rejectedCount}</span>
              <span className="text-[10px] text-rose-600 block">({rejectedPct}%)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
