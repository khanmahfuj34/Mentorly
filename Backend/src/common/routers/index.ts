import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { TutorRoutes } from "../modules/tutor/tutor.route";
import { StudentRoutes } from "../modules/student/student.route";
import { TuitionRequestRoutes } from "../modules/tuitionRequest/tuitionRequest.route";
import { TutorApplicationRoutes } from "../modules/tutorApplication/tutorApplication.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/tutors", TutorRoutes);
router.use("/students", StudentRoutes);
router.use("/tuition-requests", TuitionRequestRoutes);
router.use("/tutor-applications", TutorApplicationRoutes);

export default router;