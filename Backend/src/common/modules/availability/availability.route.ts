import { Router } from "express";
import { AvailabilityController } from "./availability.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import { AvailabilityValidation } from "./availability.validation";

const router = Router();

router.post(
  "/",
  auth,
  roleGuard("TUTOR"),
  validateRequest(AvailabilityValidation.createAvailabilityValidationSchema),
  AvailabilityController.createAvailability
);

router.get(
  "/my-schedule",
  auth,
  roleGuard("TUTOR"),
  validateRequest(AvailabilityValidation.getAvailabilityQueryValidationSchema),
  AvailabilityController.getMySchedule
);

router.get(
  "/tutor/:tutorId",
  validateRequest(AvailabilityValidation.getAvailabilityQueryValidationSchema),
  AvailabilityController.getTutorSchedule
);

router.get(
  "/:id",
  AvailabilityController.getSingleAvailability
);

router.patch(
  "/:id",
  auth,
  roleGuard("TUTOR"),
  validateRequest(AvailabilityValidation.updateAvailabilityValidationSchema),
  AvailabilityController.updateAvailability
);

router.delete(
  "/:id",
  auth,
  roleGuard("TUTOR"),
  AvailabilityController.deleteAvailability
);

export const AvailabilityRoutes = router;
