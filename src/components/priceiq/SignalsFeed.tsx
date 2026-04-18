import { useEffect, useRef } from "react";
import { TrendingUp, Users, Radar } from "lucide-react";
import { signals, type Signal } from "@/lib/mock-data";

const iconFor = (cat: Signal["category"]) => {
  if (cat === "demand") return TrendingUp;
  if (cat === "competitor") return Radar;
  return Users;
};

const labelFor = (cat: Signal["category"]) => cat.toUpperCase();

export function SignalsFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    let pos = 0;
    const tick = () => {
      pos += 0.15;
      const max = el.scrollHeight / 2;
      if (pos >= max) pos = 0;
      el.scrollTop = pos;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const doubled = [...signals, ...signals];

  return (
    <div className="border border-border h-full flex flex-col">
      <div className="px-7 pt-7 pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Live Signals
          </p>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-accent uppercase tracking-[0.14em]">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-amber" />
            Streaming
          </div>
        </div>
        <h3 className="font-serif italic text-[22px] mt-1 text-foreground">Engine feed</h3>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-hidden px-2"
        style={{ maskImage: "linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)" }}
      >
        <div>
          {doubled.map((s, i) => {
            const Icon = iconFor(s.category);
            return (
              <div
                key={`${s.id}-${i}`}
                className="px-5 py-3.5 border-b border-border/60 flex gap-3 items-start"
              >
                <div className="mt-0.5 h-7 w-7 border border-border flex items-center justify-center shrink-0">
                  <Icon className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                      {labelFor(s.category)}
                    </span>
                    {s.influenced && (
                      <span className="h-1 w-1 rounded-full bg-accent" title="Influenced last price change" />
                    )}
                  </div>
                  <p className="text-[12.5px] text-foreground/90 leading-snug mt-1">
                    {s.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
