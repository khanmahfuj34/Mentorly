import React from "react"
import { Metadata } from "next"
import NotFound from "@/src/components/pages/NotFound"

export const metadata: Metadata = {
  title: "404 - Page Not Found | Mentorly",
  description: "Sorry, we could not find the page you are looking for.",
}

export default function NotFoundPage() {
  return <NotFound />
}
