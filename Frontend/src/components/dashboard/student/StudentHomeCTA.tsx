"use client";

import React from "react";
import Link from "next/link";

export const StudentHomeCTA: React.FC = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-primary to-indigo-600 text-white p-8 sm:p-12 text-center shadow-xl shadow-primary/10 border border-purple-500/20">
      {/* Decorative ambient gradient background */}
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/30">
          <span className="material-symbols-outlined text-sm text-amber-300">rocket_launch</span>
          Take the Next Step
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-white">
          Ready to find the right tutor?
        </h2>

        <p className="text-sm sm:text-base text-white/90 font-normal">
          Connect with vetted, top-rated tutors across Bangladesh who match your subject, schedule, and budget requirements.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/dashboard/student/find-tutors"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-primary font-bold text-xs sm:text-sm shadow-lg hover:bg-slate-50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">search</span>
            <span>Find a Tutor</span>
          </Link>

          <Link
            href="/dashboard/student/my-tuition-posts/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs sm:text-sm border border-white/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">post_add</span>
            <span>Post a Tuition</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
