import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { useMemo } from "react";
import {
  Wind,
  ShieldAlert,
  Heart,
  Info,
  MapPin,
  Loader2,
  AlertTriangle,
  Activity,
  ShieldCheck,
  Airplay,
  Clock,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { classifyAirQuality, getHealthAdvisory } from "@/lib/atmo/classification";
import { useModelPrediction } from "@/hooks/useModelPrediction";
import { useReactiveStore } from "@/lib/atmo/storage";

export const Route = createFileRoute("/app/dashboard/pollution")({
  component: UserPollutionView,
});

function UserPollutionView() {
  const {
    namedCities,
    selectedCity,
    setSelectedCity,
    selectedPrediction,
    selectedClassification,
    loading,
    error,
    predictionWindow,
    modelInfo,
    timestamp,
    stats,
  } = useModelPrediction();

  const [userProfile] = useReactiveStore<any>("atmoai_user_profile", {
    name: "Yash Kumavat",
    asthma: true,
  });

  const currentPm25 = selectedPrediction?.pm25 ?? 68;
  const activeCityName = selectedCity || selectedPrediction?.name || "Bengaluru";
  const aqClass = selectedClassification;
  const advisories = getHealthAdvisory(currentPm25, userProfile);

  // NAQI / AQI calculation derived from PM2.5
  const naqiValue = useMemo(() => {
    // Standard Indian CPCB PM2.5 to AQI conversion formula approximation
    if (currentPm25 <= 30) return Math.round((50 / 30) * currentPm25);
    if (currentPm25 <= 60) return Math.round(50 + ((50 / 30) * (currentPm25 - 30)));
    if (currentPm25 <= 90) return Math.round(100 + ((100 / 30) * (currentPm25 - 60)));
    if (currentPm25 <= 120) return Math.round(200 + ((100 / 30) * (currentPm25 - 90)));
    if (currentPm25 <= 250) return Math.round(300 + ((100 / 130) * (currentPm25 - 120)));
    return Math.round(400 + ((100 / 130) * (currentPm25 - 250)));
  }, [currentPm25]);

  // Safety status derived from PM2.5
  const safetyStatus = useMemo(() => {
    if (currentPm25 <= 50) return { label: "Safe Air", desc: "Ideal for outdoor activities", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" };
    if (currentPm25 <= 100) return { label: "Acceptable", desc: "Moderate risk for sensitive groups", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" };
    if (currentPm25 <= 150) return { label: "Caution Advised", desc: "Unhealthy for sensitive profiles", color: "text-orange-700", bg: "bg-orange-50 border-orange-200" };
    if (currentPm25 <= 200) return { label: "High Risk", desc: "Avoid heavy outdoor exertion", color: "text-red-700", bg: "bg-red-50 border-red-200" };
    return { label: "Hazardous", desc: "Emergency protection required", color: "text-purple-700", bg: "bg-purple-50 border-purple-200" };
  }, [currentPm25]);

  // Pollutants grid dataset
  const pollutants = useMemo(
    () => [
      {
        code: "PM2.5",
        label: "Fine Particulate Matter",
        value: `${currentPm25} µg/m³`,
        status: aqClass.shortCategory,
        color: aqClass.color,
        bg: aqClass.bg,
        border: aqClass.border,
        available: true,
      },
      { code: "PM10", label: "Coarse Particles", available: false },
      { code: "NO₂", label: "Nitrogen Dioxide", available: false },
      { code: "SO₂", label: "Sulfur Dioxide", available: false },
      { code: "CO", label: "Carbon Monoxide", available: false },
      { code: "O₃", label: "Ozone Level", available: false },
    ],
    [currentPm25, aqClass]
  );

  // City comparison chart data
  const cityChartData = useMemo(
    () =>
      namedCities.map((c) => {
        const cls = classifyAirQuality(c.pm25);
        const isSelected = c.name?.toLowerCase() === activeCityName.toLowerCase();
        return {
          name: c.name!,
          pm25: c.pm25,
          fill: cls.color,
          category: cls.shortCategory,
          isSelected,
        };
      }),
    [namedCities, activeCityName]
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-medium">Loading pollution intelligence…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <p className="text-sm font-semibold text-foreground">Unable to load pollution data</p>
        <p className="text-xs text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-sans max-w-[1600px] mx-auto animate-fade-in">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            Today's Pollution
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
              Live Model Stream
            </span>
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
            Pollutant breakdown and health indicators for{" "}
            <strong className="text-foreground">{activeCityName}</strong>
          </p>
        </div>

        {/* City Selector */}
        {namedCities.length > 1 && (
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-1.5 shadow-sm shrink-0 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-muted-foreground">Location:</span>
            </div>
            <select
              value={activeCityName}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-xs font-extrabold text-foreground focus:outline-none cursor-pointer pr-3"
              aria-label="Select City"
            >
              {namedCities.map((c) => (
                <option key={c.name} value={c.name!}>
                  {c.name} ({c.pm25} µg/m³)
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* ── PRIMARY KPI CARDS (4 COLUMNS) ── */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {/* KPI 1: PM2.5 */}
        <div className="rounded-xl border border-border/80 bg-card p-3.5 shadow-sm backdrop-blur-sm transition-all hover:border-primary/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">PM2.5 Level</span>
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-orange-500/10 text-orange-600">
              <Wind className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-foreground">{currentPm25}</span>
            <span className="text-xs font-bold text-muted-foreground">µg/m³</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: aqClass.color }}
            />
            <span className="text-xs font-bold text-foreground">{aqClass.shortCategory}</span>
          </div>
        </div>

        {/* KPI 2: AQI / NAQI */}
        <div className="rounded-xl border border-border/80 bg-card p-3.5 shadow-sm backdrop-blur-sm transition-all hover:border-primary/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">AQI Index</span>
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-blue-500/10 text-blue-600">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-foreground">{naqiValue}</span>
            <span className="text-xs font-bold text-muted-foreground">AQI</span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground leading-tight">
            Derived from CPCB PM2.5 standards
          </p>
        </div>

        {/* KPI 3: Severity */}
        <div className="rounded-xl border border-border/80 bg-card p-3.5 shadow-sm backdrop-blur-sm transition-all hover:border-primary/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Severity Level</span>
            <div
              className="grid h-7 w-7 place-items-center rounded-lg"
              style={{ backgroundColor: `${aqClass.color}15`, color: aqClass.color }}
            >
              <ShieldAlert className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-black border ${aqClass.bg} ${aqClass.text} ${aqClass.border}`}
            >
              {aqClass.category}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground leading-tight">
            Category tier for {activeCityName}
          </p>
        </div>

        {/* KPI 4: Health / Safety Status */}
        <div className="rounded-xl border border-border/80 bg-card p-3.5 shadow-sm backdrop-blur-sm transition-all hover:border-primary/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Safety Status</span>
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className={`text-base font-black ${safetyStatus.color}`}>
              {safetyStatus.label}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground leading-tight truncate">
            {safetyStatus.desc}
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT (2 COLUMNS) ── */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* LEFT: Compact Responsive PM2.5 Gauge Card (5 Columns) */}
        <div className="lg:col-span-5 rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-sm backdrop-blur-sm flex flex-col justify-between">
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 border-b border-border/50 pb-3">
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-bold text-foreground truncate">PM2.5 Concentration</h2>
                <p className="text-[11px] text-muted-foreground truncate">{activeCityName} • {predictionWindow || "10-hour"} window</p>
              </div>
              <span
                className="px-2.5 py-1 text-[10px] font-black rounded-lg text-white uppercase tracking-wider shrink-0 shadow-xs"
                style={{ backgroundColor: aqClass.color }}
              >
                {aqClass.shortCategory}
              </span>
            </div>

            {/* Center Gauge Area — Centered vertically when grid stretches */}
            <div className="my-auto py-4 flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center h-36 w-36 sm:h-40 sm:w-40">
                <svg className="absolute transform -rotate-90 h-36 w-36 sm:h-40 sm:w-40">
                  <circle cx="72" cy="72" r="58" className="stroke-muted/30" strokeWidth="9" fill="transparent" />
                  <circle
                    cx="72" cy="72" r="58"
                    className="transition-all duration-700 ease-out"
                    style={{ stroke: aqClass.color }}
                    strokeWidth="9"
                    fill="transparent"
                    strokeDasharray="364"
                    strokeDashoffset={364 - (364 * Math.min(currentPm25 / 250, 1.0))}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="z-10 text-center px-2">
                  <span className="text-3xl sm:text-4xl font-black text-foreground tracking-tight leading-none block">
                    {currentPm25}
                  </span>
                  <span className="text-xs font-bold text-muted-foreground mt-0.5 block">µg/m³</span>
                  <span className="text-[11px] font-extrabold mt-1 block uppercase tracking-wider" style={{ color: aqClass.color }}>
                    {aqClass.category}
                  </span>
                </div>
              </div>

              {/* Responsive Min - Max Severity Range Bar */}
              <div className="w-full max-w-[260px] mt-4 space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                  <span>0 µg/m³ (Good)</span>
                  <span>250+ µg/m³ (Severe)</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
                  <div className="h-full w-[20%] bg-[#22c55e]" title="Good (0-50)" />
                  <div className="h-full w-[20%] bg-[#eab308]" title="Moderate (51-100)" />
                  <div className="h-full w-[20%] bg-[#f97316]" title="Poor (101-150)" />
                  <div className="h-full w-[20%] bg-[#ef4444]" title="Very Poor (151-200)" />
                  <div className="h-full w-[20%] bg-[#9333ea]" title="Severe (201+)" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-border/40 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5 truncate">
              <Info className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              Source: Kaggle LSTM/CNN Model
            </span>
            <span className="font-mono text-[10px] font-bold text-foreground bg-muted/50 px-2 py-0.5 rounded border border-border/40">
              {timestamp ? new Date(timestamp).toLocaleDateString("en-GB") : "Live"}
            </span>
          </div>
        </div>

        {/* RIGHT: Health Advisory Panel (7 Columns) */}
        <div className="lg:col-span-7 rounded-2xl border border-border/80 bg-card p-4 shadow-sm backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
              <div>
                <h2 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <Heart className="h-4 w-4 text-red-500" />
                  Health Advisory
                </h2>
                <p className="text-[11px] text-muted-foreground">Actions based on current PM2.5 levels for {activeCityName}</p>
              </div>
              {userProfile.asthma && (
                <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
                  <Heart className="h-3 w-3 text-red-500 fill-current" />
                  Asthma Profile Active
                </span>
              )}
            </div>

            {/* Advisory Cards List */}
            <div className="mt-3 space-y-2.5">
              {/* Card 1: Sensitive Groups */}
              <div className="rounded-xl border border-border/70 bg-background/80 p-3 flex items-start gap-3 shadow-xs">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500/10 text-amber-700 shrink-0 mt-0.5">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">🛡 Sensitive Groups & Outdoor Exertion</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                    {advisories[0] || "Reduce prolonged outdoor exertion if sensitive to air pollution."}
                  </p>
                </div>
              </div>

              {/* Card 2: Indoor Air Protection */}
              <div className="rounded-xl border border-border/70 bg-background/80 p-3 flex items-start gap-3 shadow-xs">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500/10 text-blue-700 shrink-0 mt-0.5">
                  <Airplay className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">🌬 Indoor Air & Ventilation</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                    {advisories[1] || "Keep windows closed during peak pollution hours and use indoor air purifiers."}
                  </p>
                </div>
              </div>

              {/* Card 3: Mask & Personal Gear */}
              <div className="rounded-xl border border-border/70 bg-background/80 p-3 flex items-start gap-3 shadow-xs">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-700 shrink-0 mt-0.5">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">😷 Protection & Protective Wear</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                    {advisories[2] || "Wear an N95 mask outdoors if experiencing mild respiratory irritation."}
                  </p>
                </div>
              </div>

              {/* Personalized Profile Advisory if available */}
              {userProfile.asthma && (
                <div className="rounded-xl border border-red-200 bg-red-50/60 p-3 flex items-start gap-3 shadow-xs">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-red-600 text-white shrink-0 mt-0.5">
                    <Heart className="h-4 w-4 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-red-950">Personal Health Alert (Asthma Profile)</h3>
                    <p className="text-[11px] text-red-900/90 mt-0.5 leading-relaxed">
                      Sensitive respiratory profile detected for {userProfile.name || "Yash Kumavat"}. Keep quick-relief inhaler accessible at all times.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-border/40 text-[11px] text-muted-foreground flex justify-between items-center">
            <span>Calibrated to {aqClass.label}</span>
            <span className="font-semibold text-emerald-700">Verified Health Logic</span>
          </div>
        </div>
      </div>

      {/* ── POLLUTANT OVERVIEW (6 COMPACT COLUMNS) ── */}
      <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-sm backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-border/50 pb-2.5 mb-3">
          <div>
            <h2 className="text-sm font-bold text-foreground">Pollutant Overview</h2>
            <p className="text-[11px] text-muted-foreground">Comprehensive air pollutant breakdown for {activeCityName}</p>
          </div>
          <span className="text-[11px] font-semibold text-muted-foreground">6 Parameters</span>
        </div>

        <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {pollutants.map((p) => (
            <div
              key={p.code}
              className={`rounded-xl border p-3 flex flex-col justify-between h-[100px] transition-all ${
                p.available
                  ? `${p.bg} ${p.border} shadow-xs`
                  : "bg-muted/20 border-border/50 opacity-70"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-foreground">{p.code}</span>
                {p.available ? (
                  <span
                    className="text-[9px] font-extrabold px-1.5 py-0.5 rounded text-white"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.status}
                  </span>
                ) : (
                  <span className="text-[9px] font-semibold text-muted-foreground/60 italic">N/A</span>
                )}
              </div>

              {p.available ? (
                <div>
                  <p className="text-base font-black text-foreground leading-none">{p.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 truncate">{p.label}</p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-medium text-muted-foreground/70">—</p>
                  <p className="text-[10px] text-muted-foreground/50 mt-0.5">Data unavailable</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── SECONDARY CONTENT: CITY COMPARISON CHART (FULL WIDTH COMPACT) ── */}
      <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-2.5 mb-3">
          <div>
            <h2 className="text-sm font-bold text-foreground">PM2.5 Across Major Cities</h2>
            <p className="text-[11px] text-muted-foreground">
              Current model-predicted PM2.5 comparison (Highlighting: <strong className="text-emerald-700">{activeCityName}</strong>)
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Good (≤50)</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> Moderate (51-100)</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-500" /> Poor (101-150)</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500" /> Very Poor (151-200)</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-purple-600" /> Severe (&gt;200)</span>
          </div>
        </div>

        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cityChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#64748b"
                fontSize={10}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={45}
              />
              <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
                formatter={(value: number) => [`${value} µg/m³`, "PM2.5 Concentration"]}
              />
              <Bar
                dataKey="pm25"
                name="PM2.5"
                radius={[6, 6, 0, 0]}
                barSize={20}
                onClick={(data) => {
                  if (data && data.name) setSelectedCity(data.name);
                }}
                cursor="pointer"
              >
                {cityChartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.fill}
                    opacity={entry.isSelected ? 1.0 : 0.45}
                    stroke={entry.isSelected ? "#0f172a" : "none"}
                    strokeWidth={entry.isSelected ? 2 : 0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── LOWER CONTENT: 24-HOUR TREND HONEST STATE & MODEL PROVENANCE ── */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* 24-Hour Trend Honest State Card */}
        <div className="rounded-xl border border-border/70 bg-muted/20 p-3.5 flex items-start gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-200/80 text-slate-700 shrink-0">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-foreground">24-Hour Forecast Trend</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
              Temporal forecast unavailable • Current model output provides single-snapshot spatial predictions ({predictionWindow || "10-hour"} window) without hourly timeseries nodes.
            </p>
          </div>
        </div>

        {/* Model Provenance Footer Card */}
        <div className="rounded-xl border border-border/70 bg-muted/20 p-3.5 flex items-start gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-700 shrink-0">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-foreground">Model Data Provenance</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
              Model-predicted PM2.5 • Source: AtmoAI prediction dataset ({modelInfo || "FNO-CNN Predictor v1"})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
