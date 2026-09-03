"use client"

import React from "react"
import { motion } from "framer-motion"
import AccountSettingsCard from "@/src/components/dashboard/tutor/settings/AccountSettingsCard"
import AvailabilitySettingsCard from "@/src/components/dashboard/tutor/settings/AvailabilitySettingsCard"
import NotificationSettingsCard from "@/src/components/dashboard/tutor/settings/NotificationSettingsCard"
import PrivacySettingsCard from "@/src/components/dashboard/tutor/settings/PrivacySettingsCard"
import SecuritySettingsCard from "@/src/components/dashboard/tutor/settings/SecuritySettingsCard"
import DangerZoneCard from "@/src/components/dashboard/tutor/settings/DangerZoneCard"

export default function TutorSettingsPage() {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
          Settings
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant mt-1">
          Manage your account, availability and preferences
        </p>
      </div>

      {/* Cards Stack */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* 1. Account Settings */}
        <section id="account-settings">
          <AccountSettingsCard />
        </section>

        {/* 2. Availability */}
        <section id="availability-settings">
          <AvailabilitySettingsCard />
        </section>

        {/* 3. Notification Preferences */}
        <section id="notification-settings">
          <NotificationSettingsCard />
        </section>

        {/* 4. Privacy & Profile Visibility */}
        <section id="privacy-settings">
          <PrivacySettingsCard />
        </section>

        {/* 5. Security */}
        <section id="security-settings">
          <SecuritySettingsCard />
        </section>

        {/* 6. Danger Zone */}
        <section id="danger-zone">
          <DangerZoneCard />
        </section>
      </motion.div>
    </div>
  )
}
