import { ZodError } from "zod";
import { env } from "../config/env.js";

export function errorHandler(error, _req, res, _next) {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error";
  let details = error.details || null;

  if (error instanceof ZodError) {
    statusCode = 422;
    message = "Validation failed";
    details = error.flatten().fieldErrors;
  }

  if (error.name === "ValidationError") {
    statusCode = 422;
    message = "Validation failed";
    details = Object.fromEntries(
      Object.entries(error.errors).map(([field, value]) => [field, value.message]),
    );
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = "Duplicate resource";
    details = error.keyValue;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {}),
    ...(!env.isProduction ? { stack: error.stack } : {}),
  });
}
