import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useLivePrices } from "../../features/prices/hooks/useLivePrices";

export function AppLayout() {
  const { isFetching, dataUpdatedAt } = useLivePrices();

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <Navbar isFetching={isFetching} dataUpdatedAt={dataUpdatedAt} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
