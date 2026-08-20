import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, StatCard } from "@/components/atmo/data";
import {
  Wind,
  ShieldAlert,
  Heart,
  ArrowRight,
  Compass,
  Activity,
  ChevronRight,
  MapPin,
  TrendingDown,
  TrendingUp,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { lazy, Suspense, useState, useEffect, useMemo } from "react";
import { classifyAirQuality, getHealthAdvisory } from "@/lib/atmo/classification";
import { useModelPrediction } from "@/hooks/useModelPrediction";

const DynamicMap = lazy(() =>
  import("@/components/atmo/DynamicMap").then((m) => ({ default: m.DynamicMap }))
);

export const Route = createFileRoute("/app/dashboard/")(
  { component: UserDashboardHome }
);

import { useReactiveStore } from "@/lib/atmo/storage";

function UserDashboardHome() {
  const {
    predictions, namedCities, summary, timestamp,
    predictionWindow, modelInfo,
    selectedCity, setSelectedCity,
    selectedPrediction, selectedClassification,
    stats, loading, error,
  } = useModelPrediction();

  const [profile] = useReactiveStore<any>("atmoai_user_profile", { name: "Yash Kumavat" });
  const [alerts] = useReactiveStore<any[]>("atmoai_alerts", []);
  const [safeLocations] = useReactiveStore<any[]>("atmoai_safe_locations", []);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentPm25 = selectedPrediction?.pm25 ?? summary.pm25;
  const airQuality = selectedClassification;
  const advisories = getHealthAdvisory(currentPm25, profile);
  const activeAlertsCount = alerts.filter((a) => !a.acknowledged && a.status !== "Resolved" && a.status !== "Dismissed" && a.status !== "Acknowledged").length;

  // Format timestamp
  const formattedDate = timestamp
    ? new Date(timestamp).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      })
    : "—";

  // City PM2.5 chart data
  const cityChartData = useMemo(
    () => namedCities.map((c) => ({
      name: c.name!, pm25: c.pm25,
      fill: classifyAirQuality(c.pm25).color,
    })),
    [namedCities]
  );

  // AQI distribution pie
  const aqiDistribution = useMemo(() => {
    const buckets = [
      { name: "Good", count: 0, color: "#22c55e" },
      { name: "Moderate", count: 0, color: "#eab308" },
      { name: "Poor", count: 0, color: "#f97316" },
      { name: "Very Poor", count: 0, color: "#ef4444" },
      { name: "Severe", count: 0, color: "#9333ea" },
    ];
    namedCities.forEach((c) => {
      if (c.pm25 <= 50) buckets[0].count++;
      else if (c.pm25 <= 100) buckets[1].count++;
      else if (c.pm25 <= 150) buckets[2].count++;
      else if (c.pm25 <= 200) buckets[3].count++;
      else buckets[4].count++;
    });
    return buckets.filter((b) => b.count > 0);
  }, [namedCities]);

  // Safe locations derived from model
  const modelSafeCities = useMemo(
    () => stats.safeCities.slice(0, 3),
    [stats.safeCities]
  );

  // Greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-medium">Loading air quality data…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <p className="text-sm font-semibold text-foreground">Unable to load air quality data</p>
        <p className="text-xs text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans max-w-[1600px] mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {greeting}, {profile.name || "User"}
          </h1>
          <p className="mt-1 text-xs sm:text-[13px] text-muted-foreground max-w-lg leading-relaxed">
            Your air quality summary for{" "}
            <strong>{selectedCity || summary.location || "your region"}</strong>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* City selector */}
          {namedCities.length > 1 && (
            <div className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-xs font-semibold text-foreground focus:outline-none cursor-pointer pr-4"
                aria-label="Select city"
              >
                {namedCities.map((c) => (
                  <option key={c.name} value={c.name!}>{c.name}</option>
                ))}
              </select>
            </div>
          )}
          <Link
            to="/app/dashboard/alerts"
            className="rounded-xl bg-orange-500 px-3 sm:px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-orange-600 transition-all flex items-center gap-1.5"
          >
            Alerts{" "}
            <span className="grid h-4 w-4 place-items-center rounded-full bg-white/20 text-[9px] font-bold">
              {activeAlertsCount}
            </span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <StatCard
          label="PM2.5 Level"
          value={`${currentPm25} µg/m³`}
          delta={airQuality.label}
          icon={<Wind className="h-4 w-4" />}
        />
        <StatCard
          label="AQI Category"
          value={airQuality.category}
          sub={`Severity: ${airQuality.severity}`}
          icon={<ShieldAlert className="h-4 w-4" style={{ color: airQuality.color }} />}
        />
        <StatCard
          label="Safety Index"
          value={currentPm25 <= 50 ? "Safe" : currentPm25 <= 100 ? "Moderate" : currentPm25 <= 150 ? "Caution" : "Unsafe"}
          sub={`${stats.safeCities.length} of ${stats.cityCount} cities safe`}
          icon={<Compass className="h-4 w-4 text-emerald-500" />}
        />
        <StatCard
          label="Model Snapshot"
          value={predictionWindow || "—"}
          delta={formattedDate}
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      {/* Widgets row */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Health Recommendations */}
        <Card
          title="Health Recommendations"
          subtitle={`Based on ${selectedCity || "current"} air quality & your health profile`}
          className="flex flex-col justify-between"
        >
          <div className="space-y-3">
            {advisories.map((adv, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 rounded-2xl p-3 backdrop-blur-sm border ${
                  idx === 0
                    ? "bg-gradient-to-br from-red-50/80 to-white/40 border-red-100/50"
                    : "bg-gradient-to-br from-amber-50/80 to-white/40 border-amber-100/50"
                }`}
              >
                <Heart className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                <p className="text-[11px] text-slate-700 leading-relaxed">{adv}</p>
              </div>
            ))}
          </div>
          <Link
            to="/app/dashboard/profile"
            className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-primary hover:text-orange-600"
          >
            Update health profile <ArrowRight className="h-3 w-3" />
          </Link>
        </Card>

        {/* Safest Cities */}
        <Card
          title="Safest Locations"
          subtitle="Cities with lowest PM2.5 from model data"
          className="flex flex-col justify-between"
        >
          <div className="space-y-3">
            {modelSafeCities.length > 0 ? (
              modelSafeCities.map((city, idx) => {
                const cls = classifyAirQuality(city.pm25);
                return (
                  <div key={city.name} className="flex items-center justify-between rounded-2xl bg-gradient-to-br from-emerald-50/80 to-white/40 border border-emerald-100/50 p-3 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <Compass className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-emerald-800">{city.name}</p>
                        <p className="text-[10px] text-emerald-700/80 mt-0.5">
                          PM2.5: {city.pm25} µg/m³ · {cls.category}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-100/80 px-2 py-0.5 text-[9px] font-bold text-emerald-800 border border-emerald-200/50">
                      {idx === 0 ? "BEST" : "SAFE"}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <Compass className="h-8 w-8 text-slate-300" />
                <p className="text-xs text-muted-foreground mt-2">No safe locations in current model data.</p>
              </div>
            )}
          </div>
          <Link
            to="/app/dashboard/safe-locations"
            className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-primary hover:text-orange-600"
          >
            View all locations <ArrowRight className="h-3 w-3" />
          </Link>
        </Card>

        {/* Summary card */}
        <Card
          title="Prediction Summary"
          subtitle={`${selectedCity || summary.location} local analysis`}
          className="flex flex-col justify-between"
        >
          <div className="space-y-4">
            <p className="text-[11px] leading-relaxed text-slate-600">
              Air quality is currently classified as <strong style={{ color: airQuality.color }}>{airQuality.label}</strong>.{" "}
              {stats.hazardousCities.length > 0
                ? `${stats.hazardousCities.length} cities exceed safe thresholds.`
                : "All monitored cities are within safe limits."}
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Most polluted</span>
                <span className="font-bold text-red-600">
                  {namedCities.length > 0 ? [...namedCities].sort((a, b) => b.pm25 - a.pm25)[0].name : "—"}{" "}
                  ({stats.maxPm25} µg/m³)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Cleanest</span>
                <span className="font-bold text-emerald-600">
                  {namedCities.length > 0 ? [...namedCities].sort((a, b) => a.pm25 - b.pm25)[0].name : "—"}{" "}
                  ({stats.minPm25} µg/m³)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Average PM2.5</span>
                <span className="font-bold">{stats.avgPm25} µg/m³</span>
              </div>
            </div>
            <div className="rounded-2xl bg-white/40 border border-white/60 p-3 flex items-center justify-between text-xs backdrop-blur-sm">
              <span className="font-bold text-slate-700">Source</span>
              <span className="font-mono text-[10px] font-bold bg-slate-100/80 px-2 py-1 rounded border border-slate-200/50 truncate max-w-[180px]">
                {modelInfo || "AtmoAI Model"}
              </span>
            </div>
          </div>
          <Link
            to="/app/dashboard/pollution"
            className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-primary hover:text-orange-600"
          >
            View pollutant details <ArrowRight className="h-3 w-3" />
          </Link>
        </Card>
      </div>

      {/* Map Widget */}
      <Card title="Air Quality Map" subtitle={`${stats.cityCount} monitoring points from model prediction data`}>
        <div className="h-[300px] md:h-[400px] lg:h-[480px]">
          {mounted ? (
            <Suspense
              fallback={
                <div className="h-full w-full bg-sky-50 flex items-center justify-center rounded-2xl">
                  <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                  Loading map…
                </div>
              }
            >
              <DynamicMap
                predictions={predictions}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
              />
            </Suspense>
          ) : (
            <div className="h-full w-full bg-sky-50 flex items-center justify-center rounded-2xl">
              Loading map…
            </div>
          )}
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* City PM2.5 Comparison */}
        <Card title="PM2.5 by City" subtitle="All monitored cities" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={cityChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="name" stroke="#94A3B8" fontSize={10} axisLine={false} tickLine={false}
                interval={0} angle={-35} textAnchor="end" height={60}
              />
              <YAxis stroke="#94A3B8" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", fontSize: "12px", fontWeight: "bold" }}
                formatter={(value: number) => [`${value} µg/m³`, "PM2.5"]}
              />
              <Bar dataKey="pm25" name="PM2.5" radius={[6, 6, 0, 0]} barSize={24}>
                {cityChartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* AQI Category Distribution */}
        <Card title="AQI Distribution" subtitle="Category breakdown of monitored cities">
          <div className="flex flex-col items-center justify-center h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={aqiDistribution}
                  dataKey="count"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={4}
                  stroke="none"
                >
                  {aqiDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", fontSize: "12px", fontWeight: "bold" }}
                  formatter={(value: number, name: string) => [`${value} cities`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1.5">
            {aqiDistribution.map((entry) => (
              <div
                key={entry.name}
                className="flex items-center justify-between text-[11px] border-b border-slate-100 pb-1.5 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="font-bold text-slate-700">{entry.name}</span>
                </div>
                <span className="font-bold text-slate-900">
                  {entry.count} {entry.count === 1 ? "city" : "cities"}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
