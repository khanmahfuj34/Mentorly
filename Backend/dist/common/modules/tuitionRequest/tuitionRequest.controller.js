"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuitionRequestController = void 0;
const tuitionRequest_service_1 = require("./tuitionRequest.service");
const catchAsync_1 = require("../../helpers/catchAsync");
const sendResponse_1 = require("../../helpers/sendResponse");
const createTuitionRequest = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const result = await tuitionRequest_service_1.TuitionRequestService.createTuitionRequest(userId, req.body);
    (0, sendResponse_1.sendResponse)(res, 201, true, "Tuition request created successfully", result);
});
const getMyTuitionRequests = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const result = await tuitionRequest_service_1.TuitionRequestService.getMyTuitionRequests(userId);
    (0, sendResponse_1.sendResponse)(res, 200, true, "My tuition requests retrieved successfully", result);
});
const getSingleTuitionRequest = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const result = await tuitionRequest_service_1.TuitionRequestService.getSingleTuitionRequest(id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Tuition request retrieved successfully", result);
});
const updateTuitionRequest = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const userId = req.user.userId;
    const result = await tuitionRequest_service_1.TuitionRequestService.updateTuitionRequest(id, userId, req.body);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Tuition request updated successfully", result);
});
const deleteTuitionRequest = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = req.params.id;
    const userId = req.user.userId;
    const result = await tuitionRequest_service_1.TuitionRequestService.deleteTuitionRequest(id, userId);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Tuition request deleted successfully", result);
});
exports.TuitionRequestController = {
    createTuitionRequest,
    getMyTuitionRequests,
    getSingleTuitionRequest,
    updateTuitionRequest,
    deleteTuitionRequest,
};
