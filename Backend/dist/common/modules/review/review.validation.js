"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        bookingId: zod_1.z.string().min(1, "Booking ID is required"),
        rating: zod_1.z
            .number()
            .int()
            .min(1, "Rating must be at least 1")
            .max(5, "Rating cannot be more than 5"),
        comment: zod_1.z.string().max(1000, "Comment cannot exceed 1000 characters").optional(),
    }),
});
const getReviewsQueryValidationSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional(),
        sortBy: zod_1.z.enum(["createdAt", "rating"]).optional(),
        sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
    }),
});
exports.ReviewValidation = {
    createReviewValidationSchema,
    getReviewsQueryValidationSchema,
};
