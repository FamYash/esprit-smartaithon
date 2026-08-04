import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { Compass, ShieldCheck, Heart, Map, ArrowRight, Star, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/app/dashboard/safe-locations")({
  component: SafeLocationsView,
});

const safeLocationsList = [
  {
    name: "Lodhi Gardens",
    aqi: 42,
    safetyRating: "9.8 / 10",
    distance: "8.4 km",
    trend: "Stable",
    type: "Park / Recreational",
  },
  {
    name: "Sanjay Van Park",
    aqi: 58,
    safetyRating: "9.2 / 10",
    distance: "12.0 km",
    trend: "Improving",
    type: "Forest Reserve",
  },
  {
    name: "Deer Park Hauz Khas",
    aqi: 64,
    safetyRating: "8.9 / 10",
    distance: "9.6 km",
    trend: "Improving",
    type: "Park / Lake",
  },
  {
    name: "Okhla Bird Sanctuary",
    aqi: 75,
    safetyRating: "8.4 / 10",
    distance: "4.2 km",
    trend: "Declining",
    type: "Sanctuary / Wetland",
  },
  {
    name: "Nehru Park Chanakyapuri",
    aqi: 48,
    safetyRating: "9.5 / 10",
    distance: "11.2 km",
    trend: "Stable",
    type: "Park / Recreational",
  },
];

function SafeLocationsView() {
  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">
            Recommended Safe Locations
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground font-sans">
            Nearest locations with cleanest air indices, map preview, and weekend getaway guidance
          </p>
        </div>
        <button className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary transition flex items-center gap-1.5">
          <RefreshCw className="h-4 w-4" /> Recalculate Distances
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recommended Safe Locations Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-foreground">Clean Air Zones Near Noida</h2>
          {safeLocationsList.map((loc) => (
            <div
              key={loc.name}
              className="rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-soft transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                  <Compass className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-foreground">{loc.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {loc.type} · {loc.distance} away
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-8 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-border/40 pt-3 sm:pt-0">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">
                    Air Quality
                  </p>
                  <p className="text-sm font-extrabold text-emerald-600 mt-0.5">AQI {loc.aqi}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">
                    Safety Score
                  </p>
                  <p className="text-sm font-extrabold text-foreground mt-0.5 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-400" />{" "}
                    {loc.safetyRating}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Trend</p>
                  <span
                    className={`inline-block text-[11px] font-semibold mt-0.5 ${
                      loc.trend === "Improving"
                        ? "text-emerald-600"
                        : loc.trend === "Stable"
                          ? "text-blue-500"
                          : "text-amber-500"
                    }`}
                  >
                    {loc.trend}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Preview Section */}
        <Card
          title="Clean Zone Map Overlay"
          subtitle="Green boundaries show recommended zones"
          className="flex flex-col justify-between"
        >
          <div className="relative w-full aspect-[4/3] rounded-2xl bg-accent border border-border overflow-hidden flex items-center justify-center p-4">
            {/* Draw a stylized representation of local maps with circles */}
            <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
            <svg
              viewBox="0 0 200 150"
              className="w-full h-full text-foreground/15"
              fill="currentColor"
            >
              <circle
                cx="50"
                cy="50"
                r="30"
                className="fill-emerald-500/10 stroke-emerald-500/30"
                strokeWidth="2"
              />
              <circle
                cx="150"
                cy="90"
                r="25"
                className="fill-emerald-500/10 stroke-emerald-500/30"
                strokeWidth="2"
              />
              <path
                d="M 20 80 Q 80 20 180 120"
                fill="none"
                stroke="oklch(0.9 0.01 250)"
                strokeWidth="3"
                strokeDasharray="4 4"
              />
              <circle cx="90" cy="70" r="4" className="fill-primary" />
            </svg>
            <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur border border-border rounded-xl px-2.5 py-1.5 text-[10px] font-bold flex items-center gap-1.5 shadow">
              <Map className="h-3.5 w-3.5 text-primary" /> Noida Centroid
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
            Noida Sectors are currently classified as Red Zones. The nearest Green Buffer zones
            exist 8 km southwest across the Yamuna River channel.
          </p>
        </Card>
      </div>

      {/* Travel & Getaway suggestions */}
      <Card
        title="Atmospheric Travel Advisory & Weekend Trip Guidance"
        subtitle="AI curated clean-air getaways matching telemetry forecasts"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border p-5 bg-card flex flex-col justify-between">
            <div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-800 uppercase">
                Recommended Trip
              </span>
              <h3 className="text-base font-bold text-foreground mt-3">
                Rishikesh & Haridwar Valley
              </h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Telemetry models indicate clean air drafts across northern foothills for the next 72
                hours. AQI values in Rishikesh are predicted to average 38, making it an excellent
                weekend getaway option.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs">
              <span className="font-semibold text-muted-foreground">
                Estimated commute: 4.5 hrs
              </span>
              <a
                href="#"
                className="font-bold text-primary hover:underline flex items-center gap-1"
              >
                Get directions <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-border p-5 bg-card flex flex-col justify-between">
            <div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold text-blue-800 uppercase">
                Outdoor Exercise Guide
              </span>
              <h3 className="text-base font-bold text-foreground mt-3">Indoor Sports complexes</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                If outdoor trips are unavailable, consider utilizing indoor air-filtered badminton
                courts in Noida Stadium. Telemetry indicates filtration systems there maintain an
                index score below 60 AQI.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs">
              <span className="font-semibold text-muted-foreground">
                Availability: Open till 22:00
              </span>
              <a
                href="#"
                className="font-bold text-primary hover:underline flex items-center gap-1"
              >
                View booking portal <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
