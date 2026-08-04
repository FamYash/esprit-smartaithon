import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { useState } from "react";
import { Wind, ShieldAlert, Heart, Activity, RefreshCw, Info } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute("/app/dashboard/pollution")({ component: UserPollutionView });

// Mock data
const pollutants = [
  {
    name: "PM2.5",
    value: "168 μg/m³",
    desc: "Fine inhalable particles",
    status: "Unhealthy",
    color: "text-red-500",
    bg: "bg-red-50/50",
  },
  {
    name: "PM10",
    value: "242 μg/m³",
    desc: "Coarse dust particles",
    status: "Poor",
    color: "text-orange-500",
    bg: "bg-orange-50/50",
  },
  {
    name: "NO₂",
    value: "48 ppb",
    desc: "Nitrogen Dioxide (vehicles)",
    status: "Good",
    color: "text-emerald-500",
    bg: "bg-emerald-50/50",
  },
  {
    name: "SO₂",
    value: "8.2 ppb",
    desc: "Sulfur Dioxide (industrial)",
    status: "Good",
    color: "text-emerald-500",
    bg: "bg-emerald-50/50",
  },
  {
    name: "CO",
    value: "1.4 ppm",
    desc: "Carbon Monoxide",
    status: "Good",
    color: "text-emerald-500",
    bg: "bg-emerald-50/50",
  },
  {
    name: "O₃",
    value: "32 ppb",
    desc: "Ozone (smog)",
    status: "Satisfactory",
    color: "text-amber-500",
    bg: "bg-amber-50/50",
  },
];

const hourlyTrend = [
  { hour: "00:00", pm25: 142, pm10: 210 },
  { hour: "04:00", pm25: 155, pm10: 228 },
  { hour: "08:00", pm25: 178, pm10: 255 },
  { hour: "12:00", pm25: 168, pm10: 242 },
  { hour: "16:00", pm25: 160, pm10: 230 },
  { hour: "20:00", pm25: 172, pm10: 248 },
];

const timelineForecast = [
  { time: "Now", pm25: 168, status: "Unhealthy" },
  { time: "+3h", pm25: 162, status: "Unhealthy" },
  { time: "+6h", pm25: 154, status: "Unhealthy" },
  { time: "+9h", pm25: 148, status: "Poor" },
  { time: "+12h", pm25: 135, status: "Poor" },
  { time: "+18h", pm25: 124, status: "Poor" },
  { time: "+24h", pm25: 118, status: "Poor" },
];

function UserPollutionView() {
  const [sliderIndex, setSliderIndex] = useState(0);

  // Calibrate gauge calculations
  const currentAQI = 168;
  const maxAQI = 300;
  const percentage = (currentAQI / maxAQI) * 100;
  const strokeDashoffset = 440 - (440 * percentage) / 100;

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">
            Today's Pollution Breakdown
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground font-sans">
            Real-time local particulate analysis, interactive AQI dial, and health indicators
          </p>
        </div>
        <button className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary transition flex items-center gap-1.5">
          <RefreshCw className="h-4 w-4" /> Sync Station Feed
        </button>
      </div>

      {/* Top Gauge and Advisory Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* AQI Gauge */}
        <Card
          title="Live AQI Indicator Dial"
          subtitle="Based on hourly telemetry readings"
          className="flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="relative flex items-center justify-center h-48 w-48">
            <svg className="absolute transform -rotate-90 h-40 w-40">
              <circle
                cx="80"
                cy="80"
                r="70"
                className="stroke-muted"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                className="stroke-orange-500 transition-all duration-500"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray="440"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="z-10">
              <p className="text-4xl font-extrabold tracking-tight text-foreground">{currentAQI}</p>
              <p className="text-xs font-bold text-orange-600 mt-1 uppercase">Unhealthy</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">PM2.5 Primary</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Info className="h-3.5 w-3.5 text-orange-500" /> WHO limits exceeded by 11.2x
          </div>
        </Card>

        {/* Health Advisory Panel */}
        <Card
          title="Health Advisory Guidelines"
          subtitle="Automated action protocols"
          className="lg:col-span-2"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-4 flex gap-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-red-50 text-red-500 shrink-0">
                <ShieldAlert className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold">Outdoor Mask Mandate</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  N95 or N99 particulate filter respirators are mandatory for all outdoor commutes
                  in NCR-ND-03 zone today.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 flex gap-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-500 shrink-0">
                <Wind className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold">Window Vent Control</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Keep windows closed. Enable indoor air recirculation mode in automobiles and
                  residential air purifiers.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 flex gap-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-red-50 text-red-500 shrink-0">
                <Heart className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold">Sports & Outdoor Activity</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Cancel running, cycling, or football. Shift all athletic workouts indoors to avoid
                  alveolar deposit damage.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 flex gap-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-500 shrink-0">
                <Activity className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold">Sensitive Groups Alert</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Individuals with asthma, COPD, allergies or heart conditions should stay indoors
                  and keep inhalers accessible.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Six Pollutant Cards */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">Detailed Pollutant Metrics</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {pollutants.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border border-border p-5 shadow-card transition duration-200 hover:shadow-soft ${p.bg}`}
            >
              <p className="text-xs font-bold text-muted-foreground">{p.name}</p>
              <p className="text-xl font-extrabold mt-2 text-foreground">{p.value}</p>
              <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{p.desc}</p>
              <span className={`inline-block mt-3 text-[10px] font-bold ${p.color}`}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Trend Chart */}
      <Card
        title="Hourly Pollution Trend"
        subtitle="Particulate levels logged over the last 24 hours"
      >
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={hourlyTrend}>
            <defs>
              <linearGradient id="p25" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F97316" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="p10" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false} />
            <XAxis dataKey="hour" stroke="oklch(0.5 0.02 250)" fontSize={11} />
            <YAxis stroke="oklch(0.5 0.02 250)" fontSize={11} />
            <Tooltip contentStyle={{ borderRadius: 12 }} />
            <Area
              type="monotone"
              name="PM2.5 μg/m³"
              dataKey="pm25"
              stroke="#F97316"
              fill="url(#p25)"
              strokeWidth={2.5}
            />
            <Area
              type="monotone"
              name="PM10 μg/m³"
              dataKey="pm10"
              stroke="#3B82F6"
              fill="url(#p10)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Interactive 24-Hour Forecast Timeline slider */}
      <Card
        title="Interactive 24-Hour Forecast Timeline"
        subtitle="Select forecast steps to predict upcoming pollution values"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-2xl bg-[var(--color-surface)] border border-border p-5">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">
                Target Forecast Window
              </p>
              <p className="text-2xl font-extrabold text-foreground mt-1">
                Timeline Step: {timelineForecast[sliderIndex].time}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-muted-foreground uppercase">Predicted PM2.5</p>
              <p className="text-2xl font-extrabold text-primary mt-1">
                {timelineForecast[sliderIndex].pm25} μg/m³
              </p>
            </div>
          </div>

          <div className="px-2">
            <input
              type="range"
              min="0"
              max={timelineForecast.length - 1}
              value={sliderIndex}
              onChange={(e) => setSliderIndex(parseInt(e.target.value))}
              className="w-full accent-[color:var(--color-primary)] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2 font-semibold">
              {timelineForecast.map((tf, idx) => (
                <span key={tf.time} className={sliderIndex === idx ? "text-primary font-bold" : ""}>
                  {tf.time}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
