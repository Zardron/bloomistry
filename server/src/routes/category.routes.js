import { Router } from "express";
import { categoryController } from "../controllers/category.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createCategorySchema,
  listCategoriesSchema,
  updateCategorySchema,
} from "../validations/category.validation.js";
import { idParamSchema } from "../validations/common.validation.js";

export const categoryRouter = Router();

categoryRouter.get("/", validate(listCategoriesSchema), categoryController.list);
categoryRouter.post(
  "/",
  authenticate,
  authorize("admin", "editor"),
  validate(createCategorySchema),
  categoryController.create,
);
categoryRouter.patch(
  "/:id",
  authenticate,
  authorize("admin", "editor"),
  validate(updateCategorySchema),
  categoryController.update,
);
categoryRouter.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(idParamSchema),
  categoryController.remove,
);
