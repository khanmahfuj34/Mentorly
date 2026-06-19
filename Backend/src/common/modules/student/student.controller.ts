import { Request, Response } from "express";
import { StudentService } from "./student.service";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";

const createProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await StudentService.createProfile(userId, req.body);

  sendResponse(res, 201, true, "Student profile created successfully", result);
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await StudentService.getMyProfile(userId);

  sendResponse(res, 200, true, "Student profile retrieved successfully", result);
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await StudentService.updateProfile(userId, req.body);

  sendResponse(res, 200, true, "Student profile updated successfully", result);
});

export const StudentController = {
  createProfile,
  getMyProfile,
  updateProfile,
};
