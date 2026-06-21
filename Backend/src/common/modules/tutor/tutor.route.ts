import { Router } from "express";
import { TutorController } from "./tutor.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import {
    createTutorProfileValidationSchema,
    updateTutorProfileValidationSchema,
} from "./tutor.validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tutors
 *   description: Tutor profile creation, updates, and retrieval endpoints
 */

/**
 * @swagger
 * /tutors/create-profile:
 *   post:
 *     summary: Create tutor profile
 *     tags: [Tutors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 example: Experienced Math and Physics tutor.
 *               profilePhoto:
 *                 type: string
 *                 example: https://example.com/photo.jpg
 *               phoneNumber:
 *                 type: string
 *                 example: "+8801712345678"
 *               university:
 *                 type: string
 *                 example: BUET
 *               department:
 *                 type: string
 *                 example: CSE
 *               currentInstitution:
 *                 type: string
 *                 example: BUET
 *               teachingSubjects:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Mathematics", "Physics"]
 *               preferredClasses:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Class 9", "Class 10"]
 *               medium:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["English", "Bangla"]
 *               experienceYears:
 *                 type: integer
 *                 example: 3
 *               hourlyRate:
 *                 type: number
 *                 example: 500
 *               teachingStyle:
 *                 type: string
 *                 example: Interactive and project-based.
 *               demoClassOffered:
 *                 type: boolean
 *                 example: true
 *               district:
 *                 type: string
 *                 example: Dhaka
 *               area:
 *                 type: string
 *                 example: Dhanmondi
 *     responses:
 *       201:
 *         description: Tutor profile created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only accessible by tutors)
 */
router.post(
    "/create-profile",
    auth,
    roleGuard("TUTOR"),
    validateRequest(createTutorProfileValidationSchema),
    TutorController.createProfile
);

/**
 * @swagger
 * /tutors/my-profile:
 *   get:
 *     summary: Get logged-in tutor's profile details
 *     tags: [Tutors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tutor profile retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only accessible by tutors)
 */
router.get(
    "/my-profile",
    auth,
    roleGuard("TUTOR"),
    TutorController.getMyProfile
);

/**
 * @swagger
 * /tutors/update-profile:
 *   patch:
 *     summary: Update logged-in tutor's profile details
 *     tags: [Tutors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 example: Passionate educator with 5+ years of experience.
 *               profilePhoto:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               experienceYears:
 *                 type: integer
 *                 example: 5
 *               hourlyRate:
 *                 type: number
 *                 example: 600
 *               district:
 *                 type: string
 *               area:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tutor profile updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only accessible by tutors)
 */
router.patch(
    "/update-profile",
    auth,
    roleGuard("TUTOR"),
    validateRequest(updateTutorProfileValidationSchema),
    TutorController.updateProfile
);

export const TutorRoutes = router;