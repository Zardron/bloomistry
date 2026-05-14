import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.email().trim().toLowerCase(),
    password: z.string().min(8),
  }),
});
