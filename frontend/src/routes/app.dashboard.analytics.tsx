import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, StatCard } from "@/components/atmo/data";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Compass,
  Flame,
  Leaf,
  Loader2,
  MapPin,
  MapPinned,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wind,
} from "lucide-react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { classifyAirQuality, getHealthAdvisory } from "@/lib/atmo/classification";
import { useModelPrediction } from "@/hooks/useModelPrediction";

export const Route = createFileRoute("/app/dashboard/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const {
    namedCities,
    stats,
    timestamp,
    predictionWindow,
    modelInfo,
    selectedCity,
    setSelectedCity,
    selectedPrediction,
    selectedClassification,
    loading,
    error,
  } = useModelPrediction();

  // Sorted cities by PM2.5 (descending for risk overview)
  const sortedCities = useMemo(
    () => [...namedCities].sort((a, b) => b.pm25 - a.pm25),
    [namedCities]
  );

  // Highest risk and cleanest cities
  const highestRisk = sortedCities.slice(0, 3);
  const lowestRisk = [...sortedCities].reverse().slice(0, 3);

  // Chart data for PM2.5 by City
  const cityChartData = useMemo(
    () =>
      sortedCities.map((c) => ({
        name: c.name!,
        pm25: c.pm25,
        fill: classifyAirQuality(c.pm25).color,
        category: classifyAirQuality(c.pm25).category,
      })),
    [sortedCities]
  );

  // AQI Severity Distribution for pie chart
  const aqiDistribution = useMemo(() => {
    const buckets = [
      { name: "Good (0–50)", count: 0, color: "#22c55e", label: "Good" },
      { name: "Moderate (51–100)", count: 0, color: "#eab308", label: "Moderate" },
      { name: "Poor (101–150)", count: 0, color: "#f97316", label: "Poor" },
      { name: "Very Poor (151–200)", count: 0, color: "#ef4444", label: "Very Poor" },
      { name: "Severe (>200)", count: 0, color: "#9333ea", label: "Severe" },
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

  // Estimated general emission source distribution (labeled as general environmental knowledge)
  const sourceSplit = [
    { name: "Vehicular Emissions", value: 38, color: "#F97316" },
    { name: "Industrial & Power", value: 24, color: "#2563EB" },
    { name: "Agricultural / Biomass", value: 22, color: "#DC2626" },
    { name: "Road & Construction Dust", value: 16, color: "#F59E0B" },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-medium">Loading air quality insights…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <p className="text-sm font-semibold text-foreground">Unable to load analytics data</p>
        <p className="text-xs text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Air Quality Insights
          </h1>
          <p className="mt-1 text-xs sm:text-[13px] text-muted-foreground max-w-lg leading-relaxed">
            Spatial pollution distribution, city risk rankings, and model analytics snapshot
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {namedCities.length > 1 && (
            <div className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 shrink-0">
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
        </div>
      </div>

      {/* Snapshot Info Banner */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-bold text-foreground">
              Spatial Prediction Snapshot · {predictionWindow || "Current Horizon"}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {modelInfo || "FNO-CNN Air Quality Model"} · Updated{" "}
              {timestamp
                ? new Date(timestamp).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Latest snapshot"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 border border-emerald-200/50">
            {stats.safeCities.length} Safe Cities
          </span>
          <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-700 border border-red-200/50">
            {stats.hazardousCities.length} High Concern
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
        <StatCard
          label="Monitored Cities"
          value={`${stats.cityCount}`}
          sub="Model prediction nodes"
          icon={<MapPinned className="h-4 w-4 text-primary" />}
        />
        <StatCard
          label="Average PM2.5"
          value={`${stats.avgPm25} µg/m³`}
          delta={classifyAirQuality(stats.avgPm25).category}
          icon={<Wind className="h-4 w-4 text-amber-500" />}
        />
        <StatCard
          label="Highest PM2.5"
          value={`${stats.maxPm25} µg/m³`}
          sub={highestRisk[0]?.name || "—"}
          icon={<Flame className="h-4 w-4 text-red-500" />}
        />
        <StatCard
          label="Lowest PM2.5"
          value={`${stats.minPm25} µg/m³`}
          sub={lowestRisk[0]?.name || "—"}
          icon={<Leaf className="h-4 w-4 text-emerald-500" />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* City PM2.5 Ranking Chart */}
        <Card
          title="PM2.5 Concentration by City"
          subtitle="All model prediction points sorted by particulate level"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cityChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#94A3B8"
                fontSize={10}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={-35}
                textAnchor="end"
                height={60}
              />
              <YAxis stroke="#94A3B8" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
                formatter={(value: number) => [`${value} µg/m³`, "PM2.5"]}
              />
              <Bar dataKey="pm25" name="PM2.5" radius={[6, 6, 0, 0]} barSize={22}>
                {cityChartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* AQI Severity Distribution */}
        <Card
          title="AQI Category Distribution"
          subtitle="Proportion of cities across severity tiers"
        >
          <div className="flex flex-col items-center justify-center h-[170px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={aqiDistribution}
                  dataKey="count"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={68}
                  paddingAngle={4}
                  stroke="none"
                >
                  {aqiDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                  formatter={(value: number, name: string) => [`${value} cities`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1.5">
            {aqiDistribution.map((entry) => (
              <div
                key={entry.name}
                className="flex items-center justify-between text-[11px] border-b border-border/40 pb-1.5 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="font-bold text-foreground">{entry.label}</span>
                </div>
                <span className="font-bold text-muted-foreground">
                  {entry.count} {entry.count === 1 ? "city" : "cities"} (
                  {Math.round((entry.count / stats.cityCount) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* City Status Table + Estimated Drivers */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Full City Status Table */}
        <Card
          title="National Air Quality Roster"
          subtitle="Model predictions for all monitored cities"
          className="lg:col-span-2"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 font-semibold">City</th>
                  <th className="pb-3 font-semibold text-right">PM2.5</th>
                  <th className="pb-3 font-semibold text-right">Category</th>
                  <th className="pb-3 font-semibold text-right">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {sortedCities.map((c) => {
                  const cls = classifyAirQuality(c.pm25);
                  const isSelected = selectedCity?.toLowerCase() === c.name?.toLowerCase();
                  return (
                    <tr
                      key={c.name}
                      onClick={() => setSelectedCity(c.name!)}
                      className={`hover:bg-accent/40 cursor-pointer transition ${
                        isSelected ? "bg-accent/60 font-bold" : ""
                      }`}
                    >
                      <td className="py-3 font-semibold text-foreground flex items-center gap-1.5">
                        {c.name}
                        {isSelected && (
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        )}
                      </td>
                      <td className="py-3 text-right font-extrabold" style={{ color: cls.color }}>
                        {c.pm25} µg/m³
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${cls.bg} ${cls.text}`}
                          style={{ borderColor: cls.color + "40" }}
                        >
                          {cls.category}
                        </span>
                      </td>
                      <td className="py-3 text-right text-xs text-muted-foreground max-w-[200px] truncate">
                        {getHealthAdvisory(c.pm25)[0]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Estimated Pollution Drivers */}
        <Card
          title="Pollution Source Attribution"
          subtitle="Regional environmental estimates"
        >
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Based on general atmospheric research for South Asian urban corridors, particulate matter
              is typically driven by the following proportional sectors:
            </p>
            <div className="space-y-3">
              {sourceSplit.map((s) => (
                <div key={s.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      {s.name}
                    </span>
                    <span className="font-bold text-muted-foreground">{s.value}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${s.value}%`, backgroundColor: s.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-border">
              <Link
                to="/app/dashboard/pollution"
                className="flex items-center justify-between text-xs font-bold text-primary hover:underline"
              >
                Inspect pollutant breakdown <BarChart3 className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
