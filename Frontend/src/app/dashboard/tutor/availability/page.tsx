"use client"

import React, { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import AvailabilityCard from "@/src/components/availability/AvailabilityCard"
import AvailabilitySkeleton from "@/src/components/availability/AvailabilitySkeleton"
import { getMyAvailability } from "@/src/services/availability/availability.service"
import { IAvailabilitySlot } from "@/src/types/availability"

export default function TutorAvailabilityPage() {
  const [availability, setAvailability] = useState<IAvailabilitySlot[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAvailability = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await getMyAvailability()
      if (res.success && Array.isArray(res.data)) {
        setAvailability(res.data)
      } else {
        setAvailability([])
      }
    } catch (err) {
      console.error("Failed to load availability:", err)
      setError("Unable to load your availability.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAvailability()
  }, [fetchAvailability])

  if (isLoading) {
    return <AvailabilitySkeleton />
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
          Availability
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant mt-1">
          Manage your weekly teaching schedule so students know when you're available.
        </p>
      </div>

      {/* Main Content Area */}
      {error ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest border border-red-200 rounded-3xl p-8 text-center space-y-4 shadow-sm"
        >
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-2xl">error_outline</span>
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-on-surface">
              {error}
            </h3>
            <p className="text-sm text-on-surface-variant mt-1">
              Please check your network connection and try again.
            </p>
          </div>
          <button
            onClick={fetchAvailability}
            className="px-6 py-2.5 rounded-xl font-label-md font-semibold text-sm bg-primary text-on-primary hover:bg-primary/90 transition-all shadow-md shadow-primary/20 cursor-pointer inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">refresh</span>
            <span>Try Again</span>
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AvailabilityCard initialData={availability} />
        </motion.div>
      )}
    </div>
  )
}
