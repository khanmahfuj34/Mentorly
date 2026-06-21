import { NotificationType } from "@prisma/client";

export const notificationTypes: NotificationType[] = [
  "TUTOR_APPLICATION",
  "APPLICATION_ACCEPTED",
  "APPLICATION_REJECTED",
  "BOOKING_CREATED",
  "BOOKING_COMPLETED",
  "REVIEW_RECEIVED",
  "TUTOR_APPROVED",
  "TUTOR_REJECTED",
  "SYSTEM",
];

export const notificationSearchableFields = ["title", "message"];

export const notificationFilterableFields = ["isRead", "type", "searchTerm"];
