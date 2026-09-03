export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface IAvailabilitySlot {
  id?: string;
  tutorId?: string;
  day: DayOfWeek;
  isAvailable: boolean;
  startTime: string | null;
  endTime: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface IDayScheduleState {
  day: DayOfWeek;
  isAvailable: boolean;
  startTime: string;
  endTime: string;
  error?: string;
}

export interface IAvailabilityResponse {
  success: boolean;
  message?: string;
  data: IAvailabilitySlot[];
}
