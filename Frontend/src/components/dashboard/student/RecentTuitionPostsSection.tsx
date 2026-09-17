"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IDashboardRecentPost } from "@/src/types/studentDashboard.types";

interface RecentTuitionPostsSectionProps {
  posts: IDashboardRecentPost[];
}

export const RecentTuitionPostsSection: React.FC<RecentTuitionPostsSectionProps> = ({ posts }) => {
  const displayPosts = posts.slice(0, 3);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "ASSIGNED":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "COMPLETED":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "CANCELLED":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">post_add</span>
            My Recent Tuition Posts
          </h2>
          <p className="text-xs text-slate-600">
            Track your open requirement posts and tutor applicant responses.
          </p>
        </div>

        <Link
          href="/dashboard/student/my-tuition-posts"
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer group"
        >
          <span>View All Posts</span>
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>

      {/* Content */}
      {displayPosts.length > 0 ? (
        <div className="space-y-3">
          {displayPosts.map((post, idx) => {
            const applicantCount = post._count?.TutorApplication ?? 0;
            const createdDate = new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-primary transition-colors truncate">
                      {post.subject}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusBadge(
                        post.status
                      )}`}
                    >
                      {post.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-primary">school</span>
                      {post.classLevel}
                    </span>
                    {post.medium && (
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-indigo-500">translate</span>
                        {post.medium}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-rose-500">location_on</span>
                      {post.area}, {post.district}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-emerald-500">payments</span>
                      ৳{post.salary?.toLocaleString()}/mo ({post.daysPerWeek} days/wk)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/50">
                  <div className="text-left sm:text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-sm">
                      <span className="material-symbols-outlined text-xs text-primary">groups</span>
                      {applicantCount} {applicantCount === 1 ? "Applicant" : "Applicants"}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      Posted {createdDate}
                    </span>
                  </div>

                  <Link
                    href={`/dashboard/student/my-tuition-posts/${post.id}`}
                    className="px-3.5 py-2 rounded-xl bg-white text-slate-800 hover:bg-primary hover:text-white border border-slate-200 text-xs font-bold shadow-sm transition-all cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>Details</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="py-8 px-4 text-center space-y-3 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
          <span className="material-symbols-outlined text-3xl text-slate-400">post_add</span>
          <p className="text-xs text-slate-600">
            You haven't posted any tuition requirements yet.
          </p>
          <Link
            href="/dashboard/student/my-tuition-posts/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Post Your First Tuition</span>
          </Link>
        </div>
      )}
    </div>
  );
};
