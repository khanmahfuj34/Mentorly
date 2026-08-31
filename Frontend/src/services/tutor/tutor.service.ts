import { axiosInstance } from "@/src/lib/axios";
import { ITutorProfile, ITutorProfileInput, ITutorFilters, ITutorListResponse } from "@/src/types/tutor";

export const getTutors = async (filters: ITutorFilters = {}): Promise<ITutorListResponse> => {
  const response = await axiosInstance.get("/tutors", { params: filters });
  return response.data;
};

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

export const getTutorProfileById = async (id: string): Promise<{ success: boolean; message?: string; data: ITutorProfile }> => {
  const response = await axiosInstance.get(`/tutors/${id}`);
  return response.data;
};

