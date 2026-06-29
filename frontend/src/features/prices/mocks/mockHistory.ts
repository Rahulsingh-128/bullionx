import type { PriceHistoryData } from "../types/prices.types";

export const mockGoldHistory: PriceHistoryData = {
  metal: "GOLD",
  history: [
    { date: "2026-06-18", pricePerGramINR: 9650.25 },
    { date: "2026-06-19", pricePerGramINR: 9695.4 },
    { date: "2026-06-20", pricePerGramINR: 9728.15 },
    { date: "2026-06-21", pricePerGramINR: 9762.8 },
    { date: "2026-06-22", pricePerGramINR: 9798.1 },
    { date: "2026-06-23", pricePerGramINR: 9835.75 },
    { date: "2026-06-24", pricePerGramINR: 9868.5 },
  ],
};

export const mockSilverHistory: PriceHistoryData = {
  metal: "SILVER",
  history: [
    { date: "2026-06-18", pricePerGramINR: 104.8 },
    { date: "2026-06-19", pricePerGramINR: 105.3 },
    { date: "2026-06-20", pricePerGramINR: 106.15 },
    { date: "2026-06-21", pricePerGramINR: 107.05 },
    { date: "2026-06-22", pricePerGramINR: 108.2 },
    { date: "2026-06-23", pricePerGramINR: 109.1 },
    { date: "2026-06-24", pricePerGramINR: 110.05 },
  ],
};
