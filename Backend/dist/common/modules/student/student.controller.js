"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const student_service_1 = require("./student.service");
const catchAsync_1 = require("../../helpers/catchAsync");
const sendResponse_1 = require("../../helpers/sendResponse");
const createProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const result = await student_service_1.StudentService.createProfile(userId, req.body);
    (0, sendResponse_1.sendResponse)(res, 201, true, "Student profile created successfully", result);
});
const getMyProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const result = await student_service_1.StudentService.getMyProfile(userId);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Student profile retrieved successfully", result);
});
const updateProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const result = await student_service_1.StudentService.updateProfile(userId, req.body);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Student profile updated successfully", result);
});
exports.StudentController = {
    createProfile,
    getMyProfile,
    updateProfile,
};
