"use client"

import React, { useState, useEffect } from "react"
import Hero from "@/src/components/sections/Hero"
import PopularSubjects from "@/src/components/sections/PopularSubjects"
import EducationLevels from "@/src/components/sections/EducationLevels"
import FeaturedTutors from "@/src/components/sections/FeaturedTutors"
import Features from "@/src/components/sections/Features"
import JourneySection from "@/src/components/sections/JourneySection"
import WhyMentorly from "@/src/components/sections/WhyMentorly"
import Testimonials from "@/src/components/sections/Testimonials"
import FAQ from "@/src/components/sections/FAQ"
import BlogPreview from "@/src/components/sections/BlogPreview"
import DownloadApp from "@/src/components/sections/DownloadApp"
import Newsletter from "@/src/components/sections/Newsletter"
import CTA from "@/src/components/sections/CTA"
import ProfileCompletionCard from "@/src/components/dashboard/ProfileCompletionCard"
import { getMyStudentProfile } from "@/src/services/student/student.service"
import {
  checkStudentProfileCompletion,
  ProfileCompletionResult,
} from "@/src/lib/profile-completion"

export default function StudentHome() {
  const [profileCompletion, setProfileCompletion] = useState<ProfileCompletionResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true)
        const res = await getMyStudentProfile()
        const completion = checkStudentProfileCompletion(res?.data)
        setProfileCompletion(completion)
      } catch (err) {
        setProfileCompletion(checkStudentProfileCompletion(null))
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [])

  return (
    <div className="relative">
      {/* Profile Completion Section */}
      <div className="max-w-container-max mx-auto px-margin-desktop pt-8">
        {profileCompletion && (
          <ProfileCompletionCard completion={profileCompletion} isLoading={isLoading} />
        )}
      </div>

      <Hero isStudent />
      <PopularSubjects />
      <EducationLevels />
      <FeaturedTutors />
      <Features />
      <JourneySection />
      <WhyMentorly />
      <Testimonials />
      <FAQ />
      <BlogPreview />
      <DownloadApp />
      <Newsletter />
      <CTA isStudent />
    </div>
  )
}
