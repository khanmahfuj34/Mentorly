import { z } from "zod";

export const createStudentProfileValidationSchema = z.object({
    body: z.object({
        classLevel: z.string().optional(),
        schoolCollege: z.string().optional(),
        preferredSubjects: z.array(z.string()).optional(),
        district: z.string().optional(),
        area: z.string().optional(),
        guardianName: z.string().optional(),
        guardianPhone: z.string().optional(),
    }),
});

export const updateStudentProfileValidationSchema = z.object({
    body: z.object({
        classLevel: z.string().optional(),
        schoolCollege: z.string().optional(),
        preferredSubjects: z.array(z.string()).optional(),
        district: z.string().optional(),
        area: z.string().optional(),
        guardianName: z.string().optional(),
        guardianPhone: z.string().optional(),
    }),
});
