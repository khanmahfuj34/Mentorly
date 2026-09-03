"use client"

import React from "react"
import { motion } from "framer-motion"

interface StatsCardsProps {
  totalApplications: number
  pendingApplications: number
  acceptedApplications: number
  activeBookings: number
}

export default function StatsCards({
  totalApplications,
  pendingApplications,
  acceptedApplications,
  activeBookings,
}: StatsCardsProps) {
  const cards = [
    {
      title: "Total Applications",
      count: totalApplications,
      icon: "assignment",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
      accentColor: "bg-indigo-500",
    },
    {
      title: "Pending Applications",
      count: pendingApplications,
      icon: "pending_actions",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
      accentColor: "bg-amber-500",
    },
    {
      title: "Accepted Applications",
      count: acceptedApplications,
      icon: "check_circle",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
      accentColor: "bg-emerald-500",
    },
    {
      title: "Active Bookings",
      count: activeBookings,
      icon: "event_available",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      accentColor: "bg-primary",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card, idx) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: idx * 0.05 }}
          whileHover={{ y: -4 }}
          className="relative bg-white rounded-3xl p-6 border border-outline-variant/30 shadow-sm hover:shadow-md transition-all overflow-hidden"
        >
          {/* Top Accent Bar */}
          <div className={`absolute top-0 left-0 right-0 h-1.5 ${card.accentColor}`} />

          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-2xl ${card.bgColor} ${card.color} flex items-center justify-center shrink-0 border ${card.borderColor}`}
            >
              <span className="material-symbols-outlined text-2xl select-none">{card.icon}</span>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-outline">
              Metric
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-on-surface-variant">{card.title}</p>
            <h3 className="text-3xl font-extrabold text-on-surface font-display tracking-tight">
              {card.count}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
