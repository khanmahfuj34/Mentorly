import { prisma } from "../../../config/prisma";
import { ITuitionRequestCreateInput, ITuitionRequestUpdateInput, ITuitionRequestQueryFilters } from "./tuitionRequest.interface";

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

const getAllTuitionRequests = async (filters: ITuitionRequestQueryFilters) => {
    const {
        searchTerm,
        subject,
        classLevel,
        district,
        genderPreference,
        minimumSalary,
        maximumSalary,
        page = "1",
        limit = "10",
        sortBy = "createdAt",
        sortOrder = "desc",
    } = filters;

    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 10;
    const skip = (parsedPage - 1) * parsedLimit;

    // Build conditions object
    const where: any = {
        status: "OPEN", // Return only OPEN requests
    };

    if (subject) {
        where.subject = { contains: subject, mode: "insensitive" };
    }

    if (classLevel) {
        where.classLevel = classLevel;
    }

    if (district) {
        where.district = district;
    }

    if (genderPreference) {
        where.genderPreference = genderPreference;
    }

    // Salary range
    if (minimumSalary || maximumSalary) {
        where.salary = {};
        if (minimumSalary) {
            where.salary.gte = Number(minimumSalary);
        }
        if (maximumSalary) {
            where.salary.lte = Number(maximumSalary);
        }
    }

    // Keyword search
    if (searchTerm) {
        where.OR = [
            { subject: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
        ];
    }

    // Order By newest first
    const orderCondition: any = {};
    if (sortBy === "salary") {
        orderCondition.salary = sortOrder;
    } else {
        orderCondition.createdAt = sortOrder;
    }

    const [tuitionRequests, total] = await Promise.all([
        prisma.tuitionRequest.findMany({
            where,
            select: {
                id: true,
                subject: true,
                classLevel: true,
                medium: true,
                genderPreference: true,
                district: true,
                area: true,
                salary: true,
                daysPerWeek: true,
                description: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                student: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: orderCondition,
            skip,
            take: parsedLimit,
        }),
        prisma.tuitionRequest.count({ where }),
    ]);

    const totalPage = Math.ceil(total / parsedLimit);

    return {
        meta: {
            page: parsedPage,
            limit: parsedLimit,
            total,
            totalPage,
        },
        data: tuitionRequests,
    };
};

export const TuitionRequestService = {
    createTuitionRequest,
    getMyTuitionRequests,
    getSingleTuitionRequest,
    updateTuitionRequest,
    deleteTuitionRequest,
    getAllTuitionRequests,
};
