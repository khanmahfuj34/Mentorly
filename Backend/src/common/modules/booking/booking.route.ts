import { Router } from "express";
import { BookingController } from "./booking.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import { BookingValidation } from "./booking.validation";

const router = Router();

router.get(
  "/my-bookings",
  auth,
  roleGuard("STUDENT", "TUTOR"),
  validateRequest(BookingValidation.getMyBookingsQueryValidationSchema),
  BookingController.getMyBookings
);

router.get(
  "/:id",
  auth,
  roleGuard("STUDENT", "TUTOR", "ADMIN"),
  BookingController.getSingleBooking
);

router.patch(
  "/:id/complete",
  auth,
  roleGuard("STUDENT", "TUTOR"),
  BookingController.completeBooking
);

router.patch(
  "/:id/cancel",
  auth,
  roleGuard("STUDENT", "TUTOR"),
  BookingController.cancelBooking
);

export const BookingRoutes = router;
