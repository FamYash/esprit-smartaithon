import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  MapPin,
  MessageSquareWarning,
  Activity,
  Map,
  ShieldCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const Route = createFileRoute("/app/admin/")({ component: AdminDashboard });

// Mock Data for the Dashboard
const aqiTrend30Days = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  aqi: Math.round(150 + Math.sin(i / 3) * 40 + Math.random() * 20),
}));

const pollutionDistribution = [
  { name: "Good", value: 15, color: "#10B981" },
  { name: "Moderate", value: 25, color: "#F59E0B" },
  { name: "Poor", value: 30, color: "#F97316" },
  { name: "Very Poor", value: 20, color: "#EF4444" },
  { name: "Severe", value: 10, color: "#9333EA" },
];

const mostPollutedCities = [
  { city: "New Delhi", aqi: 248, pm25: 145, status: "Severe" },
  { city: "Patna", aqi: 210, pm25: 120, status: "Very Poor" },
  { city: "Lucknow", aqi: 205, pm25: 115, status: "Very Poor" },
  { city: "Kanpur", aqi: 198, pm25: 110, status: "Poor" },
  { city: "Ahmedabad", aqi: 185, pm25: 95, status: "Poor" },
];

const recentAlerts = [
  { location: "Delhi NCR", severity: "Critical", time: "10 mins ago", status: "Active" },
  { location: "Mumbai (Bandra)", severity: "Warning", time: "1 hour ago", status: "Investigating" },
  { location: "Punjab (Rural)", severity: "Critical", time: "2 hours ago", status: "Active" },
  { location: "Bengaluru (CBD)", severity: "Warning", time: "3 hours ago", status: "Resolved" },
];

const recentComplaints = [
  { id: "CMP-0842", category: "Industrial Emission", city: "Ahmedabad", status: "Open" },
  { id: "CMP-0841", category: "Stubble Burning", city: "Amritsar", status: "In Progress" },
  { id: "CMP-0840", category: "Construction Dust", city: "Pune", status: "Resolved" },
  { id: "CMP-0839", category: "Vehicle Exhaust", city: "Bengaluru", status: "Open" },
];

function AdminDashboard() {
  return (
    <div className="font-sans max-w-7xl mx-auto space-y-6 pb-12">
      {/* Title Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Executive Dashboard
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground font-sans max-w-lg leading-relaxed">
            Centralized monitoring for national air quality, alerts, and public complaints.
          </p>
        </div>
        <div className="rounded-full border border-emerald-100 bg-emerald-50/50 px-4 py-1.5 text-sm font-bold text-emerald-700 shadow-sm">
          National Overview
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard label="Average AQI" value="168" icon={<Activity className="h-5 w-5 text-orange-500" />} />
        <KPICard label="Active Alerts" value="12" icon={<AlertTriangle className="h-5 w-5 text-red-500" />} />
        <KPICard label="Monitored Cities" value="45" icon={<Map className="h-5 w-5 text-blue-500" />} />
        <KPICard label="Open Complaints" value="26" icon={<MessageSquareWarning className="h-5 w-5 text-amber-500" />} />
        <KPICard label="Safe Locations" value="18" icon={<ShieldCheck className="h-5 w-5 text-emerald-500" />} />
        <KPICard label="Critical Regions" value="4" icon={<MapPin className="h-5 w-5 text-purple-500" />} />
      </div>

      {/* Middle Row: Charts & Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* AQI Trend Chart (Spans 2 columns) */}
        <div className="lg:col-span-2 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-foreground">AQI Trend</h3>
            <p className="text-[11px] text-muted-foreground">National average over the last 30 days</p>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={aqiTrend30Days} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }} />
                <Line type="monotone" dataKey="aqi" stroke="#F97316" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: "#F97316", stroke: "#fff", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pollution Distribution Donut */}
        <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm flex flex-col">
          <div className="mb-2">
            <h3 className="text-sm font-bold text-foreground">Distribution</h3>
            <p className="text-[11px] text-muted-foreground">AQI categories nationwide</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative min-h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pollutionDistribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={4} stroke="none">
                  {pollutionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-800">45</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Cities</span>
            </div>
          </div>
        </div>

        {/* India Snapshot Widget */}
        <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Map className="h-48 w-48 text-primary" />
          </div>
          <div className="relative z-10">
            <h3 className="text-sm font-bold text-foreground">India Snapshot</h3>
            <p className="text-[11px] text-muted-foreground">Quick geographic overview</p>
            
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Most Polluted State</p>
                <p className="text-sm font-bold text-red-600">Uttar Pradesh (Avg AQI: 204)</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Cleanest State</p>
                <p className="text-sm font-bold text-emerald-600">Kerala (Avg AQI: 42)</p>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <button className="text-xs font-bold text-primary hover:text-orange-600 flex items-center gap-1">
                  Open full Explorer <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Most Polluted Cities Table */}
        <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm overflow-hidden flex flex-col">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-foreground">Most Polluted Cities</h3>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="pb-2 font-bold">City</th>
                  <th className="pb-2 font-bold">AQI</th>
                  <th className="pb-2 font-bold">PM2.5</th>
                  <th className="pb-2 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mostPollutedCities.map((c) => (
                  <tr key={c.city}>
                    <td className="py-2.5 font-bold text-slate-700">{c.city}</td>
                    <td className="py-2.5 font-bold">{c.aqi}</td>
                    <td className="py-2.5 text-muted-foreground">{c.pm25}</td>
                    <td className="py-2.5 text-right">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-bold ${c.status === "Severe" ? "bg-purple-100 text-purple-700" : c.status === "Very Poor" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Alerts Table */}
        <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm overflow-hidden flex flex-col">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-foreground">Recent Alerts</h3>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="pb-2 font-bold">Location</th>
                  <th className="pb-2 font-bold">Severity</th>
                  <th className="pb-2 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentAlerts.map((a, i) => (
                  <tr key={i}>
                    <td className="py-2.5">
                      <p className="font-bold text-slate-700">{a.location}</p>
                      <p className="text-[10px] text-muted-foreground">{a.time}</p>
                    </td>
                    <td className="py-2.5">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${a.severity === "Critical" ? "text-red-600" : "text-orange-500"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${a.severity === "Critical" ? "bg-red-600 animate-ping" : "bg-orange-500"}`} />
                        {a.severity}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-semibold text-slate-600">
                      {a.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Complaints Table */}
        <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm overflow-hidden flex flex-col">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-foreground">Recent Complaints</h3>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="pb-2 font-bold">Complaint</th>
                  <th className="pb-2 font-bold">City</th>
                  <th className="pb-2 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentComplaints.map((c) => (
                  <tr key={c.id}>
                    <td className="py-2.5">
                      <p className="font-bold text-slate-700 truncate max-w-[120px]">{c.category}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">{c.id}</p>
                    </td>
                    <td className="py-2.5 font-medium text-slate-600">{c.city}</td>
                    <td className="py-2.5 text-right">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-bold ${c.status === "Open" ? "bg-red-50 text-red-600 border border-red-100" : c.status === "In Progress" ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-slate-100 text-slate-600"}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-sm p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
        <div className="bg-white/80 p-1.5 rounded-lg shadow-sm border border-slate-100">{icon}</div>
      </div>
      <p className="text-3xl font-black text-slate-800 tracking-tight">{value}</p>
    </div>
  );
}
