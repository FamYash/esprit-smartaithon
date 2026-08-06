// Shared mock data and small primitives for the AtmoAI app
export const indianCities = [
  {
    code: "DEL",
    name: "New Delhi",
    aqi: 248,
    pm25: 145,
    pm10: 210,
    temp: 32,
    humidity: 45,
    lat: 28.61,
    lng: 77.23,
  },
  {
    code: "MUM",
    name: "Mumbai",
    aqi: 112,
    pm25: 55,
    pm10: 95,
    temp: 29,
    humidity: 75,
    lat: 19.07,
    lng: 72.87,
  },
  {
    code: "BLR",
    name: "Bengaluru",
    aqi: 65,
    pm25: 28,
    pm10: 55,
    temp: 26,
    humidity: 60,
    lat: 12.97,
    lng: 77.59,
  },
  {
    code: "KOL",
    name: "Kolkata",
    aqi: 156,
    pm25: 85,
    pm10: 135,
    temp: 31,
    humidity: 82,
    lat: 22.57,
    lng: 88.36,
  },
  {
    code: "CHE",
    name: "Chennai",
    aqi: 78,
    pm25: 35,
    pm10: 65,
    temp: 33,
    humidity: 70,
    lat: 13.08,
    lng: 80.27,
  },
  {
    code: "HYD",
    name: "Hyderabad",
    aqi: 95,
    pm25: 42,
    pm10: 80,
    temp: 30,
    humidity: 55,
    lat: 17.38,
    lng: 78.48,
  },
  {
    code: "AMD",
    name: "Ahmedabad",
    aqi: 185,
    pm25: 95,
    pm10: 160,
    temp: 35,
    humidity: 40,
    lat: 23.02,
    lng: 72.57,
  },
  {
    code: "PUN",
    name: "Pune",
    aqi: 82,
    pm25: 38,
    pm10: 70,
    temp: 28,
    humidity: 65,
    lat: 18.52,
    lng: 73.85,
  },
  {
    code: "PAT",
    name: "Patna",
    aqi: 210,
    pm25: 120,
    pm10: 185,
    temp: 33,
    humidity: 50,
    lat: 25.59,
    lng: 85.13,
  },
  {
    code: "JAI",
    name: "Jaipur",
    aqi: 165,
    pm25: 88,
    pm10: 145,
    temp: 34,
    humidity: 35,
    lat: 26.91,
    lng: 75.78,
  },
  {
    code: "LKO",
    name: "Lucknow",
    aqi: 230,
    pm25: 135,
    pm10: 195,
    temp: 32,
    humidity: 55,
    lat: 26.84,
    lng: 80.94,
  },
  {
    code: "BHO",
    name: "Bhopal",
    aqi: 115,
    pm25: 58,
    pm10: 105,
    temp: 31,
    humidity: 48,
    lat: 23.25,
    lng: 77.41,
  },
];

export function aqiCategory(aqi: number) {
  if (aqi <= 50)
    return {
      label: "Good",
      color: "var(--color-aqi-good)",
      text: "text-emerald-700",
      bg: "bg-emerald-50",
    };
  if (aqi <= 100)
    return {
      label: "Moderate",
      color: "var(--color-aqi-moderate)",
      text: "text-yellow-700",
      bg: "bg-yellow-50",
    };
  if (aqi <= 150)
    return {
      label: "Unhealthy for Sensitive",
      color: "var(--color-aqi-sensitive)",
      text: "text-orange-700",
      bg: "bg-orange-50",
    };
  if (aqi <= 200)
    return {
      label: "Unhealthy",
      color: "var(--color-aqi-unhealthy)",
      text: "text-red-700",
      bg: "bg-red-50",
    };
  return {
    label: "Hazardous",
    color: "var(--color-aqi-hazardous)",
    text: "text-purple-700",
    bg: "bg-purple-50",
  };
}

// 24h forecast data
export const forecast24h = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  pm25: Math.round(60 + Math.sin(i / 3) * 25 + Math.random() * 10),
  predicted: Math.round(62 + Math.sin(i / 3) * 22 + Math.random() * 8),
}));

export const forecast7d = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => ({
  day: d,
  pm25: Math.round(70 + Math.sin(i) * 30 + Math.random() * 15),
  pm10: Math.round(120 + Math.sin(i + 1) * 40 + Math.random() * 20),
  aqi: Math.round(110 + Math.sin(i) * 50),
}));

export const monthly = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
].map((m, i) => ({
  month: m,
  pm25: Math.round(50 + Math.sin(i / 2) * 35 + i * 2),
  last: Math.round(55 + Math.cos(i / 2) * 30 + i * 1.5),
}));

export const aqiDistribution = [
  { name: "Good", value: 28, color: "#10b981" },
  { name: "Moderate", value: 34, color: "#eab308" },
  { name: "Sensitive", value: 22, color: "#F97316" },
  { name: "Unhealthy", value: 12, color: "#dc2626" },
  { name: "Hazardous", value: 4, color: "#9333ea" },
];

export function StatCard({
  label,
  value,
  delta,
  icon,
  sub,
}: {
  label: string;
  value: string;
  delta?: string;
  icon?: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm transition-all hover:shadow-md hover:bg-white/80">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight text-foreground">{value}</p>
          {sub && <p className="mt-1 text-[10px] text-muted-foreground">{sub}</p>}
        </div>
        {icon && (
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
            {icon}
          </div>
        )}
      </div>
      {delta && (
        <div className="relative mt-4 inline-flex items-center gap-1 rounded-full bg-emerald-50/80 px-2 py-0.5 text-[10px] font-bold text-emerald-700 backdrop-blur-sm border border-emerald-100">
          <span>↑</span> {delta}
        </div>
      )}
    </div>
  );
}

export function Card({
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="text-sm font-bold text-foreground">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-[11px] text-muted-foreground">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
