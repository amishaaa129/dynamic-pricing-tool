import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/priceiq/Sidebar";
import { StatCards } from "@/components/priceiq/StatCards";
import { PriceChart } from "@/components/priceiq/PriceChart";
import { SignalsFeed } from "@/components/priceiq/SignalsFeed";
import { ProductTable } from "@/components/priceiq/ProductTable";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "PriceIQ — Dynamic Pricing Engine" },
      { name: "description", content: "PriceIQ is a dynamic pricing admin tool with live competitor signals, demand scoring, and editorial analytics." },
    ],
  }),
});

function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="ml-[220px]">
        {/* Top bar */}
        <div className="border-b border-border px-10 py-5 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Overview
            </p>
            <h2 className="font-serif italic text-[28px] text-foreground leading-tight mt-0.5">
              Sony WH-1000XM5
            </h2>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Last engine pass
              </p>
              <p className="font-mono text-[11px] text-foreground mt-0.5">14:42:08 IST · 2m ago</p>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent border border-accent/40 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-amber" />
              Auto-pricing on
            </div>
          </div>
        </div>

        <div className="px-10 py-10 space-y-8 max-w-[1600px]">
          <StatCards />

          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-3">
              <PriceChart />
            </div>
            <div className="col-span-2 min-h-[420px]">
              <SignalsFeed />
            </div>
          </div>

          <ProductTable />

          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground pt-4 border-t border-border">
            Awaiting next signal batch... · refresh in 38s
          </p>
        </div>
      </main>
    </div>
  );
}
