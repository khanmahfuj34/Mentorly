import React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AcceptDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isSubmitting: boolean
}

export default function AcceptDialog({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
}: AcceptDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isSubmitting && onClose()}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md bg-white rounded-[24px] border border-outline-variant/30 shadow-2xl p-6 md:p-8 z-10 flex flex-col space-y-6"
          >
            {/* Header icon */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100 select-none">
                <span className="material-symbols-outlined text-[28px]">check_circle</span>
              </div>
              <h3 className="text-headline-sm font-bold text-on-surface">Accept Tutor?</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Are you sure you want to accept this tutor application? 
              </p>
            </div>

            {/* Warning details */}
            <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-3.5 text-xs text-amber-800 leading-relaxed font-medium space-y-1">
              <p className="flex gap-2 items-start">
                <span className="material-symbols-outlined text-[16px] text-amber-600 select-none pt-0.5">warning</span>
                <span>An active <strong>Booking</strong> will be created automatically.</span>
              </p>
              <p className="flex gap-2 items-start pl-6">
                <span>All other pending applications for this tuition request will be automatically rejected.</span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/15">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={onClose}
                className="h-11 px-5 border border-outline-variant/30 text-on-surface font-semibold text-xs rounded-xl hover:bg-surface-container-low transition-all disabled:opacity-50 cursor-pointer select-none"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={onConfirm}
                className="h-11 px-5 bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-xs rounded-xl hover:opacity-95 transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 select-none"
              >
                <span>{isSubmitting ? "Accepting..." : "Confirm Accept"}</span>
                {isSubmitting && (
                  <span className="material-symbols-outlined text-[16px] animate-spin select-none">
                    progress_activity
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
