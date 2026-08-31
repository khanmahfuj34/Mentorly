export interface ITutorProfileCreateInput {
    bio?: string;
    university?: string;
    department?: string;
    experienceYears?: number;
    hourlyRate?: number;
    teachingSubjects?: string[];
    district?: string;
    area?: string;
}

export interface ITutorProfileUpdateInput {
    bio?: string;
    university?: string;
    department?: string;
    experienceYears?: number;
    hourlyRate?: number;
    teachingSubjects?: string[];
    district?: string;
    area?: string;
}

export interface ITutorQueryFilters {
    searchTerm?: string;
    district?: string;
    area?: string;
    subject?: string;
    classLevel?: string;
    medium?: string;
    gender?: string;
    minSalary?: string | number;
    maxSalary?: string | number;
    experienceYears?: string | number;
    page?: string | number;
    limit?: string | number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

