import { prisma } from "../../../config/prisma";
import { IReviewCreateInput, IReviewFilterRequest } from "./review.interface";

const createReview = async (userId: string, payload: IReviewCreateInput) => {
  const { bookingId, rating, comment } = payload;

  // 1. Fetch booking
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // 2. Access control: Only the student who made the booking can review it
  if (booking.studentId !== userId) {
    throw new Error("You are not authorized to review this booking");
  }

  // 3. Verify booking is COMPLETED
  if (booking.status !== "COMPLETED") {
    throw new Error("Review can only be submitted after the booking is completed");
  }

  // 4. Verify no existing review for this booking
  const existingReview = await prisma.review.findUnique({
    where: {
      bookingId,
    },
  });

  if (existingReview) {
    throw new Error("You have already submitted a review for this booking");
  }

  // 5. Run database transaction to create review and update tutor profile stats
  const result = await prisma.$transaction(async (tx) => {
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

    // b. Calculate new aggregate ratings for the tutor
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

    // c. Update the tutor profile with new stats
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

const getTutorReviews = async (tutorId: string, query: IReviewFilterRequest) => {
  const { page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc" } = query;

  const parsedPage = Number(page) || 1;
  const parsedLimit = Number(limit) || 10;
  const skip = (parsedPage - 1) * parsedLimit;

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
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
    prisma.review.count({
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

const getMyReviews = async (userId: string, role: string, query: IReviewFilterRequest) => {
  const { page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc" } = query;

  const parsedPage = Number(page) || 1;
  const parsedLimit = Number(limit) || 10;
  const skip = (parsedPage - 1) * parsedLimit;

  // Build query where clause based on user role
  const where: any = {};
  if (role === "STUDENT") {
    where.studentId = userId;
  } else if (role === "TUTOR") {
    where.tutorId = userId;
  } else {
    throw new Error("You are not authorized to view reviews");
  }

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
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
    prisma.review.count({ where }),
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

export const ReviewService = {
  createReview,
  getTutorReviews,
  getMyReviews,
};
