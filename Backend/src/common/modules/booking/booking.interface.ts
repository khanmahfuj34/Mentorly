import { BookingStatus } from "@prisma/client";

export interface IBookingFilterRequest {
  status?: BookingStatus;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
