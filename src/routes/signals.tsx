import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/priceiq/Sidebar";
import { PageHeader } from "@/components/priceiq/PageHeader";
import { Sparkline } from "@/components/priceiq/Sparkline";

export const Route = createFileRoute("/signals")({
  component: SignalsPage,
  head: () => ({
    meta: [
      { title: "Signals — PriceIQ" },
      { name: "description", content: "Live behavioral and market signals feeding the pricing engine." },
    ],
  }),
});

const demandSignals = [
  { name: "Page Views (1h)", value: "2,847", trend: [40, 42, 45, 48, 52, 55, 58, 62, 65, 70, 75, 82], inf: "High" },
  { name: "Cart Additions", value: "143", trend: [30, 32, 30, 35, 40, 45, 50, 60, 75, 90, 110, 143], inf: "High" },
  { name: "Avg Time on Page", value: "4m 12s", trend: [50, 51, 50, 52, 51, 50, 51, 52, 50, 51, 50, 51], inf: "Medium" },
  { name: "Search Volume", value: "+34%", trend: [20, 22, 28, 32, 36, 40, 45, 50, 55, 60, 66, 70], inf: "Medium" },
  { name: "Return Visitor Rate", value: "68%", trend: [60, 62, 64, 66, 65, 67, 68, 67, 68, 68, 67, 68], inf: "Low" },
];

const heatmap = [
  { row: "Amazon",  cells: [1, 0, 1, 1, 0, 1, 1] },
  { row: "Flipkart", cells: [0, 1, 0, 1, 1, 0, 0] },
  { row: "Meesho",   cells: [1, 1, 0, 0, 1, 0, 0] },
  { row: "Myntra",   cells: [0, 0, 1, 0, 0, 1, 0] },
];

const initialLogs = [
  { time: "14:32:07", type: "DEMAND", text: "cart_additions +23% threshold crossed → engine triggered" },
  { time: "14:28:41", type: "COMPETITOR", text: "amazon.price -8% detected on SKU #A1023" },
  { time: "14:15:00", type: "SCHEDULED", text: "routine recalculation completed · no change" },
  { time: "14:02:19", type: "BEHAVIOR", text: "avg_session_time crossed 4min → demand bump +5" },
  { time: "13:48:55", type: "COMPETITOR", text: "flipkart.price +2% detected on SKU #G8821" },
  { time: "13:30:00", type: "SCHEDULED", text: "routine recalculation completed · 2 changes applied" },
  { time: "13:12:08", type: "DEMAND", text: "search_volume spike: 'noise cancelling' +34%" },
  { time: "12:58:21", type: "BEHAVIOR", text: "bounce_rate down 4.2% on PDP" },
  { time: "12:41:17", type: "COMPETITOR", text: "meesho.price -5% detected on SKU #C5512" },
  { time: "12:15:00", type: "SCHEDULED", text: "routine recalculation completed · no change" },
];

const labelColor: Record<string, string> = {
  DEMAND: "text-accent",
  COMPETITOR: "text-foreground/80",
  SCHEDULED: "text-[#555]",
  BEHAVIOR: "text-accent/70",
};

function SignalsPage() {
  const [logs, setLogs] = useState(initialLogs);

  // Animate fade-in for new entries (just re-trigger every now and then)
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      const t = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      const samples = [
        { type: "DEMAND", text: "page_views threshold crossed → demand re-scored" },
        { type: "COMPETITOR", text: "amazon.price recheck completed · no change" },
        { type: "BEHAVIOR", text: "wishlist additions +6% session-wide" },
      ];
      const s = samples[Math.floor(Math.random() * samples.length)];
      setLogs((l) => [{ time: t, ...s }, ...l].slice(0, 14));
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="ml-[220px]">
        <PageHeader
          title="Signals"
          subtitle="Live inputs powering the pricing engine"
          right={
            <p className="font-mono text-[12px] text-muted-foreground">
              Engine status: <span className="text-accent animate-pulse-amber">ACTIVE</span>
            </p>
          }
        />

        <div className="px-10 py-8 grid grid-cols-3 gap-6 max-w-[1600px]">
          {/* DEMAND */}
          <Column header="Demand">
            {demandSignals.map((s) => (
              <SignalCard key={s.name} name={s.name} value={s.value} trend={s.trend} influence={s.inf} />
            ))}
          </Column>

          {/* COMPETITOR */}
          <Column header="Competitor">
            <SignalCard name="Amazon Price Delta" value="−8%" trend={[60, 58, 55, 52, 48, 45, 42, 40, 38, 35, 33, 30]} influence="High" sub="They are cheaper" subAccent="Triggering review" />
            <SignalCard name="Flipkart Price Delta" value="+12%" trend={[40, 42, 45, 48, 50, 52, 55, 58, 60, 62, 65, 68]} influence="Medium" sub="You are cheaper" />
            <SignalCard name="Market Average" value="₹4,102" trend={[4200, 4180, 4150, 4140, 4130, 4120, 4110, 4105, 4100, 4098, 4100, 4102]} influence="Medium" />
            <Card>
              <p className="text-[13px] font-medium text-foreground">Price Change Frequency</p>
              <div className="mt-4">
                <div className="grid grid-cols-[60px_repeat(7,minmax(0,1fr))] gap-1 mb-1">
                  <div />
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
                    <p key={d} className="font-mono text-[9px] uppercase text-muted-foreground text-center">{d}</p>
                  ))}
                </div>
                {heatmap.map((r) => (
                  <div key={r.row} className="grid grid-cols-[60px_repeat(7,minmax(0,1fr))] gap-1 mb-1">
                    <p className="font-mono text-[10px] text-muted-foreground self-center">{r.row}</p>
                    {r.cells.map((c, i) => (
                      <div key={i} className="h-5" style={{ background: c ? "var(--color-accent)" : "oklch(0.27 0 0)" }} />
                    ))}
                  </div>
                ))}
              </div>
            </Card>
            <div className="bg-surface border-l-[3px] border-l-accent border-y border-r border-border p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">Opportunity</p>
              <p className="text-[13px] text-foreground mt-1.5">Competitor Out-of-Stock</p>
              <p className="text-[12px] text-muted-foreground mt-1">JBL Flip 6 OOS on Amazon</p>
            </div>
          </Column>

          {/* ENGINE */}
          <Column header="Engine">
            <Card>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-4">Decision flow</p>
              <FlowNode label="demand_score" value="84" />
              <Arrow />
              <FlowNode label="competitor_gap" value="−8%" />
              <Arrow />
              <FlowNode label="elasticity" value="−1.4" />
              <Arrow />
              <FlowNode label="base_price" value="₹4,650" />
              <Arrow />
              <FlowNode label="adjustment" value="−₹351" />
              <Arrow />
              <div className="border border-accent p-3 flex items-center justify-between mt-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">final</p>
                <p className="font-serif italic text-[20px] text-foreground">₹4,299</p>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Confidence</p>
                <p className="font-mono text-[11px] text-foreground">91%</p>
              </div>
              <div className="h-1 bg-[oklch(0.27_0_0)] w-full">
                <div className="h-full bg-accent" style={{ width: "91%" }} />
              </div>
              <div className="mt-4 space-y-1 font-mono text-[10px] text-muted-foreground">
                <p>Last recalculated: 4 minutes ago</p>
                <p>Next recalculation: in ~11 minutes</p>
              </div>
            </Card>

            <Card>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-3">Constraints applied</p>
              <ul className="space-y-1.5 font-mono text-[11px]">
                <li className="text-foreground"><span className="text-accent mr-2">✓</span> Min margin (30%) maintained</li>
                <li className="text-foreground"><span className="text-accent mr-2">✓</span> Max discount (25%) not breached</li>
                <li className="text-muted-foreground"><span className="text-muted-foreground mr-2">✗</span> Competitor match rule: skipped</li>
              </ul>
            </Card>
          </Column>
        </div>

        {/* Signal log */}
        <div className="px-10 pb-10 max-w-[1600px]">
          <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Signal log</p>
            <button className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground">
              Clear
            </button>
          </div>
          <div className="space-y-1.5">
            {logs.map((l, idx) => (
              <div
                key={`${l.time}-${idx}`}
                className="font-mono text-[11px] flex items-start gap-4 animate-in fade-in slide-in-from-top-1 duration-300"
              >
                <span className="text-muted-foreground">[{l.time}]</span>
                <span className={`${labelColor[l.type]} w-[90px] uppercase`}>{l.type}</span>
                <span className="text-foreground/85">{l.text}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function Column({ header, children }: { header: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
        {header}
      </p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="border border-border bg-background p-4 hover:bg-surface transition-colors">{children}</div>;
}

function SignalCard({
  name, value, trend, influence, sub, subAccent,
}: { name: string; value: string; trend: number[]; influence: string; sub?: string; subAccent?: string }) {
  return (
    <Card>
      <p className="text-[13px] font-medium text-foreground">{name}</p>
      <p className="font-serif italic text-[26px] text-foreground mt-1 leading-tight">{value}</p>
      <div className="mt-2"><Sparkline points={trend} width={220} height={28} /></div>
      <div className="mt-3 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{influence} influence</p>
        {sub && <p className="font-mono text-[10px] text-muted-foreground">{sub}</p>}
      </div>
      {subAccent && <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent mt-1">{subAccent}</p>}
    </Card>
  );
}

function FlowNode({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-2.5 flex items-center justify-between">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      <p className="font-serif italic text-[14px] text-foreground">{value}</p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex justify-center my-1">
      <div className="h-3 w-px bg-border-strong" />
    </div>
  );
}
