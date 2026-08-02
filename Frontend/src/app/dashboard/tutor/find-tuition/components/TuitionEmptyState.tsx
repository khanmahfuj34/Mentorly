import React from "react"

interface TuitionEmptyStateProps {
  onClearFilters: () => void
}

export default function TuitionEmptyState({ onClearFilters }: TuitionEmptyStateProps) {
  return (
    <div className="max-w-md mx-auto py-12 md:py-20 flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 animate-float">
        <span className="material-symbols-outlined text-4xl select-none">search_off</span>
      </div>
      <h3 className="text-headline-sm font-bold text-on-surface mb-2">No Tuition Found</h3>
      <p className="text-on-surface-variant font-body-md max-w-sm mb-8">
        We couldn't find any available tuition posts matching your current search and filter settings. Try broadening your criteria.
      </p>
      <button
        onClick={onClearFilters}
        className="h-12 px-6 bg-primary text-on-primary font-semibold text-sm rounded-xl hover:opacity-95 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px] select-none">filter_alt_off</span>
        <span>Clear All Filters</span>
      </button>
    </div>
  )
}
