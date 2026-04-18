import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

function DemandGauge({ value }: { value: number }) {
  const radius = 38;
  const circumference = Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width="110" height="64" viewBox="0 0 110 64">
      <path
        d={`M 12 56 A ${radius} ${radius} 0 0 1 98 56`}
        fill="none"
        stroke="oklch(0.27 0 0)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={`M 12 56 A ${radius} ${radius} 0 0 1 98 56`}
        fill="none"
        stroke="oklch(0.78 0.14 75)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1s ease-out" }}
      />
    </svg>
  );
}

export function StatCards() {
  const [pulseIdx, setPulseIdx] = useState<number>(-1);

  useEffect(() => {
    const timers = [0, 350, 700].map((delay, i) =>
      setTimeout(() => setPulseIdx(i), delay)
    );
    const reset = setTimeout(() => setPulseIdx(-1), 2200);
    return () => { timers.forEach(clearTimeout); clearTimeout(reset); };
  }, []);

  const cardCls = (i: number) =>
    `border border-border p-7 ${pulseIdx === i ? "animate-stat-pulse" : ""}`;

  return (
    <div className="grid grid-cols-3 border border-border divide-x divide-border">
      {/* Optimal Price */}
      <div className={cardCls(0)}>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Optimal Price
        </p>
        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-serif italic text-[52px] leading-none text-foreground">
            ₹4,299
          </span>
        </div>
        <div className="mt-4 inline-flex items-center gap-1.5 px-2 py-0.5 border border-accent/40 text-accent text-[11px] font-mono">
          <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
          +₹200 vs yesterday
        </div>
      </div>

      {/* Demand Score */}
      <div className={cardCls(1)}>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Demand Score
        </p>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <span className="font-serif italic text-[52px] leading-none text-foreground">
              87
            </span>
            <span className="font-serif italic text-[24px] text-muted-foreground">/100</span>
          </div>
          <DemandGauge value={87} />
        </div>
        <p className="mt-3 text-[11px] font-mono uppercase tracking-[0.14em] text-accent">
          High Demand
        </p>
      </div>

      {/* Competitor Gap */}
      <div className={cardCls(2)}>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Competitor Gap
        </p>
        <div className="mt-5 flex items-baseline gap-2">
          <span className="font-serif italic text-[36px] leading-none text-foreground">−7.5%</span>
        </div>
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-muted-foreground">YOU</span>
            <span className="text-foreground">₹4,299</span>
          </div>
          <div className="relative h-[2px] bg-border">
            <div className="absolute left-0 top-0 h-full bg-accent" style={{ width: "62%" }} />
            <div className="absolute top-1/2 -translate-y-1/2 h-2 w-[1px] bg-foreground/40" style={{ left: "92%" }} />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-muted-foreground">AVG MARKET</span>
            <span className="text-muted-foreground">₹4,650</span>
          </div>
        </div>
      </div>
    </div>
  );
}
