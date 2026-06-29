import { useEffect, useId, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  CandlestickChart,
  Wallet,
  Receipt,
  ShoppingCart,
  ChevronsLeft,
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

interface SidebarProps {
  /** Desktop collapsed (icon-rail) state */
  collapsed: boolean;
  onToggleCollapsed: () => void;
  /** Mobile drawer open state */
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({
  collapsed,
  onToggleCollapsed,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const location = useLocation();
  const headingId = useId();

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    onCloseMobile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile scrim */}
      <div
        aria-hidden={!mobileOpen}
        onClick={onCloseMobile}
        className={`fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-label="Primary"
        aria-labelledby={headingId}
        className={[
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-ink text-bone",
          "transition-[width,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          // Desktop width + persistent
          collapsed ? "lg:w-[76px]" : "lg:w-[248px]",
          "lg:translate-x-0",
          // Mobile: full drawer, slides in/out
          "w-[272px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 7px)",
        }}
      >
        {/* Brand */}
        <div
          className={`flex h-16 shrink-0 items-center border-b border-bullion-hairline ${
            collapsed ? "lg:justify-center lg:px-0" : ""
          } px-5`}
          style={{ borderColor: "var(--bullion-line-dark)" }}
        >
          <NavLink
            to="/"
            id={headingId}
            onClick={onCloseMobile}
            className="group flex items-center gap-2.5 overflow-hidden"
            aria-label="BullionX — go to Live Prices"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] border border-gold/40 bg-gradient-to-br from-gold/25 to-transparent">
              <span className="font-display text-[15px] leading-none text-gold">
                B
              </span>
            </span>
            <span
              className={`font-display text-[19px] tracking-tight text-bone transition-all duration-200 ${
                collapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"
              }`}
            >
              Bullion<span className="text-gold">X</span>
            </span>
          </NavLink>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <li key={item.path} className="relative">
                  <NavLink
                    to={item.path}
                    onClick={onCloseMobile}
                    title={collapsed ? item.label : undefined}
                    className={[
                      "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium",
                      "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
                      collapsed ? "lg:justify-center lg:px-0" : "",
                      isActive
                        ? "text-bone"
                        : "text-bone/55 hover:bg-white/[0.05] hover:text-bone/90",
                    ].join(" ")}
                  >
                    {/* Active gold rail */}
                    <span
                      className={`absolute left-0 top-1/2 h-[60%] w-[3px] -translate-y-1/2 rounded-full bg-gold transition-all duration-200 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {isActive && (
                      <span className="absolute inset-0 -z-10 rounded-lg bg-gold/[0.08]" />
                    )}
                    <Icon
                      className={`h-[18px] w-[18px] shrink-0 ${
                        isActive ? "text-gold" : ""
                      }`}
                      strokeWidth={1.75}
                    />
                    <span
                      className={`truncate transition-all duration-200 ${
                        collapsed ? "lg:hidden" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse toggle — desktop only */}
        <div
          className="hidden shrink-0 border-t p-3 lg:block"
          style={{ borderColor: "var(--bullion-line-dark)" }}
        >
          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-pressed={collapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-bone/50 transition-colors hover:bg-white/[0.05] hover:text-bone/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          >
            <ChevronsLeft
              className={`h-[18px] w-[18px] transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
              strokeWidth={1.75}
            />
            {!collapsed && <span className="text-[12.5px]">Collapse</span>}
          </button>
        </div>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close menu"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-bone/60 hover:bg-white/10 hover:text-bone lg:hidden"
        >
          <X className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </aside>
    </>
  );
}
