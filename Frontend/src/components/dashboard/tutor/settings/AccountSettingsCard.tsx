"use client"

import React, { useState, useEffect } from "react"
import { toast } from "sonner"
import { useAuth } from "@/src/hooks/useAuth"
import { updateAccount } from "@/src/services/auth/auth.service"
import { getMyTutorProfile, updateTutorProfile } from "@/src/services/tutor/tutor.service"
import { updateStoredUser } from "@/src/lib/auth-storage"

export default function AccountSettingsCard() {
  const { user } = useAuth()

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getMyTutorProfile()
        if (res?.data) {
          setForm((prev) => ({
            name: prev.name || user?.name || "",
            email: prev.email || user?.email || "",
            phoneNumber: res.data.phoneNumber || "",
          }))
        }
      } catch (err) {
        // Safe fallback if profile is not created yet
      } finally {
        setIsLoadingProfile(false)
      }
    }
    loadProfile()
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name.trim()) {
      toast.error("Full name is required.")
      return
    }

    if (!form.email.trim()) {
      toast.error("Email address is required.")
      return
    }

    setIsSaving(true)

    try {
      // 1. Update user account details (name, email)
      const res = await updateAccount({
        name: form.name.trim(),
        email: form.email.trim(),
      })

      if (res.success && res.data) {
        updateStoredUser(res.data)
      }

      // 2. Update tutor profile details (phone number)
      if (form.phoneNumber !== undefined) {
        try {
          await updateTutorProfile({
            phoneNumber: form.phoneNumber.trim(),
          })
        } catch {
          // Ignore if profile doesn't exist yet
        }
      }

      toast.success("Account details updated successfully!")
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } }; message?: string }
      const errorMsg =
        errorObj.response?.data?.message || errorObj.message || "Failed to update account details."
      toast.error(errorMsg)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-outline-variant/20 pb-4">
        <h2 className="text-xl font-bold text-on-surface font-display">Account Information</h2>
        <p className="text-xs text-on-surface-variant mt-1">
          View and update your personal account details and contact information.
        </p>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-3 bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/20">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-outline font-semibold">Role:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase text-[11px]">
            {user?.role || "TUTOR"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-outline font-semibold">Account Status:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-outline font-semibold">Verification:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-[11px] border border-indigo-200">
            {user?.isVerified ? "Verified Tutor" : "Standard Tutor"}
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-outline uppercase tracking-wider block mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-primary text-on-surface transition-all"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-outline uppercase tracking-wider block mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-primary text-on-surface transition-all"
            placeholder="tutor@example.com"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-outline uppercase tracking-wider block mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            disabled={isLoadingProfile}
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-primary text-on-surface transition-all disabled:opacity-60"
            placeholder="e.g. +8801712345678"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-60"
          >
            {isSaving ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">save</span>
                <span>Save Account Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
