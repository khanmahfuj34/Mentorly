import { z } from "zod";

const createReviewValidationSchema = z.object({
  body: z.object({
    bookingId: z.string(),
    rating: z
      .number()
      .int()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5"),
    comment: z.string().optional(),
  }),
});

export const ReviewValidation = {
  createReviewValidationSchema,
};
