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

export const getMyBookings = async (params?: {
  status?: string
  page?: number
  limit?: number
}): Promise<{ success: boolean; data: IBooking[] }> => {
  const response = await axiosInstance.get("/bookings/my-bookings", { params })
  return response.data
}
