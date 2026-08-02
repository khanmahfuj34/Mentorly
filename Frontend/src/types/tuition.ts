export type TuitionStatus = "OPEN" | "ASSIGNED" | "COMPLETED" | "CANCELLED";

export interface ITuitionRequest {
  id: string;
  studentId: string;
  subject: string;
  classLevel: string;
  medium?: string;
  genderPreference?: string;
  district: string;
  area: string;
  salary: number;
  daysPerWeek: number;
  description?: string;
  status: TuitionStatus;
  createdAt: string;
  updatedAt: string;
  student?: {
    id: string;
    name: string;
    email: string;
    studentProfile?: {
      id: string;
      classLevel?: string;
      schoolCollege?: string;
      preferredSubjects?: string[];
      district?: string;
      area?: string;
    };
  };
}

export interface ITuitionRequestInput {
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
