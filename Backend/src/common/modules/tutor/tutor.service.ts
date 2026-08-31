import { prisma } from "../../../config/prisma";
import { ITutorProfileCreateInput, ITutorProfileUpdateInput, ITutorQueryFilters } from "./tutor.interface";

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

const getTutorProfileById = async (tutorId: string) => {
    const profile = await prisma.tutorProfile.findFirst({
        where: {
            OR: [
                { id: tutorId },
                { userId: tutorId },
            ],
            user: {
                isBlocked: false,
            },
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

const getAllTutors = async (filters: ITutorQueryFilters) => {
    const {
        searchTerm,
        district,
        area,
        subject,
        classLevel,
        medium,
        minSalary,
        maxSalary,
        experienceYears,
        page = "1",
        limit = "10",
        sortBy = "createdAt",
        sortOrder = "desc",
    } = filters;

    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 10;
    const skip = (parsedPage - 1) * parsedLimit;

    // Filter for active, non-blocked tutor profiles
    const where: any = {
        user: {
            isBlocked: false,
        },
    };

    if (district) {
        where.district = { equals: String(district), mode: "insensitive" };
    }

    if (area) {
        where.area = { equals: String(area), mode: "insensitive" };
    }

    if (subject) {
        where.teachingSubjects = { has: String(subject) };
    }

    if (classLevel) {
        where.preferredClasses = { has: String(classLevel) };
    }

    if (medium) {
        where.medium = { has: String(medium) };
    }

    if (experienceYears) {
        where.experienceYears = { gte: Number(experienceYears) };
    }

    if (minSalary || maxSalary) {
        where.hourlyRate = {};
        if (minSalary) {
            where.hourlyRate.gte = Number(minSalary);
        }
        if (maxSalary) {
            where.hourlyRate.lte = Number(maxSalary);
        }
    }

    if (searchTerm) {
        where.OR = [
            { university: { contains: String(searchTerm), mode: "insensitive" } },
            { department: { contains: String(searchTerm), mode: "insensitive" } },
            { currentInstitution: { contains: String(searchTerm), mode: "insensitive" } },
            { bio: { contains: String(searchTerm), mode: "insensitive" } },
            { district: { contains: String(searchTerm), mode: "insensitive" } },
            { area: { contains: String(searchTerm), mode: "insensitive" } },
            {
                user: {
                    name: { contains: String(searchTerm), mode: "insensitive" },
                },
            },
        ];
    }

    const orderCondition: any = {};
    if (sortBy === "hourlyRate") {
        orderCondition.hourlyRate = sortOrder;
    } else if (sortBy === "experienceYears") {
        orderCondition.experienceYears = sortOrder;
    } else if (sortBy === "rating") {
        orderCondition.rating = sortOrder;
    } else {
        orderCondition.createdAt = sortOrder;
    }

    const [tutors, total] = await Promise.all([
        prisma.tutorProfile.findMany({
            where,
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
            orderBy: orderCondition,
            skip,
            take: parsedLimit,
        }),
        prisma.tutorProfile.count({ where }),
    ]);

    const totalPage = Math.ceil(total / parsedLimit);

    return {
        meta: {
            page: parsedPage,
            limit: parsedLimit,
            total,
            totalPage,
        },
        data: tutors,
    };
};

export const TutorService = {
    createProfile,
    getMyProfile,
    updateProfile,
    getTutorProfileById,
    getAllTutors,
};

