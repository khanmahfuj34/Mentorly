"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const review_service_1 = require("./review.service");
const catchAsync_1 = require("../../helpers/catchAsync");
const sendResponse_1 = require("../../helpers/sendResponse");
const createReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const result = await review_service_1.ReviewService.createReview(userId, req.body);
    (0, sendResponse_1.sendResponse)(res, 201, true, "Review created successfully", result);
});
const getSingleReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const role = req.user.role;
    const id = req.params.id;
    const result = await review_service_1.ReviewService.getSingleReview(userId, role, id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Review retrieved successfully", result);
});
const deleteReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const role = req.user.role;
    const id = req.params.id;
    const result = await review_service_1.ReviewService.deleteReview(userId, role, id);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Review deleted successfully", result);
});
const getMyReviews = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const role = req.user.role;
    const result = await review_service_1.ReviewService.getMyReviews(userId, role, req.query);
    (0, sendResponse_1.sendResponse)(res, 200, true, "My reviews retrieved successfully", result.data, result.meta);
});
const getTutorReviews = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const tutorId = req.params.tutorId;
    const result = await review_service_1.ReviewService.getTutorReviews(tutorId, req.query);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Tutor reviews retrieved successfully", result.data, result.meta);
});
exports.ReviewController = {
    createReview,
    getSingleReview,
    deleteReview,
    getMyReviews,
    getTutorReviews,
};
