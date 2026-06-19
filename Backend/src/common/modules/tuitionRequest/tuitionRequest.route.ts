import { Router } from "express";
import { TuitionRequestController } from "./tuitionRequest.controller";
import { auth } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import {
    createTuitionRequestValidationSchema,
    updateTuitionRequestValidationSchema,
} from "./tuitionRequest.validation";

const router = Router();

router.post(
    "/",
    auth,
    roleGuard("STUDENT"),
    validateRequest(createTuitionRequestValidationSchema),
    TuitionRequestController.createTuitionRequest
);

router.get(
    "/my-requests",
    auth,
    roleGuard("STUDENT"),
    TuitionRequestController.getMyTuitionRequests
);

router.get(
    "/:id",
    auth,
    TuitionRequestController.getSingleTuitionRequest
);

router.patch(
    "/:id",
    auth,
    roleGuard("STUDENT"),
    validateRequest(updateTuitionRequestValidationSchema),
    TuitionRequestController.updateTuitionRequest
);

router.delete(
    "/:id",
    auth,
    roleGuard("STUDENT"),
    TuitionRequestController.deleteTuitionRequest
);

export const TuitionRequestRoutes = router;
