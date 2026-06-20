export const BOOKING_STATUS = {
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export const bookingStatuses = ["ACTIVE", "COMPLETED", "CANCELLED"] as const;

export const bookingFilterableFields = ["status", "studentId", "tutorId", "tuitionRequestId"];
export const bookingSearchableFields = ["status"];
