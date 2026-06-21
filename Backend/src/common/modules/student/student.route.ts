import { Router } from "express";
import { StudentController } from "./student.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import {
    createStudentProfileValidationSchema,
    updateStudentProfileValidationSchema,
} from "./student.validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student profile creation, updates, and retrieval endpoints
 */

/**
 * @swagger
 * /students/create-profile:
 *   post:
 *     summary: Create student profile
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classLevel:
 *                 type: string
 *                 example: Class 10
 *               schoolCollege:
 *                 type: string
 *                 example: Dhaka City College
 *               preferredSubjects:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Math", "Physics"]
 *               district:
 *                 type: string
 *                 example: Dhaka
 *               area:
 *                 type: string
 *                 example: Dhanmondi
 *               guardianName:
 *                 type: string
 *                 example: Robert Doe
 *               guardianPhone:
 *                 type: string
 *                 example: "+8801712345678"
 *     responses:
 *       201:
 *         description: Student profile created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only accessible by students)
 */
router.post(
    "/create-profile",
    auth,
    roleGuard("STUDENT"),
    validateRequest(createStudentProfileValidationSchema),
    StudentController.createProfile
);

/**
 * @swagger
 * /students/my-profile:
 *   get:
 *     summary: Get logged-in student's profile details
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student profile retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only accessible by students)
 */
router.get(
    "/my-profile",
    auth,
    roleGuard("STUDENT"),
    StudentController.getMyProfile
);

/**
 * @swagger
 * /students/update-profile:
 *   patch:
 *     summary: Update logged-in student's profile details
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classLevel:
 *                 type: string
 *                 example: Class 11
 *               schoolCollege:
 *                 type: string
 *                 example: Dhaka College
 *               preferredSubjects:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Math", "Chemistry"]
 *               district:
 *                 type: string
 *                 example: Dhaka
 *               area:
 *                 type: string
 *                 example: Mirpur
 *               guardianName:
 *                 type: string
 *                 example: Robert Doe Jr.
 *               guardianPhone:
 *                 type: string
 *                 example: "+8801712345679"
 *     responses:
 *       200:
 *         description: Student profile updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only accessible by students)
 */
router.patch(
    "/update-profile",
    auth,
    roleGuard("STUDENT"),
    validateRequest(updateStudentProfileValidationSchema),
    StudentController.updateProfile
);

export const StudentRoutes = router;
