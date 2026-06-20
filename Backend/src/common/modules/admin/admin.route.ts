import { Router } from "express";
import { AdminController } from "./admin.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import { AdminValidation } from "./admin.validation";

const router = Router();

router.get(
  "/tutors/pending",
  auth,
  roleGuard("ADMIN"),
  validateRequest(AdminValidation.getTutorsQueryValidationSchema),
  AdminController.getPendingTutors
);

router.get(
  "/tutors",
  auth,
  roleGuard("ADMIN"),
  validateRequest(AdminValidation.getTutorsQueryValidationSchema),
  AdminController.getAllTutors
);

router.patch(
  "/tutors/:id/approve",
  auth,
  roleGuard("ADMIN"),
  AdminController.approveTutor
);

router.patch(
  "/tutors/:id/reject",
  auth,
  roleGuard("ADMIN"),
  AdminController.rejectTutor
);

router.get(
  "/dashboard-stats",
  auth,
  roleGuard("ADMIN"),
  AdminController.getDashboardStats
);

export const AdminRoutes = router;
