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
    "Review created successfully",
    result
  );
});

const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const role = req.user.role;
  const id = req.params.id as string;
  const result = await ReviewService.getSingleReview(userId, role, id);

  sendResponse(
    res,
    200,
    true,
    "Review retrieved successfully",
    result
  );
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const role = req.user.role;
  const id = req.params.id as string;
  const result = await ReviewService.deleteReview(userId, role, id);

  sendResponse(
    res,
    200,
    true,
    "Review deleted successfully",
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
    result.data,
    result.meta
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
    result.data,
    result.meta
  );
});

export const ReviewController = {
  createReview,
  getSingleReview,
  deleteReview,
  getMyReviews,
  getTutorReviews,
};
