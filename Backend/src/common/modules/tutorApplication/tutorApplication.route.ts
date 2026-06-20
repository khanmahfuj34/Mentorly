import { Router } from "express";
import { TutorApplicationController } from "./tutorApplication.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import { TutorApplicationValidation } from "./tutorApplication.validation";

const router = Router();

router.post(
  "/apply/:tuitionRequestId",
  auth,
  roleGuard("TUTOR"),
  validateRequest(TutorApplicationValidation.createTutorApplicationValidationSchema),
  TutorApplicationController.applyToTuitionRequest
);

router.get(
  "/my-applications",
  auth,
  roleGuard("TUTOR"),
  TutorApplicationController.getMyApplications
);

router.get(
  "/request/:tuitionRequestId",
  auth,
  roleGuard("STUDENT"),
  TutorApplicationController.getApplicationsByTuitionRequest
);

router.patch(
  "/:id/accept",
  auth,
  roleGuard("STUDENT"),
  TutorApplicationController.acceptApplication
);

router.patch(
  "/:id/reject",
  auth,
  roleGuard("STUDENT"),
  TutorApplicationController.rejectApplication
);

export const TutorApplicationRoutes = router;
