import { Router } from "express";
import { getLivePricesController, getPriceHistoryController } from "../controllers/prices.controller";

const router = Router();

router.get("/live", getLivePricesController);
router.get("/history", getPriceHistoryController);

export default router;
