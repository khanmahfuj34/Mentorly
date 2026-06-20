"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const prisma_1 = require("../../../config/prisma");
const createProfile = async (userId, payload) => {
    const existingProfile = await prisma_1.prisma.studentProfile.findUnique({
        where: {
            userId,
        },
    });
    if (existingProfile) {
        throw new Error("Student profile already exists for this user");
    }
    const profile = await prisma_1.prisma.studentProfile.create({
        data: {
            userId,
            ...payload,
        },
    });
    return profile;
};
const getMyProfile = async (userId) => {
    const profile = await prisma_1.prisma.studentProfile.findUnique({
        where: {
            userId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    isVerified: true,
                    isBlocked: true,
                },
            },
        },
    });
    if (!profile) {
        throw new Error("Student profile not found");
    }
    return profile;
};
const updateProfile = async (userId, payload) => {
    const existingProfile = await prisma_1.prisma.studentProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!existingProfile) {
        throw new Error("Student profile not found");
    }
    const updatedProfile = await prisma_1.prisma.studentProfile.update({
        where: {
            userId,
        },
        data: payload,
    });
    return updatedProfile;
};
exports.StudentService = {
    createProfile,
    getMyProfile,
    updateProfile,
};
