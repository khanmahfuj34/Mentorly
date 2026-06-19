import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { TutorRoutes } from "../modules/tutor/tutor.route";
import { StudentRoutes } from "../modules/student/student.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/tutors", TutorRoutes);
router.use("/students", StudentRoutes);

export default router;