import { z } from "zod";

export const mongoIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid MongoDB id");

export const paginationQuerySchema = {
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  search: z.string().trim().optional(),
  status: z.enum(["active", "inactive"]).optional(),
};

export const idParamSchema = z.object({
  params: z.object({ id: mongoIdSchema }),
});

export const optionalBooleanString = z.enum(["true", "false"]).optional();
