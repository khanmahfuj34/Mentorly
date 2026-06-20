"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorApplicationService = void 0;
const prisma_1 = require("../../../config/prisma");
const applyToTuitionRequest = async (tutorId, tuitionRequestId, payload) => {
    // 0. Verify tutor is approved
    const tutorProfile = await prisma_1.prisma.tutorProfile.findUnique({
        where: {
            userId: tutorId,
        },
    });
    if (!tutorProfile || !tutorProfile.isApproved) {
        throw new Error("Only approved tutors can apply to tuition requests");
    }
    // 1. Verify tuition request exists
    const tuitionRequest = await prisma_1.prisma.tuitionRequest.findUnique({
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
    const existingApplication = await prisma_1.prisma.tutorApplication.findFirst({
        where: {
            tutorId,
            tuitionRequestId,
        },
    });
    if (existingApplication) {
        throw new Error("You have already applied for this tuition request");
    }
    // 4. Create application
    const result = await prisma_1.prisma.tutorApplication.create({
        data: {
            tutorId,
            tuitionRequestId,
            coverLetter: payload.coverLetter,
        },
    });
    return result;
};
const getMyApplications = async (tutorId) => {
    const result = await prisma_1.prisma.tutorApplication.findMany({
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
const getApplicationsByTuitionRequest = async (userId, tuitionRequestId) => {
    // 1. Verify tuition request exists and check if requester is the student owner
    const tuitionRequest = await prisma_1.prisma.tuitionRequest.findUnique({
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
    const result = await prisma_1.prisma.tutorApplication.findMany({
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
const acceptApplication = async (userId, applicationId) => {
    // 1. Find the application with its tuition request details
    const application = await prisma_1.prisma.tutorApplication.findUnique({
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
    // 3b. Verify no duplicate booking already exists for this tuition request
    const existingBooking = await prisma_1.prisma.booking.findUnique({
        where: {
            tuitionRequestId: application.tuitionRequestId,
        },
    });
    if (existingBooking) {
        throw new Error("A booking already exists for this tuition request");
    }
    // 3c. Verify tutor is still approved before assigning booking
    const tutorProfile = await prisma_1.prisma.tutorProfile.findUnique({
        where: {
            userId: application.tutorId,
        },
    });
    if (!tutorProfile || !tutorProfile.isApproved) {
        throw new Error("Only approved tutors can receive bookings");
    }
    // 4. Run database transaction to update statuses and create booking
    const updatedApplication = await prisma_1.prisma.$transaction(async (tx) => {
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
        // d. Create Booking
        await tx.booking.create({
            data: {
                studentId: application.tuitionRequest.studentId,
                tutorId: application.tutorId,
                tuitionRequestId: application.tuitionRequestId,
                status: "ACTIVE",
            },
        });
        return acceptedApp;
    });
    return updatedApplication;
};
const rejectApplication = async (userId, applicationId) => {
    // 1. Find the application with its tuition request details
    const application = await prisma_1.prisma.tutorApplication.findUnique({
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
    const result = await prisma_1.prisma.tutorApplication.update({
        where: {
            id: applicationId,
        },
        data: {
            status: "REJECTED",
        },
    });
    return result;
};
exports.TutorApplicationService = {
    applyToTuitionRequest,
    getMyApplications,
    getApplicationsByTuitionRequest,
    acceptApplication,
    rejectApplication,
};
