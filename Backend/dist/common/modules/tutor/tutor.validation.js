"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTutorProfileValidationSchema = exports.createTutorProfileValidationSchema = void 0;
const zod_1 = require("zod");
exports.createTutorProfileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        bio: zod_1.z.string().optional(),
        university: zod_1.z.string().optional(),
        department: zod_1.z.string().optional(),
        experienceYears: zod_1.z.number().int().nonnegative().optional(),
        hourlyRate: zod_1.z.number().nonnegative().optional(),
        teachingSubjects: zod_1.z.array(zod_1.z.string()).optional(),
        district: zod_1.z.string().optional(),
        area: zod_1.z.string().optional(),
    }),
});
exports.updateTutorProfileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        bio: zod_1.z.string().optional(),
        university: zod_1.z.string().optional(),
        department: zod_1.z.string().optional(),
        experienceYears: zod_1.z.number().int().nonnegative().optional(),
        hourlyRate: zod_1.z.number().nonnegative().optional(),
        teachingSubjects: zod_1.z.array(zod_1.z.string()).optional(),
        district: zod_1.z.string().optional(),
        area: zod_1.z.string().optional(),
    }),
});
