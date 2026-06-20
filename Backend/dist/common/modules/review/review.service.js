"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const prisma_1 = require("../../../config/prisma");
const createReview = async (userId, payload) => {
    const { bookingId, rating, comment } = payload;
    // 1. Fetch booking
    const booking = await prisma_1.prisma.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
    if (!booking) {
        throw new Error("Booking not found");
    }
    // 2. Access control: Only booking owner student can submit review
    if (booking.studentId !== userId) {
        throw new Error("You are not authorized to submit a review for this booking");
    }
    // 3. Verify booking is COMPLETED
    if (booking.status !== "COMPLETED") {
        throw new Error("Review can only be submitted for completed bookings");
    }
    // 4. Verify no existing review for this booking (one review per booking)
    const existingReview = await prisma_1.prisma.review.findUnique({
        where: {
            bookingId,
        },
    });
    if (existingReview) {
        throw new Error("A review has already been submitted for this booking");
    }
    // 5. Execute transaction to create review and update tutor profile stats
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        // a. Create review
        const newReview = await tx.review.create({
            data: {
                bookingId,
                studentId: booking.studentId,
                tutorId: booking.tutorId,
                rating,
                comment,
            },
        });
        // b. Recalculate average rating and total reviews for the tutor
        const stats = await tx.review.aggregate({
            _avg: {
                rating: true,
            },
            _count: {
                id: true,
            },
            where: {
                tutorId: booking.tutorId,
            },
        });
        // c. Update TutorProfile
        await tx.tutorProfile.update({
            where: {
                userId: booking.tutorId,
            },
            data: {
                rating: stats._avg.rating || 0,
                totalReviews: stats._count.id || 0,
            },
        });
        return newReview;
    });
    return result;
};
const getSingleReview = async (userId, role, reviewId) => {
    const review = await prisma_1.prisma.review.findUnique({
        where: {
            id: reviewId,
        },
        include: {
            student: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    studentProfile: true,
                },
            },
            tutor: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    tutorProfile: true,
                },
            },
            booking: true,
        },
    });
    if (!review) {
        throw new Error("Review not found");
    }
    // Access Control: Student owner, Tutor recipient, or Admin
    if (role !== "ADMIN" && review.studentId !== userId && review.tutorId !== userId) {
        throw new Error("You are not authorized to view this review");
    }
    return review;
};
const deleteReview = async (userId, role, reviewId) => {
    // 1. Fetch review
    const review = await prisma_1.prisma.review.findUnique({
        where: {
            id: reviewId,
        },
    });
    if (!review) {
        throw new Error("Review not found");
    }
    // 2. Access control: Only the student who wrote the review (or Admin) can delete it
    if (role !== "ADMIN" && review.studentId !== userId) {
        throw new Error("You are not authorized to delete this review");
    }
    // 3. Execute transaction to delete review and update tutor profile stats
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        // a. Delete review
        const deletedReview = await tx.review.delete({
            where: {
                id: reviewId,
            },
        });
        // b. Recalculate average rating and total reviews for the tutor
        const stats = await tx.review.aggregate({
            _avg: {
                rating: true,
            },
            _count: {
                id: true,
            },
            where: {
                tutorId: review.tutorId,
            },
        });
        // c. Update TutorProfile
        await tx.tutorProfile.update({
            where: {
                userId: review.tutorId,
            },
            data: {
                rating: stats._avg.rating || 0,
                totalReviews: stats._count.id || 0,
            },
        });
        return deletedReview;
    });
    return result;
};
const getMyReviews = async (userId, role, query) => {
    const { page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc" } = query;
    const allowedSortFields = ["createdAt", "rating"];
    if (sortBy && !allowedSortFields.includes(sortBy)) {
        throw new Error(`Sorting by '${sortBy}' is not allowed`);
    }
    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 10;
    const skip = (parsedPage - 1) * parsedLimit;
    // Build query where clause based on user role
    const where = {};
    if (role === "STUDENT") {
        where.studentId = userId;
    }
    else if (role === "TUTOR") {
        where.tutorId = userId;
    }
    else {
        throw new Error("You are not authorized to view reviews");
    }
    const [reviews, total] = await Promise.all([
        prisma_1.prisma.review.findMany({
            where,
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                tutor: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                booking: true,
            },
            orderBy: {
                [sortBy]: sortOrder,
            },
            skip,
            take: parsedLimit,
        }),
        prisma_1.prisma.review.count({ where }),
    ]);
    return {
        meta: {
            page: parsedPage,
            limit: parsedLimit,
            total,
        },
        data: reviews,
    };
};
const getTutorReviews = async (tutorId, query) => {
    const { page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc" } = query;
    const allowedSortFields = ["createdAt", "rating"];
    if (sortBy && !allowedSortFields.includes(sortBy)) {
        throw new Error(`Sorting by '${sortBy}' is not allowed`);
    }
    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 10;
    const skip = (parsedPage - 1) * parsedLimit;
    const [reviews, total] = await Promise.all([
        prisma_1.prisma.review.findMany({
            where: {
                tutorId,
            },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        studentProfile: true,
                    },
                },
            },
            orderBy: {
                [sortBy]: sortOrder,
            },
            skip,
            take: parsedLimit,
        }),
        prisma_1.prisma.review.count({
            where: {
                tutorId,
            },
        }),
    ]);
    return {
        meta: {
            page: parsedPage,
            limit: parsedLimit,
            total,
        },
        data: reviews,
    };
};
exports.ReviewService = {
    createReview,
    getSingleReview,
    deleteReview,
    getMyReviews,
    getTutorReviews,
};
