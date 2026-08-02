import React from "react"
import { ITutorApplication } from "../../../types/application.types"
import StudentApplicationCard from "./StudentApplicationCard"

interface ApplicationListProps {
  applications: ITutorApplication[]
  onAccept: (appId: string) => void
  onReject: (appId: string) => void
}

export default function ApplicationList({
  applications,
  onAccept,
  onReject,
}: ApplicationListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {applications.map((app) => (
        <StudentApplicationCard
          key={app.id}
          application={app}
          onAccept={onAccept}
          onReject={onReject}
        />
      ))}
    </div>
  )
}
