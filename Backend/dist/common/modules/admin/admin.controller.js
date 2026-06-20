"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("./admin.service");
const catchAsync_1 = require("../../helpers/catchAsync");
const sendResponse_1 = require("../../helpers/sendResponse");
const getPendingTutors = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await admin_service_1.AdminService.getPendingTutors(req.query);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Pending tutors retrieved successfully", result.data, result.meta);
});
const getApprovedTutors = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await admin_service_1.AdminService.getApprovedTutors(req.query);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Approved tutors retrieved successfully", result.data, result.meta);
});
const approveTutor = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await admin_service_1.AdminService.approveTutor(id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Tutor profile approved successfully", result);
});
const rejectTutor = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await admin_service_1.AdminService.rejectTutor(id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Tutor profile rejected (unapproved) successfully", result);
});
const getDashboardStats = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await admin_service_1.AdminService.getDashboardStats();
    (0, sendResponse_1.sendResponse)(res, 200, true, "Admin dashboard statistics retrieved successfully", result);
});
exports.AdminController = {
    getPendingTutors,
    getApprovedTutors,
    approveTutor,
    rejectTutor,
    getDashboardStats,
};
