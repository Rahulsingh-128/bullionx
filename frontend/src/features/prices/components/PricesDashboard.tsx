import { useLivePrices } from "../hooks/useLivePrices";
import { PriceCard } from "./PriceCard";
import { PriceChart } from "./PriceChart";

function PriceCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
      <div className="h-1 w-full bg-slate-100" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-slate-100 rounded" />
          <div className="h-4 w-12 bg-slate-100 rounded-full" />
        </div>
        <div className="h-8 w-40 bg-slate-100 rounded" />
        <div className="h-3 w-32 bg-slate-100 rounded" />
        <div className="h-3 w-28 bg-slate-100 rounded" />
      </div>
    </div>
  );
}

export function PricesDashboard() {
  const { data, isLoading, isError, error, isFetching, dataUpdatedAt } =
    useLivePrices();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">B</span>
            </div>
            <span className="font-bold text-slate-900 tracking-tight">
              BullionX
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            {isFetching && (
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Refreshing…
              </span>
            )}
            {dataUpdatedAt > 0 && !isFetching && (
              <span>
                Updated{" "}
                {new Intl.DateTimeFormat("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Kolkata",
                }).format(new Date(dataUpdatedAt))}{" "}
                IST
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Live Prices</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Real-time Gold & Silver in INR · Auto-refreshes every 30 seconds
          </p>
        </div>

        {/* Error banner */}
        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-start gap-2">
            <span className="mt-0.5">⚠</span>
            <div>
              <span className="font-semibold">Unable to load prices. </span>
              {error?.message ?? "Please check your connection and try again."}
            </div>
          </div>
        )}

        {/* Price cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isLoading ? (
            <>
              <PriceCardSkeleton />
              <PriceCardSkeleton />
            </>
          ) : data ? (
            <>
              <PriceCard data={data.gold} />
              <PriceCard data={data.silver} />
            </>
          ) : null}
        </div>

        {/* Chart */}
        <PriceChart />
      </main>
    </div>
  );
}
