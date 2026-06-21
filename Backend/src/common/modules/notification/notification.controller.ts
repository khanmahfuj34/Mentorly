import { Request, Response } from "express";
import { NotificationService } from "./notification.service";
import { catchAsync } from "../../helpers/catchAsync";
import { sendResponse } from "../../helpers/sendResponse";

/**
 * Controller to fetch notifications for the logged-in user.
 */
const getMyNotifications = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await NotificationService.getMyNotifications(userId, req.query);

  sendResponse(
    res,
    200,
    true,
    "Notifications retrieved successfully",
    result.data,
    result.meta
  );
});

/**
 * Controller to fetch the unread notifications count for the logged-in user.
 */
const getUnreadCount = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await NotificationService.getUnreadCount(userId);

  sendResponse(
    res,
    200,
    true,
    "Unread notification count retrieved successfully",
    result
  );
});

/**
 * Controller to mark a single notification as read.
 */
const markSingleNotificationRead = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const id = req.params.id as string;
  const result = await NotificationService.markSingleNotificationRead(userId, id);

  sendResponse(
    res,
    200,
    true,
    "Notification marked as read successfully",
    result
  );
});

/**
 * Controller to mark all notifications as read.
 */
const markAllNotificationsRead = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const result = await NotificationService.markAllNotificationsRead(userId);

  sendResponse(
    res,
    200,
    true,
    "All notifications marked as read successfully",
    result
  );
});

/**
 * Controller to delete a notification.
 */
const deleteNotification = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const id = req.params.id as string;
  const result = await NotificationService.deleteNotification(userId, id);

  sendResponse(
    res,
    200,
    true,
    "Notification deleted successfully",
    result
  );
});

export const NotificationController = {
  getMyNotifications,
  getUnreadCount,
  markSingleNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
};
