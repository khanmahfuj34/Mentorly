import React from "react"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 bg-white rounded-24 border border-outline-variant/30 hover-lift">
      <span className="material-symbols-outlined text-primary mb-3 block select-none">
        {icon}
      </span>
      <h4 className="font-bold mb-2 text-on-surface">{title}</h4>
      <p className="text-xs text-on-surface-variant leading-relaxed">{description}</p>
    </div>
  )
}
