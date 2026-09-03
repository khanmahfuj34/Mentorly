"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import { changePassword } from "@/src/services/auth/auth.service"

export default function SecuritySettingsCard() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.currentPassword) {
      toast.error("Please enter your current password.")
      return
    }

    if (!form.newPassword) {
      toast.error("Please enter a new password.")
      return
    }

    if (form.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.")
      return
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("New password and confirm password do not match.")
      return
    }

    setIsChanging(true)

    try {
      const res = await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })

      if (res.success) {
        toast.success("Password updated successfully!")
        setForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      } else {
        toast.error(res.message || "Failed to update password.")
      }
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } }; message?: string }
      const errorMsg =
        errorObj.response?.data?.message ||
        errorObj.message ||
        "Failed to update password. Verify your current password."
      toast.error(errorMsg)
    } finally {
      setIsChanging(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-outline-variant/20 pb-4">
        <h2 className="text-xl font-bold text-on-surface font-display">Security & Password</h2>
        <p className="text-xs text-on-surface-variant mt-1">
          Manage your password and authentication security settings.
        </p>
      </div>

      {/* Change Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="text-xs font-semibold text-outline uppercase tracking-wider block mb-1.5">
            Current Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              required
              value={form.currentPassword}
              onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
              className="w-full px-4 py-3 pr-10 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-primary text-on-surface"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface cursor-pointer select-none"
            >
              <span className="material-symbols-outlined text-lg">
                {showCurrent ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-outline uppercase tracking-wider block mb-1.5">
            New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              required
              minLength={6}
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              className="w-full px-4 py-3 pr-10 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-primary text-on-surface"
              placeholder="Min. 6 characters"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface cursor-pointer select-none"
            >
              <span className="material-symbols-outlined text-lg">
                {showNew ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-outline uppercase tracking-wider block mb-1.5">
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              required
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 pr-10 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-primary text-on-surface"
              placeholder="Re-enter new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface cursor-pointer select-none"
            >
              <span className="material-symbols-outlined text-lg">
                {showConfirm ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isChanging}
            className="px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-60"
          >
            {isChanging ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                <span>Updating Password...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">lock_reset</span>
                <span>Update Password</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Subsection: Logout from All Devices (Honest Coming Soon state) */}
      <div className="pt-6 border-t border-outline-variant/20">
        <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 opacity-80">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm text-on-surface">Logout from All Devices</h4>
              <span className="px-2 py-0.5 rounded-full bg-outline-variant/30 text-outline text-[10px] font-bold uppercase">
                Coming Soon
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Revoke active sessions across all browser sessions and devices.
            </p>
          </div>

          <button
            type="button"
            disabled
            className="px-4 py-2 rounded-xl bg-surface-container text-outline font-semibold text-xs border border-outline-variant/40 cursor-not-allowed opacity-70 w-fit"
          >
            Revoke All Sessions
          </button>
        </div>
      </div>
    </div>
  )
}
