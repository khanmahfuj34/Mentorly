"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityValidation = void 0;
const zod_1 = require("zod");
const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s*(?:AM|PM|am|pm)$|^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
const createAvailabilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        day: zod_1.z.enum(["SATURDAY", "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], {
            message: "day must be a valid day of the week",
        }),
        startTime: zod_1.z.string({
            message: "startTime is required",
        }).regex(timeRegex, "Invalid startTime format. Use HH:MM AM/PM or HH:MM 24-hour format (e.g., '6:00 PM' or '18:00')"),
        endTime: zod_1.z.string({
            message: "endTime is required",
        }).regex(timeRegex, "Invalid endTime format. Use HH:MM AM/PM or HH:MM 24-hour format (e.g., '9:00 PM' or '21:00')"),
        isAvailable: zod_1.z.boolean().optional(),
    }),
});
const updateAvailabilityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        day: zod_1.z.enum(["SATURDAY", "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]).optional(),
        startTime: zod_1.z.string().regex(timeRegex, "Invalid startTime format. Use HH:MM AM/PM or HH:MM 24-hour format (e.g., '6:00 PM' or '18:00')").optional(),
        endTime: zod_1.z.string().regex(timeRegex, "Invalid endTime format. Use HH:MM AM/PM or HH:MM 24-hour format (e.g., '9:00 PM' or '21:00')").optional(),
        isAvailable: zod_1.z.boolean().optional(),
    }),
});
const getAvailabilityQueryValidationSchema = zod_1.z.object({
    query: zod_1.z.object({
        day: zod_1.z.enum(["SATURDAY", "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]).optional(),
        isAvailable: zod_1.z.enum(["true", "false"]).optional(),
        tutorId: zod_1.z.string().optional(),
        page: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional(),
        sortBy: zod_1.z.string().optional(),
        sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
    }),
});
exports.AvailabilityValidation = {
    createAvailabilityValidationSchema,
    updateAvailabilityValidationSchema,
    getAvailabilityQueryValidationSchema,
};
