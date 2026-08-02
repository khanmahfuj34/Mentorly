import React from "react"
import TutorApplicationCard from "../tutor/TutorApplicationCard"
import { ITutorApplication } from "../../../types/application.types"

interface ApplicationCardProps {
  application: ITutorApplication
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  return <TutorApplicationCard application={application} />
}
