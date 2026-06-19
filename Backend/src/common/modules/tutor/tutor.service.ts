import { prisma } from "../../../config/prisma";
import { ITutorProfileCreateInput, ITutorProfileUpdateInput } from "./tutor.interface";

const createProfile = async (userId: string, payload: ITutorProfileCreateInput) => {
    const existingProfile = await prisma.tutorProfile.findUnique({
        where: {
            userId,
        },
    });

    if (existingProfile) {
        throw new Error("Tutor profile already exists for this user");
    }

    const profile = await prisma.tutorProfile.create({
        data: {
            userId,
            ...payload,
        },
    });

    return profile;
};

const getMyProfile = async (userId: string) => {
    const profile = await prisma.tutorProfile.findUnique({
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

const updateProfile = async (userId: string, payload: ITutorProfileUpdateInput) => {
    const existingProfile = await prisma.tutorProfile.findUnique({
        where: {
            userId,
        },
    });

    if (!existingProfile) {
        throw new Error("Tutor profile not found");
    }

    const updatedProfile = await prisma.tutorProfile.update({
        where: {
            userId,
        },
        data: payload,
    });

    return updatedProfile;
};

export const TutorService = {
    createProfile,
    getMyProfile,
    updateProfile,
};
