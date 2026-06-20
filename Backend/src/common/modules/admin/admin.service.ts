import { prisma } from "../../../config/prisma";
import { ITutorQueryFilters, IDashboardStats } from "./admin.interface";

const getTutorsHelper = async (filters: ITutorQueryFilters, isApprovedStatus: boolean) => {
  const {
    searchTerm,
    page = "1",
    limit = "10",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  const parsedPage = Number(page) || 1;
  const parsedLimit = Number(limit) || 10;
  const skip = (parsedPage - 1) * parsedLimit;

  // Build where clause
  const where: any = {
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
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: parsedLimit,
    }),
    prisma.tutorProfile.count({ where }),
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

const getPendingTutors = async (filters: ITutorQueryFilters) => {
  return getTutorsHelper(filters, false);
};

const getApprovedTutors = async (filters: ITutorQueryFilters) => {
  return getTutorsHelper(filters, true);
};

const approveTutor = async (profileId: string) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: {
      id: profileId,
    },
  });

  if (!profile) {
    throw new Error("Tutor profile not found");
  }

  const result = await prisma.tutorProfile.update({
    where: {
      id: profileId,
    },
    data: {
      isApproved: true,
    },
  });

  return result;
};

const rejectTutor = async (profileId: string) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: {
      id: profileId,
    },
  });

  if (!profile) {
    throw new Error("Tutor profile not found");
  }

  const result = await prisma.tutorProfile.update({
    where: {
      id: profileId,
    },
    data: {
      isApproved: false,
    },
  });

  return result;
};

const getDashboardStats = async (): Promise<IDashboardStats> => {
  const [
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
  ] = await Promise.all([
    // User stats
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.user.count({ where: { role: "TUTOR" } }),
    // Tutor profile stats
    prisma.tutorProfile.count({ where: { isApproved: true } }),
    prisma.tutorProfile.count({ where: { isApproved: false } }),
    // Tuition Request stats
    prisma.tuitionRequest.count(),
    prisma.tuitionRequest.count({ where: { status: "OPEN" } }),
    prisma.tuitionRequest.count({ where: { status: "ASSIGNED" } }),
    // Booking stats
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "ACTIVE" } }),
    prisma.booking.count({ where: { status: "COMPLETED" } }),
    // Review stats
    prisma.review.count(),
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

export const AdminService = {
  getPendingTutors,
  getApprovedTutors,
  approveTutor,
  rejectTutor,
  getDashboardStats,
};
