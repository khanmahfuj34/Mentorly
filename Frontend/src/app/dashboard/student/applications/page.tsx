"use client"

import React, { useState, useEffect, useCallback } from "react"
import { getMyTuitionRequests } from "../../../../services/student/tuition.service"
import { ITuitionRequest } from "../../../../types/tuition"
import { useStudentApplications } from "../../../../hooks/application/useStudentApplications"
import { useAcceptApplication } from "../../../../hooks/application/useAcceptApplication"
import { useRejectApplication } from "../../../../hooks/application/useRejectApplication"
import TuitionPostAccordion from "../../../../components/applications/student/TuitionPostAccordion"
import AcceptDialog from "../../../../components/applications/student/AcceptDialog"
import RejectDialog from "../../../../components/applications/student/RejectDialog"
import ApplicationSkeleton from "../../../../components/applications/shared/ApplicationSkeleton"
import EmptyApplicationState from "../../../../components/applications/shared/EmptyApplicationState"

export default function StudentApplicationsPage() {
  const [posts, setPosts] = useState<ITuitionRequest[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [postsError, setPostsError] = useState<string | null>(null)

  const { data: applicantsMap, loadingStates, errorStates, fetchForRequest } = useStudentApplications()
  const { mutate: acceptMutate, isMutating: isAccepting } = useAcceptApplication()
  const { mutate: rejectMutate, isMutating: isRejecting } = useRejectApplication()

  // Modal target application IDs
  const [activeAppId, setActiveAppId] = useState<string | null>(null)
  const [activePostId, setActivePostId] = useState<string | null>(null)
  const [isAcceptOpen, setIsAcceptOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)

  // Fetch student's tuition requests
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
      setPostsError(err?.response?.data?.message || err?.message || "Failed to load tuition posts")
    } finally {
      setIsLoadingPosts(false)
    }
  }, [])

  useEffect(() => {
    fetchMyPosts()
  }, [fetchMyPosts])

  const handleExpandPost = (postId: string) => {
    // If not already fetched, load the applicants
    if (!applicantsMap[postId]) {
      fetchForRequest(postId)
    }
  }

  // Trigger Accept Dialog
  const triggerAccept = (appId: string, postId: string) => {
    setActiveAppId(appId)
    setActivePostId(postId)
    setIsAcceptOpen(true)
  }

  // Trigger Reject Dialog
  const triggerReject = (appId: string, postId: string) => {
    setActiveAppId(appId)
    setActivePostId(postId)
    setIsRejectOpen(true)
  }

  // Execute Accept Mutation
  const handleConfirmAccept = async () => {
    if (!activeAppId || !activePostId) return
    await acceptMutate(activeAppId, () => {
      // Success Callback: refetch student posts to show ASSIGNED status, and refetch applicants
      fetchMyPosts()
      fetchForRequest(activePostId)
    })
    setIsAcceptOpen(false)
    setActiveAppId(null)
    setActivePostId(null)
  }

  // Execute Reject Mutation
  const handleConfirmReject = async () => {
    if (!activeAppId || !activePostId) return
    await rejectMutate(activeAppId, () => {
      // Success Callback: refetch applicants for this specific request
      fetchForRequest(activePostId)
    })
    setIsRejectOpen(false)
    setActiveAppId(null)
    setActivePostId(null)
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 md:px-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface mb-2">Applicants</h2>
          <p className="text-on-surface-variant font-body-md">
            Review tutor applications, accept qualified tutors, or reject submissions.
          </p>
        </div>
        <button
          onClick={() => fetchMyPosts()}
          className="h-10 px-4 border border-outline-variant/30 text-on-surface rounded-xl hover:bg-surface-container-low transition-all font-semibold text-xs flex items-center gap-1.5 cursor-pointer select-none"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          <span>Refresh</span>
        </button>
      </div>

      {/* Accordions List */}
      <div className="space-y-4">
        {isLoadingPosts ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 w-full bg-outline-variant/15 border border-outline-variant/25 rounded-[24px] animate-pulse" />
            ))}
          </div>
        ) : postsError ? (
          <div className="text-center py-12 text-rose-600 font-semibold text-sm">
            {postsError}
          </div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
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
          ))
        ) : (
          <EmptyApplicationState
            title="No Tuition Posts Found"
            subtitle="You haven't created any tuition requests yet. Post a tuition request to find qualified tutors."
            icon="post_add"
            actionLabel="Post a Tuition"
            onAction={() => {
              window.location.href = "/dashboard/student/my-tuition-posts/new"
            }}
          />
        )}
      </div>

      {/* Confirmation Overlays */}
      <AcceptDialog
        isOpen={isAcceptOpen}
        onClose={() => setIsAcceptOpen(false)}
        onConfirm={handleConfirmAccept}
        isSubmitting={isAccepting}
      />

      <RejectDialog
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onConfirm={handleConfirmReject}
        isSubmitting={isRejecting}
      />
    </div>
  )
}
