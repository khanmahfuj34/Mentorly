import React from "react"
import { ApplicationStatus } from "../../../types/application.types"
import { APPLICATION_STATUS_COLORS } from "../../../constants/application-status"

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus
}

export default function ApplicationStatusBadge({ status }: ApplicationStatusBadgeProps) {
  const styles = APPLICATION_STATUS_COLORS[status] || APPLICATION_STATUS_COLORS.PENDING

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border uppercase select-none ${styles.bg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot} animate-pulse`} />
      <span className={styles.text}>{status.toLowerCase()}</span>
    </span>
  )
}
