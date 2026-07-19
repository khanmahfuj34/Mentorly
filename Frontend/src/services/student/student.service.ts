import { axiosInstance } from "@/src/lib/axios";
import { IStudentProfileInput } from "@/src/types/student.types";

export const getMyStudentProfile = async () => {
  const response = await axiosInstance.get("/students/my-profile");
  return response.data;
};

export const createStudentProfile = async (payload: IStudentProfileInput) => {
  const response = await axiosInstance.post("/students/create-profile", payload);
  return response.data;
};

export const updateStudentProfile = async (payload: IStudentProfileInput) => {
  const response = await axiosInstance.patch("/students/update-profile", payload);
  return response.data;
};
