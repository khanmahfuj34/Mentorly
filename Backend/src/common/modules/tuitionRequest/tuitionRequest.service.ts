import { prisma } from "../../../config/prisma";
import { ITuitionRequestCreateInput, ITuitionRequestUpdateInput } from "./tuitionRequest.interface";

const createTuitionRequest = async (
    studentId: string,
    payload: ITuitionRequestCreateInput
) => {
    // Verify that the student profile exists before creating a request
    const studentProfile = await prisma.studentProfile.findUnique({
        where: {
            userId: studentId,
        },
    });

    if (!studentProfile) {
        throw new Error("Student profile must be created first before posting a tuition request.");
    }

    const result = await prisma.tuitionRequest.create({
        data: {
            studentId,
            ...payload,
        },
    });

    return result;
};

const getMyTuitionRequests = async (studentId: string) => {
    const result = await prisma.tuitionRequest.findMany({
        where: {
            studentId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return result;
};

const getSingleTuitionRequest = async (id: string) => {
    const tuitionRequest = await prisma.tuitionRequest.findUnique({
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

const updateTuitionRequest = async (
    id: string,
    userId: string,
    payload: ITuitionRequestUpdateInput
) => {
    const existingRequest = await prisma.tuitionRequest.findUnique({
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

    const result = await prisma.tuitionRequest.update({
        where: {
            id,
        },
        data: payload,
    });

    return result;
};

const deleteTuitionRequest = async (id: string, userId: string) => {
    const existingRequest = await prisma.tuitionRequest.findUnique({
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

    const result = await prisma.tuitionRequest.delete({
        where: {
            id,
        },
    });

    return result;
};

export const TuitionRequestService = {
    createTuitionRequest,
    getMyTuitionRequests,
    getSingleTuitionRequest,
    updateTuitionRequest,
    deleteTuitionRequest,
};
