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
    <div className="space-y-6 font-sans max-w-[1600px] mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Welcome Back, John
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground font-sans max-w-lg leading-relaxed">
            Here's your air quality summary and health recommendations for Noida today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/app/dashboard/pollution"
            className="rounded-xl border border-white/40 bg-white/60 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold hover:border-primary/40 hover:bg-white/80 transition-all flex items-center gap-1.5 shadow-sm"
          >
            Live Stats <ChevronRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to="/app/dashboard/alerts"
            className="rounded-xl bg-orange-500 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-orange-600 transition-all flex items-center gap-1.5"
          >
            Active Alerts{" "}
            <span className="grid h-4 w-4 place-items-center rounded-full bg-white/20 text-[9px] font-bold">
              2
            </span>
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-6">
        <StatCard
          label="Current PM2.5"
          value="168 μg/m³"
          delta="Moderately High"
          icon={<Wind className="h-4 w-4" />}
        />
        <StatCard
          label="AQI Category"
          value="Unhealthy"
          sub="Red Index Status"
          icon={<ShieldAlert className="h-4 w-4 text-red-500" />}
        />
        <StatCard
          label="Weekly Average"
          value="138 μg/m³"
          sub="7-day rolling avg"
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard
          label="Pollution Trend"
          value="+4.8%"
          delta="Increase this week"
          icon={<TrendingUp className="h-4 w-4 text-red-500" />}
        />
        <StatCard
          label="Active Alerts"
          value="2 Critical"
          sub="Noida NCR Region"
          icon={<Activity className="h-4 w-4 text-amber-500" />}
        />
        <StatCard
          label="Safe Locations"
          value="82/100"
          sub="Highly Recommended"
          icon={<Compass className="h-4 w-4 text-emerald-500" />}
        />
      </div>

      {/* Widgets row */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Health Recommendations */}
        <Card
          title="Health Recommendations"
          subtitle="Tailored to your location & profile"
          className="flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-2xl bg-gradient-to-br from-red-50/80 to-white/40 border border-red-100/50 p-3.5 backdrop-blur-sm">
              <Heart className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-red-800">Wear N95/N99 Mask</p>
                <p className="text-[10px] text-red-700/80 mt-1 leading-relaxed">
                  Outdoor PM2.5 levels are critically high. Strenuous outdoor physical activities
                  should be avoided.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-gradient-to-br from-amber-50/80 to-white/40 border border-amber-100/50 p-3.5 backdrop-blur-sm">
              <Wind className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-800">Close Windows & Vents</p>
                <p className="text-[10px] text-amber-700/80 mt-1 leading-relaxed">
                  Run indoor air purifiers to prevent atmospheric pollution ingress.
                </p>
              </div>
            </div>
          </div>
          <Link
            to="/app/dashboard/profile"
            className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-primary hover:text-orange-600"
          >
            Update health profile <ArrowRight className="h-3 w-3" />
          </Link>
        </Card>

        {/* Safe Locations Recommendation */}
        <Card
          title="Safe Locations"
          subtitle="Cleanest air points near you"
          className="flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-gradient-to-br from-emerald-50/80 to-white/40 border border-emerald-100/50 p-3.5 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <Compass className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-emerald-800">Lodhi Gardens</p>
                  <p className="text-[10px] text-emerald-700/80 mt-0.5">AQI 42 · Good · 8.4 km away</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100/80 px-2 py-0.5 text-[9px] font-bold text-emerald-800 border border-emerald-200/50 shadow-sm">
                BEST
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/40 border border-white/60 p-3.5 backdrop-blur-sm shadow-sm">
              <div className="flex items-start gap-3">
                <Compass className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-700">Sanjay Van Park</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    AQI 58 · Satisfactory · 12 km
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-slate-100/80 px-2 py-0.5 text-[9px] font-bold text-slate-600 border border-slate-200/50 shadow-sm">SAFE</span>
            </div>
          </div>
          <Link
            to="/app/dashboard/safe-locations"
            className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-primary hover:text-orange-600"
          >
            Explore safe routes <ArrowRight className="h-3 w-3" />
          </Link>
        </Card>

        {/* Pollution Summary */}
        <Card
          title="Pollution Summary"
          subtitle="Noida local diagnostics"
          className="flex flex-col justify-between"
        >
          <div className="space-y-4">
            <p className="text-[11px] leading-relaxed text-slate-600">
              Noida's air quality is currently impacted by high agricultural stubble-burning counts
              in neighboring states, combined with low wind velocity and temperature inversion.
            </p>
            <div className="rounded-2xl bg-white/40 border border-white/60 p-3 flex items-center justify-between text-xs backdrop-blur-sm shadow-sm">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold text-slate-700">Hotspot Code:</span>
              </div>
              <span className="font-mono text-[10px] font-bold bg-slate-100/80 px-2 py-1 rounded border border-slate-200/50">NCR-ND-03</span>
            </div>
          </div>
          <Link
            to="/app/dashboard/pollution"
            className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-primary hover:text-orange-600"
          >
            View live pollutants <ArrowRight className="h-3 w-3" />
          </Link>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Chart 1: Weekly PM2.5 Trend */}
        <Card title="Weekly PM2.5 Trend" subtitle="Particulate matter (μg/m³) vs WHO limits">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={forecast7d} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ stroke: '#F1F5F9', strokeWidth: 2 }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }} />
              <Legend wrapperStyle={{ fontSize: 10, fontWeight: 'bold', paddingTop: '10px' }} iconType="circle" iconSize={6} />
              <Line
                type="monotone"
                name="PM2.5 Live"
                dataKey="pm25"
                stroke="#F97316"
                strokeWidth={3}
                dot={{ r: 4, fill: "#F97316", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                name="WHO Limit"
                dataKey="safeLimit"
                stroke="#10B981"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Chart 2: Pollution Forecast Trend */}
        <Card title="AI Forecast Trend" subtitle="Predicted AQI trajectory for 7 days">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={forecast7d} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="foreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ stroke: '#F1F5F9', strokeWidth: 2 }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }} />
              <Area
                type="monotone"
                name="Predicted AQI"
                dataKey="aqi"
                stroke="#F97316"
                fill="url(#foreGrad)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Chart 3: AQI Distribution */}
        <Card title="AQI Distribution" subtitle="Weekly atmospheric profile">
          <div className="flex flex-col items-center justify-center h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={aqiDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={5}
                  stroke="none"
                >
                  {aqiDistribution.map((entry, index) => {
                    const colors = ["#10B981", "#F59E0B", "#F97316", "#EF4444", "#9333EA"];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1.5">
            {aqiDistribution.map((entry, index) => {
              const colors = ["bg-emerald-500", "bg-amber-500", "bg-orange-500", "bg-red-500", "bg-purple-500"];
              return (
                <div
                  key={entry.name}
                  className="flex items-center justify-between text-[11px] border-b border-slate-100 pb-1.5 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${colors[index % colors.length]}`} />
                    <span className="font-bold text-slate-700">{entry.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{entry.value}%</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Chart 4: Monthly Comparison */}
        <Card
          title="Monthly Comparison"
          subtitle="Comparing peak PM2.5 metrics"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthly.slice(0, 6)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }} />
              <Bar name="PM2.5 Average" dataKey="pm25" radius={[6, 6, 0, 0]} barSize={32}>
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
