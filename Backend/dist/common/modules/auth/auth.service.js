"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../../config/prisma");
const jwt_1 = require("../../utilis/jwt");
const registerUser = async (payload) => {
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt_1.default.hash(payload.password, 10);
    const user = await prisma_1.prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            role: payload.role || "STUDENT",
        },
    });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
const loginUser = async (payload) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordMatched = await bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Invalid credentials");
    }
    const accessToken = (0, jwt_1.generateToken)({
        userId: user.id,
        email: user.email,
        role: user.role,
    }, process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_EXPIRES_IN || "15m");
    const refreshToken = (0, jwt_1.generateToken)({
        userId: user.id,
        email: user.email,
        role: user.role,
    }, process.env.JWT_REFRESH_SECRET, process.env.JWT_REFRESH_EXPIRES_IN || "30d");
    const { password, ...userWithoutPassword } = user;
    return {
        accessToken,
        refreshToken,
        user: userWithoutPassword
    };
};
const refreshToken = async (token) => {
    let decodedData;
    try {
        decodedData = (0, jwt_1.verifyToken)(token, process.env.JWT_REFRESH_SECRET);
    }
    catch (err) {
        throw new Error("Invalid Refresh Token");
    }
    const { email } = decodedData;
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new Error("User does not exist");
    }
    if (user.isBlocked) {
        throw new Error("User is blocked");
    }
    const accessToken = (0, jwt_1.generateToken)({
        userId: user.id,
        email: user.email,
        role: user.role,
    }, process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_EXPIRES_IN || "15m");
    return {
        accessToken,
    };
};
exports.AuthService = {
    registerUser,
    loginUser,
    refreshToken,
};
