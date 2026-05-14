import { testimonialService } from "../services/testimonial.service.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const testimonialController = {
  list: asyncHandler(async (req, res) => {
    const { items, meta } = await testimonialService.list(req.query);
    return sendSuccess(res, { data: { testimonials: items }, meta });
  }),

  create: asyncHandler(async (req, res) => {
    const testimonial = await testimonialService.create(req.body, req.file);
    return sendSuccess(res, {
      statusCode: 201,
      message: "Customer photo created",
      data: { testimonial },
    });
  }),

  update: asyncHandler(async (req, res) => {
    const testimonial = await testimonialService.update(req.params.id, req.body, req.file);
    return sendSuccess(res, { message: "Customer photo updated", data: { testimonial } });
  }),

  remove: asyncHandler(async (req, res) => {
    await testimonialService.remove(req.params.id);
    return sendSuccess(res, { message: "Customer photo deleted" });
  }),
};
