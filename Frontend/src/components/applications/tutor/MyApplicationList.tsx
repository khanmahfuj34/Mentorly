import React from "react"
import { ITutorApplication } from "../../../types/application.types"
import TutorApplicationCard from "./TutorApplicationCard"

interface MyApplicationListProps {
  applications: ITutorApplication[]
}

export default function MyApplicationList({ applications }: MyApplicationListProps) {
  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <TutorApplicationCard key={app.id} application={app} />
      ))}
    </div>
  )
}
