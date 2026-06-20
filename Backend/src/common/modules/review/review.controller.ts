import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await ReviewService.createReview(userId, req.body);

  sendResponse(
    res,
    201,
    true,
    "Review submitted successfully",
    result
  );
});

const getTutorReviews = catchAsync(async (req: Request, res: Response) => {
  const tutorId = req.params.tutorId as string;
  const result = await ReviewService.getTutorReviews(tutorId, req.query);

  sendResponse(
    res,
    200,
    true,
    "Tutor reviews retrieved successfully",
    result
  );
});

const getMyReviews = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const role = req.user.role;
  const result = await ReviewService.getMyReviews(userId, role, req.query);

  sendResponse(
    res,
    200,
    true,
    "My reviews retrieved successfully",
    result
  );
});

export const ReviewController = {
  createReview,
  getTutorReviews,
  getMyReviews,
};
