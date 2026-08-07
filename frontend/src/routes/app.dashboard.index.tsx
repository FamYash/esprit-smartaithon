import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, StatCard, monthly, forecast7d, aqiDistribution } from "@/components/atmo/data";
import {
  Wind,
  ShieldAlert,
  Heart,
  Calendar,
  ArrowRight,
  Compass,
  TrendingUp,
  Activity,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/app/dashboard/")({ component: UserDashboardHome });

function UserDashboardHome() {
  return (
    <div className="space-y-8 font-sans">
      {/* Welcome Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">
            Welcome Back, John
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground font-sans">
            Here's your air quality summary and health recommendations for Noida today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/app/dashboard/pollution"
            className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary transition flex items-center gap-1.5"
          >
            View Live Stats <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            to="/app/dashboard/alerts"
            className="rounded-xl gradient-primary px-5 py-2 text-sm font-semibold text-white shadow-glow flex items-center gap-1.5"
          >
            Active Alerts{" "}
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20 text-[10px] font-bold">
              2
            </span>
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        <StatCard
          label="Current PM2.5"
          value="168 μg/m³"
          delta="Moderately High"
          icon={<Wind className="h-5 w-5" />}
        />
        <StatCard
          label="AQI Category"
          value="Unhealthy"
          sub="Red Index Status"
          icon={<ShieldAlert className="h-5 w-5 text-red-500" />}
        />
        <StatCard
          label="Weekly Average"
          value="138 μg/m³"
          sub="7-day rolling avg"
          icon={<Calendar className="h-5 w-5" />}
        />
        <StatCard
          label="Pollution Trend"
          value="+4.8%"
          delta="Increase this week"
          icon={<TrendingUp className="h-5 w-5 text-red-500" />}
        />
        <StatCard
          label="Active Alerts"
          value="2 Critical"
          sub="Noida NCR Region"
          icon={<Activity className="h-5 w-5 text-amber-500" />}
        />
        <StatCard
          label="Safe Location Score"
          value="82 / 100"
          sub="Highly Recommended"
          icon={<Compass className="h-5 w-5 text-emerald-500" />}
        />
      </div>

      {/* Widgets row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Health Recommendations */}
        <Card
          title="Health Recommendations"
          subtitle="Tailored to your location & profile"
          className="flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50/50 p-4">
              <Heart className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-red-800">Wear N95/N99 Mask</p>
                <p className="text-xs text-red-700 mt-1 leading-relaxed">
                  Outdoor PM2.5 levels are critically high. Strenuous outdoor physical activities
                  should be avoided.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
              <Wind className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-amber-800">Close Windows & Vents</p>
                <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                  Run indoor air purifiers to prevent atmospheric pollution ingress.
                </p>
              </div>
            </div>
          </div>
          <Link
            to="/app/dashboard/profile"
            className="mt-4 flex items-center justify-between text-xs font-semibold text-primary hover:underline"
          >
            Update health profile <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Card>

        {/* Safe Locations Recommendation */}
        <Card
          title="Safe Location Recommendations"
          subtitle="Cleanest air points near you"
          className="flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
              <div className="flex items-start gap-3">
                <Compass className="h-5 w-5 text-emerald-500 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-emerald-800">Lodhi Gardens</p>
                  <p className="text-xs text-emerald-700 mt-0.5">AQI 42 · Good · 8.4 km away</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-800">
                Best Air
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border p-4">
              <div className="flex items-start gap-3">
                <Compass className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-foreground">Sanjay Van Park</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    AQI 58 · Satisfactory · 12 km
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold">Safe</span>
            </div>
          </div>
          <Link
            to="/app/dashboard/safe-locations"
            className="mt-4 flex items-center justify-between text-xs font-semibold text-primary hover:underline"
          >
            Explore safe routes map <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Card>

        {/* Pollution Summary */}
        <Card
          title="Pollution Summary"
          subtitle="Noida local atmospheric diagnostics"
          className="flex flex-col justify-between"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Noida's air quality is currently impacted by high agricultural stubble-burning counts
              in neighboring states, combined with low wind velocity and temperature inversion.
            </p>
            <div className="rounded-2xl border border-border p-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                <span className="font-semibold">Local Hotspot Code:</span>
              </div>
              <span className="font-mono font-bold bg-muted px-2 py-1 rounded-lg">NCR-ND-03</span>
            </div>
          </div>
          <Link
            to="/app/dashboard/pollution"
            className="mt-4 flex items-center justify-between text-xs font-semibold text-primary hover:underline"
          >
            View live pollutants breakdown <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Chart 1: Weekly PM2.5 Trend */}
        <Card title="Weekly PM2.5 Trend" subtitle="Particulate matter (μg/m³) vs WHO safety limits">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={forecast7d}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false} />
              <XAxis dataKey="day" stroke="oklch(0.5 0.02 250)" fontSize={11} />
              <YAxis stroke="oklch(0.5 0.02 250)" fontSize={11} />
              <Tooltip contentStyle={{ borderRadius: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line
                type="monotone"
                name="PM2.5 Live"
                dataKey="pm25"
                stroke="#F97316"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                name="WHO Safe Limit"
                dataKey="safeLimit"
                stroke="#10B981"
                strokeWidth={2}
                strokeDasharray="4 4"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Chart 2: Pollution Forecast Trend */}
        <Card title="AI Forecast Trend" subtitle="Predicted AQI trajectory for the next 7 days">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={forecast7d}>
              <defs>
                <linearGradient id="foreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false} />
              <XAxis dataKey="day" stroke="oklch(0.5 0.02 250)" fontSize={11} />
              <YAxis stroke="oklch(0.5 0.02 250)" fontSize={11} />
              <Tooltip contentStyle={{ borderRadius: 12 }} />
              <Area
                type="monotone"
                name="Predicted AQI"
                dataKey="aqi"
                stroke="#F97316"
                fill="url(#foreGrad)"
                strokeWidth={2.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart 3: AQI Distribution */}
        <Card title="AQI Distribution" subtitle="Weekly atmospheric profile distribution">
          <div className="flex flex-col items-center justify-center h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={aqiDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                >
                  {aqiDistribution.map((entry, index) => {
                    const colors = ["#EF4444", "#F59E0B", "#10B981"];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-2">
            {aqiDistribution.map((entry, index) => {
              const colors = ["bg-red-500", "bg-amber-500", "bg-emerald-500"];
              return (
                <div
                  key={entry.name}
                  className="flex items-center justify-between text-xs border-b border-border/40 pb-1.5 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${colors[index % colors.length]}`} />
                    <span className="font-medium text-foreground">{entry.name}</span>
                  </div>
                  <span className="font-bold">{entry.value}%</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Chart 4: Monthly Comparison */}
        <Card
          title="Monthly PM2.5 Comparison"
          subtitle="Comparing peak PM2.5 metrics"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthly.slice(0, 6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false} />
              <XAxis dataKey="month" stroke="oklch(0.5 0.02 250)" fontSize={11} />
              <YAxis stroke="oklch(0.5 0.02 250)" fontSize={11} />
              <Tooltip contentStyle={{ borderRadius: 12 }} />
              <Bar name="PM2.5 Average" dataKey="pm25" fill="#FDBA74" radius={[6, 6, 0, 0]}>
                {monthly.slice(0, 6).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.pm25 > 80 ? "#F97316" : "#FDBA74"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
