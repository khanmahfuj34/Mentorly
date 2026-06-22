import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { upload } from "./upload.utils";
import { UploadController } from "./upload.controller";

const router = Router();

router.post(
    "/image",
    auth,
    upload.single("image"),
    UploadController.uploadImage
);

export const UploadRoutes = router;