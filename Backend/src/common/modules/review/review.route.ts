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

router.delete(
  "/:id",
  auth,
  ReviewController.deleteReview
);

router.get(
  "/my-reviews",
  auth,
  validateRequest(ReviewValidation.getReviewsQueryValidationSchema),
  ReviewController.getMyReviews
);

router.get(
  "/tutor/:tutorId",
  validateRequest(ReviewValidation.getReviewsQueryValidationSchema),
  ReviewController.getTutorReviews
);

router.get(
  "/:id",
  auth,
  ReviewController.getSingleReview
);

export const ReviewRoutes = router;
