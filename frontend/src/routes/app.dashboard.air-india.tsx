import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { lazy, Suspense, useState, useEffect, useMemo } from "react";
import { Globe, ShieldCheck, Flame, AlertTriangle, Loader2, MapPin, Compass } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import { classifyAirQuality, getHealthAdvisory } from "@/lib/atmo/classification";
import { useModelPrediction } from "@/hooks/useModelPrediction";

const DynamicMap = lazy(() =>
  import("@/components/atmo/DynamicMap").then((m) => ({ default: m.DynamicMap }))
);

export const Route = createFileRoute("/app/dashboard/air-india")({
  component: AirAcrossIndiaView,
});

function AirAcrossIndiaView() {
  const {
    predictions, namedCities, stats,
    selectedCity, setSelectedCity,
    selectedPrediction, selectedClassification,
    loading, error,
  } = useModelPrediction();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sorted cities for ranking
  const sortedByPollution = useMemo(
    () => [...namedCities].sort((a, b) => b.pm25 - a.pm25),
    [namedCities]
  );

  // Top polluted and cleanest
  const mostPolluted = sortedByPollution[0];
  const cleanest = sortedByPollution[sortedByPollution.length - 1];

  // Chart data
  const chartData = useMemo(
    () => namedCities.map((c) => ({
      name: c.name!,
      pm25: c.pm25,
      fill: classifyAirQuality(c.pm25).color,
    })),
    [namedCities]
  );

  // Selected city details
  const pm25 = selectedPrediction?.pm25 ?? 0;
  const cls = selectedClassification;
  const advisories = getHealthAdvisory(pm25);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-medium">Loading national air quality data…</p>
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
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Air Across India
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            National air quality overview across {stats.cityCount} monitored cities
          </p>
        </div>
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

      {/* Top comparison cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {mostPolluted && (
          <div className="rounded-2xl border border-red-200 bg-red-50/50 p-4 sm:p-5">
            <Flame className="h-7 w-7 text-red-500" />
            <h3 className="text-sm font-bold text-red-800 mt-2">Most Polluted</h3>
            <p className="text-xl font-extrabold text-red-900 mt-1">{mostPolluted.name}</p>
            <p className="text-xs text-red-700 mt-2">
              PM2.5: {mostPolluted.pm25} µg/m³ · {classifyAirQuality(mostPolluted.pm25).category}
            </p>
          </div>
        )}
        {cleanest && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 sm:p-5">
            <ShieldCheck className="h-7 w-7 text-emerald-500" />
            <h3 className="text-sm font-bold text-emerald-800 mt-2">Cleanest City</h3>
            <p className="text-xl font-extrabold text-emerald-900 mt-1">{cleanest.name}</p>
            <p className="text-xs text-emerald-700 mt-2">
              PM2.5: {cleanest.pm25} µg/m³ · {classifyAirQuality(cleanest.pm25).category}
            </p>
          </div>
        )}
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          <Globe className="h-7 w-7 text-primary" />
          <h3 className="text-sm font-bold text-foreground mt-2">Monitored Cities</h3>
          <p className="text-xl font-extrabold text-foreground mt-1">{stats.cityCount}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {stats.safeCities.length} safe · {stats.hazardousCities.length} above threshold
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          <Compass className="h-7 w-7 text-amber-500" />
          <h3 className="text-sm font-bold text-foreground mt-2">Average PM2.5</h3>
          <p className="text-xl font-extrabold text-foreground mt-1">{stats.avgPm25} µg/m³</p>
          <p className="text-xs text-muted-foreground mt-2">
            {classifyAirQuality(stats.avgPm25).category}
          </p>
        </div>
      </div>

      {/* Map + Detail Panel */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <Card
          title="Interactive India Map"
          subtitle="Click markers to inspect city data"
          className="lg:col-span-2"
        >
          <div className="h-[320px] md:h-[420px] lg:h-[500px]">
            {mounted ? (
              <Suspense
                fallback={
                  <div className="h-full w-full bg-sky-50 flex items-center justify-center rounded-2xl">
                    <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" /> Loading map…
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

        {/* Selected city detail */}
        <Card
          title="City Details"
          subtitle={selectedCity || "Select a city"}
          className="flex flex-col justify-between"
        >
          {selectedPrediction ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-semibold text-muted-foreground">City</span>
                <span className="text-sm font-bold">{selectedPrediction.name}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-semibold text-muted-foreground">PM2.5</span>
                <span className="text-sm font-extrabold" style={{ color: cls.color }}>
                  {pm25} µg/m³
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-semibold text-muted-foreground">Category</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${cls.bg} ${cls.text}`}
                  style={{ borderColor: cls.color + "40" }}
                >
                  {cls.category}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-semibold text-muted-foreground">Coordinates</span>
                <span className="text-xs font-mono text-muted-foreground">
                  {selectedPrediction.lat.toFixed(2)}, {selectedPrediction.lng.toFixed(2)}
                </span>
              </div>

              <div className="rounded-2xl bg-[var(--color-surface)] border border-border p-3 flex gap-3">
                <Compass className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-foreground">Health Advisory</p>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    {advisories[0]}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-amber-500" />
              <p className="text-xs font-bold text-slate-700 mt-2">No prediction data</p>
              <p className="text-[10px] text-muted-foreground mt-1">
                Select a city from the dropdown to view details.
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* City PM2.5 Ranking Chart */}
      <Card title="PM2.5 Ranking" subtitle="All monitored cities ordered by concentration">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={[...chartData].sort((a, b) => b.pm25 - a.pm25)}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="name" stroke="#94A3B8" fontSize={10} axisLine={false} tickLine={false}
              interval={0} angle={-35} textAnchor="end" height={60}
            />
            <YAxis stroke="#94A3B8" fontSize={10} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", fontSize: "12px", fontWeight: "bold" }}
              formatter={(value: number) => [`${value} µg/m³`, "PM2.5"]}
            />
            <Bar dataKey="pm25" name="PM2.5" radius={[6, 6, 0, 0]} barSize={22}>
              {[...chartData].sort((a, b) => b.pm25 - a.pm25).map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
