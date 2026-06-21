import { NotificationType } from "@prisma/client";

export interface INotificationFilterRequest {
  searchTerm?: string;
  isRead?: string; // Query params are parsed as string
  type?: NotificationType;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ICreateNotificationPayload {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  referenceId?: string | null;
  referenceType?: string | null;
}
