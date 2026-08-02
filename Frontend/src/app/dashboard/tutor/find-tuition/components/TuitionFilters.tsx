import React, { useEffect, useState } from "react"
import { getLocationOptions, getUpazilasByDistrict } from "@/src/lib/location-utils"
import { getAcademicLevels, getSubjectsByLevel } from "@/src/lib/academic-utils"

interface FilterState {
  subject: string
  classLevel: string
  district: string
  area: string
  genderPreference: string
  minimumSalary: string
  maximumSalary: string
}

interface TuitionFiltersProps {
  filters: FilterState
  onFilterChange: (key: keyof FilterState, val: string) => void
  onReset: () => void
}

export default function TuitionFilters({ filters, onFilterChange, onReset }: TuitionFiltersProps) {
  const { districts: allDistricts } = getLocationOptions()
  const allLevels = getAcademicLevels()

  // Dynamically resolve unique subjects list
  const [allSubjects, setAllSubjects] = useState<string[]>([])
  useEffect(() => {
    const uniqueSet = new Set<string>()
    allLevels.forEach((level) => {
      getSubjectsByLevel(level).forEach((sub) => uniqueSet.add(sub))
    })
    setAllSubjects(Array.from(uniqueSet).sort())
  }, [])

  const availableAreas = filters.district ? getUpazilasByDistrict(filters.district) : []

  return (
    <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
        <h3 className="font-display font-bold text-title-lg text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-[22px] text-primary">filter_list</span>
          <span>Filters</span>
        </h3>
        <button
          onClick={onReset}
          className="text-xs font-bold text-primary hover:opacity-85 transition-opacity cursor-pointer select-none"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-5">
        {/* District Filter */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            District
          </label>
          <select
            value={filters.district}
            onChange={(e) => {
              onFilterChange("district", e.target.value)
              onFilterChange("area", "") // Reset area when district changes
            }}
            className="w-full h-11 px-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 text-sm text-on-surface cursor-pointer"
          >
            <option value="">All Districts</option>
            {allDistricts.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Area Filter */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            Area / Thana
          </label>
          <select
            value={filters.area}
            disabled={!filters.district}
            onChange={(e) => onFilterChange("area", e.target.value)}
            className="w-full h-11 px-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 text-sm text-on-surface disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <option value="">{filters.district ? "All Areas" : "Select District First"}</option>
            {availableAreas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {/* Academic Level Filter */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            Class Level
          </label>
          <select
            value={filters.classLevel}
            onChange={(e) => onFilterChange("classLevel", e.target.value)}
            className="w-full h-11 px-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 text-sm text-on-surface cursor-pointer"
          >
            <option value="">All Classes</option>
            {allLevels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Filter */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            Subject
          </label>
          <select
            value={filters.subject}
            onChange={(e) => onFilterChange("subject", e.target.value)}
            className="w-full h-11 px-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 text-sm text-on-surface cursor-pointer"
          >
            <option value="">All Subjects</option>
            {allSubjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Preference */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            Tutor Gender Preference
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Any", value: "ANY" },
              { label: "Male", value: "MALE" },
              { label: "Female", value: "FEMALE" },
            ].map((gender) => {
              const isActive = (filters.genderPreference || "ANY") === gender.value
              return (
                <button
                  key={gender.value}
                  type="button"
                  onClick={() => onFilterChange("genderPreference", gender.value === "ANY" ? "" : gender.value)}
                  className={`h-9 rounded-lg font-medium text-xs border transition-all cursor-pointer select-none ${
                    (filters.genderPreference === gender.value || (gender.value === "ANY" && !filters.genderPreference))
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  {gender.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Salary Range */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            Salary Range (BDT)
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Min"
              value={filters.minimumSalary}
              onChange={(e) => onFilterChange("minimumSalary", e.target.value)}
              className="w-full h-11 px-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 text-sm text-on-surface placeholder:text-outline/70"
            />
            <span className="text-outline text-sm select-none">—</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maximumSalary}
              onChange={(e) => onFilterChange("maximumSalary", e.target.value)}
              className="w-full h-11 px-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 text-sm text-on-surface placeholder:text-outline/70"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
