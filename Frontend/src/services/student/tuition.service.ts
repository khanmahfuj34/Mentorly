import { axiosInstance } from "@/src/lib/axios";
import { ITuitionRequest, ITuitionRequestInput } from "@/src/types/tuition";

export const getMyTuitionRequests = async (): Promise<{ success: boolean; message?: string; data: ITuitionRequest[] }> => {
  const response = await axiosInstance.get("/tuition-requests/my-requests");
  return response.data;
};

export const getSingleTuitionRequest = async (id: string): Promise<{ success: boolean; message?: string; data: ITuitionRequest }> => {
  const response = await axiosInstance.get(`/tuition-requests/${id}`);
  return response.data;
};

export const createTuitionRequest = async (payload: ITuitionRequestInput): Promise<{ success: boolean; message?: string; data: ITuitionRequest }> => {
  const response = await axiosInstance.post("/tuition-requests", payload);
  return response.data;
};

export const updateTuitionRequest = async (
  id: string,
  payload: Partial<ITuitionRequestInput>
): Promise<{ success: boolean; message?: string; data: ITuitionRequest }> => {
  const response = await axiosInstance.patch(`/tuition-requests/${id}`, payload);
  return response.data;
};
