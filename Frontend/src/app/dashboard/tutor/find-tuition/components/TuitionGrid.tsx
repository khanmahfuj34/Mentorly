import React from "react"
import { ITuitionRequest } from "@/src/types/tuition"
import TuitionCard from "./TuitionCard"

interface TuitionGridProps {
  tuitions: ITuitionRequest[]
}

export default function TuitionGrid({ tuitions }: TuitionGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
      {tuitions.map((t) => (
        <TuitionCard key={t.id} tuition={t} />
      ))}
    </div>
  )
}
