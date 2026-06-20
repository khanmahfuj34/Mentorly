import { prisma } from "../../../config/prisma";
import { ITutorQueryFilters, IDashboardStats } from "./admin.interface";

const getTutorsHelper = async (filters: ITutorQueryFilters, forcePendingOnly = false) => {
  const {
    searchTerm,
    isApproved,
    district,
    area,
    page = "1",
    limit = "10",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  const parsedPage = Number(page) || 1;
  const parsedLimit = Number(limit) || 10;
  const skip = (parsedPage - 1) * parsedLimit;

  // Build where clause
  const where: any = {};

  // Handle approval status filtering
  if (forcePendingOnly) {
    where.isApproved = false;
  } else if (isApproved !== undefined) {
    where.isApproved = isApproved === "true";
  }

  // Handle location filters
  if (district) {
    where.district = { contains: district, mode: "insensitive" };
  }
  if (area) {
    where.area = { contains: area, mode: "insensitive" };
  }

  // Handle search term (searching profile bio, university, dept, or linked user name/email)
  if (searchTerm) {
    where.OR = [
      { bio: { contains: searchTerm, mode: "insensitive" } },
      { university: { contains: searchTerm, mode: "insensitive" } },
      { department: { contains: searchTerm, mode: "insensitive" } },
      { currentInstitution: { contains: searchTerm, mode: "insensitive" } },
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

  // Fetch tutor profiles and count
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

const getAllTutors = async (filters: ITutorQueryFilters) => {
  return getTutorsHelper(filters, false);
};

const getPendingTutors = async (filters: ITutorQueryFilters) => {
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
    openTuitionRequests,
    activeBookings,
  ] = await Promise.all([
    prisma.user.count({
      where: {
        role: "STUDENT",
      },
    }),
    prisma.user.count({
      where: {
        role: "TUTOR",
      },
    }),
    prisma.tutorProfile.count({
      where: {
        isApproved: true,
      },
    }),
    prisma.tutorProfile.count({
      where: {
        isApproved: false,
      },
    }),
    prisma.tuitionRequest.count({
      where: {
        status: "OPEN",
      },
    }),
    prisma.booking.count({
      where: {
        status: "ACTIVE",
      },
    }),
  ]);

  return {
    totalStudents,
    totalTutors,
    approvedTutors,
    pendingTutors,
    openTuitionRequests,
    activeBookings,
  };
};

export const AdminService = {
  getAllTutors,
  getPendingTutors,
  approveTutor,
  rejectTutor,
  getDashboardStats,
};
