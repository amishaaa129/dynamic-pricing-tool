import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/priceiq/Sidebar";
import { PageHeader } from "@/components/priceiq/PageHeader";
import { Sparkline } from "@/components/priceiq/Sparkline";
import { productRows, type ProductRow } from "@/lib/products-data";
import { formatINR } from "@/lib/mock-data";
import { ArrowUp, ArrowDown, Pencil, History, PauseCircle } from "lucide-react";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Products — PriceIQ" },
      { name: "description", content: "Track and optimise pricing across your full product catalogue." },
    ],
  }),
});

type Filter = "All" | "Optimised" | "Manual Override";

function ProductsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return productRows.filter((p) => {
      if (filter === "Optimised" && p.status !== "Optimised") return false;
      if (filter === "Manual Override" && p.status !== "Manual") return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [filter, query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="ml-[220px]">
        <PageHeader
          title="Products"
          subtitle="47 products tracked · 12 actively optimised"
          right={
            <div className="flex items-center gap-6">
              <SegmentedControl value={filter} onChange={setFilter} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-[220px] bg-transparent border-0 border-b border-border focus:border-accent focus:outline-none font-mono text-[12px] text-foreground placeholder:text-muted-foreground py-1.5"
              />
            </div>
          }
        />

        <div className="px-10 py-8 max-w-[1600px]">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="border-t border-border">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          <Pagination />
        </div>
      </main>
    </div>
  );
}

function SegmentedControl({ value, onChange }: { value: Filter; onChange: (v: Filter) => void }) {
  const options: Filter[] = ["All", "Optimised", "Manual Override"];
  return (
    <div className="flex border border-border rounded-full p-0.5">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.1em] rounded-full transition-colors ${
              active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function ProductCard({ product }: { product: ProductRow }) {
  const initial = product.name.charAt(0);
  const delta = product.suggested - product.current;
  const sparkColor =
    product.trendDir === "up"
      ? "var(--color-accent)"
      : product.trendDir === "down"
        ? "#C0504D"
        : "oklch(0.62 0.005 80)";
  const marketDelta = ((product.current - product.marketAvg) / product.marketAvg) * 100;
  const marketPct = Math.max(0, Math.min(100, 50 + marketDelta * 2));

  return (
    <div className="group grid grid-cols-[30%_15%_15%_15%_10%_15%] items-center gap-4 px-2 py-5 border-b border-border hover:bg-surface transition-colors">
      {/* Product info */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-10 w-10 flex items-center justify-center bg-surface text-accent font-serif text-[18px] shrink-0">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-foreground truncate">{product.name}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground mt-0.5">
            {product.category}
          </p>
          <p className="font-mono text-[9px] text-muted-foreground/70 mt-0.5">{product.sku}</p>
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="font-serif italic text-[18px] text-foreground leading-tight">
          {formatINR(product.current)}
        </p>
        <div className="flex items-center gap-1 mt-1 text-[11px]">
          {delta > 0 && (
            <>
              <ArrowUp className="h-3 w-3 text-accent" strokeWidth={2} />
              <span className="text-accent">{formatINR(product.suggested)}</span>
            </>
          )}
          {delta < 0 && (
            <>
              <ArrowDown className="h-3 w-3 text-muted-foreground" strokeWidth={2} />
              <span className="text-muted-foreground">{formatINR(product.suggested)}</span>
            </>
          )}
          {delta === 0 && <span className="text-muted-foreground">—</span>}
        </div>
      </div>

      {/* Demand spark */}
      <div>
        <Sparkline points={product.demandTrend} color={sparkColor} width={100} height={26} />
        <p className="text-[11px] text-foreground mt-1.5">
          Score <span className="text-muted-foreground">{product.demandScore}/100</span>
        </p>
      </div>

      {/* Competitor */}
      <div>
        <p className="text-[11px] text-muted-foreground">Mkt avg {formatINR(product.marketAvg)}</p>
        <div className="relative h-1 bg-surface mt-2 rounded-full overflow-hidden">
          <div className="absolute top-0 bottom-0 w-px bg-border-strong left-1/2" />
          <div
            className="absolute top-0 bottom-0 bg-accent"
            style={{
              left: marketDelta < 0 ? `${marketPct}%` : "50%",
              right: marketDelta < 0 ? "50%" : `${100 - marketPct}%`,
            }}
          />
        </div>
        <p className={`text-[10px] font-mono mt-1.5 ${marketDelta < 0 ? "text-accent" : "text-muted-foreground"}`}>
          {marketDelta > 0 ? "+" : ""}{marketDelta.toFixed(1)}% vs market
        </p>
      </div>

      {/* Engine */}
      <div>
        <StatusPill status={product.status} />
        <p className="font-mono text-[9px] text-muted-foreground mt-1.5">Updated {product.updated}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <IconBtn label="Edit price"><Pencil className="h-3.5 w-3.5" strokeWidth={1.5} /></IconBtn>
          <IconBtn label="View history"><History className="h-3.5 w-3.5" strokeWidth={1.5} /></IconBtn>
          <IconBtn label="Pause engine"><PauseCircle className="h-3.5 w-3.5" strokeWidth={1.5} /></IconBtn>
        </div>
        {product.status !== "Optimised" && (
          <button className="bg-accent text-accent-foreground text-[10px] font-mono uppercase tracking-[0.1em] px-3 py-1.5 hover:opacity-90 transition-opacity">
            Set Live
          </button>
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: ProductRow["status"] }) {
  if (status === "Optimised") {
    return (
      <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.1em] text-accent border border-accent/50 bg-surface">
        Optimised
      </span>
    );
  }
  if (status === "Manual") {
    return (
      <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.1em] text-foreground border border-foreground/40">
        Manual
      </span>
    );
  }
  return (
    <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
      Paused
    </span>
  );
}

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button title={label} aria-label={label} className="h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface rounded-sm transition-colors">
      {children}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-border px-6 py-10 text-center">
      <p className="font-mono text-[12px] text-muted-foreground">no products match</p>
    </div>
  );
}

function Pagination() {
  return (
    <div className="flex items-center justify-center gap-6 pt-10 pb-2 font-mono text-[11px] text-muted-foreground">
      <button className="hover:text-foreground transition-colors">← Prev</button>
      <span>Page 1 of 5</span>
      <button className="hover:text-foreground transition-colors">Next →</button>
    </div>
  );
}
