"use client"

import React, { useState } from "react"
import Navbar from "@/src/components/layout/Navbar"
import Footer from "@/src/components/layout/Footer"
import { TUITIONS } from "@/data/tuition"
import TuitionCard from "@/src/components/cards/TuitionCard"

export default function FindTuitionPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")

  const filteredTuitions = TUITIONS.filter((tuition) => {
    const matchesSearch =
      tuition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tuition.subject && tuition.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tuition.classLevel && tuition.classLevel.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesLocation =
      !selectedLocation || tuition.location.toLowerCase().includes(selectedLocation.toLowerCase())

    return matchesSearch && matchesLocation
  })

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-surface min-h-screen text-on-surface pb-20">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-primary/5 via-surface to-surface py-12 border-b border-outline-variant/10">
          <div className="max-w-container-max mx-auto px-margin-desktop text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full inline-block mb-3">
              Tuition Jobs & Requests
            </span>
            <h1 className="font-display text-display text-on-surface">Explore Tuition Opportunities</h1>
            <p className="text-on-surface-variant max-w-xl mx-auto mt-3 text-base">
              Discover active tuition listings from students and guardians across Bangladesh. Filter by class, subject, and area.
            </p>
          </div>
        </section>

        {/* Filter Controls */}
        <section className="max-w-container-max mx-auto px-margin-desktop my-8">
          <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-sm flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-lg">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, subject, or class level..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-on-surface"
              />
            </div>

            <div className="relative w-full md:w-64">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-lg">
                location_on
              </span>
              <input
                type="text"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                placeholder="Filter by location (e.g. Uttara)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-on-surface"
              />
            </div>
          </div>
        </section>

        {/* Tuition List */}
        <section className="max-w-container-max mx-auto px-margin-desktop">
          {filteredTuitions.length > 0 ? (
            <div className="grid gap-5">
              {filteredTuitions.map((tuition) => (
                <TuitionCard key={tuition.id} tuition={tuition} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-outline-variant/20">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">work_off</span>
              <h3 className="font-bold text-lg text-on-surface">No tuition opportunities match your filter</h3>
              <p className="text-sm text-on-surface-variant mt-1">Try clearing your search keyword or location filter.</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedLocation("")
                }}
                className="mt-4 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
