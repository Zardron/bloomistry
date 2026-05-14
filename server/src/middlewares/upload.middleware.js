import multer from "multer";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

export const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: env.maxFileSizeBytes },
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      return callback(new ApiError(415, "Only image files are allowed"));
    }

    return callback(null, true);
  },
});
