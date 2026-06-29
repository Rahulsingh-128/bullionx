import { useQuery } from "@tanstack/react-query";
import { fetchLivePrices } from "../services/prices.service";
import type { LivePricesResponse } from "../types/prices.types";

const LIVE_PRICES_QUERY_KEY = ["prices", "live"] as const;
const REFETCH_INTERVAL_MS = 30_000;

export function useLivePrices() {
  return useQuery<LivePricesResponse, Error>({
    queryKey: LIVE_PRICES_QUERY_KEY,
    queryFn: fetchLivePrices,
    refetchInterval: REFETCH_INTERVAL_MS,
    refetchIntervalInBackground: false,
    staleTime: REFETCH_INTERVAL_MS,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
  });
}
