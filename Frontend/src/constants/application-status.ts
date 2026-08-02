import { ApplicationStatus } from "../types/application.types"

export const APPLICATION_STATUS_COLORS: Record<
  ApplicationStatus,
  { bg: string; text: string; dot: string }
> = {
  PENDING: {
    bg: "bg-amber-50 text-amber-700 border-amber-200/40",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  ACCEPTED: {
    bg: "bg-emerald-50 text-emerald-700 border-emerald-200/40",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  REJECTED: {
    bg: "bg-rose-50 text-rose-700 border-rose-200/40",
    text: "text-rose-700",
    dot: "bg-rose-500",
  },
}
