// Shared mock data and small primitives for the AtmoAI app
export const countries = [
  { code: "IN", name: "India", aqi: 168, pm25: 89, pm10: 142, temp: 32, humidity: 68, lat: 22, lng: 78 },
  { code: "CN", name: "China", aqi: 142, pm25: 72, pm10: 118, temp: 18, humidity: 55, lat: 35, lng: 104 },
  { code: "US", name: "United States", aqi: 52, pm25: 14, pm10: 28, temp: 21, humidity: 48, lat: 38, lng: -97 },
  { code: "BR", name: "Brazil", aqi: 78, pm25: 28, pm10: 52, temp: 27, humidity: 72, lat: -10, lng: -55 },
  { code: "DE", name: "Germany", aqi: 38, pm25: 10, pm10: 22, temp: 14, humidity: 60, lat: 51, lng: 10 },
  { code: "JP", name: "Japan", aqi: 45, pm25: 12, pm10: 24, temp: 19, humidity: 65, lat: 36, lng: 138 },
  { code: "AU", name: "Australia", aqi: 32, pm25: 8, pm10: 18, temp: 22, humidity: 50, lat: -25, lng: 133 },
  { code: "ZA", name: "South Africa", aqi: 88, pm25: 34, pm10: 62, temp: 24, humidity: 55, lat: -30, lng: 25 },
  { code: "MX", name: "Mexico", aqi: 112, pm25: 48, pm10: 86, temp: 25, humidity: 58, lat: 23, lng: -102 },
  { code: "RU", name: "Russia", aqi: 65, pm25: 22, pm10: 44, temp: 8, humidity: 62, lat: 60, lng: 100 },
  { code: "FR", name: "France", aqi: 42, pm25: 11, pm10: 25, temp: 16, humidity: 64, lat: 46, lng: 2 },
  { code: "GB", name: "United Kingdom", aqi: 48, pm25: 13, pm10: 26, temp: 13, humidity: 70, lat: 54, lng: -2 },
];

export function aqiCategory(aqi: number) {
  if (aqi <= 50) return { label: "Good", color: "var(--color-aqi-good)", text: "text-emerald-700", bg: "bg-emerald-50" };
  if (aqi <= 100) return { label: "Moderate", color: "var(--color-aqi-moderate)", text: "text-yellow-700", bg: "bg-yellow-50" };
  if (aqi <= 150) return { label: "Unhealthy for Sensitive", color: "var(--color-aqi-sensitive)", text: "text-orange-700", bg: "bg-orange-50" };
  if (aqi <= 200) return { label: "Unhealthy", color: "var(--color-aqi-unhealthy)", text: "text-red-700", bg: "bg-red-50" };
  return { label: "Hazardous", color: "var(--color-aqi-hazardous)", text: "text-purple-700", bg: "bg-purple-50" };
}

// 24h forecast data
export const forecast24h = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  pm25: Math.round(60 + Math.sin(i / 3) * 25 + Math.random() * 10),
  predicted: Math.round(62 + Math.sin(i / 3) * 22 + Math.random() * 8),
}));

export const forecast7d = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => ({
  day: d,
  pm25: Math.round(70 + Math.sin(i) * 30 + Math.random() * 15),
  pm10: Math.round(120 + Math.sin(i + 1) * 40 + Math.random() * 20),
  aqi: Math.round(110 + Math.sin(i) * 50),
}));

export const monthly = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => ({
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

export function StatCard({ label, value, delta, icon, sub }: { label: string; value: string; delta?: string; icon?: React.ReactNode; sub?: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition hover:shadow-soft">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition group-hover:bg-primary/10" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">{value}</p>
          {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
        </div>
        {icon && <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">{icon}</div>}
      </div>
      {delta && (
        <div className="relative mt-4 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
          <span>↑</span> {delta}
        </div>
      )}
    </div>
  );
}

export function Card({ title, subtitle, action, children, className = "" }: { title?: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-6 shadow-card ${className}`}>
      {(title || action) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="text-base font-semibold text-foreground">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
