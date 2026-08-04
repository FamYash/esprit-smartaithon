import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, StatCard } from "@/components/atmo/data";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Construction,
  Leaf,
  MapPinned,
  ShieldAlert,
  TrendingUp,
  Wind,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/app/dashboard/analytics")({ component: AnalyticsPage });

const monthChips = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const kpis = [
  {
    label: "Monitored Stations",
    value: "12",
    sub: "NCR + nearby city sensors",
    icon: <MapPinned className="h-5 w-5" />,
  },
  {
    label: "Active Alerts",
    value: "3",
    sub: "1 critical, 2 advisory",
    icon: <ShieldAlert className="h-5 w-5" />,
  },
  {
    label: "Forecast Horizon",
    value: "24h",
    sub: "Hourly PM2.5 projections",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    label: "Safe Locations",
    value: "8",
    sub: "Recommended low-risk zones",
    icon: <Leaf className="h-5 w-5" />,
  },
];

const cityAQI = [
  { city: "Noida", aqi: 168, category: "Unhealthy" },
  { city: "Delhi", aqi: 194, category: "Unhealthy" },
  { city: "Ghaziabad", aqi: 176, category: "Unhealthy" },
  { city: "Gurugram", aqi: 124, category: "Sensitive" },
  { city: "Greater Noida", aqi: 141, category: "Sensitive" },
];

const forecastSeries = [
  { hour: "00", current: 172, predicted: 168 },
  { hour: "04", current: 182, predicted: 176 },
  { hour: "08", current: 191, predicted: 185 },
  { hour: "12", current: 176, predicted: 170 },
  { hour: "16", current: 166, predicted: 160 },
  { hour: "20", current: 160, predicted: 155 },
];

const sourceSplit = [
  { name: "Traffic", value: 38, color: "#F97316" },
  { name: "Construction", value: 21, color: "#F59E0B" },
  { name: "Stubble Burning", value: 28, color: "#DC2626" },
  { name: "Industry", value: 13, color: "#2563EB" },
];

const priorityActions = [
  {
    title: "Issue mask advisory",
    detail: "Push N95 alerts for Noida and Delhi commuters before rush hour.",
    icon: ShieldAlert,
  },
  {
    title: "Reduce outdoor activity",
    detail: "Recommend indoor workouts and school play restrictions through the afternoon.",
    icon: Activity,
  },
  {
    title: "Monitor wind shift",
    detail: "Track inversion break after 6 PM to update forecast confidence.",
    icon: Wind,
  },
  {
    title: "Inspect source clusters",
    detail: "Flag traffic corridors and construction zones around Sector 62 and Okhla.",
    icon: Construction,
  },
];

const alertQueue = [
  { city: "Noida", aqi: 168, status: "Unhealthy", trend: "+8%" },
  { city: "Delhi", aqi: 194, status: "Critical", trend: "+11%" },
  { city: "Ghaziabad", aqi: 176, status: "Unhealthy", trend: "+6%" },
  { city: "Gurugram", aqi: 124, status: "Sensitive", trend: "+3%" },
];

function AnalyticsPage() {
  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Air Intelligence Analysis
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Live pollution trends, forecast signals, and operational actions for the AtmoAI app.
          </p>
        </div>
        <div className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary shadow-card">
          May 21, 2026
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-4 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm font-semibold text-muted-foreground">
            <span className="rounded-full border border-border bg-background px-3 py-1.5 text-foreground">
              2026
            </span>
            <span className="hidden text-muted-foreground/60 sm:inline">
              Latest monthly intelligence
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {monthChips.map((month) => (
              <span
                key={month}
                className={`rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wider ${month === "MAY" ? "bg-primary text-white shadow-glow" : "text-muted-foreground"}`}
              >
                {month}
              </span>
            ))}
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-primary">
            <span className="h-3 w-3 rounded-full bg-primary" />
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <StatCard
            key={item.label}
            label={item.label}
            value={item.value}
            sub={item.sub}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card
          title="City Risk Overview"
          subtitle="AQI snapshot across NCR monitoring points"
          className="xl:col-span-2"
        >
          <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <ResponsiveContainer width="100%" height={290}>
              <BarChart data={cityAQI}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.93 0.01 250)"
                  vertical={false}
                />
                <XAxis dataKey="city" stroke="oklch(0.5 0.02 250)" fontSize={11} />
                <YAxis stroke="oklch(0.5 0.02 250)" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Bar dataKey="aqi" radius={[10, 10, 0, 0]}>
                  {cityAQI.map((entry) => {
                    const fill =
                      entry.aqi >= 180 ? "#DC2626" : entry.aqi >= 150 ? "#F97316" : "#F59E0B";
                    return <Cell key={entry.city} fill={fill} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {cityAQI.map((item) => (
                <div key={item.city} className="rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.city}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {item.category} air quality
                      </p>
                    </div>
                    <span className="text-lg font-extrabold text-foreground">{item.aqi}</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500"
                      style={{ width: `${Math.min((item.aqi / 220) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card
          title="Priority Action Queue"
          subtitle="Suggested steps for the current air conditions"
        >
          <div className="space-y-3">
            {priorityActions.map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.title}
                  className="flex gap-3 rounded-2xl border border-border bg-background p-4"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{action.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {action.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card
          title="24-Hour Forecast"
          subtitle="Observed vs predicted PM2.5 movement"
          className="xl:col-span-2"
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={forecastSeries}>
              <defs>
                <linearGradient id="currentFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="predFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0F766E" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#0F766E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false} />
              <XAxis dataKey="hour" stroke="oklch(0.5 0.02 250)" fontSize={11} />
              <YAxis stroke="oklch(0.5 0.02 250)" fontSize={11} />
              <Tooltip contentStyle={{ borderRadius: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area
                type="monotone"
                dataKey="current"
                name="Observed PM2.5"
                stroke="#F97316"
                strokeWidth={2.5}
                fill="url(#currentFill)"
              />
              <Area
                type="monotone"
                dataKey="predicted"
                name="Predicted PM2.5"
                stroke="#0F766E"
                strokeWidth={2}
                fill="url(#predFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Source Split" subtitle="Estimated drivers of current pollution">
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={sourceSplit}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={48}
                  outerRadius={78}
                  paddingAngle={4}
                >
                  {sourceSplit.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {sourceSplit.map((entry) => (
              <div
                key={entry.name}
                className="flex items-center justify-between text-xs border-b border-border/60 pb-2 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="font-medium text-foreground">{entry.name}</span>
                </div>
                <span className="font-bold text-muted-foreground">{entry.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card
          title="Alert Queue"
          subtitle="Most recent action-worthy cities"
          className="xl:col-span-2"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 font-semibold">City</th>
                  <th className="pb-3 font-semibold text-right">AQI</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                  <th className="pb-3 font-semibold text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {alertQueue.map((row) => (
                  <tr key={row.city} className="hover:bg-accent/40">
                    <td className="py-3 font-semibold text-foreground">{row.city}</td>
                    <td className="py-3 text-right font-extrabold text-primary">{row.aqi}</td>
                    <td className="py-3 text-right text-xs font-semibold text-muted-foreground">
                      {row.status}
                    </td>
                    <td className="py-3 text-right text-xs font-bold text-rose-600">{row.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Quick Links" subtitle="Jump into related views">
          <div className="space-y-3">
            <Link
              to="/app/dashboard/pollution"
              className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              Today's Pollution <BarChart3 className="h-4 w-4" />
            </Link>
            <Link
              to="/app/dashboard/alerts"
              className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              Alerts System <AlertTriangle className="h-4 w-4" />
            </Link>
            <Link
              to="/app/dashboard/safe-locations"
              className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              Safe Locations <Leaf className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
