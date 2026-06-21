import { Router } from "express";
import { TuitionRequestController } from "./tuitionRequest.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import {
    createTuitionRequestValidationSchema,
    updateTuitionRequestValidationSchema,
} from "./tuitionRequest.validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tuition Requests
 *   description: Student tuition request creation, updates, and list retrieval endpoints
 */

/**
 * @swagger
 * /tuition-requests:
 *   post:
 *     summary: Create a tuition request (tuition job post)
 *     tags: [Tuition Requests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - classLevel
 *               - district
 *               - area
 *               - salary
 *               - daysPerWeek
 *             properties:
 *               subject:
 *                 type: string
 *                 example: Mathematics
 *               classLevel:
 *                 type: string
 *                 example: Class 9
 *               medium:
 *                 type: string
 *                 example: English
 *               genderPreference:
 *                 type: string
 *                 example: MALE
 *               district:
 *                 type: string
 *                 example: Dhaka
 *               area:
 *                 type: string
 *                 example: Dhanmondi
 *               salary:
 *                 type: number
 *                 example: 5000
 *               daysPerWeek:
 *                 type: integer
 *                 example: 3
 *               description:
 *                 type: string
 *                 example: Need a tutor who can teach math three days a week.
 *     responses:
 *       201:
 *         description: Tuition request created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only accessible by students)
 */
router.post(
    "/",
    auth,
    roleGuard("STUDENT"),
    validateRequest(createTuitionRequestValidationSchema),
    TuitionRequestController.createTuitionRequest
);

/**
 * @swagger
 * /tuition-requests/my-requests:
 *   get:
 *     summary: Retrieve tuition requests posted by the logged-in student
 *     tags: [Tuition Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Requests retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/my-requests",
    auth,
    roleGuard("STUDENT"),
    TuitionRequestController.getMyTuitionRequests
);

/**
 * @swagger
 * /tuition-requests/{id}:
 *   get:
 *     summary: Get details of a single tuition request
 *     tags: [Tuition Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tuition request ID
 *     responses:
 *       200:
 *         description: Tuition request details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tuition request not found
 */
router.get(
    "/:id",
    auth,
    TuitionRequestController.getSingleTuitionRequest
);

/**
 * @swagger
 * /tuition-requests/{id}:
 *   patch:
 *     summary: Update an existing tuition request
 *     tags: [Tuition Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tuition request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               classLevel:
 *                 type: string
 *               salary:
 *                 type: number
 *               daysPerWeek:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tuition request updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.patch(
    "/:id",
    auth,
    roleGuard("STUDENT"),
    validateRequest(updateTuitionRequestValidationSchema),
    TuitionRequestController.updateTuitionRequest
);

/**
 * @swagger
 * /tuition-requests/{id}:
 *   delete:
 *     summary: Delete a tuition request
 *     tags: [Tuition Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tuition request ID
 *     responses:
 *       200:
 *         description: Tuition request deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete(
    "/:id",
    auth,
    roleGuard("STUDENT"),
    TuitionRequestController.deleteTuitionRequest
);

export const TuitionRequestRoutes = router;
