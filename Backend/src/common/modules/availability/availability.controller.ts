import { Request, Response } from "express";
import { AvailabilityService } from "./availability.service";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";

const createAvailability = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await AvailabilityService.createAvailability(userId, req.body);

  sendResponse(
    res,
    201,
    true,
    "Availability created successfully",
    result
  );
});

const updateAvailability = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const id = req.params.id as string;
  const result = await AvailabilityService.updateAvailability(userId, id, req.body);

  sendResponse(
    res,
    200,
    true,
    "Availability updated successfully",
    result
  );
});

const deleteAvailability = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const id = req.params.id as string;
  const result = await AvailabilityService.deleteAvailability(userId, id);

  sendResponse(
    res,
    200,
    true,
    "Availability deleted successfully",
    result
  );
});

const getMySchedule = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await AvailabilityService.getMySchedule(userId, req.query);

  sendResponse(
    res,
    200,
    true,
    "My schedule retrieved successfully",
    result.data,
    result.meta
  );
});

const getTutorSchedule = catchAsync(async (req: Request, res: Response) => {
  const tutorId = req.params.tutorId as string;
  const result = await AvailabilityService.getTutorSchedule(tutorId, req.query);

  sendResponse(
    res,
    200,
    true,
    "Tutor schedule retrieved successfully",
    result.data,
    result.meta
  );
});

const getSingleAvailability = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await AvailabilityService.getSingleAvailability(id);

  sendResponse(
    res,
    200,
    true,
    "Availability details retrieved successfully",
    result
  );
});

export const AvailabilityController = {
  createAvailability,
  updateAvailability,
  deleteAvailability,
  getMySchedule,
  getTutorSchedule,
  getSingleAvailability,
};
