import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { TutorRoutes } from "../modules/tutor/tutor.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/tutors", TutorRoutes);

export default router;