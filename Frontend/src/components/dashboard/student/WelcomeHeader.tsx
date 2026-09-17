"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface WelcomeHeaderProps {
  userName?: string;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ userName }) => {
  const displayName = userName ? userName.split(" ")[0] : "Student";

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-purple-600 to-indigo-600 p-6 sm:p-8 md:p-10 text-white shadow-xl shadow-primary/10 border border-purple-500/20"
    >
      {/* Decorative background ambient glows */}
      <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute left-1/2 -bottom-20 w-60 h-60 rounded-full bg-indigo-400/20 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white border border-white/30">
            <span className="material-symbols-outlined text-sm text-amber-300">verified</span>
            Student Portal Dashboard
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display text-white">
            Welcome back, <span className="underline decoration-amber-400 decoration-wavy underline-offset-4">{displayName}</span>! 👋
          </h1>
          
          <p className="text-sm sm:text-base text-white/90 max-w-xl font-normal leading-relaxed">
            Manage your tutoring journey, discover top-rated mentors, track your applications, and stay on top of your learning goals.
          </p>
        </div>

        {/* Primary Quick Actions */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/dashboard/student/find-tutors"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-primary font-bold text-xs sm:text-sm shadow-lg hover:bg-slate-50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
          >
            <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">
              search
            </span>
            <span>Find a Tutor</span>
          </Link>

          <Link
            href="/dashboard/student/my-tuition-posts/new"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs sm:text-sm border border-white/30 shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
          >
            <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
              post_add
            </span>
            <span>Post a Tuition</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
