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