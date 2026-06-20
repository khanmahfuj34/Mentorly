import { Router } from "express";
import { ReviewController } from "./review.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import { ReviewValidation } from "./review.validation";

const router = Router();

router.post(
  "/",
  auth,
  roleGuard("STUDENT"),
  validateRequest(ReviewValidation.createReviewValidationSchema),
  ReviewController.createReview
);

router.get(
  "/tutor/:tutorId",
  ReviewController.getTutorReviews
);

router.get(
  "/my-reviews",
  auth,
  roleGuard("STUDENT", "TUTOR"),
  ReviewController.getMyReviews
);

export const ReviewRoutes = router;
