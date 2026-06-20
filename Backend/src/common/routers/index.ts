import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { TutorRoutes } from "../modules/tutor/tutor.route";
import { StudentRoutes } from "../modules/student/student.route";
import { TuitionRequestRoutes } from "../modules/tuitionRequest/tuitionRequest.route";
import { TutorApplicationRoutes } from "../modules/tutorApplication/tutorApplication.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { ReviewRoutes } from "../modules/review/review.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { AvailabilityRoutes } from "../modules/availability/availability.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/tutors", TutorRoutes);
router.use("/students", StudentRoutes);
router.use("/tuition-requests", TuitionRequestRoutes);
router.use("/tutor-applications", TutorApplicationRoutes);
router.use("/bookings", BookingRoutes);
router.use("/reviews", ReviewRoutes);
router.use("/admin", AdminRoutes);
router.use("/availability", AvailabilityRoutes);

export default router;