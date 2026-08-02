import { TuitionStatus } from "@prisma/client";

export interface ITuitionRequestCreateInput {
    subject: string;
    classLevel: string;
    medium?: string;
    genderPreference?: string;
    district: string;
    area: string;
    salary: number;
    daysPerWeek: number;
    description?: string;
}

export interface ITuitionRequestUpdateInput {
    subject?: string;
    classLevel?: string;
    medium?: string;
    genderPreference?: string;
    district?: string;
    area?: string;
    salary?: number;
    daysPerWeek?: number;
    description?: string;
    status?: TuitionStatus;
}

export interface ITuitionRequestFilterRequest {
    searchTerm?: string;
    status?: TuitionStatus;
    genderPreference?: string;
    medium?: string;
    district?: string;
    area?: string;
    minSalary?: string;
    maxSalary?: string;
}

export interface ITuitionRequestQueryFilters {
    searchTerm?: string;
    subject?: string;
    classLevel?: string;
    district?: string;
    genderPreference?: string;
    minimumSalary?: string;
    maximumSalary?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
}
