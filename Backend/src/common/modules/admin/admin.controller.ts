import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";

const getPendingTutors = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getPendingTutors(req.query);

  sendResponse(
    res,
    200,
    true,
    "Pending tutors retrieved successfully",
    result.data,
    result.meta
  );
});

const getApprovedTutors = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getApprovedTutors(req.query);

  sendResponse(
    res,
    200,
    true,
    "Approved tutors retrieved successfully",
    result.data,
    result.meta
  );
});

const approveTutor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await AdminService.approveTutor(id);

  sendResponse(
    res,
    200,
    true,
    "Tutor profile approved successfully",
    result
  );
});

const rejectTutor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await AdminService.rejectTutor(id);

  sendResponse(
    res,
    200,
    true,
    "Tutor profile rejected (unapproved) successfully",
    result
  );
});

const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getDashboardStats();

  sendResponse(
    res,
    200,
    true,
    "Admin dashboard statistics retrieved successfully",
    result
  );
});

export const AdminController = {
  getPendingTutors,
  getApprovedTutors,
  approveTutor,
  rejectTutor,
  getDashboardStats,
};
