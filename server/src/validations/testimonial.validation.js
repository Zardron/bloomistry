import { z } from "zod";
import { idParamSchema, paginationQuerySchema } from "./common.validation.js";

const testimonialBody = z.object({
  customerName: z.string().trim().min(2).max(140).optional(),
  isActive: z.coerce.boolean().optional(),
});

export const listTestimonialsSchema = z.object({
  query: z.object({
    ...paginationQuerySchema,
  }),
});

export const createTestimonialSchema = z.object({
  body: testimonialBody,
});

export const updateTestimonialSchema = z.object({
  ...idParamSchema.shape,
  body: testimonialBody.partial(),
});
