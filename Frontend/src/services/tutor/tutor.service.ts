import { axiosInstance } from "@/src/lib/axios";
import { ITutorProfile, ITutorProfileInput } from "@/src/types/tutor";

export const getMyTutorProfile = async (): Promise<{ success: boolean; message?: string; data: ITutorProfile }> => {
  const response = await axiosInstance.get("/tutors/my-profile");
  return response.data;
};

export const createTutorProfile = async (payload: ITutorProfileInput): Promise<{ success: boolean; message?: string; data: ITutorProfile }> => {
  const response = await axiosInstance.post("/tutors/create-profile", payload);
  return response.data;
};

export const updateTutorProfile = async (payload: ITutorProfileInput): Promise<{ success: boolean; message?: string; data: ITutorProfile }> => {
  const response = await axiosInstance.patch("/tutors/update-profile", payload);
  return response.data;
};
