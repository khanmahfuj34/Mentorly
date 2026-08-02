import React from "react"

interface ApplicationFiltersProps<T extends string> {
  currentFilter: T
  filtersList: readonly T[]
  onFilterChange: (val: T) => void
}

export default function ApplicationFilters({
  currentFilter,
  filtersList,
  onFilterChange,
}: ApplicationFiltersProps<string>) {
  return (
    <div className="flex flex-wrap gap-2 pb-2 border-b border-outline-variant/20 select-none">
      {filtersList.map((filter) => {
        const isActive = currentFilter === filter
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`h-9 px-4 rounded-xl font-semibold text-xs border transition-all cursor-pointer ${
              isActive
                ? "border-primary bg-primary text-on-primary shadow-sm shadow-primary/10"
                : "border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low"
            }`}
          >
            {filter === "ALL" ? "All" : filter.toLowerCase()}
          </button>
        )
      })}
    </div>
  )
}
