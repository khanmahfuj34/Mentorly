import { z } from "zod";

export const createTutorProfileValidationSchema = z.object({
    body: z.object({
        bio: z.string().optional(),
        university: z.string().optional(),
        department: z.string().optional(),
        experienceYears: z.number().int().nonnegative().optional(),
        hourlyRate: z.number().nonnegative().optional(),
        teachingSubjects: z.array(z.string()).optional(),
        district: z.string().optional(),
        area: z.string().optional(),
    }),
});

export const updateTutorProfileValidationSchema = z.object({
    body: z.object({
        bio: z.string().optional(),
        university: z.string().optional(),
        department: z.string().optional(),
        experienceYears: z.number().int().nonnegative().optional(),
        hourlyRate: z.number().nonnegative().optional(),
        teachingSubjects: z.array(z.string()).optional(),
        district: z.string().optional(),
        area: z.string().optional(),
    }),
});
