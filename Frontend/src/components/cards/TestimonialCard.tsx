import React from "react"
import { Testimonial } from "@/types/common"

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  // Get initials for avatar
  const initials = testimonial.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  // Alternate colors for a refined design
  const isEven = parseInt(testimonial.id) % 2 === 0
  const avatarBg = isEven ? "bg-secondary/20 text-secondary" : "bg-primary/20 text-primary"

  return (
    <div 
      className="glass-card p-8 rounded-24 border border-outline-variant/30 shadow-sm hover-lift"
      style={{ transitionDelay: testimonial.delay ? `${testimonial.delay}s` : "0s" }}
    >
      <div className="flex gap-1 text-yellow-500 mb-4 select-none">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="material-symbols-outlined text-xs text-yellow-500 font-variation-settings-['FILL'_1]">
            star
          </span>
        ))}
      </div>
      <p className="text-sm italic mb-6 text-on-surface">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 ${avatarBg} rounded-full flex items-center justify-center font-bold text-sm select-none`}>
          {initials}
        </div>
        <div>
          <h4 className="font-bold text-sm text-on-surface">{testimonial.name}</h4>
          <p className="text-[10px] text-on-surface-variant font-medium">{testimonial.role}</p>
        </div>
      </div>
    </div>
  )
}
