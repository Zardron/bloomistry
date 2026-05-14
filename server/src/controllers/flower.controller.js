import { flowerService } from "../services/flower.service.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const flowerController = {
  list: asyncHandler(async (req, res) => {
    const { items, meta } = await flowerService.list(req.query);
    return sendSuccess(res, { data: { flowers: items }, meta });
  }),

  getById: asyncHandler(async (req, res) => {
    const flower = await flowerService.getById(req.params.id);
    return sendSuccess(res, { data: { flower } });
  }),

  create: asyncHandler(async (req, res) => {
    const flower = await flowerService.create(req.body, req.file);
    return sendSuccess(res, { statusCode: 201, message: "Flower created", data: { flower } });
  }),

  update: asyncHandler(async (req, res) => {
    const flower = await flowerService.update(req.params.id, req.body, req.file);
    return sendSuccess(res, { message: "Flower updated", data: { flower } });
  }),

  remove: asyncHandler(async (req, res) => {
    await flowerService.remove(req.params.id);
    return sendSuccess(res, { message: "Flower deleted" });
  }),
};
