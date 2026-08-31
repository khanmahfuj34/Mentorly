"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/src/hooks/useAuth";
import { updateAccount, changePassword } from "@/src/services/auth/auth.service";
import { getMyStudentProfile, updateStudentProfile } from "@/src/services/student/student.service";
import { updateStoredUser } from "@/src/lib/auth-storage";
import { getLocationOptions, getUpazilasByDistrict } from "@/src/lib/location-utils";
import { DeleteAccountModal } from "@/src/components/dashboard/settings/DeleteAccountModal";
import { INotificationPreferences, IPrivacyPreferences } from "@/src/types/settings.types";
import { IStudentProfile } from "@/src/types/student.types";

type SettingsTab =
  | "account"
  | "password"
  | "notifications"
  | "privacy"
  | "preferences"
  | "appearance"
  | "language"
  | "security"
  | "danger";

const TABS: { id: SettingsTab; label: string; icon: string }[] = [
  { id: "account", label: "Account", icon: "manage_accounts" },
  { id: "password", label: "Change Password", icon: "lock_reset" },
  { id: "notifications", label: "Notifications", icon: "notifications" },
  { id: "privacy", label: "Privacy", icon: "security" },
  { id: "preferences", label: "Student Preferences", icon: "tune" },
  { id: "appearance", label: "Appearance", icon: "palette" },
  { id: "language", label: "Language", icon: "language" },
  { id: "security", label: "Security & 2FA", icon: "shield" },
  { id: "danger", label: "Danger Zone", icon: "warning" },
];

const MEDIUM_OPTIONS = ["Bangla Medium", "English Version", "English Medium", "Religious / Madrasah"];
const CLASS_OPTIONS = ["Class 1-5", "Class 6-8", "Class 9-10 (SSC)", "HSC 1st/2nd Year", "Admission Test", "O/A Level"];
const COMMON_SUBJECTS = ["Mathematics", "Higher Mathematics", "Physics", "Chemistry", "Biology", "Bangla", "English", "ICT"];

export default function StudentSettingsPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");

  // Account State
  const [accountForm, setAccountForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
  });
  const [isUpdatingAccount, setIsUpdatingAccount] = useState(false);

  // Password State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Notification Preferences (Frontend Only)
  const [notifications, setNotifications] = useState<INotificationPreferences>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("mentorly_notification_preferences");
        if (saved) return JSON.parse(saved);
      } catch (e) {
        // Fallback to defaults
      }
    }
    return {
      applicationUpdates: true,
      bookingUpdates: true,
      tuitionPostUpdates: true,
      systemNotifications: true,
      emailNotifications: false,
      inAppNotifications: true,
    };
  });

  // Privacy Preferences
  const [privacy, setPrivacy] = useState<IPrivacyPreferences>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("mentorly_privacy_preferences");
        if (saved) return JSON.parse(saved);
      } catch (e) {
        // Fallback to defaults
      }
    }
    return {
      profileVisibility: "public",
      showPhoneToTutors: true,
    };
  });

  // Student Profile / Preferences State
  const [studentProfile, setStudentProfile] = useState<IStudentProfile | null>(null);
  const [prefForm, setPrefForm] = useState({
    district: "",
    area: "",
    classLevel: "",
    preferredSubjects: [] as string[],
    guardianName: "",
    guardianPhone: "",
  });
  const [isUpdatingPref, setIsUpdatingPref] = useState(false);

  // Appearance & Language State
  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mentorly_theme");
      if (saved) return saved as "light" | "dark" | "system";
    }
    return "light";
  });

  const [language, setLanguage] = useState<"en" | "bn">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mentorly_language");
      if (saved) return saved as "en" | "bn";
    }
    return "en";
  });

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Locations data
  const locationOptions = getLocationOptions();
  const availableUpazilas = prefForm.district ? getUpazilasByDistrict(prefForm.district) : [];

  // Load student profile on mount
  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const res = await getMyStudentProfile();
        if (res?.data) {
          setStudentProfile(res.data);
          setAccountForm((prev) => ({
            name: prev.name || user?.name || "",
            email: prev.email || user?.email || "",
            phone: res.data.guardianPhone || "",
          }));
          setPrefForm({
            district: res.data.district || "",
            area: res.data.area || "",
            classLevel: res.data.classLevel || "",
            preferredSubjects: res.data.preferredSubjects || [],
            guardianName: res.data.guardianName || "",
            guardianPhone: res.data.guardianPhone || "",
          });
        }
      } catch (err) {
        // Profile may not exist yet, safe to ignore
      }
    };
    fetchStudentProfile();
  }, [user]);


  // Helper function for error message extraction
  const getErrorMessage = (err: unknown, fallbackMessage: string): string => {
    if (err && typeof err === "object") {
      const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
      return errorObj.response?.data?.message || errorObj.message || fallbackMessage;
    }
    return fallbackMessage;
  };

  // Handler: Account Update
  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingAccount(true);
    try {
      const res = await updateAccount({
        name: accountForm.name.trim(),
        email: accountForm.email.trim(),
      });

      if (res.success && res.data) {
        updateStoredUser(res.data);
        toast.success("Account details updated successfully!");
      }

      // Also update guardian phone if student profile exists
      if (accountForm.phone) {
        try {
          await updateStudentProfile({
            guardianPhone: accountForm.phone.trim(),
          });
        } catch (e) {
          // Non-blocking
        }
      }
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Failed to update account details."));
    } finally {
      setIsUpdatingAccount(false);
    }
  };

  // Handler: Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      if (res.success) {
        toast.success("Password changed successfully!");
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Failed to change password. Verify your current password."));
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Handler: Toggle Notification Preference
  const toggleNotification = (key: keyof INotificationPreferences) => {
    setNotifications((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("mentorly_notification_preferences", JSON.stringify(updated));
      return updated;
    });
    toast.success("Notification preferences saved on this device.");
  };

  // Handler: Save Student Preferences
  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingPref(true);
    try {
      const res = await updateStudentProfile({
        district: prefForm.district,
        area: prefForm.area,
        classLevel: prefForm.classLevel,
        preferredSubjects: prefForm.preferredSubjects,
        guardianName: prefForm.guardianName,
        guardianPhone: prefForm.guardianPhone,
      });

      if (res?.success) {
        toast.success("Student learning preferences saved successfully!");
      }
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Failed to save preferences."));
    } finally {
      setIsUpdatingPref(false);
    }
  };


  // Handler: Change Theme
  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    localStorage.setItem("mentorly_theme", newTheme);
    toast.success(`Theme set to ${newTheme}`);
  };

  // Handler: Change Language
  const handleLanguageChange = (newLang: "en" | "bn") => {
    setLanguage(newLang);
    localStorage.setItem("mentorly_language", newLang);
    toast.success(`Language set to ${newLang === "en" ? "English" : "বাংলা"}`);
  };

  // Toggle Subject in preferences
  const toggleSubject = (sub: string) => {
    setPrefForm((prev) => {
      const exists = prev.preferredSubjects.includes(sub);
      const updated = exists
        ? prev.preferredSubjects.filter((s) => s !== sub)
        : [...prev.preferredSubjects, sub];
      return { ...prev, preferredSubjects: updated };
    });
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-on-surface font-display">Student Settings</h1>
          <p className="text-xs text-on-surface-variant">
            Manage your account details, security credentials, learning preferences, and notifications.
          </p>
        </div>

        <button
          onClick={logout}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 font-semibold text-xs border border-red-200 hover:bg-red-100 transition-all cursor-pointer w-fit"
        >
          <span className="material-symbols-outlined text-base">logout</span>
          <span>Logout</span>
        </button>
      </div>

      {/* Main Grid: Nav Sidebar + Settings Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar (Desktop) / Tabs (Mobile) */}
        <div className="lg:col-span-1 space-y-2">
          {/* Mobile horizontal pill navigation */}
          <div className="lg:hidden flex overflow-x-auto gap-2 pb-2 scrollbar-none">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 border transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-on-primary border-primary shadow-sm"
                      : "bg-white text-on-surface border-outline-variant/30 hover:bg-primary/5"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop vertical sidebar */}
          <div className="hidden lg:block bg-white rounded-3xl p-3 border border-outline-variant/30 shadow-sm space-y-1">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-label-md text-xs transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                      : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-xl select-none ${
                      isActive ? "text-on-primary" : "text-outline"
                    }`}
                  >
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Pane */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {/* 1. Account Settings */}
            {activeTab === "account" && (
              <motion.div
                key="account"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6"
              >
                <div className="border-b border-outline-variant/20 pb-4">
                  <h2 className="text-xl font-bold text-on-surface">Account Information</h2>
                  <p className="text-xs text-on-surface-variant">
                    Update your personal profile details and contact information.
                  </p>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-3 bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/20">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-outline font-semibold">Account Role:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase text-[11px]">
                      {user?.role || "STUDENT"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-outline font-semibold">Status:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-outline font-semibold">Verification:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold text-[11px] border border-amber-200">
                      {user?.isVerified ? "Verified Student" : "Standard Account"}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleUpdateAccount} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-outline uppercase tracking-wider block mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={accountForm.name || user?.name || ""}
                      onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-outline uppercase tracking-wider block mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={accountForm.email || user?.email || ""}
                      onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>


                  <div>
                    <label className="text-xs font-semibold text-outline uppercase tracking-wider block mb-1.5">
                      Phone Number (Guardian / Contact)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. +8801712345678"
                      value={accountForm.phone}
                      onChange={(e) => setAccountForm({ ...accountForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isUpdatingAccount}
                      className="px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer flex items-center gap-2"
                    >
                      {isUpdatingAccount ? (
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
              </motion.div>
            )}

            {/* 2. Change Password */}
            {activeTab === "password" && (
              <motion.div
                key="password"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6"
              >
                <div className="border-b border-outline-variant/20 pb-4">
                  <h2 className="text-xl font-bold text-on-surface">Change Password</h2>
                  <p className="text-xs text-on-surface-variant">
                    Ensure your account is using a long, random password to stay secure.
                  </p>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                  <div>
                    <label className="text-xs font-semibold text-outline uppercase tracking-wider block mb-1.5">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        required
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        className="w-full px-4 py-3 pr-10 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-primary text-on-surface"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-3 text-outline hover:text-on-surface"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {showCurrentPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-outline uppercase tracking-wider block mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        required
                        minLength={6}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="w-full px-4 py-3 pr-10 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-primary text-on-surface"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3 text-outline hover:text-on-surface"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {showNewPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-outline uppercase tracking-wider block mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-primary text-on-surface"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isChangingPassword}
                      className="px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer flex items-center gap-2"
                    >
                      {isChangingPassword ? (
                        <>
                          <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                          <span>Updating Password...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-sm">key</span>
                          <span>Update Password</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* 3. Notifications */}
            {activeTab === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6"
              >
                <div className="border-b border-outline-variant/20 pb-4">
                  <h2 className="text-xl font-bold text-on-surface">Notification Preferences</h2>
                  <p className="text-xs text-on-surface-variant">
                    Manage how Mentorly alerts you for tutor applications, bookings, and tuition updates.
                  </p>
                </div>

                <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20 text-xs text-primary font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">info</span>
                  <span>Notification preferences are currently saved on this device.</span>
                </div>

                <div className="space-y-4">
                  {[
                    { key: "applicationUpdates", label: "Application Updates", desc: "Get notified when a tutor applies to your tuition posts." },
                    { key: "bookingUpdates", label: "Booking Updates", desc: "Receive alerts for active booking changes or completions." },
                    { key: "tuitionPostUpdates", label: "Tuition Post Updates", desc: "Status alerts on your posted tuition requests." },
                    { key: "systemNotifications", label: "System Notifications", desc: "Platform maintenance and safety updates." },
                    { key: "emailNotifications", label: "Email Notifications", desc: "Receive summaries and major alerts via email." },
                    { key: "inAppNotifications", label: "In-App Bell Alerts", desc: "Show notification badge and popups inside dashboard." },
                  ].map((item) => {
                    const isChecked = notifications[item.key as keyof INotificationPreferences];
                    return (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 hover:border-primary/30 transition-all"
                      >
                        <div className="pr-4">
                          <h4 className="font-semibold text-sm text-on-surface">{item.label}</h4>
                          <p className="text-xs text-on-surface-variant">{item.desc}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleNotification(item.key as keyof INotificationPreferences)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            isChecked ? "bg-primary" : "bg-outline-variant"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              isChecked ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* 4. Privacy */}
            {activeTab === "privacy" && (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6"
              >
                <div className="border-b border-outline-variant/20 pb-4">
                  <h2 className="text-xl font-bold text-on-surface">Privacy Settings</h2>
                  <p className="text-xs text-on-surface-variant">
                    Control who can view your profile and contact details.
                  </p>
                </div>

                <div className="space-y-6 max-w-lg">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-outline uppercase tracking-wider block">
                      Profile Visibility
                    </label>
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) => {
                        const updated = { ...privacy, profileVisibility: e.target.value as "public" | "registered" | "hidden" };
                        setPrivacy(updated);
                        localStorage.setItem("mentorly_privacy_preferences", JSON.stringify(updated));
                        toast.success("Privacy preferences updated.");
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-primary text-on-surface"
                    >
                      <option value="public">Public (Visible to all platform users)</option>
                      <option value="registered">Registered Users Only</option>
                      <option value="hidden">Hidden / Private</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/20">
                    <div>
                      <h4 className="font-semibold text-sm text-on-surface">Share Phone Number with Tutors</h4>
                      <p className="text-xs text-on-surface-variant">
                        Allow accepted tutors to view your contact phone number.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = { ...privacy, showPhoneToTutors: !privacy.showPhoneToTutors };
                        setPrivacy(updated);
                        localStorage.setItem("mentorly_privacy_preferences", JSON.stringify(updated));
                        toast.success("Privacy preferences updated.");
                      }}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        privacy.showPhoneToTutors ? "bg-primary" : "bg-outline-variant"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                          privacy.showPhoneToTutors ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. Student Preferences */}
            {activeTab === "preferences" && (
              <motion.div
                key="preferences"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-on-surface">Student Preferences</h2>
                    <p className="text-xs text-on-surface-variant">
                      Set your default location, grade level, and preferred learning subjects.
                    </p>
                  </div>
                  <Link
                    href="/dashboard/student/profile"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-high transition-all cursor-pointer w-fit"
                  >
                    <span className="material-symbols-outlined text-base">person</span>
                    <span>Manage Full Profile</span>
                  </Link>
                </div>

                <form onSubmit={handleSavePreferences} className="space-y-6">
                  {/* Class Level */}
                  <div className="space-y-2 max-w-md">
                    <label className="text-xs font-semibold text-outline uppercase tracking-wider block">
                      Current Class / Level
                    </label>
                    <select
                      value={prefForm.classLevel}
                      onChange={(e) => setPrefForm({ ...prefForm, classLevel: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-primary text-on-surface"
                    >
                      <option value="">Select Class Level</option>
                      {CLASS_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District & Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-outline uppercase tracking-wider block">
                        Preferred District
                      </label>
                      <select
                        value={prefForm.district}
                        onChange={(e) => setPrefForm({ ...prefForm, district: e.target.value, area: "" })}
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-primary text-on-surface"
                      >
                        <option value="">All Districts</option>
                        {locationOptions.districts.map((d) => (
                          <option key={d.value} value={d.value}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-outline uppercase tracking-wider block">
                        Preferred Area / Thana
                      </label>
                      <select
                        disabled={!prefForm.district}
                        value={prefForm.area}
                        onChange={(e) => setPrefForm({ ...prefForm, area: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-primary text-on-surface ${
                          !prefForm.district ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <option value="">
                          {prefForm.district ? "All Areas in " + prefForm.district : "Select a District first"}
                        </option>
                        {availableUpazilas.map((upazila) => (
                          <option key={upazila} value={upazila}>
                            {upazila}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Subjects */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-outline uppercase tracking-wider block mb-2">
                      Preferred Learning Subjects
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {COMMON_SUBJECTS.map((sub) => {
                        const isSelected = prefForm.preferredSubjects.includes(sub);
                        return (
                          <button
                            type="button"
                            key={sub}
                            onClick={() => toggleSubject(sub)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-primary text-on-primary border-primary shadow-sm"
                                : "bg-surface-container-low text-on-surface border-outline-variant/30 hover:border-primary/40"
                            }`}
                          >
                            {sub} {isSelected && "✓"}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isUpdatingPref}
                      className="px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer flex items-center gap-2"
                    >
                      {isUpdatingPref ? (
                        <>
                          <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                          <span>Saving Preferences...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-sm">save</span>
                          <span>Save Learning Preferences</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* 6. Appearance */}
            {activeTab === "appearance" && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6"
              >
                <div className="border-b border-outline-variant/20 pb-4">
                  <h2 className="text-xl font-bold text-on-surface">Appearance Settings</h2>
                  <p className="text-xs text-on-surface-variant">
                    Customize the theme and display appearance of the application.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
                  {[
                    { id: "light", label: "Light Mode", icon: "light_mode", desc: "Clean light background" },
                    { id: "dark", label: "Dark Mode", icon: "dark_mode", desc: "Comfortable dark theme" },
                    { id: "system", label: "System Default", icon: "desktop_windows", desc: "Sync with OS theme" },
                  ].map((item) => {
                    const isSelected = theme === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleThemeChange(item.id as "light" | "dark" | "system")}
                        className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          isSelected
                            ? "bg-primary/10 border-primary text-primary shadow-md shadow-primary/10"
                            : "bg-white border-outline-variant/30 text-on-surface hover:border-primary/40"
                        }`}
                      >
                        <span className="material-symbols-outlined text-3xl mb-3">{item.icon}</span>
                        <div>
                          <h4 className="font-bold text-sm">{item.label}</h4>
                          <p className="text-[11px] text-on-surface-variant mt-0.5">{item.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* 7. Language */}
            {activeTab === "language" && (
              <motion.div
                key="language"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6"
              >
                <div className="border-b border-outline-variant/20 pb-4">
                  <h2 className="text-xl font-bold text-on-surface">Language Preferences</h2>
                  <p className="text-xs text-on-surface-variant">
                    Choose your preferred display language for Mentorly.
                  </p>
                </div>

                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-800 font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg text-amber-600">translate</span>
                  <span>More language support and full translations are coming soon.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                  {[
                    { id: "en", label: "English (US)", native: "English" },
                    { id: "bn", label: "বাংলা (Bengali)", native: "Bengali" },
                  ].map((item) => {
                    const isSelected = language === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleLanguageChange(item.id as "en" | "bn")}
                        className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? "bg-primary/10 border-primary text-primary font-bold shadow-sm"
                            : "bg-white border-outline-variant/30 text-on-surface hover:border-primary/40"
                        }`}
                      >
                        <div>
                          <h4 className="font-semibold text-sm">{item.label}</h4>
                          <span className="text-xs text-on-surface-variant">{item.native}</span>
                        </div>
                        {isSelected && (
                          <span className="material-symbols-outlined text-primary">check_circle</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* 8. Security & 2FA */}
            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6"
              >
                <div className="border-b border-outline-variant/20 pb-4">
                  <h2 className="text-xl font-bold text-on-surface">Security & Authentication</h2>
                  <p className="text-xs text-on-surface-variant">
                    Overview of active sessions, authentication status, and security controls.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Password Quick Access */}
                  <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/20 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm text-on-surface">Password Security</h4>
                      <p className="text-xs text-on-surface-variant">Regularly update your password to protect your account.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("password")}
                      className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-semibold text-xs hover:bg-primary/20 cursor-pointer"
                    >
                      Change Password
                    </button>
                  </div>

                  {/* Active Sessions */}
                  <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-on-surface">Active Sessions</h4>
                      <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        Remote Revocation Coming Soon
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs bg-white p-3 rounded-xl border border-outline-variant/20">
                      <span className="material-symbols-outlined text-primary text-xl">laptop</span>
                      <div className="flex-1">
                        <p className="font-semibold text-on-surface">Current Browser Session</p>
                        <p className="text-[11px] text-outline">Logged in as {user?.email}</p>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600">Active Now</span>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="p-4 rounded-2xl bg-surface-container-low/50 border border-outline-variant/20 flex items-center justify-between opacity-75">
                    <div>
                      <h4 className="font-semibold text-sm text-on-surface">Two-Factor Authentication (2FA)</h4>
                      <p className="text-xs text-on-surface-variant">Add an extra layer of security using TOTP / Authenticator app.</p>
                    </div>
                    <span className="text-xs font-semibold text-outline bg-surface-container px-3 py-1.5 rounded-xl">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 9. Danger Zone */}
            {activeTab === "danger" && (
              <motion.div
                key="danger"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-red-200 shadow-sm space-y-6"
              >
                <div className="border-b border-red-100 pb-4">
                  <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
                    <span className="material-symbols-outlined">warning</span>
                    Danger Zone
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Irreversible and destructive actions for your Mentorly account.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-red-50/50 border border-red-200 space-y-4">
                  <div>
                    <h3 className="font-bold text-base text-red-900">Delete Account</h3>
                    <p className="text-xs text-red-700 mt-1">
                      Once you delete your account, there is no going back. All your profile information, posted tuition requests, applications, and bookings will be permanently removed.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-xs shadow-md shadow-red-600/20 hover:bg-red-700 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">delete_forever</span>
                    <span>Delete Account</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
