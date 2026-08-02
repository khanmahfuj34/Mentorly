import { axiosInstance } from "@/src/lib/axios"

export interface IBooking {
  id: string
  studentId: string
  tutorId: string
  tuitionRequestId: string
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELLED"
  startDate: string | null
  endDate: string | null
  createdAt: string
  updatedAt: string
  student?: {
    id: string
    name: string
    email: string
  }
  tutor?: {
    id: string
    name: string
    email: string
  }
  tuitionRequest?: {
    id: string
    subject: string
    classLevel: string
    district: string
    area: string
    salary: number
  }
}

export interface IBookingListResponse {
  success: boolean
  message?: string
  meta?: {
    page: number
    limit: number
    total: number
  }
  data: IBooking[]
}

export interface IBookingDetail extends Omit<IBooking, "student" | "tutor" | "tuitionRequest"> {
  student?: {
    id: string
    name: string
    email: string
    studentProfile?: {
      id?: string
      userId?: string
      classLevel?: string
      schoolCollege?: string
      preferredSubjects?: string[]
      district?: string
      area?: string
      guardianName?: string
      guardianPhone?: string
      phoneNumber?: string
      profilePhoto?: string
    } | null
  }
  tutor?: {
    id: string
    name: string
    email: string
    tutorProfile?: {
      id?: string
      bio?: string
      profilePhoto?: string
      university?: string
      department?: string
      experienceYears?: number
      hourlyRate?: number
      rating?: number
    } | null
  }
  tuitionRequest?: {
    id: string
    subject: string
    classLevel: string
    medium?: string | null
    genderPreference?: string | null
    district: string
    area: string
    salary: number
    daysPerWeek: number
    description?: string | null
    status: string
    createdAt: string
    updatedAt: string
  } | null
}

/**
 * GET /api/v1/bookings/my-bookings
 * Works for both STUDENT and TUTOR — the backend filters by role automatically.
 * Response shape: { success, message, meta: {page,limit,total}, data: [...bookings] }
 */
export const getMyBookings = async (params?: {
  status?: string
  page?: number
  limit?: number
}): Promise<IBookingListResponse> => {
  const response = await axiosInstance.get("/bookings/my-bookings", { params })
  return response.data
}

/**
 * GET /api/v1/bookings/:id
 * Returns full booking with student.studentProfile and tuitionRequest included.
 * Accessible by the student or tutor of the booking, or Admin.
 */
export const getSingleBooking = async (
  bookingId: string
): Promise<{ success: boolean; message?: string; data: IBookingDetail }> => {
  const response = await axiosInstance.get(`/bookings/${bookingId}`)
  return response.data
}

