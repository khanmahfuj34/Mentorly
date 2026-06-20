"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSearchableFields = exports.bookingFilterableFields = exports.bookingStatuses = exports.BOOKING_STATUS = void 0;
exports.BOOKING_STATUS = {
    PENDING: "PENDING",
    ACTIVE: "ACTIVE",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
};
exports.bookingStatuses = ["PENDING", "ACTIVE", "COMPLETED", "CANCELLED"];
exports.bookingFilterableFields = ["status", "studentId", "tutorId", "tuitionRequestId"];
exports.bookingSearchableFields = ["status"];
