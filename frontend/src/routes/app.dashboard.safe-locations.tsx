import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { lazy, Suspense, useState, useEffect, useMemo } from "react";
import {
  Compass,
  ShieldCheck,
  MapPin,
  Loader2,
  AlertTriangle,
  Heart,
  Info,
} from "lucide-react";
import { classifyAirQuality, getHealthAdvisory } from "@/lib/atmo/classification";
import { useModelPrediction } from "@/hooks/useModelPrediction";

import { useReactiveStore } from "@/lib/atmo/storage";

const DynamicMap = lazy(() =>
  import("@/components/atmo/DynamicMap").then((m) => ({ default: m.DynamicMap }))
);

export const Route = createFileRoute("/app/dashboard/safe-locations")({
  component: SafeLocationsView,
});

function SafeLocationsView() {
  const {
    predictions,
    namedCities,
    timestamp,
    loading,
    error,
    selectedCity,
    setSelectedCity,
  } = useModelPrediction();

  const [adminLocations] = useReactiveStore<any[]>("atmoai_safe_locations", []);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"model" | "admin">("model");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sort model cities by lowest PM2.5
  const modelSafeLocations = useMemo(() => {
    return [...namedCities]
      .sort((a, b) => a.pm25 - b.pm25)
      .map((city) => {
        const cls = classifyAirQuality(city.pm25);
        return {
          name: city.name!,
          pm25: city.pm25,
          lat: city.lat,
          lng: city.lng,
          category: cls.category,
          severity: cls.severity,
          color: cls.color,
          bg: cls.bg,
          text: cls.text,
          advisory: getHealthAdvisory(city.pm25)[0],
          isSafe: city.pm25 <= 100,
        };
      });
  }, [namedCities]);

  // Filter model predictions to safe points for map
  const safePredictions = useMemo(() => {
    return predictions.filter((p) => p.pm25 <= 100);
  }, [predictions]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-medium">Loading safe locations data…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <p className="text-sm font-semibold text-foreground">Unable to load safe locations</p>
        <p className="text-xs text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Safe Locations & Clean Air Zones
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Model-derived locations ranked by lowest particulate concentrations
          </p>
        </div>

        {/* Tab switch between Model-derived and Admin-registered */}
        <div className="flex items-center gap-1 rounded-xl border border-border bg-background p-1">
          <button
            onClick={() => setActiveTab("model")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === "model"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Model Ranked ({modelSafeLocations.filter((l) => l.isSafe).length})
          </button>
          <button
            onClick={() => setActiveTab("admin")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === "admin"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Admin Registered ({adminLocations.length})
          </button>
        </div>
      </div>

      {/* Main Grid: List + Map */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Safe Locations List */}
        <div className="lg:col-span-2 space-y-4">
          {activeTab === "model" ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-bold text-foreground">
                  Lowest PM2.5 Cities (Model Snapshot)
                </h2>
                <span className="text-[11px] text-muted-foreground">
                  Sorted by cleanest air quality
                </span>
              </div>

              <div className="space-y-3">
                {modelSafeLocations.map((loc, idx) => {
                  const isSelected = selectedCity?.toLowerCase() === loc.name.toLowerCase();
                  return (
                    <div
                      key={loc.name}
                      onClick={() => setSelectedCity(loc.name)}
                      className={`rounded-2xl border p-4 shadow-card hover:shadow-soft transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <span
                          className={`grid h-10 w-10 place-items-center rounded-xl shrink-0 ${loc.bg}`}
                        >
                          <Compass className="h-5 w-5" style={{ color: loc.color }} />
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-foreground">{loc.name}</h3>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              #{idx + 1}
                            </span>
                            {loc.isSafe && (
                              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800">
                                SAFE ZONE
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            {loc.advisory}
                          </p>
                          <p className="text-[10px] text-muted-foreground/70 mt-1">
                            Distance: Distance unavailable without GPS
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-border/40 pt-2 sm:pt-0 shrink-0">
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">
                            PM2.5 Level
                          </p>
                          <p className="text-sm font-extrabold mt-0.5" style={{ color: loc.color }}>
                            {loc.pm25} µg/m³
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">
                            Category
                          </p>
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold mt-0.5 border ${loc.bg} ${loc.text}`}
                            style={{ borderColor: loc.color + "40" }}
                          >
                            {loc.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-bold text-foreground">
                  Admin-Registered Safe Locations
                </h2>
                <span className="text-[11px] text-muted-foreground">
                  Locations managed by environment authorities
                </span>
              </div>

              <div className="space-y-3">
                {adminLocations.length === 0 ? (
                  <div className="py-10 text-center border rounded-2xl bg-card border-border">
                    <ShieldCheck className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-foreground">No Admin-Registered Locations</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Check the Model Ranked tab for algorithmically derived safe locations.
                    </p>
                  </div>
                ) : (
                  adminLocations.map((loc) => {
                    const cls = classifyAirQuality(loc.pm25 || loc.aqi || 30);
                    return (
                      <div
                        key={loc.id || loc.name}
                        className="rounded-2xl border border-border bg-card p-4 shadow-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                      >
                        <div className="flex items-start gap-3.5">
                          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                            <ShieldCheck className="h-5 w-5" />
                          </span>
                          <div>
                            <h3 className="text-sm font-bold text-foreground">{loc.name}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {loc.city || "NCR"} · {loc.type || "Green Buffer"}
                            </p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {loc.distance ? `${loc.distance} away` : "Distance unavailable"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-border/40 pt-2 sm:pt-0 shrink-0">
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">
                              Status
                            </p>
                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                              {loc.status || "Active"}
                            </span>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">
                              Air Index
                            </p>
                            <p className="text-sm font-extrabold text-emerald-600 mt-0.5">
                              {loc.pm25 ? `${loc.pm25} µg/m³` : loc.aqi ? `AQI ${loc.aqi}` : "Safe"}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>

        {/* Right 1 Col: DynamicMap + Info */}
        <div className="space-y-4">
          <Card
            title="Safe Zones Map"
            subtitle="Geographical distribution of monitoring points"
          >
            <div className="h-[280px] sm:h-[340px] md:h-[400px]">
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

          <Card title="How Safe Zones Are Ranked">
            <div className="space-y-2.5 text-xs text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">1. Model PM2.5 Concentrations:</strong> Locations
                with PM2.5 under 100 µg/m³ are classified as Good or Moderate.
              </p>
              <p>
                <strong className="text-foreground">2. Classification Thresholds:</strong> WHO and CPCB
                guidelines are used to determine protective measures.
              </p>
              <div className="rounded-xl bg-muted/40 p-3 text-[11px] flex items-center gap-2 text-foreground/80 mt-2">
                <Info className="h-4 w-4 text-primary shrink-0" />
                <span>
                  Snapshot timestamp:{" "}
                  {timestamp
                    ? new Date(timestamp).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Latest prediction data"}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
