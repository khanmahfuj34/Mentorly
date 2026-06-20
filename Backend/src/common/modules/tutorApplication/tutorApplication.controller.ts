import { Request, Response } from "express";
import { TutorApplicationService } from "./tutorApplication.service";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";

const applyToTuitionRequest = catchAsync(async (req: Request, res: Response) => {
  const tutorId = req.user.userId;
  const tuitionRequestId = req.params.tuitionRequestId as string;
  const result = await TutorApplicationService.applyToTuitionRequest(
    tutorId,
    tuitionRequestId,
    req.body
  );

  sendResponse(
    res,
    201,
    true,
    "Tutor application submitted successfully",
    result
  );
});

const getMyApplications = catchAsync(async (req: Request, res: Response) => {
  const tutorId = req.user.userId;
  const result = await TutorApplicationService.getMyApplications(tutorId);

  sendResponse(
    res,
    200,
    true,
    "My tutor applications retrieved successfully",
    result
  );
});

const getApplicationsByTuitionRequest = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const tuitionRequestId = req.params.tuitionRequestId as string;
  const result = await TutorApplicationService.getApplicationsByTuitionRequest(
    userId,
    tuitionRequestId
  );

  sendResponse(
    res,
    200,
    true,
    "Tutor applications for the tuition request retrieved successfully",
    result
  );
});

const acceptApplication = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const id = req.params.id as string;
  const result = await TutorApplicationService.acceptApplication(userId, id);

  sendResponse(
    res,
    200,
    true,
    "Tutor application accepted successfully",
    result
  );
});

const rejectApplication = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const id = req.params.id as string;
  const result = await TutorApplicationService.rejectApplication(userId, id);

  sendResponse(
    res,
    200,
    true,
    "Tutor application rejected successfully",
    result
  );
});

export const TutorApplicationController = {
  applyToTuitionRequest,
  getMyApplications,
  getApplicationsByTuitionRequest,
  acceptApplication,
  rejectApplication,
};
