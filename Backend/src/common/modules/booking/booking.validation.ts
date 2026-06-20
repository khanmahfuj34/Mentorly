import { z } from "zod";
import { bookingStatuses } from "./booking.constant";

const getMyBookingsQueryValidationSchema = z.object({
  query: z.object({
    status: z.enum(bookingStatuses).optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});

export const BookingValidation = {
  getMyBookingsQueryValidationSchema,
};
