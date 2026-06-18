import { NextFunction, Request, Response } from "express";

export const roleGuard =
    (...roles: string[]) =>
        (req: Request, res: Response, next: NextFunction) => {
            const userRole = (req as any).user.role;

            if (!roles.includes(userRole)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden Access",
                });
            }

            next();
        };