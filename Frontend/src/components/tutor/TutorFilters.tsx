"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLocationOptions, getUpazilasByDistrict } from "@/src/lib/location-utils";
import academicLevelsData from "@/src/data/academic-levels.json";
import { ITutorFilters } from "@/src/types/tutor";

interface TutorFiltersProps {
  filters: ITutorFilters;
  onFilterChange: (updatedFilters: Partial<ITutorFilters>) => void;
  onResetFilters: () => void;
  totalResults?: number;
}

// Predefined teaching medium options
const MEDIUM_OPTIONS = ["Bangla Medium", "English Version", "English Medium", "Religious / Madrasah"];

// Predefined class levels
const CLASS_LEVEL_OPTIONS = [
  "Class 1-5",
  "Class 6-8",
  "Class 9-10 (SSC)",
  "HSC 1st/2nd Year",
  "Admission Test",
  "O/A Level",
];

// Extracted subjects list from dataset
const COMMON_SUBJECTS = [
  "Mathematics",
  "Higher Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Bangla",
  "English",
  "ICT",
  "Accounting",
  "Economics",
];

export const TutorFilters: React.FC<TutorFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const locationOptions = getLocationOptions();
  
  // Available upazilas/areas based on chosen district
  const selectedDistrict = filters.district || "";
  const availableUpazilas = selectedDistrict ? getUpazilasByDistrict(selectedDistrict) : [];

  const activeFilterCount = [
    filters.district,
    filters.area,
    filters.subject,
    filters.classLevel,
    filters.medium,
    filters.gender,
    filters.minSalary,
    filters.maxSalary,
  ].filter(Boolean).length;

  const renderFilterControls = () => (
    <div className="space-y-6">
      {/* Header / Active Count / Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl">tune</span>
          <h2 className="font-semibold text-lg text-on-surface">Filter Tutors</h2>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-on-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
            Reset All
          </button>
        )}
      </div>

      {/* Sorting Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-outline uppercase tracking-wider block">
          Sort By
        </label>
        <select
          value={`${filters.sortBy || "createdAt"}-${filters.sortOrder || "desc"}`}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "hourlyRate-asc") {
              onFilterChange({ sortBy: "hourlyRate", sortOrder: "asc" });
            } else if (val === "hourlyRate-desc") {
              onFilterChange({ sortBy: "hourlyRate", sortOrder: "desc" });
            } else if (val === "experienceYears-desc") {
              onFilterChange({ sortBy: "experienceYears", sortOrder: "desc" });
            } else if (val === "rating-desc") {
              onFilterChange({ sortBy: "rating", sortOrder: "desc" });
            } else {
              onFilterChange({ sortBy: "createdAt", sortOrder: "desc" });
            }
          }}
          className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary transition-all"
        >
          <option value="createdAt-desc">Recommended (Newest)</option>
          <option value="hourlyRate-asc">Salary: Low to High</option>
          <option value="hourlyRate-desc">Salary: High to Low</option>
          <option value="experienceYears-desc">Highest Experience</option>
          <option value="rating-desc">Top Rated</option>
        </select>
      </div>

      {/* District Dropdown */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-outline uppercase tracking-wider block">
          District
        </label>
        <select
          value={filters.district || ""}
          onChange={(e) => {
            onFilterChange({ district: e.target.value, area: "" });
          }}
          className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary transition-all"
        >
          <option value="">All Districts</option>
          {locationOptions.districts.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      {/* Area / Thana (Dependent on District) */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-outline uppercase tracking-wider block">
          Area / Thana
        </label>
        <select
          disabled={!selectedDistrict}
          value={filters.area || ""}
          onChange={(e) => onFilterChange({ area: e.target.value })}
          className={`w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary transition-all ${
            !selectedDistrict ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <option value="">
            {selectedDistrict ? "All Areas in " + selectedDistrict : "Select a District first"}
          </option>
          {availableUpazilas.map((upazila) => (
            <option key={upazila} value={upazila}>
              {upazila}
            </option>
          ))}
        </select>
      </div>

      {/* Subject Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-outline uppercase tracking-wider block">
          Subject
        </label>
        <select
          value={filters.subject || ""}
          onChange={(e) => onFilterChange({ subject: e.target.value })}
          className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary transition-all"
        >
          <option value="">All Subjects</option>
          {COMMON_SUBJECTS.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      {/* Class Level */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-outline uppercase tracking-wider block">
          Class / Level
        </label>
        <select
          value={filters.classLevel || ""}
          onChange={(e) => onFilterChange({ classLevel: e.target.value })}
          className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary transition-all"
        >
          <option value="">All Class Levels</option>
          {CLASS_LEVEL_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Teaching Medium */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-outline uppercase tracking-wider block">
          Teaching Medium
        </label>
        <select
          value={filters.medium || ""}
          onChange={(e) => onFilterChange({ medium: e.target.value })}
          className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary transition-all"
        >
          <option value="">All Mediums</option>
          {MEDIUM_OPTIONS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Salary Range (Min - Max) */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-outline uppercase tracking-wider block">
          Expected Salary / Rate (৳/hr)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min (৳)"
            value={filters.minSalary || ""}
            onChange={(e) => onFilterChange({ minSalary: e.target.value })}
            className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
          />
          <input
            type="number"
            placeholder="Max (৳)"
            value={filters.maxSalary || ""}
            onChange={(e) => onFilterChange({ maxSalary: e.target.value })}
            className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Minimum Experience Years */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-outline uppercase tracking-wider block">
          Min. Experience (Years)
        </label>
        <input
          type="number"
          placeholder="e.g. 2"
          min="0"
          max="30"
          value={filters.experienceYears || ""}
          onChange={(e) => onFilterChange({ experienceYears: e.target.value })}
          className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (visible on md+) */}
      <aside className="hidden lg:block w-72 shrink-0 bg-white border border-outline-variant/30 rounded-2xl p-6 h-fit shadow-sm sticky top-6">
        {renderFilterControls()}
      </aside>

      {/* Mobile Filter Button */}
      <div className="lg:hidden flex items-center justify-between mb-4 bg-white p-3 rounded-2xl border border-outline-variant/30 shadow-sm">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 text-sm font-semibold text-primary px-3 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">tune</span>
          <span>Filters & Sort</span>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-on-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        {totalResults !== undefined && (
          <span className="text-xs text-on-surface-variant font-medium">
            {totalResults} {totalResults === 1 ? "tutor" : "tutors"} found
          </span>
        )}
      </div>

      {/* Mobile Drawer (visible when isMobileOpen is true) */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative ml-auto w-80 max-w-full h-full bg-white z-10 flex flex-col shadow-2xl overflow-y-auto p-6"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-outline-variant/30">
                <h3 className="font-bold text-lg text-on-surface">Filters & Options</h3>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high cursor-pointer"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {renderFilterControls()}

              <div className="pt-6 mt-6 border-t border-outline-variant/30">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full py-3 rounded-xl bg-primary text-on-primary font-semibold text-sm shadow-md cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
