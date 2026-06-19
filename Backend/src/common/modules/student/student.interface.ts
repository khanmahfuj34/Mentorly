export interface IStudentProfileCreateInput {
    classLevel?: string;
    schoolCollege?: string;
    preferredSubjects?: string[];
    district?: string;
    area?: string;
    guardianName?: string;
    guardianPhone?: string;
}

export interface IStudentProfileUpdateInput {
    classLevel?: string;
    schoolCollege?: string;
    preferredSubjects?: string[];
    district?: string;
    area?: string;
    guardianName?: string;
    guardianPhone?: string;
}
