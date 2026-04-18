import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { priceHistory } from "@/lib/mock-data";

export function PriceChart() {
  return (
    <div className="border border-border p-7 h-full flex flex-col">
      <div className="flex items-start justify-between mb-1">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Price History
          </p>
          <h3 className="font-serif italic text-[22px] mt-1 text-foreground">Last 7 days</h3>
        </div>
        <div className="flex items-center gap-5 text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-4 bg-accent" />
            <span className="text-muted-foreground uppercase tracking-[0.12em]">Your Price</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-4 bg-foreground/40" />
            <span className="text-muted-foreground uppercase tracking-[0.12em]">Market Avg</span>
          </div>
        </div>
      </div>

      <div className="flex-1 mt-4 -ml-3">
        <ResponsiveContainer width="100%" height="100%" minHeight={260}>
          <LineChart data={priceHistory} margin={{ top: 20, right: 10, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="oklch(0.24 0 0)" strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="oklch(0.62 0.005 80)"
              tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "oklch(0.62 0.005 80)" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="oklch(0.62 0.005 80)"
              tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "oklch(0.62 0.005 80)" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `₹${v}`}
              width={55}
            />
            <Tooltip
              contentStyle={{
                background: "oklch(0.21 0 0)",
                border: "1px solid oklch(0.34 0 0)",
                borderRadius: 2,
                fontFamily: "JetBrains Mono",
                fontSize: 11,
              }}
              labelStyle={{ color: "oklch(0.62 0.005 80)" }}
              formatter={(v: number) => `₹${v}`}
            />
            <Line
              type="monotone"
              dataKey="yours"
              stroke="oklch(0.78 0.14 75)"
              strokeWidth={1.5}
              dot={{ r: 3, fill: "oklch(0.78 0.14 75)", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="market"
              stroke="oklch(0.95 0.008 80 / 0.4)"
              strokeWidth={1.5}
              strokeDasharray="3 3"
              dot={{ r: 2, fill: "oklch(0.95 0.008 80 / 0.4)", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
