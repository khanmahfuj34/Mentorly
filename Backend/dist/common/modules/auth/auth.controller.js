"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const catchAsync_1 = require("../../helpers/catchAsync");
const sendResponse_1 = require("../../helpers/sendResponse");
const register = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await auth_service_1.AuthService.registerUser(req.body);
    (0, sendResponse_1.sendResponse)(res, 201, true, "User registered successfully", result);
});
const login = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await auth_service_1.AuthService.loginUser(req.body);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Login successful", result);
});
const getMe = (0, catchAsync_1.catchAsync)(async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
    });
});
const refreshToken = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await auth_service_1.AuthService.refreshToken(req.body.refreshToken);
    (0, sendResponse_1.sendResponse)(res, 200, true, "Access token generated successfully", result);
});
const logout = (0, catchAsync_1.catchAsync)(async (req, res) => {
    (0, sendResponse_1.sendResponse)(res, 200, true, "Logout successful", null);
});
exports.AuthController = {
    register,
    login,
    getMe,
    refreshToken,
    logout,
};
