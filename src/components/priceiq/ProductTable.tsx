import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { products, formatINR, type Product } from "@/lib/mock-data";

function StatusPill({ status }: { status: Product["status"] }) {
  if (status === "Optimised") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-accent/50 text-accent font-mono text-[10px] uppercase tracking-[0.12em]">
        <span className="h-1 w-1 rounded-full bg-accent" />
        Optimised
      </span>
    );
  }
  if (status === "Manual Override") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 border border-foreground/50 text-foreground font-mono text-[10px] uppercase tracking-[0.12em]">
        Manual Override
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-muted-foreground font-mono text-[10px] uppercase tracking-[0.12em]">
      Monitoring
    </span>
  );
}

function OverrideButton({ product }: { product: Product }) {
  const [val, setVal] = useState(product.current.toString());
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] uppercase tracking-[0.14em] text-accent border border-accent/40 px-2.5 py-1 hover:bg-accent/10">
          Override
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-64 bg-popover border border-border-strong rounded-none p-4 shadow-none"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Manual Override
        </p>
        <p className="text-[12px] text-foreground mt-1 leading-snug">{product.name}</p>
        <div className="mt-4">
          <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            New Price
          </label>
          <div className="flex items-center mt-1.5 border border-border focus-within:border-accent">
            <span className="px-3 font-serif italic text-foreground">₹</span>
            <input
              type="number"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="flex-1 bg-transparent py-2 pr-3 outline-none font-mono text-[13px] text-foreground"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => setOpen(false)}
            className="flex-1 font-mono text-[10px] uppercase tracking-[0.14em] py-2 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Confirm
          </button>
          <button
            onClick={() => setOpen(false)}
            className="font-mono text-[10px] uppercase tracking-[0.14em] py-2 px-3 text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function ProductTable() {
  return (
    <div className="border border-border">
      <div className="px-7 pt-7 pb-5 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Catalogue
          </p>
          <h3 className="font-serif italic text-[22px] mt-1 text-foreground">Active products</h3>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {products.length} items · last sync 2m ago
        </p>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-t border-border">
            {["Product", "Current Price", "Suggested Price", "Demand", "Status", ""].map((h) => (
              <th
                key={h}
                className="text-left font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-normal px-7 py-3"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const delta = p.suggested - p.current;
            return (
              <tr
                key={p.id}
                className="group border-t border-border/60 hover:bg-surface transition-colors"
              >
                <td className="px-7 py-4 text-[13px] text-foreground">{p.name}</td>
                <td className="px-7 py-4 font-mono text-[12.5px] text-foreground">
                  {formatINR(p.current)}
                </td>
                <td className="px-7 py-4">
                  <span className="font-mono text-[12.5px] text-foreground">
                    {formatINR(p.suggested)}
                  </span>
                  {delta !== 0 && (
                    <span className={`ml-2 font-mono text-[10px] ${delta > 0 ? "text-accent" : "text-muted-foreground"}`}>
                      {delta > 0 ? "+" : ""}{formatINR(delta).replace("₹-", "−₹")}
                    </span>
                  )}
                </td>
                <td className="px-7 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-16 h-[2px] bg-border">
                      <div
                        className="h-full bg-foreground/60"
                        style={{ width: `${p.demand}%` }}
                      />
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground">{p.demand}</span>
                  </div>
                </td>
                <td className="px-7 py-4">
                  <StatusPill status={p.status} />
                </td>
                <td className="px-7 py-4 text-right">
                  <OverrideButton product={p} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
