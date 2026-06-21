import { prisma } from "../../../config/prisma";
import { ICreateNotificationPayload } from "./notification.interface";

/**
 * Utility helper to create a database notification.
 * This can be imported and triggered by various modules (Tutor Application, Booking, Review, Admin, etc.)
 */
export const createNotification = async (payload: ICreateNotificationPayload) => {
  const result = await prisma.notification.create({
    data: {
      userId: payload.userId,
      title: payload.title,
      message: payload.message,
      type: payload.type,
      referenceId: payload.referenceId || null,
      referenceType: payload.referenceType || null,
    },
  });
  return result;
};
