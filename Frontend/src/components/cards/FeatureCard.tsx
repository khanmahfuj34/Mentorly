import React from "react"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-7 bg-white rounded-3xl border border-outline-variant/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
        <span className="material-symbols-outlined text-2xl select-none">
          {icon}
        </span>
      </div>
      <h4 className="font-bold text-lg mb-2 text-on-surface group-hover:text-primary transition-colors">
        {title}
      </h4>
      <p className="text-sm text-on-surface-variant leading-relaxed">
        {description}
      </p>
    </div>
  )
}
