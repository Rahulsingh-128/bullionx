import axios from "axios";
import type {
  LivePricesResponse,
  MetalSymbol,
  PriceHistoryData,
} from "../types/prices.types";
import type { ApiResponse } from "../../../types/global.types";
import { mockPrices } from "../mocks/mockPrices";
import { mockGoldHistory, mockSilverHistory } from "../mocks/mockHistory";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3001",
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export async function fetchLivePrices(): Promise<LivePricesResponse> {
  if (USE_MOCK) {
    return mockPrices;
  }
  const response =
    await api.get<ApiResponse<LivePricesResponse>>("/api/prices/live");

  if (!response.data.success) {
    throw new Error(response.data.message ?? "Failed to fetch live prices");
  }

  return response.data.data;
}

export async function fetchPriceHistory(
  metal: MetalSymbol,
  days: number = 7,
): Promise<PriceHistoryData> {

  if (USE_MOCK) {
    return metal === "GOLD" ? mockGoldHistory : mockSilverHistory;
  }
  
  const response = await api.get<ApiResponse<PriceHistoryData>>(
    "/api/prices/history",
    { params: { metal, days } },
  );

  if (!response.data.success) {
    throw new Error(response.data.message ?? "Failed to fetch price history");
  }

  return response.data.data;
}
     