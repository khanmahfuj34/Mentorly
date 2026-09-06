import Navbar from "@/src/components/layout/Navbar"
import Footer from "@/src/components/layout/Footer"
import Hero from "@/src/components/sections/Hero"
import Stats from "@/src/components/sections/Stats"
import JourneySection from "@/src/components/sections/JourneySection"
import Features from "@/src/components/sections/Features"
import FeaturedTutors from "@/src/components/sections/FeaturedTutors"
import FeaturedTuition from "@/src/components/sections/FeaturedTuition"
import BecomeTutorCTA from "@/src/components/sections/BecomeTutorCTA"
import FAQ from "@/src/components/sections/FAQ"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-surface">
        <Hero />
        <Stats />
        <JourneySection />
        <Features />
        <FeaturedTutors />
        <FeaturedTuition />
        <BecomeTutorCTA />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
