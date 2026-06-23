import type { Request, Response } from "express";
import { z } from "zod";
import { getLivePrices, getPriceHistory } from "../services/prices.service";
import { MetalSymbol } from "../types/prices.types";

const historyQuerySchema = z.object({
  metal: z.enum(["GOLD", "SILVER"]),
  days: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 7))
    .pipe(z.number().min(1).max(90)),
});

export async function getLivePricesController(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const data = await getLivePrices();
    res.json({
      success: true,
      data,
      message: "Live prices fetched successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch live prices";
    console.error("[PricesController] getLivePrices error:", error);
    res.status(502).json({ success: false, error: "UPSTREAM_ERROR", message });
  }
}

export async function getPriceHistoryController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const parsed = historyQuerySchema.safeParse(req.query);

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        error: "VALIDATION_ERROR",
        message: parsed.error.issues.map((e) => e.message).join(", "),
      });
      return;
    }

    const { metal, days } = parsed.data;
    const data = await getPriceHistory(metal as MetalSymbol, days);

    res.json({
      success: true,
      data,
      message: "Price history fetched successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch price history";
    console.error("[PricesController] getPriceHistory error:", error);
    res.status(500).json({ success: false, error: "INTERNAL_ERROR", message });
  }
}
