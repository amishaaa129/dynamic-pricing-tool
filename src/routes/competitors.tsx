import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/priceiq/Sidebar";
import { PageHeader } from "@/components/priceiq/PageHeader";
import { Sparkline } from "@/components/priceiq/Sparkline";
import { competitorData, priceAlerts } from "@/lib/products-data";
import { formatINR } from "@/lib/mock-data";
import { ChevronDown, Zap } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute("/competitors")({
  component: CompetitorsPage,
  head: () => ({
    meta: [
      { title: "Competitors — PriceIQ" },
      { name: "description", content: "Track competitor pricing across Amazon, Flipkart, Meesho and Myntra in real time." },
    ],
  }),
});

const platforms = ["amazon", "flipkart", "meesho", "myntra"] as const;
type Platform = typeof platforms[number];

const historyData = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 1}`,
  yours: 25500 - i * 25 + Math.sin(i / 3) * 220,
  competitor: 26200 - i * 90 + Math.cos(i / 2) * 350,
}));

function CompetitorsPage() {
  const [platform, setPlatform] = useState<Platform>("amazon");
  const [openAcc, setOpenAcc] = useState(false);
  const rows = competitorData[platform] ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="ml-[220px]">
        <PageHeader
          title="Competitors"
          subtitle="Tracking 4 platforms · Last synced 3 min ago"
          right={
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-amber" />
              Live tracking
            </div>
          }
        />

        <div className="grid grid-cols-[1fr_360px]">
          {/* LEFT */}
          <div className="px-10 py-8 border-r border-border min-h-[calc(100vh-110px)] flex flex-col">
            {/* Platform tabs */}
            <div className="flex items-center gap-8 border-b border-border">
              {platforms.map((p) => {
                const active = p === platform;
                return (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`relative pb-3 text-[13px] capitalize transition-colors ${
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p}
                    {active && <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-accent" />}
                  </button>
                );
              })}
            </div>

            {/* Comparison table */}
            <div className="mt-6">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-2 pb-2 border-b border-border">
                {["Product", "Their Price", "Your Price", "Gap", "Trend", ""].map((h) => (
                  <p key={h} className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{h}</p>
                ))}
              </div>
              {rows.length === 0 ? (
                <EmptyBox text="no competitor data on this platform" />
              ) : (
                rows.map((r) => {
                  const gapPct = ((r.theirs - r.yours) / r.yours) * 100;
                  const cheaperThanYou = r.theirs < r.yours;
                  return (
                    <div key={r.id} className="group grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4 px-2 py-4 border-b border-border hover:bg-surface transition-colors">
                      <div>
                        <p className="text-[13px] text-foreground">{r.name}</p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground mt-0.5">{r.category}</p>
                      </div>
                      <p className="font-serif italic text-[16px] text-foreground">{formatINR(r.theirs)}</p>
                      <p className="font-serif italic text-[16px] text-foreground">{formatINR(r.yours)}</p>
                      <div>
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.1em] border ${
                            cheaperThanYou
                              ? "text-[#7FAF7F] border-[#7FAF7F]/40"
                              : "text-accent border-accent/50"
                          }`}
                        >
                          {cheaperThanYou ? `${gapPct.toFixed(0)}% cheaper` : `+${Math.abs(gapPct).toFixed(0)}% pricier`}
                        </span>
                      </div>
                      <Sparkline points={r.trend.slice(-5)} width={70} height={22} />
                      <div className="text-right">
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-mono uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground border border-border px-3 py-1">
                          Match Price
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Accordion */}
            <div className="mt-8">
              <button
                onClick={() => setOpenAcc((o) => !o)}
                className="flex items-center justify-between w-full py-3 border-b border-border text-left text-[13px] text-foreground hover:text-accent transition-colors"
              >
                <span>Price history — Sony WH-1000XM5 →</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${openAcc ? "rotate-180" : ""}`} strokeWidth={1.5} />
              </button>
              {openAcc && (
                <div className="h-[260px] mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historyData} margin={{ top: 5, right: 12, left: 0, bottom: 0 }}>
                      <CartesianGrid stroke="oklch(0.27 0 0)" strokeDasharray="2 4" vertical={false} />
                      <XAxis dataKey="day" stroke="oklch(0.62 0.005 80)" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="oklch(0.62 0.005 80)" fontSize={10} tickLine={false} axisLine={false} domain={["auto", "auto"]} />
                      <Tooltip
                        contentStyle={{ background: "oklch(0.21 0 0)", border: "1px solid oklch(0.27 0 0)", fontSize: 11 }}
                        labelStyle={{ color: "oklch(0.62 0.005 80)" }}
                      />
                      <Line type="monotone" dataKey="yours" stroke="var(--color-accent)" strokeWidth={1.5} dot={false} />
                      <Line type="monotone" dataKey="competitor" stroke="oklch(0.95 0.008 80 / 0.4)" strokeWidth={1.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="flex-1" />

            {/* Bottom stat bar */}
            <div className="mt-8 border-t border-border pt-5 flex items-center divide-x divide-border">
              <BottomStat label="Avg market price" value="₹3,847" />
              <BottomStat label="You are cheaper on" value="6/8 products" />
              <BottomStat label="Biggest gap" value="−22% on JBL Flip 6" />
            </div>
          </div>

          {/* RIGHT */}
          <aside className="px-6 py-8">
            <h3 className="text-[13px] font-medium text-muted-foreground mb-5">Price Alerts</h3>
            <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
              {priceAlerts.length === 0 ? (
                <EmptyBox text="No price alerts · Tracking active..." />
              ) : (
                priceAlerts.map((a) => {
                  const pctChange = ((a.to - a.from) / a.from) * 100;
                  return (
                    <div key={a.id} className="bg-surface border-l-[3px] border-l-accent border-y border-r border-border p-4 relative">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="h-5 w-5 flex items-center justify-center bg-background text-accent font-mono text-[10px] border border-border">
                          {a.platform}
                        </span>
                        <p className="text-[12px] text-foreground flex items-center gap-1.5">
                          <Zap className="h-3 w-3 text-accent" strokeWidth={2} /> {a.platformName} dropped
                        </p>
                      </div>
                      <p className="text-[12px] text-foreground">{a.product}</p>
                      <p className="font-serif italic text-[15px] text-foreground mt-1.5">
                        {formatINR(a.from)} → {formatINR(a.to)}{" "}
                        <span className="text-[12px] text-accent ml-1 not-italic">({pctChange.toFixed(0)}%)</span>
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1.5">
                        Recommended: match at {formatINR(a.recommended)}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <button className="bg-accent text-accent-foreground text-[10px] font-mono uppercase tracking-[0.1em] px-3 py-1 hover:opacity-90">
                          Apply
                        </button>
                        <button className="text-muted-foreground text-[10px] font-mono uppercase tracking-[0.1em] px-3 py-1 hover:text-foreground">
                          Dismiss
                        </button>
                      </div>
                      <p className="font-mono text-[9px] text-muted-foreground absolute bottom-3 right-4">{a.time}</p>
                    </div>
                  );
                })
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function BottomStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-6 first:pl-0">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="text-[13px] text-foreground mt-1">{value}</p>
    </div>
  );
}

function EmptyBox({ text }: { text: string }) {
  return (
    <div className="border border-dashed border-border px-4 py-6 text-center">
      <p className="font-mono text-[11px] text-muted-foreground">{text}</p>
    </div>
  );
}
