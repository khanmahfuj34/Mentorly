"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/src/hooks/useAuth";
import { getStudentDashboardData } from "@/src/services/student/studentDashboard.service";
import { IStudentDashboardData } from "@/src/types/studentDashboard.types";
import { checkStudentProfileCompletion } from "@/src/lib/profile-completion";
import ProfileCompletionCard from "@/src/components/dashboard/ProfileCompletionCard";

import { WelcomeHeader } from "@/src/components/dashboard/student/WelcomeHeader";
import { StudentStats } from "@/src/components/dashboard/student/StudentStats";
import { RecommendedTutorsSection } from "@/src/components/dashboard/student/RecommendedTutorsSection";
import { RecentTuitionPostsSection } from "@/src/components/dashboard/student/RecentTuitionPostsSection";
import { RecentApplicationsSection } from "@/src/components/dashboard/student/RecentApplicationsSection";
import { UpcomingBookingCard } from "@/src/components/dashboard/student/UpcomingBookingCard";
import { StudentHomeCTA } from "@/src/components/dashboard/student/StudentHomeCTA";
import { DashboardSkeleton } from "@/src/components/dashboard/student/DashboardSkeleton";

export default function StudentHome() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<IStudentDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await getStudentDashboardData();
      if (response.success && response.data) {
        setDashboardData(response.data);
      } else {
        setIsError(true);
      }
    } catch (err: any) {
      console.error("Failed to load student dashboard:", err);
      setIsError(true);
      toast.error(err?.response?.data?.message || err?.message || "Failed to load student dashboard data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Profile completion status
  const profileCompletion = checkStudentProfileCompletion(dashboardData?.profile);
  const userName = dashboardData?.profile?.user?.name || user?.name || "Student";

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }

  if (isError || !dashboardData) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-4xl shadow-inner border border-rose-200">
          <span className="material-symbols-outlined">cloud_off</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 font-display">
            Something went wrong while loading your dashboard
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            We were unable to retrieve your student dashboard information. Please check your network connection and try again.
          </p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">refresh</span>
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-50/60 text-slate-900">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* A. Welcome Header */}
        <WelcomeHeader userName={userName} />

        {/* B. Profile Completion Card */}
        <ProfileCompletionCard completion={profileCompletion} isLoading={false} />

        {/* C. Quick Statistics */}
        <StudentStats stats={dashboardData.stats} />

        {/* D. Recommended Tutors */}
        <RecommendedTutorsSection tutors={dashboardData.recommendedTutors || []} />

        {/* E & F. Recent Posts & Recent Applications 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTuitionPostsSection posts={dashboardData.recentPosts || []} />
          <RecentApplicationsSection applications={dashboardData.recentApplications || []} />
        </div>

        {/* G. Upcoming Booking */}
        <UpcomingBookingCard booking={dashboardData.upcomingBooking} />

        {/* H. Final Branding CTA */}
        <StudentHomeCTA />
      </div>
    </div>
  );
}
