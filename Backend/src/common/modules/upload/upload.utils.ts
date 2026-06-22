import multer from "multer";

const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (_req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, JPG, PNG, and WEBP image files are allowed"));
    }
  },
});