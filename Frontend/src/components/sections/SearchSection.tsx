import React from "react"

export default function SearchSection() {
  return (
    <div className="w-full bg-white rounded-24 border border-outline-variant/30 shadow-xl p-6 max-w-4xl mx-auto -mt-12 relative z-20">
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase font-bold text-on-surface-variant tracking-wider select-none">
            Subject
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined text-primary text-lg absolute left-3 select-none">
              book
            </span>
            <input 
              type="text" 
              placeholder="e.g. Mathematics, Physics" 
              className="w-full bg-surface-container-low text-on-surface rounded-xl pl-10 pr-4 py-2.5 text-sm border-0 focus:ring-2 focus:ring-primary focus:outline-none placeholder-on-surface-variant"
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase font-bold text-on-surface-variant tracking-wider select-none">
            Location
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined text-primary text-lg absolute left-3 select-none">
              location_on
            </span>
            <input 
              type="text" 
              placeholder="e.g. Banani, Dhaka" 
              className="w-full bg-surface-container-low text-on-surface rounded-xl pl-10 pr-4 py-2.5 text-sm border-0 focus:ring-2 focus:ring-primary focus:outline-none placeholder-on-surface-variant"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase font-bold text-on-surface-variant tracking-wider select-none">
            Max Budget / Hr
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined text-primary text-lg absolute left-3 select-none">
              payments
            </span>
            <input 
              type="text" 
              placeholder="e.g. ৳1000" 
              className="w-full bg-surface-container-low text-on-surface rounded-xl pl-10 pr-4 py-2.5 text-sm border-0 focus:ring-2 focus:ring-primary focus:outline-none placeholder-on-surface-variant"
            />
          </div>
        </div>

        <button 
          type="button" 
          className="w-full bg-primary text-on-primary font-bold py-3.5 rounded-xl shadow hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 mt-5 cursor-pointer select-none"
        >
          <span className="material-symbols-outlined text-sm select-none">search</span> Find Tutors
        </button>
      </form>
    </div>
  )
}
