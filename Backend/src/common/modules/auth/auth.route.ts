import { Router } from "express";
import { AuthController } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication, registration, session management, and authorization checks
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user (Student, Tutor, or Admin)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecureP@ss123
 *               role:
 *                 type: string
 *                 enum: [STUDENT, TUTOR, ADMIN]
 *                 default: STUDENT
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request / validation error
 */
router.post("/register", AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user and get tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecureP@ss123
 *     responses:
 *       200:
 *         description: Login successful, returns token
 *       401:
 *         description: Unauthorized / Invalid credentials
 */
router.post("/login", AuthController.login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get profile of the logged-in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/me", auth, AuthController.getMe);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token using a refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Invalid refresh token
 */
router.post("/refresh-token", AuthController.refreshToken);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out a user and clear sessions/cookies
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", AuthController.logout);

/**
 * @swagger
 * /auth/admin:
 *   get:
 *     summary: Verify Admin role access
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin access granted
 *       403:
 *         description: Forbidden access
 */
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

/**
 * @swagger
 * /auth/tutor:
 *   get:
 *     summary: Verify Tutor role access
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tutor access granted
 *       403:
 *         description: Forbidden access
 */
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