import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import { v4 as uuid } from "uuid";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

const absoluteUploadDir = path.resolve(env.uploadDir);
fs.mkdirSync(absoluteUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, absoluteUploadDir);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${uuid()}${extension}`);
  },
});

export const uploadImage = multer({
  storage,
  limits: { fileSize: env.maxFileSizeBytes },
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      return callback(new ApiError(415, "Only image files are allowed"));
    }

    return callback(null, true);
  },
});
