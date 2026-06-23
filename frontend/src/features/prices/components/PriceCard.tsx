import type { LivePriceData } from "../types/prices.types";


interface PriceCardProps {
  data: LivePriceData;
}

function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function formatLastUpdated(isoString: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(new Date(isoString));
}

const METAL_CONFIG = {
  GOLD: {
    label: "Gold",
    icon: "◆",
    accent: "from-yellow-400 to-amber-500",
    badgeBg: "bg-yellow-50 text-yellow-800",
    borderColor: "border-yellow-200",
    iconColor: "text-yellow-500",
  },
  SILVER: {
    label: "Silver",
    icon: "◈",
    accent: "from-slate-300 to-slate-400",
    badgeBg: "bg-slate-50 text-slate-700",
    borderColor: "border-slate-200",
    iconColor: "text-slate-400",
  },
} as const;

export function PriceCard({ data }: PriceCardProps) {
  const config = METAL_CONFIG[data.metal];
  const isPositive = data.percentChange >= 0;

  return (
    <div
      className={`relative bg-white rounded-2xl border ${config.borderColor} shadow-sm overflow-hidden`}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${config.accent}`} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`text-xl ${config.iconColor}`}>{config.icon}</span>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
              {config.label}
            </span>
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              isPositive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {formatPercent(data.percentChange)}
          </span>
        </div>

        {/* Price */}
        <div className="mb-1">
          <span className="text-3xl font-bold text-slate-900 tracking-tight">
            {formatINR(data.pricePerGramINR)}
          </span>
          <span className="ml-1.5 text-xs text-slate-400 font-medium">
            / gram
          </span>
        </div>

        {/* Secondary info */}
        <div className="text-xs text-slate-400 mb-4">
          USD ${data.pricePerOzUSD.toLocaleString("en-US")} / troy oz
          &nbsp;·&nbsp; 1 USD = ₹{data.usdInrRate.toFixed(2)}
        </div>

        {/* Last updated */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Updated at {formatLastUpdated(data.lastUpdated)} IST
        </div>
      </div>
    </div>
  );
}
