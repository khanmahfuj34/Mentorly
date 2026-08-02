import React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface RejectDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isSubmitting: boolean
}

export default function RejectDialog({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
}: RejectDialogProps) {
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
              <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center border border-rose-100 select-none">
                <span className="material-symbols-outlined text-[28px]">cancel</span>
              </div>
              <h3 className="text-headline-sm font-bold text-on-surface">Reject Application?</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Are you sure you want to reject this tutor's application? This action will set their application status to Rejected.
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
                className="h-11 px-5 bg-rose-600 text-white hover:bg-rose-700 font-semibold text-xs rounded-xl hover:opacity-95 transition-all shadow-md shadow-rose-600/10 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 select-none"
              >
                <span>{isSubmitting ? "Rejecting..." : "Confirm Reject"}</span>
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
