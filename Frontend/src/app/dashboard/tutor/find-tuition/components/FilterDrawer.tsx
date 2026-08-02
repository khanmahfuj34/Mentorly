import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import TuitionFilters from "./TuitionFilters"

interface FilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  filters: {
    subject: string
    classLevel: string
    district: string
    area: string
    genderPreference: string
    minimumSalary: string
    maximumSalary: string
  }
  onFilterChange: (key: keyof FilterDrawerProps["filters"], val: string) => void
  onReset: () => void
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
}: FilterDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative ml-auto w-[300px] h-full bg-white z-10 flex flex-col shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-outline-variant/30 flex-shrink-0">
              <span className="font-display font-bold text-headline-sm text-on-surface">Filters</span>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container text-outline hover:text-on-surface cursor-pointer select-none"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {/* Scrollable Filters Content */}
            <div className="flex-1 overflow-y-auto p-2 bg-surface-container-lowest">
              <TuitionFilters
                filters={filters}
                onFilterChange={onFilterChange}
                onReset={() => {
                  onReset()
                  onClose()
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
