type Props = {
  points: number[];
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
};

export function Sparkline({ points, width = 90, height = 28, color, strokeWidth = 1.25 }: Props) {
  if (points.length === 0) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1 || 1);
  const d = points
    .map((p, i) => {
      const x = i * step;
      const y = height - ((p - min) / range) * height;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  const stroke =
    color ??
    (points[points.length - 1] > points[0]
      ? "var(--color-accent)"
      : points[points.length - 1] < points[0]
        ? "#C0504D"
        : "oklch(0.62 0.005 80)");

  return (
    <svg width={width} height={height} className="block overflow-visible">
      <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
