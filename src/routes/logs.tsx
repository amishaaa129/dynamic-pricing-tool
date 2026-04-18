import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/priceiq/Sidebar";
import { PageHeader } from "@/components/priceiq/PageHeader";
import { logEntries, type LogEntry } from "@/lib/products-data";
import { formatINR } from "@/lib/mock-data";
import { ArrowDown, ArrowUp, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";

export const Route = createFileRoute("/logs")({
  component: LogsPage,
  head: () => ({
    meta: [
      { title: "Logs — PriceIQ" },
      { name: "description", content: "Complete audit trail of every pricing decision, override and engine action." },
    ],
  }),
});

const eventOptions = ["All Events", "Auto-optimised", "Manual override", "Reverted", "Rule triggered", "Paused"];
const productOptions = ["All Products", ...Array.from(new Set(logEntries.map((l) => l.product)))];
const dateOptions = ["Last 7 days", "Last 30 days", "All time"];

const volumeData = [
  { day: "Mon", v: 4 }, { day: "Tue", v: 6 }, { day: "Wed", v: 3 },
  { day: "Thu", v: 7 }, { day: "Fri", v: 5 }, { day: "Sat", v: 2 }, { day: "Sun", v: 7 },
];

function LogsPage() {
  const [event, setEvent] = useState("All Events");
  const [product, setProduct] = useState("All Products");
  const [dateRange, setDateRange] = useState("Last 7 days");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return logEntries.filter((l) => {
      if (event !== "All Events" && l.event !== event) return false;
      if (product !== "All Products" && l.product !== product) return false;
      return true;
    });
  }, [event, product]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="ml-[220px]">
        <PageHeader title="Logs" subtitle="Complete audit trail of pricing decisions" />

        <div className="grid grid-cols-[1fr_280px]">
          {/* Main */}
          <div className="px-10 py-6 border-r border-border">
            {/* Filter bar */}
            <div className="flex items-center gap-6 pb-5 border-b border-border">
              <UnderlineSelect value={event} options={eventOptions} onChange={setEvent} />
              <UnderlineSelect value={product} options={productOptions} onChange={setProduct} />
              <UnderlineSelect value={dateRange} options={dateOptions} onChange={setDateRange} />
              <div className="flex-1" />
              <button className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors">
                Export CSV <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
              </button>
            </div>

            {/* Table header */}
            {filtered.length === 0 ? (
              <div className="mt-12 mx-auto max-w-md border border-dashed border-border px-6 py-8 text-center">
                <p className="font-mono text-[12px] text-muted-foreground">no events match this filter</p>
                <p className="font-mono text-[11px] text-muted-foreground/70 mt-1">try adjusting the date range</p>
              </div>
            ) : (
              <div className="mt-2">
                <div className="grid grid-cols-[110px_140px_1.5fr_90px_90px_2fr_90px] gap-4 py-3 border-b border-border">
                  {["Timestamp","Event","Product","Before","After","Reason","Actor"].map((h) => (
                    <p key={h} className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{h}</p>
                  ))}
                </div>

                {filtered.map((l) => (
                  <LogRow key={l.id} log={l} expanded={expanded === l.id} onToggle={() => setExpanded(expanded === l.id ? null : l.id)} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar stats */}
          <aside className="px-6 py-6 sticky top-0 self-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-5">This week</p>
            <div className="space-y-4">
              <Stat label="Total changes" value="34" big />
              <hr className="border-border" />
              <Stat label="Auto-optimised" value="28" />
              <hr className="border-border" />
              <Stat label="Manual overrides" value="6" />
              <hr className="border-border" />
              <Stat label="Avg price change" value="+₹124" />
              <hr className="border-border" />
              <Stat label="Revenue impact est." value="+₹18,400" accent />
            </div>

            <div className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Volume by day</p>
              <div className="h-[110px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeData} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                    <XAxis dataKey="day" stroke="oklch(0.62 0.005 80)" fontSize={9} tickLine={false} axisLine={false} />
                    <Bar dataKey="v" radius={0} background={{ fill: "oklch(0.27 0 0)" }}>
                      {volumeData.map((_, i) => <Cell key={i} fill="var(--color-accent)" />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function UnderlineSelect({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent border-0 border-b border-border focus:border-accent focus:outline-none font-mono text-[11px] text-foreground py-1.5 pr-6 cursor-pointer"
      >
        {options.map((o) => <option key={o} value={o} className="bg-background text-foreground">{o}</option>)}
      </select>
      <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground text-[10px]">▾</span>
    </div>
  );
}

function Stat({ label, value, big, accent }: { label: string; value: string; big?: boolean; accent?: boolean }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className={`mt-1 ${big ? "font-serif italic text-[28px] leading-tight" : "text-[14px]"} ${accent ? "text-accent" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

function eventBadge(ev: LogEntry["event"]) {
  const base = "inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.1em]";
  switch (ev) {
    case "Auto-optimised": return <span className={`${base} text-accent border border-accent/50`}>Auto-optimised</span>;
    case "Manual override": return <span className={`${base} text-foreground border border-foreground/40`}>Manual override</span>;
    case "Reverted": return <span className={`${base} text-muted-foreground`}>Reverted</span>;
    case "Rule triggered": return <span className={`${base} bg-accent text-accent-foreground`}>Rule triggered</span>;
    case "Paused": return <span className={`${base} text-muted-foreground`}>Paused</span>;
  }
}

function LogRow({ log, expanded, onToggle }: { log: LogEntry; expanded: boolean; onToggle: () => void }) {
  const down = log.after < log.before;
  const up = log.after > log.before;

  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full grid grid-cols-[110px_140px_1.5fr_90px_90px_2fr_90px] gap-4 py-4 text-left hover:bg-surface transition-colors items-center"
      >
        <p className="font-mono text-[11px] text-muted-foreground">{log.timestamp}</p>
        <div>{eventBadge(log.event)}</div>
        <div>
          <p className="text-[13px] text-foreground font-medium">{log.product}</p>
          <p className="font-mono text-[9px] text-muted-foreground mt-0.5">{log.sku}</p>
        </div>
        <p className="font-serif italic text-[14px] text-muted-foreground">{formatINR(log.before)}</p>
        <p className="font-serif italic text-[14px] text-foreground flex items-center gap-1">
          {down && <ArrowDown className="h-3 w-3 text-[#C0504D]" strokeWidth={2} />}
          {up && <ArrowUp className="h-3 w-3 text-accent" strokeWidth={2} />}
          {formatINR(log.after)}
        </p>
        <p className="text-[12px] text-muted-foreground truncate" title={log.reason}>{log.reason}</p>
        <div className="flex justify-end">
          {log.isUser ? (
            <span className="h-6 w-6 rounded-full bg-surface text-foreground text-[10px] flex items-center justify-center font-medium border border-border">
              {log.actor}
            </span>
          ) : (
            <span className="font-mono text-[10px] text-muted-foreground">{log.actor}</span>
          )}
        </div>
      </button>

      {expanded && (
        <div className="bg-surface/40 border-t border-border px-4 py-5 grid grid-cols-2 gap-0 divide-x divide-border">
          <div className="pr-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-3">Before state</p>
            <div className="space-y-2">
              {log.signalSnapshot.map((s) => (
                <div key={s.label} className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="text-foreground/80">{s.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border border-border p-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Price</p>
              <p className="font-serif italic text-[22px] text-muted-foreground">{formatINR(log.before)}</p>
            </div>
          </div>
          <div className="pl-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-3">After state · confidence {log.confidence}%</p>
            <ul className="space-y-1.5 font-mono text-[11px]">
              {log.constraints.map((c) => (
                <li key={c.label} className={c.pass ? "text-foreground" : "text-muted-foreground"}>
                  <span className={c.pass ? "text-accent mr-2" : "text-muted-foreground mr-2"}>{c.pass ? "✓" : "✗"}</span>
                  {c.label}
                </li>
              ))}
            </ul>
            <div className="mt-4 border border-accent p-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-accent">Price</p>
              <p className="font-serif italic text-[22px] text-foreground">{formatINR(log.after)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
