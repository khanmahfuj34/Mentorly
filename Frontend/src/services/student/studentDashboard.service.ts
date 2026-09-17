import { axiosInstance } from "@/src/lib/axios";
import { IStudentDashboardResponse } from "@/src/types/studentDashboard.types";

export const getStudentDashboardData = async (): Promise<IStudentDashboardResponse> => {
  const response = await axiosInstance.get("/students/dashboard");
  return response.data;
};
