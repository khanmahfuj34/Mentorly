import React from "react"

interface UniversityCardProps {
  name: string
}

export default function UniversityCard({ name }: UniversityCardProps) {
  return (
    <span className="font-bold text-xl hover:text-primary transition-colors cursor-default select-none text-outline">
      {name}
    </span>
  )
}
