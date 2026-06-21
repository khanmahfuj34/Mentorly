import { z } from "zod";
import { notificationTypes } from "./notification.constant";

const getMyNotificationsQueryValidationSchema = z.object({
  query: z.object({
    searchTerm: z.string().optional(),
    isRead: z.enum(["true", "false"]).optional(),
    type: z.enum(notificationTypes as [string, ...string[]]).optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});

export const NotificationValidation = {
  getMyNotificationsQueryValidationSchema,
};
