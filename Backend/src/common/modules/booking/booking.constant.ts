export const BOOKING_STATUS = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export const bookingStatuses = ["PENDING", "ACTIVE", "COMPLETED", "CANCELLED"] as const;

export const bookingFilterableFields = ["status", "studentId", "tutorId", "tuitionRequestId"];
export const bookingSearchableFields = ["status"];
