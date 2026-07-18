import Navbar from "@/src/components/layout/Navbar"
import Footer from "@/src/components/layout/Footer"

import Hero from "@/src/components/sections/Hero"
import TrustedUniversities from "@/src/components/sections/TrustedUniversities"
import PopularSubjects from "@/src/components/sections/PopularSubjects"
import EducationLevels from "@/src/components/sections/EducationLevels"
import BrowseByLocation from "@/src/components/sections/BrowseByLocation"
import FeaturedTutors from "@/src/components/sections/FeaturedTutors"
import FeaturedTuition from "@/src/components/sections/FeaturedTuition"
import DashboardPreview from "@/src/components/sections/DashboardPreview"
import Features from "@/src/components/sections/Features"
import JourneySection from "@/src/components/sections/JourneySection"
import WhyMentorly from "@/src/components/sections/WhyMentorly"
import Stats from "@/src/components/sections/Stats"
import Testimonials from "@/src/components/sections/Testimonials"
import FAQ from "@/src/components/sections/FAQ"
import BlogPreview from "@/src/components/sections/BlogPreview"
import DownloadApp from "@/src/components/sections/DownloadApp"
import Newsletter from "@/src/components/sections/Newsletter"
import CTA from "@/src/components/sections/CTA"

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
