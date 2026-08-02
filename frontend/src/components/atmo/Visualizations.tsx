import { countries, aqiCategory } from "./data";

// Simple equirectangular world map with country pollution dots
export function WorldHeatmap({ height = 360, interactive = false }: { height?: number; interactive?: boolean }) {
  const project = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[var(--color-surface)] to-background" style={{ height }}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      {/* Stylized continents outline */}
      <svg viewBox="0 0 1000 500" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="oklch(0.85 0.02 250)" />
          </pattern>
        </defs>
        {/* Continents as soft blobs */}
        <g fill="oklch(0.94 0.01 250)" stroke="oklch(0.88 0.01 250)" strokeWidth="1">
          {/* North America */}
          <path d="M120,120 Q180,90 250,110 Q310,130 320,200 Q300,260 240,280 Q170,270 130,230 Q100,180 120,120 Z" />
          {/* South America */}
          <path d="M280,290 Q320,280 340,330 Q345,400 310,440 Q280,450 270,400 Q265,340 280,290 Z" />
          {/* Europe */}
          <path d="M470,130 Q520,115 560,130 Q570,170 540,190 Q490,195 470,170 Z" />
          {/* Africa */}
          <path d="M490,210 Q540,200 570,240 Q580,320 540,380 Q500,390 480,340 Q470,270 490,210 Z" />
          {/* Asia */}
          <path d="M590,110 Q700,90 800,120 Q860,170 850,230 Q780,270 700,260 Q620,240 590,180 Z" />
          {/* Australia */}
          <path d="M780,340 Q830,330 860,360 Q855,395 810,400 Q775,385 780,340 Z" />
        </g>
        <rect width="1000" height="500" fill="url(#dots)" opacity="0.15" />
      </svg>

      {countries.map((c) => {
        const { x, y } = project(c.lat, c.lng);
        const cat = aqiCategory(c.aqi);
        const size = 14 + (c.aqi / 200) * 18;
        return (
          <div
            key={c.code}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full animate-pulse-ring"
                style={{ background: cat.color, width: size, height: size }}
              />
              <div
                className="relative rounded-full ring-2 ring-white shadow-lg"
                style={{ background: cat.color, width: size, height: size }}
              />
              {interactive && (
                <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1.5 text-[11px] font-medium text-background opacity-0 shadow-lg transition group-hover:opacity-100">
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
          <path key={i} d={arcPath(s.from + 90, s.to + 90)} stroke={s.c} strokeWidth="18" fill="none" strokeLinecap="round" opacity="0.85" />
        ))}
        {/* Needle */}
        <g transform={`rotate(${angle} ${cx} ${cy})`}>
          <line x1={cx} y1={cy} x2={cx} y2={cy - r + 8} stroke="oklch(0.2 0.02 250)" strokeWidth="3" strokeLinecap="round" />
          <circle cx={cx} cy={cy} r="8" fill="oklch(0.2 0.02 250)" />
          <circle cx={cx} cy={cy} r="4" fill="white" />
        </g>
      </svg>
      <div className="-mt-8 text-center">
        <div className="text-5xl font-bold tracking-tight text-foreground">{value}</div>
        <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">AQI</div>
        <div className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${cat.bg} ${cat.text}`}>
          {cat.label}
        </div>
      </div>
    </div>
  );
}
