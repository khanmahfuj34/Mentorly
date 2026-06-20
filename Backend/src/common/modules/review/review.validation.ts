import { z } from "zod";

const createReviewValidationSchema = z.object({
  body: z.object({
    bookingId: z.string().min(1, "Booking ID is required"),
    rating: z
      .number()
      .int()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be more than 5"),
    comment: z.string().max(1000, "Comment cannot exceed 1000 characters").optional(),
  }),
});

const getReviewsQueryValidationSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    sortBy: z.enum(["createdAt", "rating"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});

export const ReviewValidation = {
  createReviewValidationSchema,
  getReviewsQueryValidationSchema,
};
