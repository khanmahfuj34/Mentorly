"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ITutorProfile } from "@/src/types/tutor";

interface TutorCardProps {
  tutor: ITutorProfile;
}

export const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  const tutorId = tutor.userId || tutor.id || "";
  const name = tutor.user?.name || "Tutor";
  
  // Format initials
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const university = tutor.university || tutor.currentInstitution || tutor.department || "Academic Educator";
  const locationText = [tutor.area, tutor.district].filter(Boolean).join(", ") || "Location not specified";
  const experienceText = tutor.experienceYears ? `${tutor.experienceYears} ${tutor.experienceYears === 1 ? 'Year' : 'Years'} Exp.` : "Experienced";
  
  const subjects = tutor.teachingSubjects || [];
  const displaySubjects = subjects.slice(0, 3);
  const remainingSubjectsCount = Math.max(0, subjects.length - 3);

  const classes = tutor.preferredClasses || [];
  const displayClasses = classes.slice(0, 2);

  const mediums = tutor.medium || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl border border-outline-variant/30 hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group h-full"
    >
      <div className="p-6 flex flex-col flex-1">
        {/* Top Header Row: Photo + Name + Rating */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative shrink-0">
            {tutor.profilePhoto ? (
              <img
                src={tutor.profilePhoto}
                alt={name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary/20 shadow-inner group-hover:scale-105 transition-transform"
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  (e.target as HTMLElement).style.display = "none";
                  const parent = (e.target as HTMLElement).parentElement;
                  if (parent) {
                    const fallback = parent.querySelector(".avatar-fallback");
                    if (fallback) fallback.classList.remove("hidden");
                  }
                }}
              />
            ) : null}
            
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 text-primary font-bold text-lg flex items-center justify-center border-2 border-primary/20 shadow-sm avatar-fallback ${
                tutor.profilePhoto ? "hidden" : ""
              }`}
            >
              {initials}
            </div>
            
            {tutor.demoClassOffered && (
              <span
                title="Offers Free Demo Class"
                className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full text-[10px] flex items-center justify-center border-2 border-white shadow"
              >
                <span className="material-symbols-outlined text-[12px]">verified</span>
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <h3 className="font-semibold text-lg text-on-surface truncate group-hover:text-primary transition-colors">
                {name}
              </h3>
              {tutor.rating !== undefined && tutor.rating > 0 ? (
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/60 px-2 py-0.5 rounded-full text-xs font-semibold shrink-0">
                  <span className="material-symbols-outlined text-amber-500 text-sm fill-current">star</span>
                  <span>{tutor.rating.toFixed(1)}</span>
                </div>
              ) : (
                <span className="text-[11px] bg-primary/5 text-primary border border-primary/10 px-2 py-0.5 rounded-full font-medium shrink-0">
                  New Tutor
                </span>
              )}
            </div>

            <p className="text-xs text-on-surface-variant line-clamp-1 font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-outline shrink-0">school</span>
              <span className="truncate">{university}</span>
            </p>

            <div className="flex items-center gap-2 text-xs text-outline mt-1">
              <span className="inline-flex items-center gap-1 text-[11px]">
                <span className="material-symbols-outlined text-xs text-primary">work_history</span>
                {experienceText}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-[11px] truncate">
                <span className="material-symbols-outlined text-xs text-rose-500">location_on</span>
                {locationText}
              </span>
            </div>
          </div>
        </div>

        {/* Bio excerpt if available */}
        {tutor.bio && (
          <p className="text-xs text-on-surface-variant/80 line-clamp-2 mb-4 italic bg-surface-container-low/40 p-2.5 rounded-xl border border-outline-variant/10">
            "{tutor.bio}"
          </p>
        )}

        {/* Subjects & Preferences Chips */}
        <div className="space-y-2 mt-auto pt-2">
          {/* Subjects */}
          {subjects.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] font-semibold text-outline uppercase tracking-wider mr-1">
                Subjects:
              </span>
              {displaySubjects.map((sub, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20 truncate max-w-[130px]"
                >
                  {sub}
                </span>
              ))}
              {remainingSubjectsCount > 0 && (
                <span className="text-[11px] font-medium text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-md">
                  +{remainingSubjectsCount} more
                </span>
              )}
            </div>
          )}

          {/* Classes & Medium */}
          <div className="flex flex-wrap gap-2 text-xs text-on-surface-variant pt-1 border-t border-outline-variant/15">
            {classes.length > 0 && (
              <span className="inline-flex items-center gap-1 bg-surface-container-low text-on-surface-variant px-2 py-0.5 rounded-md text-[11px]">
                <span className="material-symbols-outlined text-xs text-outline">menu_book</span>
                {displayClasses.join(", ")}
                {classes.length > 2 ? ` +${classes.length - 2}` : ""}
              </span>
            )}
            {mediums.length > 0 && (
              <span className="inline-flex items-center gap-1 bg-surface-container-low text-on-surface-variant px-2 py-0.5 rounded-md text-[11px]">
                <span className="material-symbols-outlined text-xs text-outline">translate</span>
                {mediums.join(", ")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer: Salary & View Profile Action */}
      <div className="px-6 py-4 bg-surface-container-lowest border-t border-outline-variant/30 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-semibold text-outline uppercase tracking-wider block">
            Expected Rate
          </span>
          <span className="text-base font-bold text-primary">
            {tutor.hourlyRate ? `৳${tutor.hourlyRate.toLocaleString()}/hr` : "Negotiable"}
          </span>
        </div>

        <Link
          href={`/dashboard/student/find-tutors/${tutorId}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary font-medium text-xs shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all cursor-pointer group-hover:translate-x-0.5"
        >
          <span>View Profile</span>
          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-0.5">
            arrow_forward
          </span>
        </Link>
      </div>
    </motion.div>
  );
};
