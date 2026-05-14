import { z } from "zod";
import {
  idParamSchema,
  mongoIdSchema,
  optionalBooleanString,
  paginationQuerySchema,
} from "./common.validation.js";

const tagsSchema = z.preprocess((value) => {
  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return value;
}, z.array(z.string().trim().min(1)).optional());

const flowerBody = z.object({
  name: z.string().trim().min(2).max(160),
  slug: z.string().trim().min(2).max(180).optional(),
  description: z.string().trim().max(2000).optional(),
  price: z.coerce.number().min(0),
  priceLabel: z.string().trim().max(80).optional(),
  category: mongoIdSchema,
  tags: tagsSchema,
  isFeatured: z.coerce.boolean().optional(),
  isActive: z.coerce.boolean().optional(),
});

export const listFlowersSchema = z.object({
  query: z.object({
    ...paginationQuerySchema,
    category: mongoIdSchema.optional(),
    featured: optionalBooleanString,
    minPrice: z.coerce.number().min(0).optional(),
    maxPrice: z.coerce.number().min(0).optional(),
    sort: z.enum(["newest", "price"]).optional(),
  }),
});

export const createFlowerSchema = z.object({
  body: flowerBody,
});

export const updateFlowerSchema = z.object({
  ...idParamSchema.shape,
  body: flowerBody.partial(),
});
