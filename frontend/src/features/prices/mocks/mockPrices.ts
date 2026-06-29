import type { LivePricesResponse } from "../types/prices.types";

export const mockPrices: LivePricesResponse = {
  gold: {
    metal: "GOLD",
    pricePerGramINR: 9850.25,
    pricePerOzUSD: 3365.42,
    usdInrRate: 86.12,
    percentChange: 0.52,
    lastUpdated: new Date().toISOString(),
  },
  silver: {
    metal: "SILVER",
    pricePerGramINR: 109.85,
    pricePerOzUSD: 38.14,
    usdInrRate: 86.12,
    percentChange: -0.31,
    lastUpdated: new Date().toISOString(),
  },
};
