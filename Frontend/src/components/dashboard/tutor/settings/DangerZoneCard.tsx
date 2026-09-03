"use client"

import React, { useState } from "react"
import LogoutConfirmModal from "./LogoutConfirmModal"
import { DeleteAccountModal } from "@/src/components/dashboard/settings/DeleteAccountModal"

export default function DangerZoneCard() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  return (
    <>
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-200/80 shadow-sm space-y-6">
        {/* Header */}
        <div className="border-b border-red-100 pb-4">
          <div className="flex items-center gap-2 text-red-600">
            <span className="material-symbols-outlined text-xl">warning</span>
            <h2 className="text-xl font-bold font-display">Danger Zone</h2>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">
            Actions here affect your active session or permanently erase your account data.
          </p>
        </div>

        <div className="space-y-4">
          {/* Action 1: Logout */}
          <div className="p-4 rounded-2xl bg-red-50/40 border border-red-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h4 className="font-semibold text-sm text-on-surface">Log Out</h4>
              <p className="text-xs text-on-surface-variant">
                Sign out of your active Mentorly session on this device.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white text-red-600 font-semibold text-xs border border-red-200 hover:bg-red-50 transition-all cursor-pointer flex items-center gap-2 shrink-0 w-fit shadow-xs"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>Log Out</span>
            </button>
          </div>

          {/* Action 2: Delete Account */}
          <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h4 className="font-semibold text-sm text-red-900">Delete Account</h4>
              <p className="text-xs text-red-700">
                Permanently delete your profile, applications, availability schedule, and all user data.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-xs hover:bg-red-700 transition-all cursor-pointer flex items-center gap-2 shrink-0 shadow-md shadow-red-600/20 w-fit"
            >
              <span className="material-symbols-outlined text-base">delete_forever</span>
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  )
}
