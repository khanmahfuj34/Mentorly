"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const booking_constant_1 = require("./booking.constant");
const getMyBookingsQueryValidationSchema = zod_1.z.object({
    query: zod_1.z.object({
        status: zod_1.z.enum(booking_constant_1.bookingStatuses).optional(),
        page: zod_1.z.string().optional(),
        limit: zod_1.z.string().optional(),
        sortBy: zod_1.z.string().optional(),
        sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
    }),
});
exports.BookingValidation = {
    getMyBookingsQueryValidationSchema,
};
