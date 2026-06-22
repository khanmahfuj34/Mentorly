import cloudinary from "../../../config/cloudinary";

const uploadImage = async (file: Express.Multer.File) => {
  if (!file || !file.buffer || !file.mimetype) {
    throw new Error("No file provided or file is invalid");
  }

  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new Error("Only JPEG, JPG, PNG, and WEBP image files are allowed");
  }

  const base64Image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

  try {
    const response = await cloudinary.uploader.upload(base64Image, {
      folder: "mentorly",
    });

    if (!response || !response.secure_url || !response.public_id) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    return {
      url: response.secure_url,
      publicId: response.public_id,
    };
  } catch (error: any) {
    throw new Error(error.message || "Failed to upload image to Cloudinary");
  }
};

export const UploadService = {
  uploadImage,
};