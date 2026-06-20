"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuitionRequestService = void 0;
const prisma_1 = require("../../../config/prisma");
const createTuitionRequest = async (studentId, payload) => {
    // Verify that the student profile exists before creating a request
    const studentProfile = await prisma_1.prisma.studentProfile.findUnique({
        where: {
            userId: studentId,
        },
    });
    if (!studentProfile) {
        throw new Error("Student profile must be created first before posting a tuition request.");
    }
    const result = await prisma_1.prisma.tuitionRequest.create({
        data: {
            studentId,
            ...payload,
        },
    });
    return result;
};
const getMyTuitionRequests = async (studentId) => {
    const result = await prisma_1.prisma.tuitionRequest.findMany({
        where: {
            studentId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
};
const getSingleTuitionRequest = async (id) => {
    const tuitionRequest = await prisma_1.prisma.tuitionRequest.findUnique({
        where: {
            id,
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
    });
    if (!tuitionRequest) {
        throw new Error("Tuition request not found");
    }
    return tuitionRequest;
};
const updateTuitionRequest = async (id, userId, payload) => {
    const existingRequest = await prisma_1.prisma.tuitionRequest.findUnique({
        where: {
            id,
        },
    });
    if (!existingRequest) {
        throw new Error("Tuition request not found");
    }
    // Verify ownership
    if (existingRequest.studentId !== userId) {
        throw new Error("You are not authorized to update this tuition request");
    }
    const result = await prisma_1.prisma.tuitionRequest.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
};
const deleteTuitionRequest = async (id, userId) => {
    const existingRequest = await prisma_1.prisma.tuitionRequest.findUnique({
        where: {
            id,
        },
    });
    if (!existingRequest) {
        throw new Error("Tuition request not found");
    }
    // Verify ownership
    if (existingRequest.studentId !== userId) {
        throw new Error("You are not authorized to delete this tuition request");
    }
    const result = await prisma_1.prisma.tuitionRequest.delete({
        where: {
            id,
        },
    });
    return result;
};
exports.TuitionRequestService = {
    createTuitionRequest,
    getMyTuitionRequests,
    getSingleTuitionRequest,
    updateTuitionRequest,
    deleteTuitionRequest,
};
