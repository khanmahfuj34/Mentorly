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
