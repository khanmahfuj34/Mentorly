"use client"

import React from "react"
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

export default function StudentHome() {
  return (
    <div className="relative">
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
