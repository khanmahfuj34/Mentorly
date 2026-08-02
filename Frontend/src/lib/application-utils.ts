export const formatAppliedDate = (dateStr: string): string => {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return "N/A"
  }
}
