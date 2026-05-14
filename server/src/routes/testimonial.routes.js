import { Router } from "express";
import { testimonialController } from "../controllers/testimonial.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { uploadImage } from "../middlewares/upload.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { idParamSchema } from "../validations/common.validation.js";
import {
  createTestimonialSchema,
  listTestimonialsSchema,
  updateTestimonialSchema,
} from "../validations/testimonial.validation.js";

export const testimonialRouter = Router();

testimonialRouter.get("/", validate(listTestimonialsSchema), testimonialController.list);
testimonialRouter.post(
  "/",
  authenticate,
  authorize("admin", "editor"),
  uploadImage.single("image"),
  validate(createTestimonialSchema),
  testimonialController.create,
);
testimonialRouter.patch(
  "/:id",
  authenticate,
  authorize("admin", "editor"),
  uploadImage.single("image"),
  validate(updateTestimonialSchema),
  testimonialController.update,
);
testimonialRouter.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(idParamSchema),
  testimonialController.remove,
);
