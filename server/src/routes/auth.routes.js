import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema } from "../validations/auth.validation.js";

export const authRouter = Router();

authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.get("/me", authenticate, authController.me);
authRouter.post("/logout", authenticate, authController.logout);
