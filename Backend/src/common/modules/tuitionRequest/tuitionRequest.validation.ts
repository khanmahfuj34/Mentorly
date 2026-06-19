import { z } from "zod";
import { TuitionStatus } from "@prisma/client";

export const createTuitionRequestValidationSchema = z.object({
    body: z.object({
        subject: z.string({
            message: "Subject is required",
        }),
        classLevel: z.string({
            message: "Class level is required",
        }),
        medium: z.string().optional(),
        genderPreference: z.string().optional(),
        district: z.string({
            message: "District is required",
        }),
        area: z.string({
            message: "Area is required",
        }),
        salary: z.number({
            message: "Salary is required",
        }).nonnegative("Salary must be a non-negative number"),
        daysPerWeek: z.number({
            message: "Days per week is required",
        }).int().min(1, "Must be at least 1 day per week").max(7, "Cannot exceed 7 days per week"),
        description: z.string().optional(),
    }),
});

export const updateTuitionRequestValidationSchema = z.object({
    body: z.object({
        subject: z.string().optional(),
        classLevel: z.string().optional(),
        medium: z.string().optional(),
        genderPreference: z.string().optional(),
        district: z.string().optional(),
        area: z.string().optional(),
        salary: z.number().nonnegative("Salary must be a non-negative number").optional(),
        daysPerWeek: z.number().int().min(1).max(7).optional(),
        description: z.string().optional(),
        status: z.nativeEnum(TuitionStatus).optional(),
    }),
});
