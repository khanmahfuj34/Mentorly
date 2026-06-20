import { Response } from "express";

export const sendResponse = (
    res: Response,
    statusCode: number,
    success: boolean,
    message: string,
    data?: unknown,
    meta?: unknown
) => {
    res.status(statusCode).json({
        success,
        message,
        meta,
        data,
    });
};