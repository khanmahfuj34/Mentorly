import { axiosInstance } from "@/src/lib/axios";

export interface ITutorApplicationInput {
  coverLetter: string;
}

export interface ITutorApplication {
  id: string;
  tutorId: string;
  tuitionRequestId: string;
  coverLetter: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
}

export const applyToTuition = async (
  tuitionRequestId: string,
  payload: ITutorApplicationInput
): Promise<{ success: boolean; message?: string; data: ITutorApplication }> => {
  const response = await axiosInstance.post(`/tutor-applications/apply/${tuitionRequestId}`, payload);
  return response.data;
};

export const getMyApplications = async (): Promise<{ success: boolean; data: ITutorApplication[] }> => {
  const response = await axiosInstance.get("/tutor-applications/my-applications");
  return response.data;
};
