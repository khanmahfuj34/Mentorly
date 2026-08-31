"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { getTutorProfileById } from "@/src/services/tutor/tutor.service";
import { ITutorProfile } from "@/src/types/tutor";
import { TutorProfileSkeleton } from "@/src/components/tutor/TutorSkeleton";

export default function TutorProfileDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [tutor, setTutor] = useState<ITutorProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchTutorProfile = async () => {
    if (!id) return;
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await getTutorProfileById(id);
      if (response.success && response.data) {
        setTutor(response.data);
      } else {
        setIsError(true);
      }
    } catch (err: any) {
      console.error("Failed to fetch tutor details:", err);
      setIsError(true);
      toast.error(err?.response?.data?.message || err?.message || "Failed to load tutor details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorProfile();
  }, [id]);

  if (isLoading) {
    return <TutorProfileSkeleton />;
  }

  if (isError || !tutor) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto text-4xl shadow-inner">
          <span className="material-symbols-outlined">person_off</span>
        </div>
        <h2 className="text-2xl font-bold text-on-surface">Tutor Profile Not Found</h2>
        <p className="text-sm text-on-surface-variant">
          The requested tutor profile could not be located or may no longer be active.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => router.push("/dashboard/student/find-tutors")}
            className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm shadow-md hover:bg-primary/90 transition-all cursor-pointer"
          >
            Back to Find Tutors
          </button>
          <button
            onClick={fetchTutorProfile}
            className="px-5 py-2.5 rounded-xl bg-surface-container text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-all cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const name = tutor.user?.name || "Tutor";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const university = tutor.university || tutor.currentInstitution || tutor.department || "Academic Educator";
  const locationText = [tutor.area, tutor.district].filter(Boolean).join(", ") || "Bangladesh";

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/student/find-tutors"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-outline-variant/30 text-on-surface font-semibold text-xs shadow-sm hover:bg-primary/5 hover:text-primary transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Find Tutors</span>
        </Link>
      </div>

      {/* Main Profile Header Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-md relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar / Photo */}
          <div className="relative shrink-0">
            {tutor.profilePhoto ? (
              <img
                src={tutor.profilePhoto}
                alt={name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                  const parent = (e.target as HTMLElement).parentElement;
                  if (parent) {
                    const fallback = parent.querySelector(".profile-avatar-fallback");
                    if (fallback) fallback.classList.remove("hidden");
                  }
                }}
              />
            ) : null}
            <div
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 text-primary font-bold text-3xl flex items-center justify-center border-4 border-primary/20 shadow-inner profile-avatar-fallback ${
                tutor.profilePhoto ? "hidden" : ""
              }`}
            >
              {initials}
            </div>

            {tutor.demoClassOffered && (
              <span className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1.5 rounded-full text-xs flex items-center justify-center border-2 border-white shadow-md">
                <span className="material-symbols-outlined text-sm">verified</span>
              </span>
            )}
          </div>

          {/* Header Info */}
          <div className="flex-1 text-center md:text-left space-y-2 w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-on-surface font-display">{name}</h1>

              {/* Hourly Rate */}
              <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold text-base border border-primary/20 shrink-0">
                {tutor.hourlyRate ? `৳${tutor.hourlyRate.toLocaleString()} / hr` : "Negotiable Rate"}
              </div>
            </div>

            <p className="text-sm font-semibold text-primary flex items-center justify-center md:justify-start gap-1.5">
              <span className="material-symbols-outlined text-base">school</span>
              <span>{university}</span>
              {tutor.department && <span>({tutor.department})</span>}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-on-surface-variant pt-1">
              <span className="inline-flex items-center gap-1 bg-surface-container-low px-3 py-1 rounded-full font-medium">
                <span className="material-symbols-outlined text-sm text-rose-500">location_on</span>
                {locationText}
              </span>
              <span className="inline-flex items-center gap-1 bg-surface-container-low px-3 py-1 rounded-full font-medium">
                <span className="material-symbols-outlined text-sm text-primary">work_history</span>
                {tutor.experienceYears ? `${tutor.experienceYears} Years Experience` : "Experienced Tutor"}
              </span>
              {tutor.rating !== undefined && tutor.rating > 0 ? (
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-semibold">
                  <span className="material-symbols-outlined text-sm text-amber-500 fill-current">star</span>
                  {tutor.rating.toFixed(1)} ({tutor.totalReviews || 0} reviews)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-medium">
                  <span className="material-symbols-outlined text-sm text-emerald-500">new_releases</span>
                  Verified Tutor
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid Layout: Details Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          {/* About / Bio Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person</span>
              About Tutor
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
              {tutor.bio || "No detailed bio provided yet by tutor."}
            </p>

            {tutor.teachingStyle && (
              <div className="pt-4 border-t border-outline-variant/20">
                <h4 className="text-xs font-semibold text-outline uppercase tracking-wider mb-1">
                  Teaching Style & Pedagogy
                </h4>
                <p className="text-sm text-on-surface-variant italic">"{tutor.teachingStyle}"</p>
              </div>
            )}
          </div>

          {/* Academic Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">school</span>
              Academic Background
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/15">
                <span className="text-xs font-semibold text-outline uppercase tracking-wider block">
                  University / Institution
                </span>
                <span className="font-semibold text-on-surface">{tutor.university || "N/A"}</span>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/15">
                <span className="text-xs font-semibold text-outline uppercase tracking-wider block">
                  Department / Major
                </span>
                <span className="font-semibold text-on-surface">{tutor.department || "N/A"}</span>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/15 sm:col-span-2">
                <span className="text-xs font-semibold text-outline uppercase tracking-wider block">
                  Current Status
                </span>
                <span className="font-semibold text-on-surface">
                  {tutor.currentInstitution || "Active Educator"}
                </span>
              </div>
            </div>
          </div>

          {/* Teaching Information (Subjects & Classes) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">menu_book</span>
              Teaching Preferences
            </h2>

            {/* Subjects */}
            <div>
              <span className="text-xs font-semibold text-outline uppercase tracking-wider block mb-2">
                Teaching Subjects
              </span>
              {tutor.teachingSubjects && tutor.teachingSubjects.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tutor.teachingSubjects.map((subject, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-on-surface-variant">Not specified</span>
              )}
            </div>

            {/* Preferred Classes */}
            <div>
              <span className="text-xs font-semibold text-outline uppercase tracking-wider block mb-2">
                Preferred Classes / Levels
              </span>
              {tutor.preferredClasses && tutor.preferredClasses.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tutor.preferredClasses.map((cls, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-surface-container text-on-surface border border-outline-variant/30"
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-on-surface-variant">Not specified</span>
              )}
            </div>

            {/* Medium */}
            <div>
              <span className="text-xs font-semibold text-outline uppercase tracking-wider block mb-2">
                Teaching Medium
              </span>
              {tutor.medium && tutor.medium.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tutor.medium.map((med, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
                    >
                      {med}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-on-surface-variant">Not specified</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (1 col) - Overview & Contact Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-4 sticky top-6">
            <h3 className="font-bold text-base text-on-surface border-b border-outline-variant/20 pb-3">
              Overview Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-outline font-semibold">Location:</span>
                <span className="font-semibold text-on-surface text-right">{locationText}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-outline font-semibold">Experience:</span>
                <span className="font-semibold text-on-surface">
                  {tutor.experienceYears ? `${tutor.experienceYears} Years` : "Experienced"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-outline font-semibold">Demo Class:</span>
                <span
                  className={`font-semibold ${
                    tutor.demoClassOffered ? "text-emerald-600" : "text-on-surface-variant"
                  }`}
                >
                  {tutor.demoClassOffered ? "Offered Free" : "Not Offered"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-outline font-semibold">Expected Rate:</span>
                <span className="font-bold text-primary text-sm">
                  {tutor.hourlyRate ? `৳${tutor.hourlyRate.toLocaleString()}/hr` : "Negotiable"}
                </span>
              </div>

              {tutor.phoneNumber && (
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                  <span className="text-outline font-semibold">Phone Contact:</span>
                  <span className="font-semibold text-on-surface">{tutor.phoneNumber}</span>
                </div>
              )}
            </div>

            <div className="pt-4 space-y-2">
              <Link
                href="/dashboard/student/my-tuition-posts"
                className="w-full py-3 rounded-xl bg-primary text-on-primary font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">post_add</span>
                <span>Post Tuition Request</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
