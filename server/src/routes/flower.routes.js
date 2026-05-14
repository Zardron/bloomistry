import { Router } from "express";
import { flowerController } from "../controllers/flower.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { uploadImage } from "../middlewares/upload.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { idParamSchema } from "../validations/common.validation.js";
import {
  createFlowerSchema,
  listFlowersSchema,
  updateFlowerSchema,
} from "../validations/flower.validation.js";

export const flowerRouter = Router();

flowerRouter.get("/", validate(listFlowersSchema), flowerController.list);
flowerRouter.get("/:id", validate(idParamSchema), flowerController.getById);
flowerRouter.post(
  "/",
  authenticate,
  authorize("admin", "editor"),
  uploadImage.single("image"),
  validate(createFlowerSchema),
  flowerController.create,
);
flowerRouter.patch(
  "/:id",
  authenticate,
  authorize("admin", "editor"),
  uploadImage.single("image"),
  validate(updateFlowerSchema),
  flowerController.update,
);
flowerRouter.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(idParamSchema),
  flowerController.remove,
);
