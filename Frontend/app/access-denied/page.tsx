import React from "react"
import { Metadata } from "next"
import AccessDenied from "@/components/pages/AccessDenied"

export const metadata: Metadata = {
  title: "Access Denied | Mentorly",
  description: "Access Restricted: You do not have permission to view this resource.",
}

export default function AccessDeniedPage() {
  return <AccessDenied />
}
