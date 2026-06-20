import { prisma } from "../../../config/prisma";
import {
  IAvailabilityCreateInput,
  IAvailabilityFilterRequest,
  IAvailabilityUpdateInput,
} from "./availability.interface";

// Helper function to convert time string (AM/PM or 24h) to minutes since midnight
const timeToMinutes = (timeStr: string): number => {
  const cleaned = timeStr.trim().toUpperCase();
  const is12Hour = cleaned.endsWith("AM") || cleaned.endsWith("PM");

  if (is12Hour) {
    const period = cleaned.slice(-2);
    const timePart = cleaned.slice(0, -2).trim();
    let [hours, minutes] = timePart.split(":").map(Number);
    if (period === "PM" && hours !== 12) {
      hours += 12;
    }
    if (period === "AM" && hours === 12) {
      hours = 0;
    }
    return hours * 60 + minutes;
  } else {
    const [hours, minutes] = cleaned.split(":").map(Number);
    return hours * 60 + minutes;
  }
};

// Helper function to check if new time slot overlaps with existing ones
const checkOverlap = async (
  tutorId: string,
  day: string,
  startTime: string,
  endTime: string,
  excludeId?: string
): Promise<void> => {
  const newStart = timeToMinutes(startTime);
  const newEnd = timeToMinutes(endTime);

  if (newStart >= newEnd) {
    throw new Error("Start time must be before end time");
  }

  // Retrieve all other slots for the tutor on the same day
  const existingSlots = await prisma.availability.findMany({
    where: {
      tutorId,
      day: day as any,
      id: excludeId ? { not: excludeId } : undefined,
    },
  });

  for (const slot of existingSlots) {
    const existStart = timeToMinutes(slot.startTime);
    const existEnd = timeToMinutes(slot.endTime);

    // Overlap condition: (newStart < existEnd) AND (newEnd > existStart)
    if (newStart < existEnd && newEnd > existStart) {
      throw new Error("Schedule overlaps with existing availability");
    }
  }
};

const createAvailability = async (
  tutorId: string,
  payload: IAvailabilityCreateInput
) => {
  const { day, startTime, endTime, isAvailable = true } = payload;

  // Validate formatting and check overlap
  await checkOverlap(tutorId, day, startTime, endTime);

  const result = await prisma.availability.create({
    data: {
      tutorId,
      day,
      startTime,
      endTime,
      isAvailable,
    },
  });

  return result;
};

const updateAvailability = async (
  userId: string,
  id: string,
  payload: IAvailabilityUpdateInput
) => {
  const existingSlot = await prisma.availability.findUnique({
    where: { id },
  });

  if (!existingSlot) {
    throw new Error("Availability slot not found");
  }

  // Ownership Check: Only owner tutor can update
  if (existingSlot.tutorId !== userId) {
    throw new Error("You are not authorized to update this availability");
  }

  const updatedDay = payload.day || existingSlot.day;
  const updatedStartTime = payload.startTime || existingSlot.startTime;
  const updatedEndTime = payload.endTime || existingSlot.endTime;

  // Check overlap if day, startTime or endTime is being changed
  if (
    payload.day ||
    payload.startTime ||
    payload.endTime
  ) {
    await checkOverlap(
      userId,
      updatedDay,
      updatedStartTime,
      updatedEndTime,
      id
    );
  }

  const result = await prisma.availability.update({
    where: { id },
    data: {
      day: payload.day,
      startTime: payload.startTime,
      endTime: payload.endTime,
      isAvailable: payload.isAvailable,
    },
  });

  return result;
};

const deleteAvailability = async (userId: string, id: string) => {
  const existingSlot = await prisma.availability.findUnique({
    where: { id },
  });

  if (!existingSlot) {
    throw new Error("Availability slot not found");
  }

  // Ownership Check: Only owner tutor can delete
  if (existingSlot.tutorId !== userId) {
    throw new Error("You are not authorized to delete this availability");
  }

  const result = await prisma.availability.delete({
    where: { id },
  });

  return result;
};

const getTutorSchedule = async (
  tutorId: string,
  filters: IAvailabilityFilterRequest
) => {
  const {
    day,
    isAvailable,
    page = "1",
    limit = "10",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  const parsedPage = Number(page) || 1;
  const parsedLimit = Number(limit) || 10;
  const skip = (parsedPage - 1) * parsedLimit;

  const where: any = { tutorId };

  if (day) {
    where.day = day;
  }
  if (isAvailable !== undefined) {
    where.isAvailable = isAvailable === "true" || isAvailable === true;
  }

  const [availabilities, total] = await Promise.all([
    prisma.availability.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: parsedLimit,
    }),
    prisma.availability.count({ where }),
  ]);

  return {
    meta: {
      page: parsedPage,
      limit: parsedLimit,
      total,
    },
    data: availabilities,
  };
};

const getMySchedule = async (
  userId: string,
  filters: IAvailabilityFilterRequest
) => {
  return getTutorSchedule(userId, filters);
};

const getSingleAvailability = async (id: string) => {
  const result = await prisma.availability.findUnique({
    where: { id },
    include: {
      tutor: {
        select: {
          id: true,
          name: true,
          email: true,
          tutorProfile: true,
        },
      },
    },
  });

  if (!result) {
    throw new Error("Availability slot not found");
  }

  return result;
};

export const AvailabilityService = {
  createAvailability,
  updateAvailability,
  deleteAvailability,
  getTutorSchedule,
  getMySchedule,
  getSingleAvailability,
};
