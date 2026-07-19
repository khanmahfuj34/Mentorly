"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import ProtectedRoute from "@/src/components/auth/ProtectedRoute"
import { useAuth } from "@/src/hooks/useAuth"
import { getMyStudentProfile } from "@/src/services/student/student.service"
import { checkStudentProfileCompletion } from "@/src/lib/profile-completion"

interface SidebarItem {
  label: string
  href: string
  icon: string
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Home", href: "/dashboard/student/home", icon: "home" },
  { label: "Find Tutors", href: "/dashboard/student/find-tutors", icon: "search" },
  { label: "My Tuition Posts", href: "/dashboard/student/my-tuition-posts", icon: "post_add" },
  { label: "Applications", href: "/dashboard/student/applications", icon: "assignment" },
  { label: "Bookings", href: "/dashboard/student/bookings", icon: "event" },
  { label: "Notifications", href: "/dashboard/student/notifications", icon: "notifications" },
  { label: "Profile", href: "/dashboard/student/profile", icon: "person" },
  { label: "Settings", href: "/dashboard/student/settings", icon: "settings" },
]

export default function StudentDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Get active item label for header title
  const activeItem = SIDEBAR_ITEMS.find((item) => pathname === item.href)
  const pageTitle = activeItem ? activeItem.label : "Dashboard"

  // User initials helper
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "ST"

  const handleNavClick = async (e: React.MouseEvent, href: string) => {
    setIsMobileMenuOpen(false)
    if (href === "/dashboard/student/my-tuition-posts") {
      try {
        const res = await getMyStudentProfile()
        const comp = checkStudentProfileCompletion(res?.data)
        if (!comp.isComplete) {
          e.preventDefault()
          toast.warning("Please complete your profile before creating a tuition post.")
          router.push("/dashboard/student/profile")
        }
      } catch (err) {
        e.preventDefault()
        toast.warning("Please complete your profile before creating a tuition post.")
        router.push("/dashboard/student/profile")
      }
    }
  }

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full bg-white text-on-surface">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-8 border-b border-outline-variant/30 gap-3">
        <span className="material-symbols-outlined text-primary text-3xl select-none">school</span>
        <span className="font-display text-headline-md font-bold text-primary tracking-tight">
          Mentorly
        </span>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-label-md transition-all group ${
                isActive
                  ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                  : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] transition-transform group-hover:scale-105 select-none ${
                  isActive ? "text-on-primary" : "text-outline group-hover:text-primary"
                }`}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Footer Panel */}
      <div className="p-4 border-t border-outline-variant/30 space-y-3">
        <div className="flex items-center gap-3 px-2">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border border-outline-variant"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm border border-primary/20 select-none">
              {initials}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm truncate text-on-surface">{user?.name || "Student"}</p>
            <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">
              {user?.role || "STUDENT"}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-label-md text-red-600 hover:bg-red-50 transition-all group cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px] text-red-500 group-hover:translate-x-0.5 transition-transform select-none">
            logout
          </span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <div className="flex h-screen overflow-hidden bg-surface">
        {/* Desktop Sidebar (Left Panel) */}
        <aside className="hidden md:block w-64 flex-shrink-0 border-r border-outline-variant/30 h-full">
          {renderSidebarContent()}
        </aside>

        {/* Right Area (Header + Main Content) */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Top Sticky Header */}
          <header className="h-20 bg-white border-b border-outline-variant/30 flex items-center justify-between px-6 md:px-10 flex-shrink-0 z-30">
            {/* Left – Hamburger (Mobile) or Page Title (Desktop) */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container select-none cursor-pointer text-on-surface"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <h1 className="font-display text-headline-md text-on-surface font-bold">
                {pageTitle}
              </h1>
            </div>

            {/* Right – Student Avatar */}
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-block font-label-md text-sm text-on-surface-variant">
                Welcome back, <strong className="text-on-surface">{user?.name?.split(" ")[0] || "Student"}</strong>!
              </span>
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border border-outline-variant shadow-sm"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm border border-primary/20 shadow-sm select-none">
                  {initials}
                </div>
              )}
            </div>
          </header>

          {/* Main Content Pane */}
          <main className="flex-1 overflow-y-auto bg-surface-container-lowest focus:outline-none relative">
            {children}
          </main>
        </div>

        {/* Mobile Sidebar Overlay Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden flex">
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              />
              {/* Drawer Container */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-64 h-full z-10 flex flex-col shadow-2xl"
              >
                {renderSidebarContent()}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </ProtectedRoute>
  )
}
