export interface IAvailabilityCreateInput {
  day: "SATURDAY" | "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY";
  startTime: string;
  endTime: string;
  isAvailable?: boolean;
}

export interface IAvailabilityUpdateInput {
  day?: "SATURDAY" | "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY";
  startTime?: string;
  endTime?: string;
  isAvailable?: boolean;
}

export interface IAvailabilityFilterRequest {
  day?: "SATURDAY" | "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY";
  isAvailable?: string | boolean;
  tutorId?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
