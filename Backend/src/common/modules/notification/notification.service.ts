import { prisma } from "../../../config/prisma";
import { INotificationFilterRequest } from "./notification.interface";

/**
 * Get all notifications belonging to the logged-in user with filters, pagination, and sorting.
 */
const getMyNotifications = async (userId: string, filters: INotificationFilterRequest) => {
  const {
    searchTerm,
    isRead,
    type,
    page = "1",
    limit = "10",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  const parsedPage = Number(page) || 1;
  const parsedLimit = Number(limit) || 10;
  const skip = (parsedPage - 1) * parsedLimit;

  // Build filters
  const where: any = {
    userId,
  };

  if (isRead !== undefined) {
    where.isRead = isRead === "true";
  }

  if (type) {
    where.type = type;
  }

  if (searchTerm) {
    where.OR = [
      { title: { contains: searchTerm, mode: "insensitive" } },
      { message: { contains: searchTerm, mode: "insensitive" } },
    ];
  }

  // Fetch results and total count in parallel
  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: parsedLimit,
    }),
    prisma.notification.count({ where }),
  ]);

  return {
    meta: {
      page: parsedPage,
      limit: parsedLimit,
      total,
    },
    data: notifications,
  };
};

/**
 * Get the total count of unread notifications for a user.
 */
const getUnreadCount = async (userId: string) => {
  const count = await prisma.notification.count({
    where: {
      userId,
      isRead: false,
    },
  });

  return {
    count,
  };
};

/**
 * Mark a single notification as read after checking ownership.
 */
const markSingleNotificationRead = async (userId: string, id: string) => {
  const notification = await prisma.notification.findUnique({
    where: { id },
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  if (notification.userId !== userId) {
    throw new Error("You are not authorized to access this notification");
  }

  const updatedNotification = await prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });

  return updatedNotification;
};

/**
 * Mark all notifications of a user as read.
 */
const markAllNotificationsRead = async (userId: string) => {
  const result = await prisma.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });

  return result;
};

/**
 * Delete a notification after checking ownership.
 */
const deleteNotification = async (userId: string, id: string) => {
  const notification = await prisma.notification.findUnique({
    where: { id },
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  if (notification.userId !== userId) {
    throw new Error("You are not authorized to delete this notification");
  }

  const deletedNotification = await prisma.notification.delete({
    where: { id },
  });

  return deletedNotification;
};

export const NotificationService = {
  getMyNotifications,
  getUnreadCount,
  markSingleNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
};
