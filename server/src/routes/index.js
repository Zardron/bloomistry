import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { categoryRouter } from "./category.routes.js";
import { flowerRouter } from "./flower.routes.js";
import { testimonialRouter } from "./testimonial.routes.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Bloomistry API is healthy",
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/flowers", flowerRouter);
apiRouter.use("/customers", testimonialRouter);
apiRouter.use("/testimonials", testimonialRouter);
