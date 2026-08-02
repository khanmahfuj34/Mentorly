import { axiosInstance } from "@/src/lib/axios";
import { ITuitionRequest } from "@/src/types/tuition";

export interface ITuitionQueryFilters {
  searchTerm?: string;
  subject?: string;
  classLevel?: string;
  district?: string;
  genderPreference?: string;
  minimumSalary?: number;
  maximumSalary?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface ITuitionResponseMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ITuitionListResponse {
  success: boolean;
  message?: string;
  meta: ITuitionResponseMeta;
  data: ITuitionRequest[];
}

export const getTutorTuitionRequests = async (params?: ITuitionQueryFilters): Promise<ITuitionListResponse> => {
  const response = await axiosInstance.get("/tuition-requests", { params });
  return response.data;
};

export const getTutorSingleTuition = async (id: string): Promise<{ success: boolean; data: ITuitionRequest }> => {
  const response = await axiosInstance.get(`/tuition-requests/${id}`);
  return response.data;
};
