import { Router } from "express";
import { TutorApplicationController } from "./tutorApplication.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import { TutorApplicationValidation } from "./tutorApplication.validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tutor Applications
 *   description: Tutor application submission, request list retrieval, and student decision making (accept/reject)
 */

/**
 * @swagger
 * /tutor-applications/apply/{tuitionRequestId}:
 *   post:
 *     summary: Submit a tutor application to a specific tuition request
 *     tags: [Tutor Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tuitionRequestId
 *         required: true
 *         schema:
 *           type: string
 *         description: The target tuition request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coverLetter:
 *                 type: string
 *                 example: I have 3 years of experience teaching Mathematics and would love to help.
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only accessible by tutors)
 */
router.post(
  "/apply/:tuitionRequestId",
  auth,
  roleGuard("TUTOR"),
  validateRequest(TutorApplicationValidation.createTutorApplicationValidationSchema),
  TutorApplicationController.applyToTuitionRequest
);

/**
 * @swagger
 * /tutor-applications/my-applications:
 *   get:
 *     summary: Retrieve applications submitted by the logged-in tutor
 *     tags: [Tutor Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: My applications list retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/my-applications",
  auth,
  roleGuard("TUTOR"),
  TutorApplicationController.getMyApplications
);

/**
 * @swagger
 * /tutor-applications/request/{tuitionRequestId}:
 *   get:
 *     summary: Get all applications submitted for a tuition request (Student owner view)
 *     tags: [Tutor Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tuitionRequestId
 *         required: true
 *         schema:
 *           type: string
 *         description: The tuition request ID
 *     responses:
 *       200:
 *         description: Applications list retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/request/:tuitionRequestId",
  auth,
  roleGuard("STUDENT"),
  TutorApplicationController.getApplicationsByTuitionRequest
);

/**
 * @swagger
 * /tutor-applications/{id}/accept:
 *   patch:
 *     summary: Accept a tutor application (Creates a Booking and rejects others)
 *     tags: [Tutor Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tutor application ID
 *     responses:
 *       200:
 *         description: Application accepted and booking created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.patch(
  "/:id/accept",
  auth,
  roleGuard("STUDENT"),
  TutorApplicationController.acceptApplication
);

/**
 * @swagger
 * /tutor-applications/{id}/reject:
 *   patch:
 *     summary: Reject a specific tutor application
 *     tags: [Tutor Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tutor application ID
 *     responses:
 *       200:
 *         description: Application rejected successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.patch(
  "/:id/reject",
  auth,
  roleGuard("STUDENT"),
  TutorApplicationController.rejectApplication
);

export const TutorApplicationRoutes = router;
