import { prisma } from "../../../config/prisma";
import { IStudentProfileCreateInput, IStudentProfileUpdateInput } from "./student.interface";

const createProfile = async (
  userId: string,
  payload: IStudentProfileCreateInput
) => {
  const existingProfile = await prisma.studentProfile.findUnique({
    where: {
      userId,
    },
  });

  if (existingProfile) {
    throw new Error("Student profile already exists for this user");
  }

  const profile = await prisma.studentProfile.create({
    data: {
      userId,
      ...payload,
    },
  });

  return profile;
};

const getMyProfile = async (userId: string) => {
  const profile = await prisma.studentProfile.findUnique({
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
    throw new Error("Student profile not found");
  }

  return profile;
};

const updateProfile = async (
  userId: string,
  payload: IStudentProfileUpdateInput
) => {
  const existingProfile = await prisma.studentProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!existingProfile) {
    throw new Error("Student profile not found");
  }

  const updatedProfile = await prisma.studentProfile.update({
    where: {
      userId,
    },
    data: payload,
  });

  return updatedProfile;
};

export const StudentService = {
  createProfile,
  getMyProfile,
  updateProfile,
};