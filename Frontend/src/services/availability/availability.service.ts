import { axiosInstance } from "@/src/lib/axios";
import { IAvailabilitySlot, IAvailabilityResponse } from "@/src/types/availability";

export const getMyAvailability = async (): Promise<IAvailabilityResponse> => {
  const response = await axiosInstance.get("/availability/my-availability");
  return response.data;
};

export const updateMyAvailability = async (
  availability: IAvailabilitySlot[]
): Promise<IAvailabilityResponse> => {
  const response = await axiosInstance.patch("/availability/my-availability", {
    availability,
  });
  return response.data;
};
