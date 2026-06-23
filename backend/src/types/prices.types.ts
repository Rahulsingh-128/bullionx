export type MetalSymbol = "GOLD" | "SILVER";

export interface GoldAPIResponse {
  price: number; // price per troy oz in USD
  prev_close_price: number;
  ch: number; // change in USD
  chp: number; // change percentage
  timestamp: number;
}

export interface ExchangeRateResponse {
  rates: {
    INR: number;
  };
}

export interface LivePriceData {
  metal: MetalSymbol;
  pricePerGramINR: number;
  pricePerOzUSD: number;
  usdInrRate: number;
  percentChange: number;
  lastUpdated: string;
}

export interface PriceHistoryPoint {
  date: string;
  pricePerGramINR: number;
}

export interface PriceHistoryData {
  metal: MetalSymbol;
  history: PriceHistoryPoint[];
}

export interface LivePricesResponse {
  gold: LivePriceData;
  silver: LivePriceData;
}
