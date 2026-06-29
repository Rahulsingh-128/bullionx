import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { usePriceHistory } from "../hooks/usePriceHistory";
import type { MetalSymbol } from "../types/prices.types";

interface MergedPoint {
  date: string;
  gold?: number;
  silver?: number;
}

interface ChartPayloadItem {
  name: string;
  value: number;
  color: string;
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
  }).format(new Date(dateStr));
}

function formatINRShort(value: number): string {
  if (value >= 1_00_000) return `₹${(value / 1_00_000).toFixed(1)}L`;
  if (value >= 1_000) return `₹${(value / 1_000).toFixed(1)}K`;
  return `₹${value.toFixed(0)}`;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: ChartPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-600 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-500 capitalize">{entry.name}:</span>
          <span className="font-semibold text-slate-800">
            ₹{entry.value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}{" "}
            /g
          </span>
        </div>
      ))}
    </div>
  );
}

interface MetalChartLineProps {
  metal: MetalSymbol;
  days: number;
}

function useChartData(metal: MetalSymbol, days: number) {
  return usePriceHistory(metal, days);
}

export function PriceChart() {
  const days = 7;
  const goldQuery = useChartData("GOLD", days);
  const silverQuery = useChartData("SILVER", days);

  const isLoading = goldQuery.isLoading || silverQuery.isLoading;
  const isError = goldQuery.isError || silverQuery.isError;

  // Merge both datasets by date
  const mergedData: MergedPoint[] = (() => {
    const map = new Map<string, MergedPoint>();

    goldQuery.data?.history.forEach(({ date, pricePerGramINR }) => {
      map.set(date, { date: formatDate(date), gold: pricePerGramINR });
    });

    silverQuery.data?.history.forEach(({ date, pricePerGramINR }) => {
      const existing = map.get(date) ?? { date: formatDate(date) };
      map.set(date, { ...existing, silver: pricePerGramINR });
    });

    return Array.from(map.values()).sort((a, b) =>
      a.date.localeCompare(b.date),
    );
  })();

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 h-80 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-amber-400 rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-400">Loading 7-day chart…</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white border border-red-100 rounded-2xl p-6 h-80 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-red-500">
            Chart data unavailable
          </p>
          <p className="text-xs text-slate-400">
            History builds as prices are tracked
          </p>
        </div>
      </div>
    );
  }

  if (mergedData.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 h-80 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-slate-500">No history yet</p>
          <p className="text-xs text-slate-400">
            Snapshots accumulate automatically every 60 seconds
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold text-slate-700">
          7-Day Price History
        </h2>
        <span className="text-xs text-slate-400">Price per gram (INR)</span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={mergedData}
          margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="silverGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatINRShort}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            width={56}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
          />

          <Area
            type="monotone"
            dataKey="gold"
            name="Gold"
            stroke="#f59e0b"
            strokeWidth={2}
            fill="url(#goldGradient)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
            connectNulls
          />
          <Area
            type="monotone"
            dataKey="silver"
            name="Silver"
            stroke="#94a3b8"
            strokeWidth={2}
            fill="url(#silverGradient)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
            connectNulls
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
