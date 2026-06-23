import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { cache, CACHE_TTL_SECONDS } from "../config/cache";
import { GoldAPIResponse, LivePriceData, LivePricesResponse, MetalSymbol, PriceHistoryData, PriceHistoryPoint } from "../types/prices.types";

const prisma = new PrismaClient();

const TROY_OZ_TO_GRAMS = 31.1035;
const GOLDAPI_BASE_URL = "https://www.goldapi.io/api";
const GOLDAPI_KEY = process.env.GOLDAPI_KEY ?? "";
const EXCHANGE_API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

const CACHE_KEYS = {
  LIVE_PRICES: "prices:live",
  USD_INR_RATE: "prices:usd_inr",
} as const;

async function fetchUsdInrRate(): Promise<number> {
  const cached = cache.get<number>(CACHE_KEYS.USD_INR_RATE);
  if (cached !== null) return cached;

  const response = await axios.get<{ rates: { INR: number } }>(
    EXCHANGE_API_URL,
  );
  const rate = response.data.rates.INR;

  if (!rate || typeof rate !== "number") {
    throw new Error("Invalid USD/INR exchange rate received");
  }

  cache.set(CACHE_KEYS.USD_INR_RATE, rate, CACHE_TTL_SECONDS);
  return rate;
}

async function fetchMetalPrice(
  symbol: "XAU" | "XAG",
): Promise<GoldAPIResponse> {
  if (!GOLDAPI_KEY) {
    throw new Error("GOLDAPI_KEY environment variable is not set");
  }

  const response = await axios.get<GoldAPIResponse>(
    `${GOLDAPI_BASE_URL}/${symbol}/USD`,
    {
      headers: {
        "x-access-token": GOLDAPI_KEY,
        "Content-Type": "application/json",
      },
      timeout: 10_000,
    },
  );

  if (!response.data?.price) {
    throw new Error(`Invalid response from GoldAPI for ${symbol}`);
  }

  return response.data;
}

async function buildLivePriceData(
  metal: MetalSymbol,
  apiData: GoldAPIResponse,
  usdInrRate: number,
): Promise<LivePriceData> {
  const pricePerGramINR = (apiData.price / TROY_OZ_TO_GRAMS) * usdInrRate;

  // Persist snapshot to DB
  await prisma.metalPrice.create({
    data: {
      metal,
      pricePerGramINR,
      pricePerOzUSD: apiData.price,
      usdInrRate,
      percentChange: apiData.chp,
      source: "goldapi.io",
    },
  });

  return {
    metal,
    pricePerGramINR: parseFloat(pricePerGramINR.toFixed(2)),
    pricePerOzUSD: apiData.price,
    usdInrRate,
    percentChange: apiData.chp,
    lastUpdated: new Date().toISOString(),
  };
}

export async function getLivePrices(): Promise<LivePricesResponse> {
  const cached = cache.get<LivePricesResponse>(CACHE_KEYS.LIVE_PRICES);
  if (cached !== null) return cached;

  const [usdInrRate, goldData, silverData] = await Promise.all([
    fetchUsdInrRate(),
    fetchMetalPrice("XAU"),
    fetchMetalPrice("XAG"),
  ]);

  const [gold, silver] = await Promise.all([
    buildLivePriceData("GOLD", goldData, usdInrRate),
    buildLivePriceData("SILVER", silverData, usdInrRate),
  ]);

  const result: LivePricesResponse = { gold, silver };
  cache.set(CACHE_KEYS.LIVE_PRICES, result, CACHE_TTL_SECONDS);

  return result;
}

export async function getPriceHistory(
  metal: MetalSymbol,
  days: number,
): Promise<PriceHistoryData> {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const records = await prisma.metalPrice.findMany({
    where: {
      metal,
      createdAt: { gte: since },
    },
    orderBy: { createdAt: "asc" },
    select: {
      createdAt: true,
      pricePerGramINR: true,
    },
  });

  // Group by date — keep the last snapshot per day
  const byDay = new Map<string, number>();
  for (const record of records) {
    const dateKey = record.createdAt.toISOString().split("T")[0];
    byDay.set(dateKey, record.pricePerGramINR);
  }

  const history: PriceHistoryPoint[] = Array.from(byDay.entries()).map(
    ([date, pricePerGramINR]) => ({
      date,
      pricePerGramINR: parseFloat(pricePerGramINR.toFixed(2)),
    }),
  );

  return { metal, history };
}
