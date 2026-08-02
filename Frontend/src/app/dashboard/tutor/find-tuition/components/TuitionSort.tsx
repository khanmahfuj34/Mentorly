import React from "react"

interface TuitionSortProps {
  value: string
  onChange: (compositeValue: string) => void
}

export default function TuitionSort({ value, onChange }: TuitionSortProps) {
  return (
    <div className="relative shrink-0 w-full sm:w-[200px]">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] select-none">
        sort
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 pl-10 pr-4 bg-white border border-outline-variant/40 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface cursor-pointer"
      >
        <option value="createdAt_desc">Newest First</option>
        <option value="createdAt_asc">Oldest First</option>
        <option value="salary_desc">Highest Salary</option>
        <option value="salary_asc">Lowest Salary</option>
      </select>
    </div>
  )
}
