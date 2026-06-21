import { Router } from "express";
import { AdminController } from "./admin.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import { AdminValidation } from "./admin.validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrative dashboard, tutor approval workflows, and statistics
 */

/**
 * @swagger
 * /admin/tutors/pending:
 *   get:
 *     summary: Get a list of pending tutor profiles waiting for approval
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search by name, email, university, or department
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           default: "1"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *           default: "10"
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: "createdAt"
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: "desc"
 *     responses:
 *       200:
 *         description: Pending tutors list retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only accessible by administrators)
 */
router.get(
  "/tutors/pending",
  auth,
  roleGuard("ADMIN"),
  validateRequest(AdminValidation.getTutorsQueryValidationSchema),
  AdminController.getPendingTutors
);

/**
 * @swagger
 * /admin/tutors:
 *   get:
 *     summary: Get a list of already approved tutor profiles
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search by name, email, university, or department
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           default: "1"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *           default: "10"
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: "createdAt"
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: "desc"
 *     responses:
 *       200:
 *         description: Approved tutors list retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (only accessible by administrators)
 */
router.get(
  "/tutors",
  auth,
  roleGuard("ADMIN"),
  validateRequest(AdminValidation.getTutorsQueryValidationSchema),
  AdminController.getApprovedTutors
);

/**
 * @swagger
 * /admin/tutors/{id}/approve:
 *   patch:
 *     summary: Approve a pending tutor profile
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tutor profile ID (not User ID)
 *     responses:
 *       200:
 *         description: Tutor profile approved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Tutor profile not found
 */
router.patch(
  "/tutors/:id/approve",
  auth,
  roleGuard("ADMIN"),
  AdminController.approveTutor
);

/**
 * @swagger
 * /admin/tutors/{id}/reject:
 *   patch:
 *     summary: Reject or revoke approval of a tutor profile
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tutor profile ID (not User ID)
 *     responses:
 *       200:
 *         description: Tutor profile status updated to rejected/unapproved
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Tutor profile not found
 */
router.patch(
  "/tutors/:id/reject",
  auth,
  roleGuard("ADMIN"),
  AdminController.rejectTutor
);

/**
 * @swagger
 * /admin/dashboard-stats:
 *   get:
 *     summary: Get dashboard statistics (Student, Tutor, Booking, and Review counts)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics metrics calculated and retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/dashboard-stats",
  auth,
  roleGuard("ADMIN"),
  AdminController.getDashboardStats
);

export const AdminRoutes = router;
