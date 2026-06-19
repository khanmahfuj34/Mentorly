import { Router } from "express";
import { StudentController } from "./student.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import {
    createStudentProfileValidationSchema,
    updateStudentProfileValidationSchema,
} from "./student.validation";

const router = Router();

router.post(
    "/create-profile",
    auth,
    roleGuard("STUDENT"),
    validateRequest(createStudentProfileValidationSchema),
    StudentController.createProfile
);

router.get(
    "/my-profile",
    auth,
    roleGuard("STUDENT"),
    StudentController.getMyProfile
);

router.patch(
    "/update-profile",
    auth,
    roleGuard("STUDENT"),
    validateRequest(updateStudentProfileValidationSchema),
    StudentController.updateProfile
);

export const StudentRoutes = router;
