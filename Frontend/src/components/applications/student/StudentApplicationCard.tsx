import React from "react"
import TutorApplicantCard from "./TutorApplicantCard"
import { ITutorApplication } from "../../../types/application.types"

interface StudentApplicationCardProps {
  application: ITutorApplication
  onAccept: (appId: string) => void
  onReject: (appId: string) => void
}

export default function StudentApplicationCard({
  application,
  onAccept,
  onReject,
}: StudentApplicationCardProps) {
  return (
    <TutorApplicantCard
      application={application}
      onAccept={onAccept}
      onReject={onReject}
    />
  )
}
