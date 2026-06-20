export const APPLICATION_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
} as const;

export const applicationStatuses = ["PENDING", "ACCEPTED", "REJECTED"] as const;

export const tutorApplicationFilterableFields = ["status", "tutorId", "tuitionRequestId"];
