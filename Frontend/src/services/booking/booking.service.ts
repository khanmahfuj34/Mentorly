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
