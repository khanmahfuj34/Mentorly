import React from "react"
import { TuitionStatus } from "@/src/types/tuition"

interface TuitionStatusBadgeProps {
  status: TuitionStatus
}

export default function TuitionStatusBadge({ status }: TuitionStatusBadgeProps) {
  let bgClass = "bg-primary/10 text-primary border-primary/20"
  let label = "Open"

  switch (status) {
    case "OPEN":
      bgClass = "bg-primary/10 text-primary border-primary/20"
      label = "Open"
      break
    case "ASSIGNED":
      bgClass = "bg-secondary/10 text-secondary border-secondary/20"
      label = "Assigned"
      break
    case "COMPLETED":
      bgClass = "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
      label = "Completed"
      break
    case "CANCELLED":
      bgClass = "bg-red-500/10 text-red-600 border-red-500/20"
      label = "Cancelled"
      break
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${bgClass}`}>
      {label}
    </span>
  )
}
