import { categoryService } from "../services/category.service.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const categoryController = {
  list: asyncHandler(async (req, res) => {
    const { items, meta } = await categoryService.list(req.query);
    return sendSuccess(res, { data: { categories: items }, meta });
  }),

  create: asyncHandler(async (req, res) => {
    const category = await categoryService.create(req.body);
    return sendSuccess(res, { statusCode: 201, message: "Category created", data: { category } });
  }),

  update: asyncHandler(async (req, res) => {
    const category = await categoryService.update(req.params.id, req.body);
    return sendSuccess(res, { message: "Category updated", data: { category } });
  }),

  remove: asyncHandler(async (req, res) => {
    await categoryService.remove(req.params.id);
    return sendSuccess(res, { message: "Category deleted" });
  }),
};
