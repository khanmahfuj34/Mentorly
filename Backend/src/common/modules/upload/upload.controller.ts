import { Request, Response } from "express";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";
import { UploadService } from "./upload.service";

const uploadImage = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new Error("No file provided");
  }

  const result = await UploadService.uploadImage(req.file);

  sendResponse(
    res,
    200,
    true,
    "Image uploaded successfully",
    result
  );
});

export const UploadController = {
  uploadImage,
};