import { z } from "zod";
import { idParamSchema, paginationQuerySchema } from "./common.validation.js";

const categoryBody = z.object({
  name: z.string().trim().min(2).max(120),
  slug: z.string().trim().min(2).max(140).optional(),
  description: z.string().trim().max(1000).optional(),
  priceLabel: z.string().trim().max(80).optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
  isActive: z.coerce.boolean().optional(),
});

export const listCategoriesSchema = z.object({
  query: z.object(paginationQuerySchema),
});

export const createCategorySchema = z.object({
  body: categoryBody,
});

export const updateCategorySchema = z.object({
  ...idParamSchema.shape,
  body: categoryBody.partial(),
});
