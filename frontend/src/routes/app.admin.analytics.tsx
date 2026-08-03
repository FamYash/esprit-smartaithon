import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import {
  BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip,
  CartesianGrid, Legend, Cell, AreaChart, Area, PieChart, Pie
} from "recharts";
import {
  Activity, Users, Award, ShieldAlert, CheckCircle, TrendingUp, HelpCircle
} from "lucide-react";

export const Route = createFileRoute("/app/admin/analytics")({ component: AdminAnalytics });

// Mock Data
const statePollution = [
  { name: "Delhi", pm25: 145, pm10: 220, aqi: 198, status: "Critical" },
  { name: "Uttar Pradesh", pm25: 112, pm10: 178, aqi: 174, status: "Severe" },
  { name: "Haryana", pm25: 98, pm10: 160, aqi: 162, status: "Poor" },
  { name: "Bihar", pm25: 85, pm10: 142, aqi: 153, status: "Poor" },
  { name: "Rajasthan", pm25: 78, pm10: 130, aqi: 144, status: "Moderate" },
  { name: "Punjab", pm25: 72, pm10: 118, aqi: 138, status: "Moderate" },
  { name: "West Bengal", pm25: 68, pm10: 112, aqi: 130, status: "Moderate" },
  { name: "Maharashtra", pm25: 55, pm10: 95, aqi: 98, status: "Satisfactory" },
  { name: "Karnataka", pm25: 42, pm10: 78, aqi: 72, status: "Good" },
  { name: "Kerala", pm25: 28, pm10: 52, aqi: 48, status: "Good" },
];

const cityComparison = [
  { city: "New Delhi", pm25: 152 },
  { city: "Patna", pm25: 118 },
  { city: "Noida", pm25: 138 },
  { city: "Gurugram", pm25: 124 },
  { city: "Mumbai", pm25: 62 },
  { city: "Kolkata", pm25: 78 },
  { city: "Bengaluru", pm25: 46 },
  { city: "Chennai", pm25: 39 },
  { city: "Hyderabad", pm25: 58 },
  { city: "Pune", pm25: 52 },
];

const historicalTrend = [
  { month: "Jan", pm25: 140, pm10: 210, no2: 45 },
  { month: "Feb", pm25: 120, pm10: 190, no2: 42 },
  { month: "Mar", pm25: 90, pm10: 150, no2: 38 },
  { month: "Apr", pm25: 75, pm10: 130, no2: 35 },
  { month: "May", pm25: 65, pm10: 115, no2: 30 },
  { month: "Jun", pm25: 55, pm10: 98, no2: 28 },
  { month: "Jul", pm25: 40, pm10: 75, no2: 22 },
  { month: "Aug", pm25: 35, pm10: 68, no2: 20 },
  { month: "Sep", pm25: 58, pm10: 105, no2: 26 },
  { month: "Oct", pm25: 95, pm10: 160, no2: 39 },
  { month: "Nov", pm25: 155, pm10: 240, no2: 52 },
  { month: "Dec", pm25: 165, pm10: 255, no2: 55 },
];

const hotspotCities = [
  { city: "Ghaziabad", state: "Uttar Pradesh", currentAQI: 245, alertLevel: "Severe", coordinates: "28.6692° N, 77.4538° E" },
  { city: "Faridabad", state: "Haryana", currentAQI: 232, alertLevel: "Severe", coordinates: "28.4089° N, 77.3178° E" },
  { city: "Bhiwadi", state: "Rajasthan", currentAQI: 218, alertLevel: "Severe", coordinates: "28.2072° N, 76.8407° E" },
  { city: "Noida", state: "Uttar Pradesh", currentAQI: 195, alertLevel: "Poor", coordinates: "28.5355° N, 77.3910° E" },
  { city: "Patna", state: "Bihar", currentAQI: 185, alertLevel: "Poor", coordinates: "25.5941° N, 85.1376° E" },
  { city: "Muzaffarpur", state: "Bihar", currentAQI: 180, alertLevel: "Poor", coordinates: "26.1197° N, 85.3910° E" },
  { city: "Gurugram", state: "Haryana", currentAQI: 175, alertLevel: "Poor", coordinates: "28.4595° N, 77.0266° E" },
  { city: "Meerut", state: "Uttar Pradesh", currentAQI: 168, alertLevel: "Poor", coordinates: "28.9845° N, 77.7064° E" },
  { city: "Lucknow", state: "Uttar Pradesh", currentAQI: 162, alertLevel: "Poor", coordinates: "26.8467° N, 80.9462° E" },
  { city: "Jodhpur", state: "Rajasthan", currentAQI: 158, alertLevel: "Poor", coordinates: "26.2389° N, 73.0243° E" },
];

const engagementStats = [
  { name: "Mon", activeUsers: 6200, visits: 8200 },
  { name: "Tue", activeUsers: 6400, visits: 8500 },
  { name: "Wed", activeUsers: 6800, visits: 9100 },
  { name: "Thu", activeUsers: 7200, visits: 9600 },
  { name: "Fri", activeUsers: 7100, visits: 9400 },
  { name: "Sat", activeUsers: 5400, visits: 7200 },
  { name: "Sun", activeUsers: 4800, visits: 6300 },
];

const alertDistribution = [
  { name: "Severe Pollution", value: 45, color: "#EF4444" },
  { name: "Emerging Hotspot", value: 25, color: "#F97316" },
  { name: "Health Advisory", value: 20, color: "#EAB308" },
  { name: "Weather Impact", value: 10, color: "#3B82F6" },
];

const alertTrends = [
  { day: "Day 1", count: 18 },
  { day: "Day 2", count: 24 },
  { day: "Day 3", count: 32 },
  { day: "Day 4", count: 28 },
  { day: "Day 5", count: 42 },
  { day: "Day 6", count: 38 },
  { day: "Day 7", count: 45 },
];

function AdminAnalytics() {
  return (
    <div className="space-y-8 font-sans">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">Advanced Analytics</h1>
          <p className="mt-1.5 text-sm text-muted-foreground font-sans">Enterprise pollution trends, model performance diagnostics, and system engagement audit</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>India (National)</option>
            <option>Global (All)</option>
          </select>
          <button className="rounded-xl gradient-primary px-5 py-2 text-sm font-semibold text-white shadow-glow">
            Export Report
          </button>
        </div>
      </div>

      {/* Grid: 5. Prediction Performance Metrics (Top Row) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Forecast Accuracy", value: "94.72%", sub: "Avg across 30 days", desc: "+0.32% improvement", icon: <Award className="text-emerald-500 h-5 w-5"/> },
          { label: "RMSE Value", value: "6.84", sub: "Root Mean Square Error", desc: "-0.18 decrease (better)", icon: <Activity className="text-primary h-5 w-5"/> },
          { label: "MAE Value", value: "4.92", sub: "Mean Absolute Error", desc: "-0.11 decrease (better)", icon: <CheckCircle className="text-blue-500 h-5 w-5"/> },
          { label: "Forecast Confidence", value: "96.4%", sub: "Validation interval", desc: "95% confidence bounds", icon: <TrendingUp className="text-amber-500 h-5 w-5"/> },
        ].map((m) => (
          <div key={m.label} className="rounded-2xl border border-border bg-card p-6 shadow-card transition duration-200 hover:shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{m.label}</span>
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-surface)]">{m.icon}</div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-extrabold tracking-tight">{m.value}</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">{m.sub}</p>
              <span className="mt-3 inline-flex items-center text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {m.desc}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Section 1: State-wise Pollution Statistics */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="State-wise PM2.5 Statistics" subtitle="Top polluted states and regions" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statePollution.slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false} />
              <XAxis dataKey="name" stroke="oklch(0.5 0.02 250)" fontSize={11} />
              <YAxis stroke="oklch(0.5 0.02 250)" fontSize={11} label={{ value: "μg/m³", angle: -90, position: 'insideLeft', style: { fontSize: 11 } }} />
              <Tooltip contentStyle={{ borderRadius: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar name="PM2.5 Avg" dataKey="pm25" fill="#F97316" radius={[6,6,0,0]} />
              <Bar name="PM10 Avg" dataKey="pm10" fill="#FDBA74" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Polluted States Ranking" subtitle="Based on 24hr moving AQI">
          <div className="h-[300px] overflow-y-auto pr-1">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                  <th className="pb-2">State</th>
                  <th className="pb-2 text-right">AQI</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {statePollution.map((s, idx) => (
                  <tr key={s.name} className="hover:bg-accent/40">
                    <td className="py-2.5 font-medium flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-lg bg-muted text-[10px] font-bold">{idx + 1}</span>
                      {s.name}
                    </td>
                    <td className="py-2.5 text-right font-bold text-primary">{s.aqi}</td>
                    <td className="py-2.5 text-right">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        s.status === "Critical" ? "bg-red-50 text-red-700" :
                        s.status === "Severe" ? "bg-orange-50 text-orange-700" :
                        s.status === "Poor" ? "bg-yellow-50 text-yellow-700" :
                        s.status === "Moderate" ? "bg-amber-50 text-amber-700" :
                        "bg-emerald-50 text-emerald-700"
                      }`}>{s.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Section 2 & 3: City PM2.5 Comparison and Hotspots */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Section 2: City-wise PM2.5 Comparison */}
        <Card title="City-wise PM2.5 Comparison" subtitle="Comparing critical hotspots across regions">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={cityComparison} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" horizontal={false} />
              <XAxis type="number" stroke="oklch(0.5 0.02 250)" fontSize={11} />
              <YAxis dataKey="city" type="category" stroke="oklch(0.5 0.02 250)" fontSize={11} width={80} />
              <Tooltip contentStyle={{ borderRadius: 12 }} />
              <Bar dataKey="pm25" fill="url(#cityGrad)" radius={[0, 6, 6, 0]}>
                {cityComparison.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.pm25 > 100 ? "#F97316" : entry.pm25 > 50 ? "#FDBA74" : "#10B981"} />
                ))}
              </Bar>
              <defs>
                <linearGradient id="cityGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FDBA74" />
                  <stop offset="100%" stopColor="#F97316" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Section 3: Pollution Hotspot Analytics */}
        <Card title="Pollution Hotspot Heatmap Style Grid" subtitle="Live sensors reporting critical metrics">
          <div className="grid grid-cols-5 gap-2.5">
            {Array.from({ length: 25 }).map((_, idx) => {
              const aqiValues = [285, 260, 245, 230, 198, 185, 170, 150, 120, 95, 80, 45, 30];
              const aqi = aqiValues[idx % aqiValues.length];
              const isCrit = aqi > 200;
              const isMod = aqi > 100 && aqi <= 200;
              return (
                <div
                  key={idx}
                  className={`group relative flex h-14 flex-col items-center justify-center rounded-xl border border-border/80 transition cursor-help ${
                    isCrit ? "bg-rose-500/10 border-rose-500/30 text-rose-700 font-bold" :
                    isMod ? "bg-orange-500/10 border-orange-500/30 text-orange-700 font-bold" :
                    "bg-emerald-500/10 border-emerald-500/30 text-emerald-700"
                  }`}
                >
                  <span className="text-[10px] text-muted-foreground leading-none">S-{idx+101}</span>
                  <span className="text-sm mt-1">{aqi}</span>
                  <div className="pointer-events-none absolute bottom-full mb-1.5 scale-0 group-hover:scale-100 transition whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1.5 text-[10px] text-background shadow-lg z-20 font-medium">
                    Sensor #{idx+101} · AQI {aqi} ({aqi > 200 ? "Severe" : aqi > 100 ? "Poor" : "Good"})
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
            <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-rose-500" />Severe (&gt;200)</div>
            <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-orange-50" />Poor (100-200)</div>
            <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-emerald-500" />Good (&lt;100)</div>
          </div>
        </Card>
      </div>

      {/* Top 10 Hotspot Cities Table */}
      <Card title="Top 10 Hotspot Cities List" subtitle="Monitored areas with highest pollution indices">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border pb-3 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 font-semibold">City</th>
                <th className="pb-3 font-semibold">State</th>
                <th className="pb-3 font-semibold text-right">Current AQI</th>
                <th className="pb-3 font-semibold text-right">Alert Level</th>
                <th className="pb-3 font-semibold text-right">Coordinates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {hotspotCities.map((h, idx) => (
                <tr key={h.city} className="hover:bg-accent/40">
                  <td className="py-3 font-semibold flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded-lg bg-red-100 text-red-700 text-xs font-bold">{idx + 1}</span>
                    {h.city}
                  </td>
                  <td className="py-3 text-muted-foreground">{h.state}</td>
                  <td className="py-3 text-right font-bold text-red-600">{h.currentAQI}</td>
                  <td className="py-3 text-right">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      h.alertLevel === "Severe" ? "bg-red-50 text-red-700 border border-red-200" : "bg-orange-50 text-orange-700 border border-orange-200"
                    }`}>{h.alertLevel}</span>
                  </td>
                  <td className="py-3 text-right text-xs font-mono text-muted-foreground">{h.coordinates}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Section 4: Historical Pollution Trends */}
      <Card title="Historical Pollution Trends (12 Months)" subtitle="Decade-calibrated rolling pollutant observations">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={historicalTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false} />
            <XAxis dataKey="month" stroke="oklch(0.5 0.02 250)" fontSize={11} />
            <YAxis stroke="oklch(0.5 0.02 250)" fontSize={11} />
            <Tooltip contentStyle={{ borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" name="PM2.5" dataKey="pm25" stroke="#F97316" strokeWidth={3} activeDot={{ r: 6 }} />
            <Line type="monotone" name="PM10" dataKey="pm10" stroke="#FDBA74" strokeWidth={2} />
            <Line type="monotone" name="NO₂" dataKey="no2" stroke="#3B82F6" strokeWidth={2} strokeDasharray="4 4" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Section 6 & 7: User Engagement and Alert Generation Stats */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Section 6: User Engagement Statistics */}
        <Card title="User Engagement" subtitle="Daily visits and active user counts" className="lg:col-span-2">
          <div className="grid grid-cols-3 gap-4 mb-4 border-b border-border/60 pb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Daily Visits</p>
              <p className="text-xl font-bold mt-1">12,842</p>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">+8.4% YoY</span>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Session Duration</p>
              <p className="text-xl font-bold mt-1">8m 42s</p>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">+4.2% MoM</span>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Feature Utilization</p>
              <p className="text-sm font-semibold mt-1">Forecaster Engine (42%)</p>
              <span className="text-[10px] text-muted-foreground">Most popular view</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={engagementStats}>
              <defs>
                <linearGradient id="usrAct" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="visits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false} />
              <XAxis dataKey="name" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip contentStyle={{ borderRadius: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" name="Active Users" dataKey="activeUsers" stroke="#F97316" fill="url(#usrAct)" strokeWidth={2.5} />
              <Area type="monotone" name="Visits" dataKey="visits" stroke="#3B82F6" fill="url(#visits)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Section 7: Alert Generation Statistics */}
        <Card title="Alert Category Stats" subtitle="Distribution & generation volume">
          <div className="flex flex-col items-center justify-center h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={alertDistribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={75} paddingAngle={4}>
                  {alertDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {alertDistribution.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between text-xs border-b border-border/40 pb-1.5 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="font-medium text-foreground">{entry.name}</span>
                </div>
                <span className="font-bold">{entry.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Alert Generation Trends Card */}
      <Card title="Alert Generation Trends" subtitle="Volume of system alerts published weekly">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={alertTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false} />
            <XAxis dataKey="day" fontSize={11} />
            <YAxis fontSize={11} />
            <Tooltip contentStyle={{ borderRadius: 12 }} />
            <Line type="monotone" name="Alerts Count" dataKey="count" stroke="#EF4444" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
