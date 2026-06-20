"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_1 = require("../../middlewares/auth");
const roleGuard_1 = require("../../middlewares/roleGuard");
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.AuthController.register);
router.post("/login", auth_controller_1.AuthController.login);
router.get("/me", auth_1.auth, auth_controller_1.AuthController.getMe);
router.post("/refresh-token", auth_controller_1.AuthController.refreshToken);
router.post("/logout", auth_controller_1.AuthController.logout);
router.get("/admin", auth_1.auth, (0, roleGuard_1.roleGuard)("ADMIN"), (req, res) => {
    res.json({
        success: true,
        message: "Admin Route Access Granted",
    });
});
router.get("/tutor", auth_1.auth, (0, roleGuard_1.roleGuard)("TUTOR"), (req, res) => {
    res.json({
        success: true,
        message: "Tutor Route Access Granted",
    });
});
exports.AuthRoutes = router;
