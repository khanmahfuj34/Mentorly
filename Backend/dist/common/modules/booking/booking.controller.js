"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const booking_service_1 = require("./booking.service");
const catchAsync_1 = require("../../helpers/catchAsync");
const sendResponse_1 = require("../../helpers/sendResponse");
const getMyBookings = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const role = req.user.role;
    const result = await booking_service_1.BookingService.getMyBookings(userId, role, req.query);
    (0, sendResponse_1.sendResponse)(res, 200, true, "My bookings retrieved successfully", result);
});
const getSingleBooking = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const role = req.user.role;
    const id = req.params.id;
    const result = await booking_service_1.BookingService.getSingleBooking(userId, role, id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Booking details retrieved successfully", result);
});
const cancelBooking = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const role = req.user.role;
    const id = req.params.id;
    const result = await booking_service_1.BookingService.cancelBooking(userId, role, id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Booking cancelled successfully", result);
});
const completeBooking = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const role = req.user.role;
    const id = req.params.id;
    const result = await booking_service_1.BookingService.completeBooking(userId, role, id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Booking completed successfully", result);
});
exports.BookingController = {
    getMyBookings,
    getSingleBooking,
    cancelBooking,
    completeBooking,
};
