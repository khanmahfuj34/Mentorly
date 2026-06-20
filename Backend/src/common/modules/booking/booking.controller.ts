import { Request, Response } from "express";
import { BookingService } from "./booking.service";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const role = req.user.role;
  const result = await BookingService.getMyBookings(userId, role, req.query);

  sendResponse(
    res,
    200,
    true,
    "My bookings retrieved successfully",
    result
  );
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const role = req.user.role;
  const id = req.params.id as string;
  const result = await BookingService.getSingleBooking(userId, role, id);

  sendResponse(
    res,
    200,
    true,
    "Booking details retrieved successfully",
    result
  );
});

const completeBooking = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const role = req.user.role;
  const id = req.params.id as string;
  const result = await BookingService.completeBooking(userId, role, id);

  sendResponse(
    res,
    200,
    true,
    "Booking completed successfully",
    result
  );
});

const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const role = req.user.role;
  const id = req.params.id as string;
  const result = await BookingService.cancelBooking(userId, role, id);

  sendResponse(
    res,
    200,
    true,
    "Booking cancelled successfully",
    result
  );
});

export const BookingController = {
  getMyBookings,
  getSingleBooking,
  completeBooking,
  cancelBooking,
};
