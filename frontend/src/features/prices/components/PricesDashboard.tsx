import { useLivePrices } from "../hooks/useLivePrices";
import { PriceCard } from "../components/PriceCard";
import { PriceChart } from "../components/PriceChart";
import { Navbar } from "../../../components/layout/Navbar";

function PriceCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
      aria-hidden="true"
    >
      <div className="h-1 w-full bg-slate-100" />
      <div className="space-y-4 p-6">
        <div className="flex justify-between">
          <div className="h-4 w-20 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-12 animate-pulse rounded-full bg-slate-100" />
        </div>
        <div className="h-8 w-40 animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-28 animate-pulse rounded bg-slate-100" />
      </div>
    </div>
  );
}

export function PricesDashboard() {
  const { data, isLoading, isError, error, isFetching, dataUpdatedAt } =
    useLivePrices();

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* <Navbar isFetching={isFetching} dataUpdatedAt={dataUpdatedAt} /> */}

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        {/* Page title */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-dark">
            Spot rates
          </p>
          <h1 className="mt-0.5 text-2xl font-bold text-slate-900">
            Live Prices
          </h1>
          <p className="mt-0.5 text-sm text-slate-400">
            Real-time Gold &amp; Silver in INR · Auto-refreshes every 30 seconds
          </p>
        </div>

        {/* Error banner */}
        {isError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <span className="mt-0.5" aria-hidden="true">
              ⚠
            </span>
            <div>
              <span className="font-semibold">Unable to load prices. </span>
              {error?.message ?? "Please check your connection and try again."}
            </div>
          </div>
        )}

        {/* Price cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
