import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function getToken(req) {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    return header.slice(7);
  }

  return req.cookies?.[env.JWT_COOKIE_NAME];
}

export const authenticate = asyncHandler(async (req, _res, next) => {
  const token = getToken(req);

  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  const payload = jwt.verify(token, env.JWT_SECRET);
  const user = await User.findById(payload.sub).select("-password");

  if (!user || !user.isActive) {
    throw new ApiError(401, "Invalid authentication token");
  }

  req.user = user;
  next();
});

export const authorize = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user?.role)) {
    return next(new ApiError(403, "You do not have permission to perform this action"));
  }

  return next();
};
