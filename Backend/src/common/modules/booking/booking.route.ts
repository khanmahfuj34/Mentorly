import { Router } from "express";
import { BookingController } from "./booking.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import { BookingValidation } from "./booking.validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Student-Tutor booking schedules, management, cancellation, and completions
 */

/**
 * @swagger
 * /bookings/my-bookings:
 *   get:
 *     summary: Get all bookings belonging to the logged-in student or tutor
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, ACTIVE, COMPLETED, CANCELLED]
 *         description: Filter bookings by status
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           default: "1"
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *           default: "10"
 *         description: Size of each page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: "createdAt"
 *         description: Sort field name
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: "desc"
 *         description: Sorting order
 *     responses:
 *       200:
 *         description: Bookings retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/my-bookings",
  auth,
  roleGuard("STUDENT", "TUTOR"),
  validateRequest(BookingValidation.getMyBookingsQueryValidationSchema),
  BookingController.getMyBookings
);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Retrieve single booking details
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Booking not found
 */
router.get(
  "/:id",
  auth,
  roleGuard("STUDENT", "TUTOR", "ADMIN"),
  BookingController.getSingleBooking
);

/**
 * @swagger
 * /bookings/{id}/cancel:
 *   patch:
 *     summary: Cancel an active booking (Student only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.patch(
  "/:id/cancel",
  auth,
  roleGuard("STUDENT"),
  BookingController.cancelBooking
);

/**
 * @swagger
 * /bookings/{id}/complete:
 *   patch:
 *     summary: Mark an active booking as completed (Tutor only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking marked as completed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.patch(
  "/:id/complete",
  auth,
  roleGuard("TUTOR"),
  BookingController.completeBooking
);

export const BookingRoutes = router;
