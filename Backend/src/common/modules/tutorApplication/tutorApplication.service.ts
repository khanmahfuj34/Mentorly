import { prisma } from "../../../config/prisma";
import { ITutorApplicationCreateInput } from "./tutorApplication.interface";

const applyToTuitionRequest = async (
  tutorId: string,
  tuitionRequestId: string,
  payload: ITutorApplicationCreateInput
) => {
  // 1. Verify tuition request exists
  const tuitionRequest = await prisma.tuitionRequest.findUnique({
    where: {
      id: tuitionRequestId,
    },
  });

  if (!tuitionRequest) {
    throw new Error("Tuition request not found");
  }

  // 2. Verify tuition request status is OPEN
  if (tuitionRequest.status !== "OPEN") {
    throw new Error("Tuition request is not open for applications");
  }

  // 3. Verify tutor hasn't applied already
  const existingApplication = await prisma.tutorApplication.findFirst({
    where: {
      tutorId,
      tuitionRequestId,
    },
  });

  if (existingApplication) {
    throw new Error("You have already applied for this tuition request");
  }

  // 4. Create application
  const result = await prisma.tutorApplication.create({
    data: {
      tutorId,
      tuitionRequestId,
      coverLetter: payload.coverLetter,
    },
  });

  return result;
};

const getMyApplications = async (tutorId: string) => {
  const result = await prisma.tutorApplication.findMany({
    where: {
      tutorId,
    },
    include: {
      tuitionRequest: {
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getApplicationsByTuitionRequest = async (
  userId: string,
  tuitionRequestId: string
) => {
  // 1. Verify tuition request exists and check if requester is the student owner
  const tuitionRequest = await prisma.tuitionRequest.findUnique({
    where: {
      id: tuitionRequestId,
    },
  });

  if (!tuitionRequest) {
    throw new Error("Tuition request not found");
  }

  if (tuitionRequest.studentId !== userId) {
    throw new Error("You are not authorized to view applications for this tuition request");
  }

  // 2. Get applications
  const result = await prisma.tutorApplication.findMany({
    where: {
      tuitionRequestId,
    },
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const acceptApplication = async (userId: string, applicationId: string) => {
  // 1. Find the application with its tuition request details
  const application = await prisma.tutorApplication.findUnique({
    where: {
      id: applicationId,
    },
    include: {
      tuitionRequest: true,
    },
  });

  if (!application) {
    throw new Error("Tutor application not found");
  }

  // 2. Verify that the logged-in student owns the tuition request
  if (application.tuitionRequest.studentId !== userId) {
    throw new Error("You are not authorized to accept this application");
  }

  // 3. Verify tuition request is still OPEN
  if (application.tuitionRequest.status !== "OPEN") {
    throw new Error("This tuition request has already been assigned or closed");
  }

  // 4. Run database transaction to update statuses
  const updatedApplication = await prisma.$transaction(async (tx) => {
    // a. Update target application to ACCEPTED
    const acceptedApp = await tx.tutorApplication.update({
      where: {
        id: applicationId,
      },
      data: {
        status: "ACCEPTED",
      },
    });

    // b. Update all other applications of same tuition request to REJECTED
    await tx.tutorApplication.updateMany({
      where: {
        tuitionRequestId: application.tuitionRequestId,
        id: {
          not: applicationId,
        },
      },
      data: {
        status: "REJECTED",
      },
    });

    // c. Update tuition request status to ASSIGNED
    await tx.tuitionRequest.update({
      where: {
        id: application.tuitionRequestId,
      },
      data: {
        status: "ASSIGNED",
      },
    });

    return acceptedApp;
  });

  return updatedApplication;
};

const rejectApplication = async (userId: string, applicationId: string) => {
  // 1. Find the application with its tuition request details
  const application = await prisma.tutorApplication.findUnique({
    where: {
      id: applicationId,
    },
    include: {
      tuitionRequest: true,
    },
  });

  if (!application) {
    throw new Error("Tutor application not found");
  }

  // 2. Verify that the logged-in student owns the tuition request
  if (application.tuitionRequest.studentId !== userId) {
    throw new Error("You are not authorized to reject this application");
  }

  // 3. Verify application status is PENDING
  if (application.status !== "PENDING") {
    throw new Error(`Application cannot be rejected because it is already ${application.status}`);
  }

  // 4. Update application status to REJECTED
  const result = await prisma.tutorApplication.update({
    where: {
      id: applicationId,
    },
    data: {
      status: "REJECTED",
    },
  });

  return result;
};

export const TutorApplicationService = {
  applyToTuitionRequest,
  getMyApplications,
  getApplicationsByTuitionRequest,
  acceptApplication,
  rejectApplication,
};
