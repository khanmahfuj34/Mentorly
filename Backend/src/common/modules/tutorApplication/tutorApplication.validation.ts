import { z } from "zod";

const createTutorApplicationValidationSchema = z.object({
  body: z.object({
    coverLetter: z.string().max(2000, "Cover letter must not exceed 2000 characters").optional(),
  }),
});

export const TutorApplicationValidation = {
  createTutorApplicationValidationSchema,
};
