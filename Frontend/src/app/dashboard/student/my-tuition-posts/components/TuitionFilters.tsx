import React from "react"

interface TuitionFiltersProps {
  searchTerm: string
  setSearchTerm: (val: string) => void
  statusFilter: string
  setStatusFilter: (val: string) => void
}

export default function TuitionFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}: TuitionFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-outline-variant/30 shadow-sm w-full">
      {/* Search Input */}
      <div className="relative w-full md:max-w-md">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px] select-none">
          search
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by subject..."
          className="w-full h-11 pl-11 pr-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 text-sm placeholder:text-outline text-on-surface"
        />
      </div>

      {/* Status Dropdown Filter */}
      <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
        <label className="text-sm font-semibold text-on-surface-variant whitespace-nowrap hidden sm:inline-block">
          Status:
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-44 h-11 px-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 text-sm text-on-surface cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="OPEN">Open</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
    </div>
  )
}
