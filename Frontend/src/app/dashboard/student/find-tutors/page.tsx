"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { getTutors } from "@/src/services/tutor/tutor.service";
import { ITutorProfile, ITutorFilters, ITutorListMeta } from "@/src/types/tutor";
import { TutorCard } from "@/src/components/tutor/TutorCard";
import { TutorFilters } from "@/src/components/tutor/TutorFilters";
import { TutorCardSkeleton } from "@/src/components/tutor/TutorSkeleton";

export default function FindTutorsPage() {
  const [tutors, setTutors] = useState<ITutorProfile[]>([]);
  const [meta, setMeta] = useState<ITutorListMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Search term state with debouncing
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  // Filters state
  const [filters, setFilters] = useState<ITutorFilters>({
    page: 1,
    limit: 9,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // Debounce search input change
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  // Fetch tutors whenever debouncedSearch or filters change
  const fetchTutors = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const queryParams: ITutorFilters = {
        ...filters,
        searchTerm: debouncedSearch.trim() || undefined,
      };

      // Clean undefined/empty string params
      Object.keys(queryParams).forEach((key) => {
        const val = queryParams[key as keyof ITutorFilters];
        if (val === "" || val === undefined) {
          delete queryParams[key as keyof ITutorFilters];
        }
      });

      const response = await getTutors(queryParams);
      if (response.success && Array.isArray(response.data)) {
        setTutors(response.data);
        if (response.meta) {
          setMeta(response.meta);
        } else {
          setMeta({
            page: Number(filters.page) || 1,
            limit: Number(filters.limit) || 9,
            total: response.data.length,
            totalPage: 1,
          });
        }
      } else {
        setTutors([]);
        setMeta(null);
      }
    } catch (err: any) {
      console.error("Failed to load tutors:", err);
      setIsError(true);
      toast.error(err?.response?.data?.message || err?.message || "Failed to load tutors. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [filters, debouncedSearch]);

  useEffect(() => {
    fetchTutors();
  }, [fetchTutors]);

  const handleFilterChange = (updatedFilters: Partial<ITutorFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
      page: updatedFilters.page || 1, // Reset to page 1 on filter modification
    }));
  };

  const handleResetFilters = () => {
    setSearchInput("");
    setDebouncedSearch("");
    setFilters({
      page: 1,
      limit: 9,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  };

  const handlePageChange = (newPage: number) => {
    if (meta && newPage >= 1 && newPage <= meta.totalPage) {
      setFilters((prev) => ({
        ...prev,
        page: newPage,
      }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Search Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-white/90 border border-white/20">
            <span className="material-symbols-outlined text-sm">search</span>
            Verified Expert Tutors
          </span>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Find the Best Tutor for Your Learning Journey
          </h1>
          <p className="text-sm text-white/80">
            Browse verified academic mentors across Bangladesh by subject, institution, location, and teaching medium.
          </p>

          {/* Search Box */}
          <div className="pt-3">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-outline text-xl pointer-events-none select-none">
                search
              </span>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by tutor name, subject, university, or location..."
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white text-on-surface text-sm placeholder:text-outline focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg transition-all"
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput("")}
                  className="absolute right-3 p-1 rounded-full text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar Component */}
        <TutorFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalResults={meta?.total}
        />

        {/* Results Pane */}
        <div className="flex-1 space-y-6">
          {/* Header Stats Bar */}
          <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-outline-variant/30 shadow-sm">
            <div className="text-sm font-medium text-on-surface">
              {isLoading ? (
                <span className="text-outline animate-pulse">Searching database for tutors...</span>
              ) : meta ? (
                <span>
                  Showing <strong className="text-primary">{tutors.length}</strong> of{" "}
                  <strong className="text-primary">{meta.total}</strong> active tutors
                </span>
              ) : (
                <span>{tutors.length} Tutors found</span>
              )}
            </div>

            {/* Quick Sort Dropdown (Desktop) */}
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="text-outline font-semibold">Sort:</span>
              <select
                value={`${filters.sortBy || "createdAt"}-${filters.sortOrder || "desc"}`}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "hourlyRate-asc") {
                    handleFilterChange({ sortBy: "hourlyRate", sortOrder: "asc" });
                  } else if (val === "hourlyRate-desc") {
                    handleFilterChange({ sortBy: "hourlyRate", sortOrder: "desc" });
                  } else if (val === "experienceYears-desc") {
                    handleFilterChange({ sortBy: "experienceYears", sortOrder: "desc" });
                  } else if (val === "rating-desc") {
                    handleFilterChange({ sortBy: "rating", sortOrder: "desc" });
                  } else {
                    handleFilterChange({ sortBy: "createdAt", sortOrder: "desc" });
                  }
                }}
                className="bg-surface-container-low border border-outline-variant/30 rounded-xl px-2.5 py-1.5 font-medium text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="hourlyRate-asc">Salary: Low to High</option>
                <option value="hourlyRate-desc">Salary: High to Low</option>
                <option value="experienceYears-desc">Experience</option>
                <option value="rating-desc">Rating</option>
              </select>
            </div>
          </div>

          {/* Tutor Cards Grid / Loading / Empty / Error States */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <TutorCardSkeleton key={idx} />
              ))}
            </div>
          ) : isError ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-12 text-center border border-red-200 shadow-sm space-y-4 max-w-lg mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto text-3xl">
                <span className="material-symbols-outlined">error_outline</span>
              </div>
              <h3 className="font-bold text-xl text-on-surface">Unable to load tutors</h3>
              <p className="text-sm text-on-surface-variant">
                An unexpected network error occurred while connecting to the server.
              </p>
              <button
                onClick={fetchTutors}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm shadow-md hover:bg-primary/90 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">refresh</span>
                Try Again
              </button>
            </motion.div>
          ) : tutors.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-12 text-center border border-outline-variant/30 shadow-sm space-y-4 max-w-lg mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-3xl">
                <span className="material-symbols-outlined">person_search</span>
              </div>
              <h3 className="font-bold text-xl text-on-surface">No Tutors Found</h3>
              <p className="text-sm text-on-surface-variant">
                We couldn't find any tutor profiles matching your current filters or search terms. Try clearing or expanding your criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">restart_alt</span>
                Reset All Filters
              </button>
            </motion.div>
          ) : (
            <>
              {/* Tutor Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {tutors.map((tutor) => (
                  <TutorCard key={tutor.id || tutor.userId} tutor={tutor} />
                ))}
              </div>

              {/* Pagination Bar */}
              {meta && meta.totalPage > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-outline-variant/30 shadow-sm mt-8">
                  <span className="text-xs font-medium text-on-surface-variant">
                    Page <strong className="text-on-surface">{meta.page}</strong> of{" "}
                    <strong className="text-on-surface">{meta.totalPage}</strong>
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Previous Button */}
                    <button
                      disabled={meta.page <= 1}
                      onClick={() => handlePageChange(meta.page - 1)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 border border-outline-variant/30 transition-all ${
                        meta.page <= 1
                          ? "opacity-40 cursor-not-allowed bg-surface-container-low"
                          : "bg-white hover:bg-primary/10 hover:text-primary text-on-surface cursor-pointer"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">chevron_left</span>
                      Previous
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          pageNum === meta.page
                            ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                            : "bg-surface-container-low text-on-surface hover:bg-primary/10 hover:text-primary"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    {/* Next Button */}
                    <button
                      disabled={meta.page >= meta.totalPage}
                      onClick={() => handlePageChange(meta.page + 1)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 border border-outline-variant/30 transition-all ${
                        meta.page >= meta.totalPage
                          ? "opacity-40 cursor-not-allowed bg-surface-container-low"
                          : "bg-white hover:bg-primary/10 hover:text-primary text-on-surface cursor-pointer"
                      }`}
                    >
                      Next
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
