export interface IStudentProfile {
  id?: string;
  userId?: string;
  classLevel?: string;
  schoolCollege?: string;
  preferredSubjects?: string[];
  district?: string;
  area?: string;
  guardianName?: string;
  guardianPhone?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
    isBlocked: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface IStudentProfileInput {
  classLevel?: string;
  schoolCollege?: string;
  preferredSubjects?: string[];
  district?: string;
  area?: string;
  guardianName?: string;
  guardianPhone?: string;
}
