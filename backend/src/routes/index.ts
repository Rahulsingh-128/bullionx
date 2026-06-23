import { Router } from "express";
import priceRoutes from "./prices.route";

const router = Router();

router.use("/health", (_req, res) => {
  res.json({
    success: true,
    data: { status: "ok" },
    message: "BullionX API is running.",
  });
});
router.use("/prices", priceRoutes);

export default router;
