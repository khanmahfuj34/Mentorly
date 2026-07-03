import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

import Hero from "@/components/sections/Hero"
import TrustedUniversities from "@/components/sections/TrustedUniversities"
import PopularSubjects from "@/components/sections/PopularSubjects"
import EducationLevels from "@/components/sections/EducationLevels"
import BrowseByLocation from "@/components/sections/BrowseByLocation"
import FeaturedTutors from "@/components/sections/FeaturedTutors"
import FeaturedTuition from "@/components/sections/FeaturedTuition"
import DashboardPreview from "@/components/sections/DashboardPreview"
import Features from "@/components/sections/Features"
import JourneySection from "@/components/sections/JourneySection"
import WhyMentorly from "@/components/sections/WhyMentorly"
import Stats from "@/components/sections/Stats"
import Testimonials from "@/components/sections/Testimonials"
import FAQ from "@/components/sections/FAQ"
import BlogPreview from "@/components/sections/BlogPreview"
import DownloadApp from "@/components/sections/DownloadApp"
import Newsletter from "@/components/sections/Newsletter"
import CTA from "@/components/sections/CTA"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedUniversities />
        <PopularSubjects />
        <EducationLevels />
        <BrowseByLocation />
        <FeaturedTutors />
        <FeaturedTuition />
        <DashboardPreview />
        <Features />
        <JourneySection />
        <WhyMentorly />
        <Stats />
        <Testimonials />
        <FAQ />
        <BlogPreview />
        <DownloadApp />
        <Newsletter />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
