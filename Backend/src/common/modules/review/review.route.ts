import { Router } from "express";
import { ReviewController } from "./review.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import { ReviewValidation } from "./review.validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Student reviews submitted for completed tutor bookings
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Submit a tutor review for a completed booking
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingId
 *               - rating
 *             properties:
 *               bookingId:
 *                 type: string
 *                 example: ck3456789...
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Great tutor! Highly recommended.
 *     responses:
 *       201:
 *         description: Review submitted successfully
 *       400:
 *         description: Validation error or review already exists
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only accessible by students)
 */
router.post(
  "/",
  auth,
  roleGuard("STUDENT"),
  validateRequest(ReviewValidation.createReviewValidationSchema),
  ReviewController.createReview
);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review (Student author or Admin only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete(
  "/:id",
  auth,
  ReviewController.deleteReview
);

/**
 * @swagger
 * /reviews/my-reviews:
 *   get:
 *     summary: Get all reviews submitted or received by the logged-in user
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, rating]
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Reviews list retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/my-reviews",
  auth,
  validateRequest(ReviewValidation.getReviewsQueryValidationSchema),
  ReviewController.getMyReviews
);

/**
 * @swagger
 * /reviews/tutor/{tutorId}:
 *   get:
 *     summary: Get reviews received by a specific tutor (Public endpoint)
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: tutorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tutor User ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, rating]
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Tutor reviews retrieved successfully
 *       404:
 *         description: Tutor not found
 */
router.get(
  "/tutor/:tutorId",
  validateRequest(ReviewValidation.getReviewsQueryValidationSchema),
  ReviewController.getTutorReviews
);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get details of a single review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Review not found
 */
router.get(
  "/:id",
  auth,
  ReviewController.getSingleReview
);

export const ReviewRoutes = router;
