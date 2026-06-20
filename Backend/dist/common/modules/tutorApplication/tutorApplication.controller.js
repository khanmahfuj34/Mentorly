"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorApplicationController = void 0;
const tutorApplication_service_1 = require("./tutorApplication.service");
const catchAsync_1 = require("../../helpers/catchAsync");
const sendResponse_1 = require("../../helpers/sendResponse");
const applyToTuitionRequest = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const tutorId = req.user.userId;
    const tuitionRequestId = req.params.tuitionRequestId;
    const result = await tutorApplication_service_1.TutorApplicationService.applyToTuitionRequest(tutorId, tuitionRequestId, req.body);
    (0, sendResponse_1.sendResponse)(res, 201, true, "Tutor application submitted successfully", result);
});
const getMyApplications = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const tutorId = req.user.userId;
    const result = await tutorApplication_service_1.TutorApplicationService.getMyApplications(tutorId);
    (0, sendResponse_1.sendResponse)(res, 200, true, "My tutor applications retrieved successfully", result);
});
const getApplicationsByTuitionRequest = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const tuitionRequestId = req.params.tuitionRequestId;
    const result = await tutorApplication_service_1.TutorApplicationService.getApplicationsByTuitionRequest(userId, tuitionRequestId);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Tutor applications for the tuition request retrieved successfully", result);
});
const acceptApplication = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const id = req.params.id;
    const result = await tutorApplication_service_1.TutorApplicationService.acceptApplication(userId, id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Tutor application accepted successfully", result);
});
const rejectApplication = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const id = req.params.id;
    const result = await tutorApplication_service_1.TutorApplicationService.rejectApplication(userId, id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Tutor application rejected successfully", result);
});
exports.TutorApplicationController = {
    applyToTuitionRequest,
    getMyApplications,
    getApplicationsByTuitionRequest,
    acceptApplication,
    rejectApplication,
};
