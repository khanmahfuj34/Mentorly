import React, { useState } from "react"
import { ITuitionRequest } from "../../../types/tuition"
import { ITutorApplication } from "../../../types/application.types"
import TutorApplicantCard from "./TutorApplicantCard"
import ApplicationSkeleton from "../shared/ApplicationSkeleton"
import EmptyApplicationState from "../shared/EmptyApplicationState"
import { motion, AnimatePresence } from "framer-motion"

interface TuitionPostAccordionProps {
  post: ITuitionRequest
  applicants: ITutorApplication[]
  isLoading: boolean
  error: string | null
  onExpand: () => void
  onAccept: (appId: string) => void
  onReject: (appId: string) => void
}

export default function TuitionPostAccordion({
  post,
  applicants = [],
  isLoading,
  error,
  onExpand,
  onAccept,
  onReject,
}: TuitionPostAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    const nextState = !isOpen
    setIsOpen(nextState)
    if (nextState) {
      onExpand()
    }
  }

  const formattedSalary = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(post.salary)

  return (
    <div className="rounded-[24px] border border-outline-variant/30 bg-white overflow-hidden shadow-sm hover:border-primary/20 transition-all duration-300">
      {/* Header Accordion Click Row */}
      <button
        onClick={handleToggle}
        className="w-full px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white hover:bg-surface-container-lowest transition-colors text-left cursor-pointer"
      >
        <div className="space-y-1.5 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase select-none ${
              post.status === "OPEN"
                ? "bg-primary/10 text-primary border-primary/20"
                : "bg-surface-container text-on-surface-variant/75 border-outline-variant/20"
            }`}>
              {post.status.toLowerCase()}
            </span>
            <span className="text-xs text-on-surface-variant/60 font-semibold select-none whitespace-nowrap">
              Class: {post.classLevel}
            </span>
          </div>
          <h3 className="font-display font-bold text-title-md text-on-surface leading-tight truncate">
            {post.subject}
          </h3>
          <p className="text-xs text-on-surface-variant font-medium select-none">
            {post.area}, {post.district} • ৳{formattedSalary}/month
          </p>
        </div>

        {/* Action Toggle Indicator */}
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          <span className="material-symbols-outlined text-outline select-none transition-transform duration-300 font-bold" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
            keyboard_arrow_down
          </span>
        </div>
      </button>

      {/* Accordion Expand Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden bg-surface-container-lowest border-t border-outline-variant/15"
          >
            <div className="p-6 space-y-4">
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider select-none mb-3">
                Applicants ({applicants.length})
              </h4>

              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <ApplicationSkeleton key={i} />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-6 text-rose-600 font-medium text-sm">
                  {error}
                </div>
              ) : applicants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {applicants.map((app) => (
                    <TutorApplicantCard
                      key={app.id}
                      application={app}
                      onAccept={onAccept}
                      onReject={onReject}
                    />
                  ))}
                </div>
              ) : (
                <EmptyApplicationState
                  title="No Tutors Applied Yet"
                  subtitle="We haven't received any tutor applications for this post. Tutors will show up here once they apply."
                  icon="person_search"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
