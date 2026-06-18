import { Router } from "express";
import { AuthController } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", auth, AuthController.getMe);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", AuthController.logout);
router.get(
    "/admin",
    auth,
    roleGuard("ADMIN"),
    (req, res) => {
        res.json({
            success: true,
            message: "Admin Route Access Granted",
        });
    }
);
router.get(
    "/tutor",
    auth,
    roleGuard("TUTOR"),
    (req, res) => {
        res.json({
            success: true,
            message: "Tutor Route Access Granted",
        });
    }
);
export const AuthRoutes = router;