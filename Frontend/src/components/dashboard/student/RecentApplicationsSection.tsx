"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IDashboardRecentApplication } from "@/src/types/studentDashboard.types";
import { getTutorProfileImage } from "@/src/utils/tutorAvatar";

interface RecentApplicationsSectionProps {
  applications: IDashboardRecentApplication[];
}

export const RecentApplicationsSection: React.FC<RecentApplicationsSectionProps> = ({ applications }) => {
  const displayApps = applications.slice(0, 4);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "REJECTED":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "PENDING":
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">assignment_ind</span>
            Recent Tutor Applications
          </h2>
          <p className="text-xs text-slate-600">
            Tutor applications submitted for your tuition requirement posts.
          </p>
        </div>

        <Link
          href="/dashboard/student/applications"
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer group"
        >
          <span>View All Applications</span>
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>

      {/* Content */}
      {displayApps.length > 0 ? (
        <div className="space-y-3">
          {displayApps.map((app, idx) => {
            const tutorName = app.tutor?.name || "Tutor Candidate";
            const tutorProfile = app.tutor?.tutorProfile;
            const profileImage = getTutorProfileImage({ ...tutorProfile, name: tutorName });
            const university = tutorProfile?.university || tutorProfile?.currentInstitution || tutorProfile?.department || "Academic Educator";
            const subject = app.tuitionRequest?.subject || "Tuition Subject";
            const appliedDate = new Date(app.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <img
                    src={profileImage}
                    alt={tutorName}
                    className="w-12 h-12 rounded-full object-cover border border-primary/20 shadow-sm shrink-0"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/assets/images/tutors/asifur-rahman.png";
                    }}
                  />

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900 truncate group-hover:text-primary transition-colors">
                        {tutorName}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusBadge(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 truncate">
                      <strong className="text-primary">{subject}</strong> • {university}
                    </p>

                    {app.coverLetter && (
                      <p className="text-xs text-slate-500 italic line-clamp-1">
                        "{app.coverLetter}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/50">
                  <span className="text-[11px] text-slate-500">
                    Applied {appliedDate}
                  </span>

                  <Link
                    href={`/dashboard/student/applications/tutor/${app.tutor?.id || ""}`}
                    className="px-3.5 py-2 rounded-xl bg-white text-slate-800 hover:bg-primary hover:text-white border border-slate-200 text-xs font-bold shadow-sm transition-all cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>View Application</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="py-8 px-4 text-center space-y-3 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
          <span className="material-symbols-outlined text-3xl text-slate-400">assignment</span>
          <p className="text-xs text-slate-600">
            No tutor applications received yet.
          </p>
          <span className="text-[11px] text-slate-500 block">
            Applications from tutors will appear here once you post tuition requirements.
          </span>
        </div>
      )}
    </div>
  );
};
