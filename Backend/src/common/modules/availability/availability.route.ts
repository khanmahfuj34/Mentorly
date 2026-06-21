import { Router } from "express";
import { AvailabilityController } from "./availability.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import { AvailabilityValidation } from "./availability.validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Availability
 *   description: Tutor schedule availability configuration and search endpoints
 */

/**
 * @swagger
 * /availability:
 *   post:
 *     summary: Create tutor availability schedule slot
 *     tags: [Availability]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - day
 *               - startTime
 *               - endTime
 *             properties:
 *               day:
 *                 type: string
 *                 enum: [SATURDAY, SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY]
 *                 example: SUNDAY
 *               startTime:
 *                 type: string
 *                 example: "09:00"
 *               endTime:
 *                 type: string
 *                 example: "10:30"
 *               isAvailable:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Availability slot created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only accessible by tutors)
 */
router.post(
  "/",
  auth,
  roleGuard("TUTOR"),
  validateRequest(AvailabilityValidation.createAvailabilityValidationSchema),
  AvailabilityController.createAvailability
);

/**
 * @swagger
 * /availability/my-schedule:
 *   get:
 *     summary: Get logged-in tutor's availability schedule slots
 *     tags: [Availability]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: day
 *         schema:
 *           type: string
 *           enum: [SATURDAY, SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY]
 *       - in: query
 *         name: isAvailable
 *         schema:
 *           type: string
 *           enum: [true, false]
 *     responses:
 *       200:
 *         description: Tutor schedule retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/my-schedule",
  auth,
  roleGuard("TUTOR"),
  validateRequest(AvailabilityValidation.getAvailabilityQueryValidationSchema),
  AvailabilityController.getMySchedule
);

/**
 * @swagger
 * /availability/tutor/{tutorId}:
 *   get:
 *     summary: Retrieve a specific tutor's schedule (Public endpoint)
 *     tags: [Availability]
 *     parameters:
 *       - in: path
 *         name: tutorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tutor User ID
 *       - in: query
 *         name: day
 *         schema:
 *           type: string
 *           enum: [SATURDAY, SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY]
 *       - in: query
 *         name: isAvailable
 *         schema:
 *           type: string
 *           enum: [true, false]
 *     responses:
 *       200:
 *         description: Tutor availability list retrieved successfully
 *       404:
 *         description: Tutor not found
 */
router.get(
  "/tutor/:tutorId",
  validateRequest(AvailabilityValidation.getAvailabilityQueryValidationSchema),
  AvailabilityController.getTutorSchedule
);

/**
 * @swagger
 * /availability/{id}:
 *   get:
 *     summary: Get details of a single availability slot (Public endpoint)
 *     tags: [Availability]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Availability slot ID
 *     responses:
 *       200:
 *         description: Slot details retrieved successfully
 *       404:
 *         description: Slot not found
 */
router.get(
  "/:id",
  AvailabilityController.getSingleAvailability
);

/**
 * @swagger
 * /availability/{id}:
 *   patch:
 *     summary: Update an availability slot (Tutor owner only)
 *     tags: [Availability]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Availability slot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               day:
 *                 type: string
 *                 enum: [SATURDAY, SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY]
 *               startTime:
 *                 type: string
 *                 example: "10:00"
 *               endTime:
 *                 type: string
 *                 example: "11:30"
 *               isAvailable:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Availability slot updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.patch(
  "/:id",
  auth,
  roleGuard("TUTOR"),
  validateRequest(AvailabilityValidation.updateAvailabilityValidationSchema),
  AvailabilityController.updateAvailability
);

/**
 * @swagger
 * /availability/{id}:
 *   delete:
 *     summary: Delete an availability slot (Tutor owner only)
 *     tags: [Availability]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Availability slot ID
 *     responses:
 *       200:
 *         description: Availability slot deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete(
  "/:id",
  auth,
  roleGuard("TUTOR"),
  AvailabilityController.deleteAvailability
);

export const AvailabilityRoutes = router;
