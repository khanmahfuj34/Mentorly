"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { getMyTuitionRequests } from "../../../../services/student/tuition.service"
import { ITuitionRequest } from "../../../../types/tuition"
import { useStudentApplications } from "../../../../hooks/application/useStudentApplications"
import { useAcceptApplication } from "../../../../hooks/application/useAcceptApplication"
import { useRejectApplication } from "../../../../hooks/application/useRejectApplication"
import TuitionPostAccordion from "../../../../components/applications/student/TuitionPostAccordion"
import AcceptDialog from "../../../../components/applications/student/AcceptDialog"
import RejectDialog from "../../../../components/applications/student/RejectDialog"

/* ── Loading skeleton for the post list ── */
function PostSkeleton() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-[24px] border border-outline-variant/20 bg-white px-6 py-5 animate-pulse"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-outline-variant/20 rounded-full" />
                <div className="h-5 w-20 bg-outline-variant/15 rounded-full" />
              </div>
              <div className="h-4 w-48 bg-outline-variant/20 rounded" />
              <div className="h-3 w-36 bg-outline-variant/12 rounded" />
            </div>
            <div className="w-8 h-8 rounded-full bg-outline-variant/20 shrink-0" />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Page ── */
export default function StudentApplicationsPage() {
  const [posts, setPosts] = useState<ITuitionRequest[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [postsError, setPostsError] = useState<string | null>(null)

  const { data: applicantsMap, loadingStates, errorStates, fetchForRequest } =
    useStudentApplications()
  const { mutate: acceptMutate, isMutating: isAccepting } = useAcceptApplication()
  const { mutate: rejectMutate, isMutating: isRejecting } = useRejectApplication()

  const [activeAppId, setActiveAppId] = useState<string | null>(null)
  const [activePostId, setActivePostId] = useState<string | null>(null)
  const [isAcceptOpen, setIsAcceptOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)

  /* Fetch the student's own tuition posts */
  const fetchMyPosts = useCallback(async () => {
    try {
      setIsLoadingPosts(true)
      setPostsError(null)
      const res = await getMyTuitionRequests()
      if (res.success) {
        setPosts(res.data)
      } else {
        setPostsError("Failed to load tuition posts")
      }
    } catch (err: any) {
      setPostsError(
        err?.response?.data?.message || err?.message || "Failed to load tuition posts"
      )
    } finally {
      setIsLoadingPosts(false)
    }
  }, [])

  useEffect(() => {
    fetchMyPosts()
  }, [fetchMyPosts])

  /* Expand handler — only fetches for THIS post's applications */
  const handleExpandPost = (postId: string) => {
    if (!applicantsMap[postId]) {
      fetchForRequest(postId)
    }
  }

  /* Re-fetch when accordion is toggled again after a mutation */
  const refreshPost = (postId: string) => {
    fetchForRequest(postId)
  }

  /* Dialog triggers */
  const triggerAccept = (appId: string, postId: string) => {
    setActiveAppId(appId)
    setActivePostId(postId)
    setIsAcceptOpen(true)
  }

  const triggerReject = (appId: string, postId: string) => {
    setActiveAppId(appId)
    setActivePostId(postId)
    setIsRejectOpen(true)
  }

  /* Confirm Accept */
  const handleConfirmAccept = async () => {
    if (!activeAppId || !activePostId) return
    await acceptMutate(activeAppId, () => {
      fetchMyPosts()          // refresh post status (OPEN → ASSIGNED)
      refreshPost(activePostId) // refresh this post's applicants
    })
    setIsAcceptOpen(false)
    setActiveAppId(null)
    setActivePostId(null)
  }

  /* Confirm Reject */
  const handleConfirmReject = async () => {
    if (!activeAppId || !activePostId) return
    await rejectMutate(activeAppId, () => {
      refreshPost(activePostId) // refresh this post's applicants
    })
    setIsRejectOpen(false)
    setActiveAppId(null)
    setActivePostId(null)
  }

  /* Computed stats */
  const openCount = posts.filter((p) => p.status === "OPEN").length
  const assignedCount = posts.filter((p) => p.status === "ASSIGNED").length

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 md:px-10 space-y-8">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface mb-1.5">
            Applications
          </h2>
          <p className="text-on-surface-variant font-body-md leading-relaxed">
            Review tutor applications grouped by your tuition posts. Accept a tutor to create a booking.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={fetchMyPosts}
            disabled={isLoadingPosts}
            className="h-10 px-4 border border-outline-variant/30 text-on-surface rounded-xl hover:bg-surface-container-low transition-all font-semibold text-xs flex items-center gap-1.5 cursor-pointer select-none disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-[18px] ${isLoadingPosts ? "animate-spin" : ""}`}>
              refresh
            </span>
            <span>Refresh</span>
          </button>
          <Link
            href="/dashboard/student/my-tuition-posts/new"
            className="h-10 px-4 bg-primary text-on-primary rounded-xl hover:bg-primary/90 transition-all font-semibold text-xs flex items-center gap-1.5 shadow-sm shadow-primary/15 select-none"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Post</span>
          </Link>
        </div>
      </div>

      {/* ── Summary Stats ── */}
      {!isLoadingPosts && posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { label: "Total Posts", value: posts.length, icon: "description", color: "text-on-surface" },
            { label: "Open", value: openCount, icon: "lock_open", color: "text-emerald-600" },
            { label: "Assigned", value: assignedCount, icon: "check_circle", color: "text-blue-600" },
          ].map(({ label, value, icon, color }) => (
            <div
              key={label}
              className="rounded-2xl border border-outline-variant/25 bg-white px-4 py-3.5 flex items-center gap-3 shadow-sm"
            >
              <span className={`material-symbols-outlined text-[22px] select-none ${color}`}>
                {icon}
              </span>
              <div>
                <p className={`text-xl font-bold leading-none ${color}`}>{value}</p>
                <p className="text-[10px] text-on-surface-variant font-semibold mt-0.5 select-none uppercase tracking-wider">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* ── Post List ── */}
      <div className="space-y-4">
        {isLoadingPosts ? (
          <PostSkeleton />
        ) : postsError ? (
          <div className="flex items-center gap-3 text-rose-600 bg-rose-50 border border-rose-200 rounded-2xl px-5 py-4 text-sm font-semibold">
            <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
            <span>{postsError}</span>
          </div>
        ) : posts.length > 0 ? (
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
          >
            {posts.map((post) => (
              <TuitionPostAccordion
                key={post.id}
                post={post}
                applicants={applicantsMap[post.id]}
                isLoading={loadingStates[post.id]}
                error={errorStates[post.id]}
                onExpand={() => handleExpandPost(post.id)}
                onAccept={(appId) => triggerAccept(appId, post.id)}
                onReject={(appId) => triggerReject(appId, post.id)}
              />
            ))}
          </motion.div>
        ) : (
          /* ── Global empty state ── */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/8 border border-primary/15 flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-4xl text-primary select-none">
                post_add
              </span>
            </div>
            <h3 className="text-headline-sm font-bold text-on-surface mb-2">
              No Tuition Posts Yet
            </h3>
            <p className="text-on-surface-variant font-body-md max-w-sm mb-8 leading-relaxed">
              Create your first tuition post so tutors can discover and apply to teach your student.
            </p>
            <Link
              href="/dashboard/student/my-tuition-posts/new"
              className="h-12 px-6 bg-primary text-on-primary font-semibold text-sm rounded-xl hover:opacity-95 transition-all shadow-md shadow-primary/20 flex items-center gap-2 select-none"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Post a Tuition Request</span>
            </Link>
          </div>
        )}
      </div>

      {/* ── Confirmation Dialogs ── */}
      <AcceptDialog
        isOpen={isAcceptOpen}
        onClose={() => { setIsAcceptOpen(false); setActiveAppId(null); setActivePostId(null) }}
        onConfirm={handleConfirmAccept}
        isSubmitting={isAccepting}
      />
      <RejectDialog
        isOpen={isRejectOpen}
        onClose={() => { setIsRejectOpen(false); setActiveAppId(null); setActivePostId(null) }}
        onConfirm={handleConfirmReject}
        isSubmitting={isRejecting}
      />
    </div>
  )
}
