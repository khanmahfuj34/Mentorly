"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorService = void 0;
const prisma_1 = require("../../../config/prisma");
const createProfile = async (userId, payload) => {
    const existingProfile = await prisma_1.prisma.tutorProfile.findUnique({
        where: {
            userId,
        },
    });
    if (existingProfile) {
        throw new Error("Tutor profile already exists for this user");
    }
    const profile = await prisma_1.prisma.tutorProfile.create({
        data: {
            userId,
            ...payload,
        },
    });
    return profile;
};
const getMyProfile = async (userId) => {
    const profile = await prisma_1.prisma.tutorProfile.findUnique({
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
        throw new Error("Tutor profile not found");
    }
    return profile;
};
const updateProfile = async (userId, payload) => {
    const existingProfile = await prisma_1.prisma.tutorProfile.findUnique({
        where: {
            userId,
        },
    });
    if (!existingProfile) {
        throw new Error("Tutor profile not found");
    }
    const updatedProfile = await prisma_1.prisma.tutorProfile.update({
        where: {
            userId,
        },
        data: payload,
    });
    return updatedProfile;
};
exports.TutorService = {
    createProfile,
    getMyProfile,
    updateProfile,
};
