"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ITutorProfile } from "@/src/types/tutor";
import { getTutorProfileImage } from "@/src/utils/tutorAvatar";

interface RecommendedTutorsSectionProps {
  tutors: ITutorProfile[];
}

export const RecommendedTutorsSection: React.FC<RecommendedTutorsSectionProps> = ({ tutors }) => {
  const displayTutors = tutors.slice(0, 4);

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 font-display flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
            Recommended Tutors
          </h2>
          <p className="text-xs text-slate-600">
            Handpicked verified educators matching top subjects and academic criteria.
          </p>
        </div>

        <Link
          href="/dashboard/student/find-tutors"
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors group cursor-pointer"
        >
          <span>View All Tutors</span>
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>

      {/* Cards Grid */}
      {displayTutors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayTutors.map((tutor, idx) => {
            const tutorId = tutor.userId || tutor.id || "";
            const name = tutor.user?.name || "Tutor";
            const profileImage = getTutorProfileImage(tutor);
            const university = tutor.university || tutor.currentInstitution || tutor.department || "Academic Mentor";
            const location = [tutor.area, tutor.district].filter(Boolean).join(", ") || "Bangladesh";
            const subjects = tutor.teachingSubjects?.slice(0, 2) || ["General Academics"];
            const rate = tutor.hourlyRate ? `৳${tutor.hourlyRate.toLocaleString()}/hr` : "Negotiable";

            return (
              <motion.div
                key={tutorId || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Top Row: Photo + Name + Verification */}
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={profileImage}
                        alt={name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 shadow-inner group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/assets/images/tutors/asifur-rahman.png";
                        }}
                      />
                      {tutor.user?.isVerified && (
                        <span
                          title="Verified Tutor"
                          className="absolute -bottom-1 -right-1 bg-primary text-white p-0.5 rounded-full text-[10px] flex items-center justify-center border-2 border-white shadow"
                        >
                          <span className="material-symbols-outlined text-[11px]">verified</span>
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-base text-slate-900 truncate group-hover:text-primary transition-colors">
                        {name}
                      </h3>
                      <p className="text-xs text-primary font-medium truncate flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs shrink-0">school</span>
                        <span className="truncate">{university}</span>
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mt-1 text-xs">
                        <span className="material-symbols-outlined text-xs text-amber-500 fill-current">star</span>
                        <span className="font-bold text-slate-800">
                          {tutor.rating && tutor.rating > 0 ? tutor.rating.toFixed(1) : "5.0"}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          ({tutor.totalReviews || 12} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Subjects Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {subjects.map((sub, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20 truncate max-w-[140px]"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>

                  {/* Meta details */}
                  <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="material-symbols-outlined text-xs text-rose-500 shrink-0">location_on</span>
                      <span className="truncate">{location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="material-symbols-outlined text-xs text-primary shrink-0">work_history</span>
                      <span>{tutor.experienceYears ? `${tutor.experienceYears} Years Exp.` : "Experienced"}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Salary & CTA */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Rate
                    </span>
                    <span className="text-sm font-extrabold text-primary">
                      {rate}
                    </span>
                  </div>

                  <Link
                    href={`/dashboard/student/find-tutors/${tutorId}`}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    <span>View Profile</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200/80 space-y-3">
          <span className="material-symbols-outlined text-4xl text-slate-400">person_search</span>
          <h3 className="font-bold text-base text-slate-800">No recommended tutors found</h3>
          <p className="text-xs text-slate-600">Explore the full directory to browse all verified tutors across Bangladesh.</p>
          <Link
            href="/dashboard/student/find-tutors"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs"
          >
            Browse Tutors Directory
          </Link>
        </div>
      )}
    </section>
  );
};
