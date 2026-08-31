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

export const updateAccount = async (payload: {
  name?: string;
  email?: string;
}) => {
  const response = await axiosInstance.patch("/auth/update-account", payload);
  return response.data;
};

export const changePassword = async (payload: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await axiosInstance.patch("/auth/change-password", payload);
  return response.data;
};

export const deleteAccount = async () => {
  const response = await axiosInstance.delete("/auth/delete-account");
  return response.data;
};
