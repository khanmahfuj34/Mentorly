import { z } from "zod";

export const registerSchema = z.object({
    body: z.object({
        name: z.string().min(3),
        email: z.email(),
        password: z.string().min(6),
        role: z.enum(["STUDENT", "TUTOR", "ADMIN"]).optional(),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.email(),
        password: z.string().min(6),
    }),
});