"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityController = void 0;
const availability_service_1 = require("./availability.service");
const catchAsync_1 = require("../../helpers/catchAsync");
const sendResponse_1 = require("../../helpers/sendResponse");
const createAvailability = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const result = await availability_service_1.AvailabilityService.createAvailability(userId, req.body);
    (0, sendResponse_1.sendResponse)(res, 201, true, "Availability created successfully", result);
});
const updateAvailability = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const id = req.params.id;
    const result = await availability_service_1.AvailabilityService.updateAvailability(userId, id, req.body);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Availability updated successfully", result);
});
const deleteAvailability = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const id = req.params.id;
    const result = await availability_service_1.AvailabilityService.deleteAvailability(userId, id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Availability deleted successfully", result);
});
const getMySchedule = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const result = await availability_service_1.AvailabilityService.getMySchedule(userId, req.query);
    (0, sendResponse_1.sendResponse)(res, 200, true, "My schedule retrieved successfully", result.data, result.meta);
});
const getTutorSchedule = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const tutorId = req.params.tutorId;
    const result = await availability_service_1.AvailabilityService.getTutorSchedule(tutorId, req.query);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Tutor schedule retrieved successfully", result.data, result.meta);
});
const getSingleAvailability = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await availability_service_1.AvailabilityService.getSingleAvailability(id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Availability details retrieved successfully", result);
});
exports.AvailabilityController = {
    createAvailability,
    updateAvailability,
    deleteAvailability,
    getMySchedule,
    getTutorSchedule,
    getSingleAvailability,
};
