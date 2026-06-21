import { Router } from "express";
import { NotificationController } from "./notification.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import { NotificationValidation } from "./notification.validation";

const router = Router();

/**
 * GET /api/v1/notifications
 * Retrieve my notifications (supports filters: isRead, type, searchTerm, pagination, sorting)
 */
router.get(
  "/",
  auth,
  roleGuard("STUDENT", "TUTOR", "ADMIN"),
  validateRequest(NotificationValidation.getMyNotificationsQueryValidationSchema),
  NotificationController.getMyNotifications
);

/**
 * GET /api/v1/notifications/unread-count
 * Get the count of unread notifications
 */
router.get(
  "/unread-count",
  auth,
  roleGuard("STUDENT", "TUTOR", "ADMIN"),
  NotificationController.getUnreadCount
);

/**
 * PATCH /api/v1/notifications/read-all
 * Mark all my notifications as read
 * Note: Must be declared before /:id/read to prevent route parameter collision
 */
router.patch(
  "/read-all",
  auth,
  roleGuard("STUDENT", "TUTOR", "ADMIN"),
  NotificationController.markAllNotificationsRead
);

/**
 * PATCH /api/v1/notifications/:id/read
 * Mark a specific notification as read
 */
router.patch(
  "/:id/read",
  auth,
  roleGuard("STUDENT", "TUTOR", "ADMIN"),
  NotificationController.markSingleNotificationRead
);

/**
 * DELETE /api/v1/notifications/:id
 * Delete a specific notification
 */
router.delete(
  "/:id",
  auth,
  roleGuard("STUDENT", "TUTOR", "ADMIN"),
  NotificationController.deleteNotification
);

export const NotificationRoutes = router;
