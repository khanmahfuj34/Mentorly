import { z } from "zod";

const getTutorsQueryValidationSchema = z.object({
  query: z.object({
    searchTerm: z.string().optional(),
    isApproved: z.string().optional(),
    district: z.string().optional(),
    area: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});

export const AdminValidation = {
  getTutorsQueryValidationSchema,
};
