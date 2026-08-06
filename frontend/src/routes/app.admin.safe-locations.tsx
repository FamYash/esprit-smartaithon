import { createFileRoute } from "@tanstack/react-router";
import { Search, Plus, MapPin, Edit, Trash2, HeartPulse, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/app/admin/safe-locations")({ component: AdminSafeLocations });

const safeLocations = [
  { id: "SL-101", name: "Lodhi Gardens", city: "New Delhi", aqi: 45, score: 92, status: "Active" },
  { id: "SL-102", name: "Sanjay Gandhi National Park", city: "Mumbai", aqi: 52, score: 88, status: "Active" },
  { id: "SL-103", name: "Cubbon Park", city: "Bengaluru", aqi: 38, score: 95, status: "Active" },
  { id: "SL-104", name: "Okhla Bird Sanctuary", city: "New Delhi", aqi: 110, score: 65, status: "Needs Review" },
  { id: "SL-105", name: "Eco Park", city: "Kolkata", aqi: 55, score: 85, status: "Active" },
];

function AdminSafeLocations() {
  return (
    <div className="font-sans max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Safe Locations Management
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground font-sans max-w-lg leading-relaxed">
            Curate and manage verified safe zones for public health recommendations.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-emerald-600 transition-colors">
          <Plus className="h-4 w-4" /> Add Location
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Locations" value="18" icon={<MapPin className="text-blue-500 h-5 w-5" />} />
        <StatCard title="Excellent AQI" value="12" icon={<HeartPulse className="text-emerald-500 h-5 w-5" />} />
        <StatCard title="Moderate AQI" value="4" icon={<CheckCircle2 className="text-amber-500 h-5 w-5" />} />
        <StatCard title="Needs Review" value="2" icon={<AlertTriangle className="text-red-500 h-5 w-5" />} />
      </div>

      {/* Main Table */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search safe locations..."
              className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-[300px]"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-4 font-bold">Location</th>
                <th className="py-3 px-4 font-bold">City</th>
                <th className="py-3 px-4 font-bold">Current AQI</th>
                <th className="py-3 px-4 font-bold">Safety Score</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {safeLocations.map((loc) => (
                <tr key={loc.id} className="hover:bg-white/60 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-800">{loc.name}</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{loc.id}</p>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-600">{loc.city}</td>
                  <td className="py-3 px-4">
                    <span className={`font-black ${loc.aqi <= 50 ? 'text-emerald-600' : loc.aqi <= 100 ? 'text-amber-600' : 'text-red-600'}`}>
                      {loc.aqi}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${loc.score > 90 ? 'bg-emerald-500' : loc.score > 75 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${loc.score}%` }} />
                      </div>
                      <span className="font-bold text-slate-700">{loc.score}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${loc.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
                      {loc.status === "Active" && <ShieldCheck className="h-3 w-3" />}
                      {loc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-sm p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">{title}</p>
        <p className="text-2xl font-black text-slate-800">{value}</p>
      </div>
      <div className="p-3 rounded-xl bg-white shadow-sm border border-slate-100">
        {icon}
      </div>
    </div>
  );
}
