import { prisma } from "../../../config/prisma";

const createProfile = async (
  userId: string,
  payload: any
) => {
  const profile = await prisma.studentProfile.create({
    data: {
      userId,
      ...payload,
    },
  });

  return profile;
};

const getMyProfile = async (userId: string) => {
  return prisma.studentProfile.findUnique({
    where: {
      userId,
    },
  });
};

const updateProfile = async (
  userId: string,
  payload: any
) => {
  return prisma.studentProfile.update({
    where: {
      userId,
    },
    data: payload,
  });
};

export const StudentService = {
  createProfile,
  getMyProfile,
  updateProfile,
};