import { Router } from "express";

const router = Router();
router.get("/health", (_req, res) => {
  res.json({
    success: true,
    data: { status: "ok" },
    message: "BullionX API is running.",
  });
});

export default router;
