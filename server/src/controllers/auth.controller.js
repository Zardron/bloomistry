import { env } from "../config/env.js";
import { authService } from "../services/auth.service.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const cookieOptions = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: env.isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const authController = {
  login: asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);

    res.cookie(env.JWT_COOKIE_NAME, result.token, cookieOptions);
    return sendSuccess(res, {
      message: "Logged in successfully",
      data: result,
    });
  }),

  me: asyncHandler(async (req, res) =>
    sendSuccess(res, {
      message: "Authenticated user",
      data: { user: req.user },
    }),
  ),

  logout: asyncHandler(async (_req, res) => {
    res.clearCookie(env.JWT_COOKIE_NAME, cookieOptions);
    return sendSuccess(res, { message: "Logged out successfully" });
  }),
};
