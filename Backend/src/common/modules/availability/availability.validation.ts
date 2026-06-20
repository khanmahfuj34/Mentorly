import { z } from "zod";

const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s*(?:AM|PM|am|pm)$|^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

const createAvailabilityValidationSchema = z.object({
  body: z.object({
    day: z.enum(["SATURDAY", "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], {
      message: "day must be a valid day of the week",
    }),
    startTime: z.string({
      message: "startTime is required",
    }).regex(timeRegex, "Invalid startTime format. Use HH:MM AM/PM or HH:MM 24-hour format (e.g., '6:00 PM' or '18:00')"),
    endTime: z.string({
      message: "endTime is required",
    }).regex(timeRegex, "Invalid endTime format. Use HH:MM AM/PM or HH:MM 24-hour format (e.g., '9:00 PM' or '21:00')"),
    isAvailable: z.boolean().optional(),
  }),
});

const updateAvailabilityValidationSchema = z.object({
  body: z.object({
    day: z.enum(["SATURDAY", "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]).optional(),
    startTime: z.string().regex(timeRegex, "Invalid startTime format. Use HH:MM AM/PM or HH:MM 24-hour format (e.g., '6:00 PM' or '18:00')").optional(),
    endTime: z.string().regex(timeRegex, "Invalid endTime format. Use HH:MM AM/PM or HH:MM 24-hour format (e.g., '9:00 PM' or '21:00')").optional(),
    isAvailable: z.boolean().optional(),
  }),
});

const getAvailabilityQueryValidationSchema = z.object({
  query: z.object({
    day: z.enum(["SATURDAY", "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]).optional(),
    isAvailable: z.enum(["true", "false"]).optional(),
    tutorId: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});

export const AvailabilityValidation = {
  createAvailabilityValidationSchema,
  updateAvailabilityValidationSchema,
  getAvailabilityQueryValidationSchema,
};
