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

const getStudentDashboard = async (userId: string) => {
  const profile = await prisma.studentProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isVerified: true,
        },
      },
    },
  });

  let profileCompletion = 0;
  const missingFields: string[] = [];
  if (profile) {
    const hasClassLevel = Boolean(profile.classLevel && profile.classLevel.trim().length > 0);
    const hasSchoolCollege = Boolean(profile.schoolCollege && profile.schoolCollege.trim().length > 0);
    if (!hasClassLevel) missingFields.push("Class Level");
    if (!hasSchoolCollege) missingFields.push("School / College");

    const hasDistrict = Boolean(profile.district && profile.district.trim().length > 0);
    const hasArea = Boolean(profile.area && profile.area.trim().length > 0);
    if (!hasDistrict) missingFields.push("District");
    if (!hasArea) missingFields.push("Area");

    const hasGuardianName = Boolean(profile.guardianName && profile.guardianName.trim().length > 0);
    const hasGuardianPhone = Boolean(profile.guardianPhone && profile.guardianPhone.trim().length > 0);
    if (!hasGuardianName) missingFields.push("Guardian Name");
    if (!hasGuardianPhone) missingFields.push("Guardian Phone");

    profileCompletion =
      (hasClassLevel && hasSchoolCollege ? 40 : 0) +
      (hasDistrict && hasArea ? 30 : 0) +
      (hasGuardianName && hasGuardianPhone ? 30 : 0);
  } else {
    missingFields.push("Class Level", "School / College", "District", "Area", "Guardian Name", "Guardian Phone");
  }

  const [
    activePostsCount,
    applicationsReceivedCount,
    acceptedApplicationsCount,
    activeBookingsCount,
    recentPosts,
    recentApplications,
    upcomingBooking,
    recommendedTutors,
  ] = await Promise.all([
    prisma.tuitionRequest.count({
      where: { studentId: userId, status: "OPEN" },
    }),
    prisma.tutorApplication.count({
      where: { tuitionRequest: { studentId: userId } },
    }),
    prisma.tutorApplication.count({
      where: { tuitionRequest: { studentId: userId }, status: "ACCEPTED" },
    }),
    prisma.booking.count({
      where: { studentId: userId, status: "ACTIVE" },
    }),
    prisma.tuitionRequest.findMany({
      where: { studentId: userId },
      orderBy: { createdAt: "desc" },
      take: 3,
      include: {
        _count: {
          select: { TutorApplication: true },
        },
      },
    }),
    prisma.tutorApplication.findMany({
      where: { tuitionRequest: { studentId: userId } },
      orderBy: { createdAt: "desc" },
      take: 4,
      include: {
        tutor: {
          select: {
            id: true,
            name: true,
            email: true,
            tutorProfile: true,
          },
        },
        tuitionRequest: {
          select: {
            id: true,
            subject: true,
            classLevel: true,
            salary: true,
          },
        },
      },
    }),
    prisma.booking.findFirst({
      where: { studentId: userId, status: { in: ["ACTIVE", "PENDING"] } },
      orderBy: { createdAt: "desc" },
      include: {
        tutor: {
          select: {
            id: true,
            name: true,
            email: true,
            tutorProfile: true,
          },
        },
        tuitionRequest: {
          select: {
            id: true,
            subject: true,
            classLevel: true,
            salary: true,
            district: true,
            area: true,
          },
        },
      },
    }),
    prisma.tutorProfile.findMany({
      where: { isApproved: true, user: { isBlocked: false } },
      orderBy: { rating: "desc" },
      take: 4,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isVerified: true,
          },
        },
      },
    }),
  ]);

  return {
    profile,
    profileCompletion,
    missingFields,
    stats: {
      activePosts: activePostsCount,
      applicationsReceived: applicationsReceivedCount,
      acceptedApplications: acceptedApplicationsCount,
      activeBookings: activeBookingsCount,
    },
    recentPosts,
    recentApplications,
    upcomingBooking,
    recommendedTutors,
  };
};

export const StudentService = {
  createProfile,
  getMyProfile,
  updateProfile,
  getStudentDashboard,
};