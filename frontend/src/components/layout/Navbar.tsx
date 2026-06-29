import { useEffect, useId, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  CandlestickChart,
  ShoppingCart,
  Wallet,
  Receipt,
  Menu,
  X,
} from "lucide-react";

type NavItem = {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Live Prices", path: "/", icon: CandlestickChart },
  { label: "Buy", path: "/buy", icon: ShoppingCart },
  { label: "Portfolio", path: "/portfolio", icon: Wallet },
  { label: "Transactions", path: "/transactions", icon: Receipt },
];

interface NavbarProps {
  isFetching?: boolean;
  dataUpdatedAt?: number;
}

export function Navbar({ isFetching, dataUpdatedAt }: NavbarProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const panelId = useId();

  // Close the mobile menu on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Logo — only route that always works, goes to Live Prices */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5"
          aria-label="BullionX — go to Live Prices"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-gold/30 bg-gold/10">
            <span className="text-[13px] font-bold text-gold-dark">B</span>
          </span>
          <span className="text-[17px] font-bold tracking-tight text-slate-900">
            Bullion<span className="text-gold-dark">X</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={[
                  "relative rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
                  isActive
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-900",
                ].join(" ")}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-gold transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </NavLink>
            );
          })}
        </nav>

        {/* Right side: status + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden text-xs text-slate-400 sm:block">
            {isFetching ? (
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                Refreshing
              </span>
            ) : dataUpdatedAt && dataUpdatedAt > 0 ? (
              <span className="tabular-nums">
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
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={panelId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 sm:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile collapsible panel — inline accordion, not an overlay drawer */}
      <div
        id={panelId}
        className={`overflow-hidden border-t border-slate-200 transition-[max-height] duration-300 ease-in-out sm:hidden ${
          menuOpen ? "max-h-80" : "max-h-0 border-t-0"
        }`}
      >
        <nav
          className="flex flex-col gap-1 px-4 py-3"
          aria-label="Primary mobile"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={[
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors",
                  isActive
                    ? "bg-gold/10 text-gold-dark"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                {item.label}
              </NavLink>
            );
          })}

          {(isFetching || (dataUpdatedAt && dataUpdatedAt > 0)) && (
            <div className="mt-1 border-t border-slate-100 px-3 pt-2.5 text-xs text-slate-400">
              {isFetching ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                  Refreshing
                </span>
              ) : (
                <span className="tabular-nums">
                  Updated{" "}
                  {new Intl.DateTimeFormat("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Kolkata",
                  }).format(new Date(dataUpdatedAt!))}{" "}
                  IST
                </span>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
