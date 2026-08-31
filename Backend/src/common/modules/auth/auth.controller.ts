import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";

const register = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.registerUser(req.body);

    sendResponse(
        res,
        201,
        true,
        "User registered successfully",
        result
    );
});

const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body);

    sendResponse(
        res,
        200,
        true,
        "Login successful",
        result
    );
});
const getMe = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        data: req.user,
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const result = await AuthService.refreshToken(
        req.body.refreshToken
    );

    sendResponse(
        res,
        200,
        true,
        "Access token generated successfully",
        result
    );
});

const logout = catchAsync(async (req, res) => {
    sendResponse(
        res,
        200,
        true,
        "Logout successful",
        null
    );
});

const updateAccount = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const result = await AuthService.updateAccount(userId, req.body);

    sendResponse(
        res,
        200,
        true,
        "Account details updated successfully",
        result
    );
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const result = await AuthService.changePassword(userId, req.body);

    sendResponse(
        res,
        200,
        true,
        "Password changed successfully",
        result
    );
});

const deleteAccount = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const result = await AuthService.deleteAccount(userId);

    sendResponse(
        res,
        200,
        true,
        "Account deleted successfully",
        result
    );
});

export const AuthController = {
    register,
    login,
    getMe,
    refreshToken,
    logout,
    updateAccount,
    changePassword,
    deleteAccount,
};