import type { Metadata } from "next"
import "./globals.css"

import AuthProvider from "@/src/providers/AuthProvider"

export const metadata: Metadata = {
  title: "Mentorly | Find the Right Tutor. Build a Better Future.",
  description:
    "Connect with verified tutors, discover tuition opportunities, schedule lessons, and learn with confidence through one trusted platform.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-surface font-display text-on-surface">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
