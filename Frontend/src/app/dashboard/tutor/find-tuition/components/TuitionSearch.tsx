import React from "react"

interface TuitionSearchProps {
  value: string
  onChange: (val: string) => void
}

export default function TuitionSearch({ value, onChange }: TuitionSearchProps) {
  return (
    <div className="relative w-full">
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[22px] select-none">
        search
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by subject, class, area or district..."
        className="w-full h-12 pl-12 pr-10 bg-white border border-outline-variant/40 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface placeholder:text-outline"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors cursor-pointer select-none"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      )}
    </div>
  )
}
