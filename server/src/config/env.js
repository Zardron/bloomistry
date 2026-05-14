import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { z } from "zod";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const serverEnvPath = path.resolve(configDir, "../../.env");

dotenv.config({ path: serverEnvPath });
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  JWT_COOKIE_NAME: z.string().default("bloomistry_token"),
  CLIENT_URL: z.string().url().default("http://localhost:3000"),
  CORS_ORIGINS: z.string().default("http://localhost:3000"),
  UPLOAD_DIR: z.string().default("uploads"),
  MAX_FILE_SIZE_MB: z.coerce.number().positive().default(5),
  RATE_LIMIT_WINDOW_MINUTES: z.coerce.number().positive().default(15),
  RATE_LIMIT_MAX: z.coerce.number().positive().default(300),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid server environment", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  ...parsed.data,
  isProduction: parsed.data.NODE_ENV === "production",
  corsOrigins: parsed.data.CORS_ORIGINS.split(",").map((origin) => origin.trim()),
  uploadDir: parsed.data.UPLOAD_DIR,
  maxFileSizeBytes: parsed.data.MAX_FILE_SIZE_MB * 1024 * 1024,
};
