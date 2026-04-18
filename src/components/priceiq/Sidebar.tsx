import { Link, useLocation } from "@tanstack/react-router";
import { LayoutGrid, Package, Radar, Activity, ScrollText } from "lucide-react";

const nav = [
  { to: "/", label: "Overview", icon: LayoutGrid },
  { to: "/products", label: "Products", icon: Package },
  { to: "/competitors", label: "Competitors", icon: Radar },
  { to: "/signals", label: "Signals", icon: Activity },
  { to: "/logs", label: "Logs", icon: ScrollText },
] as const;

export function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] border-r border-border bg-background flex flex-col z-30">
      <div className="px-6 pt-7 pb-10">
        <div className="flex items-center gap-2.5">
          <h1 className="font-serif text-[20px] leading-none text-foreground tracking-tight">PriceIQ</h1>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-pulse-amber" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
          </span>
        </div>
        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Engine · Live
        </p>
      </div>

      <nav className="px-3 flex-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`w-full flex items-center gap-3 px-3 py-2 text-[13px] rounded-sm transition-colors ${
                isActive
                  ? "text-foreground bg-surface"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface/60"
              }`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span>{item.label}</span>
              {isActive && <span className="ml-auto h-1 w-1 rounded-full bg-accent" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-5 border-t border-border">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          v0.4.2 · build 8821
        </p>
      </div>
    </aside>
  );
}
