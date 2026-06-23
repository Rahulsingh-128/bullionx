import { useQuery } from "@tanstack/react-query";
import { fetchPriceHistory } from "../services/prices.service";
import type { MetalSymbol, PriceHistoryData } from "../types/prices.types";

export function usePriceHistory(metal: MetalSymbol, days: number = 7) {
  return useQuery<PriceHistoryData, Error>({
    queryKey: ["prices", "history", metal, days],
    queryFn: () => fetchPriceHistory(metal, days),
    staleTime: 60_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
  });
}
