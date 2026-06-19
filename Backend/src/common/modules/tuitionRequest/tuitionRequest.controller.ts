import { Request, Response } from "express";
import { TuitionRequestService } from "./tuitionRequest.service";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";

const createTuitionRequest = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const result = await TuitionRequestService.createTuitionRequest(userId, req.body);

    sendResponse(res, 201, true, "Tuition request created successfully", result);
});

const getMyTuitionRequests = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const result = await TuitionRequestService.getMyTuitionRequests(userId);

    sendResponse(res, 200, true, "My tuition requests retrieved successfully", result);
});

const getSingleTuitionRequest = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await TuitionRequestService.getSingleTuitionRequest(id);

    sendResponse(res, 200, true, "Tuition request retrieved successfully", result);
});

const updateTuitionRequest = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user.userId;
    const result = await TuitionRequestService.updateTuitionRequest(id, userId, req.body);

    sendResponse(res, 200, true, "Tuition request updated successfully", result);
});

const deleteTuitionRequest = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user.userId;
    const result = await TuitionRequestService.deleteTuitionRequest(id, userId);

    sendResponse(res, 200, true, "Tuition request deleted successfully", result);
});

export const TuitionRequestController = {
    createTuitionRequest,
    getMyTuitionRequests,
    getSingleTuitionRequest,
    updateTuitionRequest,
    deleteTuitionRequest,
};
