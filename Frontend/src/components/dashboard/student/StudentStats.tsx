"use client";

import React from "react";
import { motion } from "framer-motion";
import { IDashboardStats } from "@/src/types/studentDashboard.types";

interface StudentStatsProps {
  stats?: IDashboardStats;
}

export const StudentStats: React.FC<StudentStatsProps> = ({ stats }) => {
  const statItems = [
    {
      id: "active-posts",
      label: "Active Tuition Posts",
      value: stats?.activePosts ?? 0,
      context: "Currently open for applications",
      icon: "post_add",
      color: "text-blue-600 bg-blue-50 border-blue-200/80",
      accent: "from-blue-500/10 to-indigo-500/10",
    },
    {
      id: "apps-received",
      label: "Applications Received",
      value: stats?.applicationsReceived ?? 0,
      context: "From verified tutors",
      icon: "assignment_ind",
      color: "text-purple-600 bg-purple-50 border-purple-200/80",
      accent: "from-purple-500/10 to-pink-500/10",
    },
    {
      id: "accepted-apps",
      label: "Accepted Applications",
      value: stats?.acceptedApplications ?? 0,
      context: "Ready to confirm tutor",
      icon: "check_circle",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200/80",
      accent: "from-emerald-500/10 to-teal-500/10",
    },
    {
      id: "active-bookings",
      label: "Active Bookings",
      value: stats?.activeBookings ?? 0,
      context: "Upcoming active sessions",
      icon: "event_available",
      color: "text-amber-600 bg-amber-50 border-amber-200/80",
      accent: "from-amber-500/10 to-orange-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statItems.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.08 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 hover:border-primary/40 p-5 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col justify-between"
        >
          {/* Subtle gradient background shimmer */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-2xl border ${item.color} shadow-sm group-hover:scale-105 transition-transform`}>
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
                {item.value}
              </span>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {item.label}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">
                {item.context}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
