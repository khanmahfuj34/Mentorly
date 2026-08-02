"use client"

import React, { useState, useEffect } from "react"
import { getTutorTuitionRequests, ITuitionQueryFilters } from "@/src/services/tutor/tuition.service"
import { ITuitionRequest } from "@/src/types/tuition"
import TuitionSearch from "./components/TuitionSearch"
import TuitionSort from "./components/TuitionSort"
import TuitionFilters from "./components/TuitionFilters"
import FilterDrawer from "./components/FilterDrawer"
import TuitionGrid from "./components/TuitionGrid"
import TuitionEmptyState from "./components/TuitionEmptyState"
import TuitionSkeleton from "./components/TuitionSkeleton"

interface FilterState {
  subject: string
  classLevel: string
  district: string
  area: string
  genderPreference: string
  minimumSalary: string
  maximumSalary: string
}

export default function FindTuitionPage() {
  const [tuitions, setTuitions] = useState<ITuitionRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Query and filters states
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    subject: "",
    classLevel: "",
    district: "",
    area: "",
    genderPreference: "",
    minimumSalary: "",
    maximumSalary: "",
  })
  const [sortComposite, setSortComposite] = useState("createdAt_desc")
  
  // Pagination states
  const [page, setPage] = useState(1)
  const [limit] = useState(6) // 6 cards per page fits a 3-column layout nicely
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  // Reset pagination on filter changes
  useEffect(() => {
    setPage(1)
  }, [searchTerm, filters, sortComposite])

  // Fetch tuition posts from the real API
  useEffect(() => {
    const fetchTuitionJobs = async () => {
      try {
        setIsLoading(true)
        const [sortBy, sortOrder] = sortComposite.split("_")
        
        const queryParams: ITuitionQueryFilters = {
          page,
          limit,
          sortBy,
          sortOrder,
          searchTerm: searchTerm || undefined,
          subject: filters.subject || undefined,
          classLevel: filters.classLevel || undefined,
          district: filters.district || undefined,
          genderPreference: filters.genderPreference || undefined,
          minimumSalary: filters.minimumSalary ? Number(filters.minimumSalary) : undefined,
          maximumSalary: filters.maximumSalary ? Number(filters.maximumSalary) : undefined,
        }

        const res = await getTutorTuitionRequests(queryParams)
        if (res?.success) {
          setTuitions(res.data)
          setTotalPages(res.meta.totalPage)
          setTotalCount(res.meta.total)
        }
      } catch (error) {
        console.error("Failed to load tuition requests:", error)
        setTuitions([])
        setTotalPages(1)
        setTotalCount(0)
      } finally {
        setIsLoading(false)
      }
    }

    // Debounce typing to prevent excessive API requests
    const timer = setTimeout(() => {
      fetchTuitionJobs()
    }, 300)

    return () => clearTimeout(timer)
  }, [page, limit, searchTerm, filters, sortComposite])

  const handleFilterChange = (key: keyof FilterState, val: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: val,
    }))
  }

  const handleResetFilters = () => {
    setFilters({
      subject: "",
      classLevel: "",
      district: "",
      area: "",
      genderPreference: "",
      minimumSalary: "",
      maximumSalary: "",
    })
    setSearchTerm("")
    setSortComposite("createdAt_desc")
  }

  // Active filter count helper
  const activeFiltersCount = Object.values(filters).filter((v) => v !== "").length

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:px-10 space-y-8">
      {/* Title Header */}
      <div>
        <h2 className="text-headline-lg font-bold text-on-surface mb-2">Find Tuition</h2>
        <p className="text-on-surface-variant font-body-md">
          Discover tuition opportunities that match your expertise.
        </p>
      </div>

      {/* Toolbar - Search, Mobile Filters, and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full flex items-center gap-3">
          <TuitionSearch value={searchTerm} onChange={setSearchTerm} />
          
          {/* Mobile Filter Toggle Trigger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="lg:hidden h-12 px-4 bg-white border border-outline-variant/40 rounded-xl text-on-surface hover:bg-surface-container-low transition-all font-semibold text-sm flex items-center gap-2 shrink-0 cursor-pointer select-none"
          >
            <span className="material-symbols-outlined text-[20px]">filter_alt</span>
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        <TuitionSort value={sortComposite} onChange={setSortComposite} />
      </div>

      {/* Main Results Grid + Desktop Filter Layout */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24">
          <TuitionFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </aside>

        {/* Mobile/Tablet Slide-out Filters Drawer */}
        <FilterDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Tuition Results Area */}
        <div className="lg:col-span-9 space-y-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: limit }).map((_, i) => (
                <TuitionSkeleton key={i} />
              ))}
            </div>
          ) : tuitions.length > 0 ? (
            <>
              {/* Count Indicator */}
              <div className="text-xs font-semibold text-on-surface-variant/80 select-none">
                Showing <strong>{tuitions.length}</strong> of <strong>{totalCount}</strong> available tuitions
              </div>
              
              <TuitionGrid tuitions={tuitions} />

              {/* Pagination Controls */}
              <div className="flex justify-between items-center border-t border-outline-variant/20 pt-6 mt-8">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="h-10 px-4 border border-outline-variant/30 text-on-surface rounded-xl hover:bg-surface-container-low transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer select-none font-semibold text-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  <span>Previous</span>
                </button>
                <span className="text-sm font-medium text-on-surface-variant select-none">
                  Page <strong>{page}</strong> of <strong>{totalPages || 1}</strong>
                </span>
                <button
                  disabled={page === totalPages || totalPages === 0}
                  onClick={() => setPage(page + 1)}
                  className="h-10 px-4 border border-outline-variant/30 text-on-surface rounded-xl hover:bg-surface-container-low transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer select-none font-semibold text-xs"
                >
                  <span>Next</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </>
          ) : (
            <TuitionEmptyState onClearFilters={handleResetFilters} />
          )}
        </div>
      </div>
    </div>
  )
}
