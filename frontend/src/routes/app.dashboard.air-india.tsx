import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { useState } from "react";
import { Globe, MapPin, ShieldCheck, Flame, Compass, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/app/dashboard/air-india")({ component: AirAcrossIndiaView });

// Mock data
const cityMarkers = [
  {
    id: "M-1",
    name: "New Delhi",
    cx: 120,
    cy: 110,
    aqi: 198,
    state: "Delhi",
    pm25: 145,
    status: "Critical",
  },
  {
    id: "M-2",
    name: "Mumbai",
    cx: 70,
    cy: 220,
    aqi: 98,
    state: "Maharashtra",
    pm25: 55,
    status: "Satisfactory",
  },
  {
    id: "M-3",
    name: "Bengaluru",
    cx: 110,
    cy: 290,
    aqi: 72,
    state: "Karnataka",
    pm25: 42,
    status: "Good",
  },
  {
    id: "M-4",
    name: "Kolkata",
    cx: 220,
    cy: 180,
    aqi: 130,
    state: "West Bengal",
    pm25: 68,
    status: "Poor",
  },
  {
    id: "M-5",
    name: "Chennai",
    cx: 130,
    cy: 300,
    aqi: 48,
    state: "Tamil Nadu",
    pm25: 28,
    status: "Good",
  },
  {
    id: "M-6",
    name: "Patna",
    cx: 190,
    cy: 140,
    aqi: 153,
    state: "Bihar",
    pm25: 85,
    status: "Poor",
  },
  {
    id: "M-7",
    name: "Srinagar",
    cx: 100,
    cy: 40,
    aqi: 62,
    state: "Jammu & Kashmir",
    pm25: 35,
    status: "Good",
  },
];

const regionalData = [
  { region: "North India", avgAQI: 168, status: "Poor" },
  { region: "Central India", avgAQI: 124, status: "Moderate" },
  { region: "East India", avgAQI: 132, status: "Moderate" },
  { region: "West India", avgAQI: 95, status: "Satisfactory" },
  { region: "South India", avgAQI: 65, status: "Good" },
];

function AirAcrossIndiaView() {
  const [selectedCity, setSelectedCity] = useState(cityMarkers[0]);

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">
            Air Across India
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground font-sans">
            National atmospheric telemetry overview, state comparisons, and emerging hotspots
            prediction
          </p>
        </div>
      </div>

      {/* Top comparisons */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 flex flex-col justify-between">
          <div>
            <Flame className="h-8 w-8 text-red-500" />
            <h3 className="text-sm font-bold text-red-800 mt-3">Most Polluted State</h3>
            <p className="text-2xl font-extrabold text-red-900 mt-2">Delhi NCR</p>
          </div>
          <p className="text-xs text-red-700 mt-3">Avg AQI: 198 · Critical</p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 flex flex-col justify-between">
          <div>
            <ShieldCheck className="h-8 w-8 text-emerald-500" />
            <h3 className="text-sm font-bold text-emerald-800 mt-3">Cleanest State</h3>
            <p className="text-2xl font-extrabold text-emerald-900 mt-2">Kerala</p>
          </div>
          <p className="text-xs text-emerald-700 mt-3">Avg AQI: 48 · Good</p>
        </div>

        <div className="rounded-2xl border border-orange-200 bg-orange-50/50 p-6 flex flex-col justify-between lg:col-span-2">
          <div>
            <AlertTriangle className="h-8 w-8 text-orange-500" />
            <h3 className="text-sm font-bold text-orange-800 mt-3">Active Hotspot Warning</h3>
            <p className="text-base font-bold text-orange-950 mt-1">
              Indo-Gangetic Plain Stagnation
            </p>
            <p className="text-xs text-orange-800 mt-2 leading-relaxed">
              High particulate accumulation remains active across Punjab, Haryana, Delhi, and Bihar
              due to low-altitude planetary boundary layer compression.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive India Map representation */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map visualization */}
        <Card
          title="Interactive National Telemetry Map"
          subtitle="Click on cities to inspect regional air sensors"
          className="lg:col-span-2 flex flex-col items-center justify-center p-6 min-h-[420px]"
        >
          <div className="relative w-full max-w-[320px] aspect-[4/5] bg-accent/35 rounded-3xl border border-border p-4">
            {/* SVG stylized outline of India */}
            <svg
              viewBox="0 0 300 360"
              className="w-full h-full text-foreground/20"
              fill="currentColor"
            >
              {/* Stylized abstract India shape paths */}
              <path
                d="M120 20 L150 30 L160 50 L140 70 L150 90 L120 110 L100 130 L70 200 L65 240 L85 260 L110 320 L125 340 L135 320 L130 290 L160 250 L195 210 L220 180 L230 160 L210 140 L190 120 L180 100 L185 80 L165 70 L145 50 Z"
                className="fill-muted stroke-border/40"
                strokeWidth="2"
              />
              {/* Grid backdrop */}
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="none" />
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="oklch(0.93 0.01 250)"
                  strokeWidth="1"
                />
              </pattern>
              <rect
                width="300"
                height="360"
                fill="url(#grid)"
                className="opacity-40 pointer-events-none"
              />

              {/* Pulser points */}
              {cityMarkers.map((m) => {
                const colors =
                  m.status === "Critical"
                    ? "text-red-500 fill-red-500"
                    : m.status === "Poor"
                      ? "text-orange-500 fill-orange-500"
                      : "text-emerald-500 fill-emerald-500";

                const isSelected = selectedCity.id === m.id;

                return (
                  <g key={m.id} onClick={() => setSelectedCity(m)} className="cursor-pointer group">
                    {/* Ring animation */}
                    <circle
                      cx={m.cx}
                      cy={m.cy}
                      r={isSelected ? "12" : "8"}
                      className={`animate-ping opacity-25 ${colors}`}
                    />
                    <circle
                      cx={m.cx}
                      cy={m.cy}
                      r={isSelected ? "7" : "5"}
                      className={`${colors} stroke-white`}
                      strokeWidth={isSelected ? "2" : "1.5"}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Labels overlay */}
            <div className="absolute top-4 left-4 pointer-events-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-background px-2 py-1 rounded-lg border border-border">
                National Grid v1.0
              </span>
            </div>
          </div>
        </Card>

        {/* Selected city information */}
        <Card
          title="Sensor Station Telemetry"
          subtitle={selectedCity.name}
          className="flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-semibold text-muted-foreground">State Region:</span>
              <span className="text-xs font-bold">{selectedCity.state}</span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-semibold text-muted-foreground">24-hour Avg AQI:</span>
              <span className="text-sm font-extrabold text-primary">{selectedCity.aqi}</span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-semibold text-muted-foreground">
                PM2.5 concentration:
              </span>
              <span className="text-sm font-extrabold text-foreground">
                {selectedCity.pm25} μg/m³
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-semibold text-muted-foreground">
                Pollution Category:
              </span>
              <span
                className={`text-xs font-bold uppercase ${
                  selectedCity.status === "Critical"
                    ? "text-red-600"
                    : selectedCity.status === "Poor"
                      ? "text-orange-500"
                      : "text-emerald-600"
                }`}
              >
                {selectedCity.status}
              </span>
            </div>

            <div className="rounded-2xl bg-[var(--color-surface)] border border-border p-4 flex gap-3">
              <Compass className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-foreground">Regional Recommendation</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  {selectedCity.status === "Critical"
                    ? "N95 masks advised for all outdoor tasks. Minimize prolonged periods outdoors."
                    : "Conditions are acceptable for normal outdoor exercises."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-border pt-4">
            <p className="text-[10px] text-muted-foreground italic">
              Sensor data verified via National CPCB Feed
            </p>
          </div>
        </Card>
      </div>

      {/* Regional Comparison Chart */}
      <Card
        title="Regional AQI Comparisons"
        subtitle="Weighted average AQI across regional divisions"
      >
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={regionalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false} />
            <XAxis dataKey="region" stroke="oklch(0.5 0.02 250)" fontSize={11} />
            <YAxis stroke="oklch(0.5 0.02 250)" fontSize={11} />
            <Tooltip contentStyle={{ borderRadius: 12 }} />
            <Bar name="Avg AQI" dataKey="avgAQI" fill="#F97316" radius={[6, 6, 0, 0]}>
              {regionalData.map((entry, index) => {
                const colors = ["#EF4444", "#F59E0B", "#F59E0B", "#10B981", "#10B981"];
                return <Cell key={`cell-${index}`} fill={colors[index]} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
