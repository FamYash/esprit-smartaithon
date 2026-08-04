import { indianCities, aqiCategory } from "./data";

export function IndiaHeatmap({
  height = 360,
  interactive = false,
}: {
  height?: number;
  interactive?: boolean;
}) {
  // Approximate bounding box of the physical map image
  // Longitude ~66°E to 98°E, Latitude ~6°N to 37°N
  const project = (lat: number, lng: number) => {
    const x = ((lng - 66) / 32) * 100;
    const y = ((37 - lat) / 31) * 100;
    return { x, y };
  };

  return (
    <div className="relative w-full rounded-2xl border border-border bg-sky-50" style={{ height }}>
      {/* Physical Map — contain so full map is always visible */}
      <img
        src="/india-physical.jpg"
        alt="India Physical Map"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "contain", objectPosition: "center", opacity: 0.95 }}
      />
      {/* Subtle overlay so dots are readable */}
      <div className="absolute inset-0 bg-white/10 rounded-2xl" />

      {indianCities.map((c) => {
        const { x, y } = project(c.lat, c.lng);
        const cat = aqiCategory(c.aqi);
        // Compact dots: 6px (good) → 12px (hazardous)
        const size = 6 + (c.aqi / 300) * 6;
        return (
          <div
            key={c.code}
            className="group absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className="relative">
              {/* Pulse ring — slightly bigger than the dot */}
              <div
                className="absolute rounded-full animate-pulse-ring"
                style={{
                  background: cat.color,
                  width: size * 2,
                  height: size * 2,
                  top: -size / 2,
                  left: -size / 2,
                }}
              />
              <div
                className="relative rounded-full ring-1 ring-white/80 shadow-md"
                style={{ background: cat.color, width: size, height: size }}
              />
              {interactive && (
                <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1.5 text-[11px] font-medium text-background opacity-0 shadow-lg transition group-hover:opacity-100 z-10">
                  {c.name} · AQI {c.aqi}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 rounded-xl glass px-3 py-2 text-[10px] font-medium">
        {[
          { label: "Good", c: "var(--color-aqi-good)" },
          { label: "Moderate", c: "var(--color-aqi-moderate)" },
          { label: "Sensitive", c: "var(--color-aqi-sensitive)" },
          { label: "Unhealthy", c: "var(--color-aqi-unhealthy)" },
          { label: "Hazardous", c: "var(--color-aqi-hazardous)" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.c }} />
            <span className="text-foreground">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AQIGauge({ value, size = 220 }: { value: number; size?: number }) {
  const cat = aqiCategory(value);
  const pct = Math.min(value / 300, 1);
  const angle = -120 + pct * 240;
  const r = size / 2 - 18;
  const cx = size / 2;
  const cy = size / 2;
  const arcPath = (start: number, end: number) => {
    const s = ((start - 90) * Math.PI) / 180;
    const e = ((end - 90) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(s);
    const y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e);
    const y2 = cy + r * Math.sin(e);
    const large = end - start > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };
  const segments = [
    { from: -120, to: -80, c: "var(--color-aqi-good)" },
    { from: -80, to: -40, c: "var(--color-aqi-moderate)" },
    { from: -40, to: 20, c: "var(--color-aqi-sensitive)" },
    { from: 20, to: 80, c: "var(--color-aqi-unhealthy)" },
    { from: 80, to: 120, c: "var(--color-aqi-hazardous)" },
  ];
  return (
    <div className="relative inline-flex flex-col items-center">
      <svg width={size} height={size * 0.75} viewBox={`0 0 ${size} ${size * 0.85}`}>
        {segments.map((s, i) => (
          <path
            key={i}
            d={arcPath(s.from + 90, s.to + 90)}
            stroke={s.c}
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
        ))}
        {/* Needle */}
        <g transform={`rotate(${angle} ${cx} ${cy})`}>
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - r + 8}
            stroke="oklch(0.2 0.02 250)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy} r="8" fill="oklch(0.2 0.02 250)" />
          <circle cx={cx} cy={cy} r="4" fill="white" />
        </g>
      </svg>
      <div className="-mt-8 text-center">
        <div className="text-5xl font-bold tracking-tight text-foreground">{value}</div>
        <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          AQI
        </div>
        <div
          className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${cat.bg} ${cat.text}`}
        >
          {cat.label}
        </div>
      </div>
    </div>
  );
}
