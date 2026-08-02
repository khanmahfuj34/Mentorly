import { axiosInstance } from "../../lib/axios"
import { ITutorApplication } from "../../types/application.types"

export const getMyApplications = async (): Promise<{ success: boolean; data: ITutorApplication[] }> => {
  const response = await axiosInstance.get("/tutor-applications/my-applications")
  return response.data
}

export const getStudentApplications = async (
  tuitionRequestId: string
): Promise<{ success: boolean; data: ITutorApplication[] }> => {
  const response = await axiosInstance.get(`/tutor-applications/request/${tuitionRequestId}`)
  return response.data
}

export const acceptApplication = async (
  id: string
): Promise<{ success: boolean; message?: string; data: ITutorApplication }> => {
  const response = await axiosInstance.patch(`/tutor-applications/${id}/accept`)
  return response.data
}

export const rejectApplication = async (
  id: string
): Promise<{ success: boolean; message?: string; data: ITutorApplication }> => {
  const response = await axiosInstance.patch(`/tutor-applications/${id}/reject`)
  return response.data
}
