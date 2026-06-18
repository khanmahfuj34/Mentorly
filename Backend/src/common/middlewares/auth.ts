import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized Access",
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET as string
        );

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token",
        });
    }
};