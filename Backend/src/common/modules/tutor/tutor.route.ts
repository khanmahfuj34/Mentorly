import { Router } from "express";
import { TutorController } from "./tutor.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import {
    createTutorProfileValidationSchema,
    updateTutorProfileValidationSchema,
} from "./tutor.validation";

const router = Router();

router.post(
    "/create-profile",
    auth,
    roleGuard("TUTOR"),
    validateRequest(createTutorProfileValidationSchema),
    TutorController.createProfile
);

router.get(
    "/my-profile",
    auth,
    roleGuard("TUTOR"),
    TutorController.getMyProfile
);

router.patch(
    "/update-profile",
    auth,
    roleGuard("TUTOR"),
    validateRequest(updateTutorProfileValidationSchema),
    TutorController.updateProfile
);

export const TutorRoutes = router;