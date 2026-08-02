import { axiosInstance } from "@/src/lib/axios";

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post(
    "/auth/login",
    payload
  );

  return response.data;
};

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role: "STUDENT" | "TUTOR";
}) => {
  const response = await axiosInstance.post(
    "/auth/register",
    payload
  );

  return response.data;
};