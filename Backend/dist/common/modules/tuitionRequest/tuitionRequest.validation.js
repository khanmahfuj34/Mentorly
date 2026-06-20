"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTuitionRequestValidationSchema = exports.createTuitionRequestValidationSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.createTuitionRequestValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        subject: zod_1.z.string({
            message: "Subject is required",
        }),
        classLevel: zod_1.z.string({
            message: "Class level is required",
        }),
        medium: zod_1.z.string().optional(),
        genderPreference: zod_1.z.string().optional(),
        district: zod_1.z.string({
            message: "District is required",
        }),
        area: zod_1.z.string({
            message: "Area is required",
        }),
        salary: zod_1.z.number({
            message: "Salary is required",
        }).nonnegative("Salary must be a non-negative number"),
        daysPerWeek: zod_1.z.number({
            message: "Days per week is required",
        }).int().min(1, "Must be at least 1 day per week").max(7, "Cannot exceed 7 days per week"),
        description: zod_1.z.string().optional(),
    }),
});
exports.updateTuitionRequestValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        subject: zod_1.z.string().optional(),
        classLevel: zod_1.z.string().optional(),
        medium: zod_1.z.string().optional(),
        genderPreference: zod_1.z.string().optional(),
        district: zod_1.z.string().optional(),
        area: zod_1.z.string().optional(),
        salary: zod_1.z.number().nonnegative("Salary must be a non-negative number").optional(),
        daysPerWeek: zod_1.z.number().int().min(1).max(7).optional(),
        description: zod_1.z.string().optional(),
        status: zod_1.z.nativeEnum(client_1.TuitionStatus).optional(),
    }),
});
