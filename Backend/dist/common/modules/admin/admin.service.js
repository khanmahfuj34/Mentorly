"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const prisma_1 = require("../../../config/prisma");
const getTutorsHelper = async (filters, isApprovedStatus) => {
    const { searchTerm, page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc", } = filters;
    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 10;
    const skip = (parsedPage - 1) * parsedLimit;
    // Build where clause
    const where = {
        isApproved: isApprovedStatus,
    };
    // Handle search term (searching user.name, user.email, university, or department)
    if (searchTerm) {
        where.OR = [
            { university: { contains: searchTerm, mode: "insensitive" } },
            { department: { contains: searchTerm, mode: "insensitive" } },
            {
                user: {
                    OR: [
                        { name: { contains: searchTerm, mode: "insensitive" } },
                        { email: { contains: searchTerm, mode: "insensitive" } },
                    ],
                },
            },
        ];
    }
    // Fetch tutor profiles and count in parallel
    const [tutors, total] = await Promise.all([
        prisma_1.prisma.tutorProfile.findMany({
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
            orderBy: {
                [sortBy]: sortOrder,
            },
            skip,
            take: parsedLimit,
        }),
        prisma_1.prisma.tutorProfile.count({ where }),
    ]);
    return {
        meta: {
            page: parsedPage,
            limit: parsedLimit,
            total,
        },
        data: tutors,
    };
};
const getPendingTutors = async (filters) => {
    return getTutorsHelper(filters, false);
};
const getApprovedTutors = async (filters) => {
    return getTutorsHelper(filters, true);
};
const approveTutor = async (profileId) => {
    const profile = await prisma_1.prisma.tutorProfile.findUnique({
        where: {
            id: profileId,
        },
    });
    if (!profile) {
        throw new Error("Tutor profile not found");
    }
    const result = await prisma_1.prisma.tutorProfile.update({
        where: {
            id: profileId,
        },
        data: {
            isApproved: true,
        },
    });
    return result;
};
const rejectTutor = async (profileId) => {
    const profile = await prisma_1.prisma.tutorProfile.findUnique({
        where: {
            id: profileId,
        },
    });
    if (!profile) {
        throw new Error("Tutor profile not found");
    }
    const result = await prisma_1.prisma.tutorProfile.update({
        where: {
            id: profileId,
        },
        data: {
            isApproved: false,
        },
    });
    return result;
};
const getDashboardStats = async () => {
    const [totalStudents, totalTutors, approvedTutors, pendingTutors, totalTuitionRequests, openTuitionRequests, assignedTuitionRequests, totalBookings, activeBookings, completedBookings, totalReviews,] = await Promise.all([
        // User stats
        prisma_1.prisma.user.count({ where: { role: "STUDENT" } }),
        prisma_1.prisma.user.count({ where: { role: "TUTOR" } }),
        // Tutor profile stats
        prisma_1.prisma.tutorProfile.count({ where: { isApproved: true } }),
        prisma_1.prisma.tutorProfile.count({ where: { isApproved: false } }),
        // Tuition Request stats
        prisma_1.prisma.tuitionRequest.count(),
        prisma_1.prisma.tuitionRequest.count({ where: { status: "OPEN" } }),
        prisma_1.prisma.tuitionRequest.count({ where: { status: "ASSIGNED" } }),
        // Booking stats
        prisma_1.prisma.booking.count(),
        prisma_1.prisma.booking.count({ where: { status: "ACTIVE" } }),
        prisma_1.prisma.booking.count({ where: { status: "COMPLETED" } }),
        // Review stats
        prisma_1.prisma.review.count(),
    ]);
    return {
        totalStudents,
        totalTutors,
        approvedTutors,
        pendingTutors,
        totalTuitionRequests,
        openTuitionRequests,
        assignedTuitionRequests,
        totalBookings,
        activeBookings,
        completedBookings,
        totalReviews,
    };
};
exports.AdminService = {
    getPendingTutors,
    getApprovedTutors,
    approveTutor,
    rejectTutor,
    getDashboardStats,
};
