import React from "react"

interface ApplicationHeaderProps {
  title: string
  subtitle: string
}

export default function ApplicationHeader({ title, subtitle }: ApplicationHeaderProps) {
  return (
    <div className="space-y-1.5 select-none">
      <h2 className="text-headline-lg font-bold text-on-surface">{title}</h2>
      <p className="text-on-surface-variant font-body-md">{subtitle}</p>
    </div>
  )
}
