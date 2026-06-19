import { Request, Response } from "express";
import { TutorService } from "./tutor.service";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";

const createProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const result = await TutorService.createProfile(userId, req.body);

    sendResponse(res, 201, true, "Tutor profile created successfully", result);
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const result = await TutorService.getMyProfile(userId);

    sendResponse(res, 200, true, "Tutor profile retrieved successfully", result);
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const result = await TutorService.updateProfile(userId, req.body);

    sendResponse(res, 200, true, "Tutor profile updated successfully", result);
});

export const TutorController = {
    createProfile,
    getMyProfile,
    updateProfile,
};
