import { ITuitionRequest } from "./tuition"

export type ApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED"

export interface ITutorApplication {
  id: string
  tutorId: string
  tuitionRequestId: string
  coverLetter: string | null
  status: ApplicationStatus
  createdAt: string
  updatedAt: string
  tuitionRequest?: ITuitionRequest & {
    student?: {
      id: string
      name: string
      email: string
    }
  }
  tutor?: {
    id: string
    name: string
    email: string
    tutorProfile?: {
      id: string
      userId: string
      bio: string | null
      profilePhoto: string | null
      phoneNumber: string | null
      university: string | null
      department: string | null
      experienceYears: number | null
      hourlyRate: number | null
      teachingSubjects: string[]
      rating: number
    } | null
  }
}
