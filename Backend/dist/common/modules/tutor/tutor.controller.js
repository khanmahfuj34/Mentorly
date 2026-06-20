"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorController = void 0;
const tutor_service_1 = require("./tutor.service");
const catchAsync_1 = require("../../helpers/catchAsync");
const sendResponse_1 = require("../../helpers/sendResponse");
const createProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const result = await tutor_service_1.TutorService.createProfile(userId, req.body);
    (0, sendResponse_1.sendResponse)(res, 201, true, "Tutor profile created successfully", result);
});
const getMyProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const result = await tutor_service_1.TutorService.getMyProfile(userId);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Tutor profile retrieved successfully", result);
});
const updateProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const result = await tutor_service_1.TutorService.updateProfile(userId, req.body);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Tutor profile updated successfully", result);
});
exports.TutorController = {
    createProfile,
    getMyProfile,
    updateProfile,
};
