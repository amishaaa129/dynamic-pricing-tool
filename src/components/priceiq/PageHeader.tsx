import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="border-b border-border px-10 py-6 flex items-end justify-between">
      <div>
        <h2 className="font-serif italic text-[28px] text-foreground leading-tight">{title}</h2>
        {subtitle && (
          <p className="mt-1.5 text-[12px] text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {right && <div className="flex items-center gap-6">{right}</div>}
    </div>
  );
}
