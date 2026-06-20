import { prisma } from "../../../config/prisma";
import { IBookingFilterRequest } from "./booking.interface";

const getMyBookings = async (
  userId: string,
  role: string,
  filters: IBookingFilterRequest
) => {
  const { status, page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc" } = filters;

  const parsedPage = Number(page) || 1;
  const parsedLimit = Number(limit) || 10;
  const skip = (parsedPage - 1) * parsedLimit;

  // Build query where clause based on role
  const where: any = {};

  if (role === "STUDENT") {
    where.studentId = userId;
  } else if (role === "TUTOR") {
    where.tutorId = userId;
  } else {
    // If Admin or other roles, allow accessing all or no bookings. Here, we restrict to own bookings if they have a role, or allow all if ADMIN.
    // For safety, if not student or tutor, they can only view if they are ADMIN.
    if (role !== "ADMIN") {
      throw new Error("You are not authorized to view bookings");
    }
  }

  if (status) {
    where.status = status;
  }

  // Fetch bookings and total count in parallel
  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
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
        tuitionRequest: true,
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: parsedLimit,
    }),
    prisma.booking.count({ where }),
  ]);

  return {
    meta: {
      page: parsedPage,
      limit: parsedLimit,
      total,
    },
    data: bookings,
  };
};

const getSingleBooking = async (userId: string, role: string, bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
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
      tuitionRequest: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Access Control: Owner check (Student owner or Tutor owner or Admin)
  if (role !== "ADMIN" && booking.studentId !== userId && booking.tutorId !== userId) {
    throw new Error("You are not authorized to access this booking");
  }

  return booking;
};

const completeBooking = async (userId: string, role: string, bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Access Control: Only student or tutor involved in the booking can complete it
  if (booking.studentId !== userId && booking.tutorId !== userId && role !== "ADMIN") {
    throw new Error("You are not authorized to complete this booking");
  }

  if (booking.status !== "ACTIVE") {
    throw new Error(`Booking cannot be completed because it is already ${booking.status}`);
  }

  const result = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "COMPLETED",
      endDate: new Date(),
    },
  });

  return result;
};

const cancelBooking = async (userId: string, role: string, bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Access Control: Only student or tutor involved in the booking can cancel it
  if (booking.studentId !== userId && booking.tutorId !== userId && role !== "ADMIN") {
    throw new Error("You are not authorized to cancel this booking");
  }

  if (booking.status !== "ACTIVE") {
    throw new Error(`Booking cannot be cancelled because it is already ${booking.status}`);
  }

  const result = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "CANCELLED",
      endDate: new Date(),
    },
  });

  return result;
};

export const BookingService = {
  getMyBookings,
  getSingleBooking,
  completeBooking,
  cancelBooking,
};
