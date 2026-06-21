import { Router } from "express";
import { NotificationController } from "./notification.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import { NotificationValidation } from "./notification.validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Real-time and persistent notification management endpoints for users
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get all notifications for the logged-in user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: isRead
 *         schema:
 *           type: string
 *           enum: ["true", "false"]
 *         description: Filter by read/unread status
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by specific NotificationType enum
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search by title or message
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
 *         description: Notifications list retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  auth,
  roleGuard("STUDENT", "TUTOR", "ADMIN"),
  validateRequest(NotificationValidation.getMyNotificationsQueryValidationSchema),
  NotificationController.getMyNotifications
);

/**
 * @swagger
 * /notifications/unread-count:
 *   get:
 *     summary: Retrieve total unread notifications count for the logged-in user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Count retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/unread-count",
  auth,
  roleGuard("STUDENT", "TUTOR", "ADMIN"),
  NotificationController.getUnreadCount
);

/**
 * @swagger
 * /notifications/read-all:
 *   patch:
 *     summary: Mark all notifications of the logged-in user as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 *       401:
 *         description: Unauthorized
 */
router.patch(
  "/read-all",
  auth,
  roleGuard("STUDENT", "TUTOR", "ADMIN"),
  NotificationController.markAllNotificationsRead
);

/**
 * @swagger
 * /notifications/{id}/read:
 *   patch:
 *     summary: Mark a single notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not the owner)
 *       404:
 *         description: Notification not found
 */
router.patch(
  "/:id/read",
  auth,
  roleGuard("STUDENT", "TUTOR", "ADMIN"),
  NotificationController.markSingleNotificationRead
);

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Notification not found
 */
router.delete(
  "/:id",
  auth,
  roleGuard("STUDENT", "TUTOR", "ADMIN"),
  NotificationController.deleteNotification
);

export const NotificationRoutes = router;
