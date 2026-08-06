import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Filter, AlertTriangle, ShieldAlert, CheckCircle2, Clock, Eye, Edit, Trash2 } from "lucide-react";

export const Route = createFileRoute("/app/admin/alerts")({ component: AdminAlerts });

const alertData = [
  { id: "ALT-920", title: "Severe PM2.5 Spike", region: "Delhi NCR", severity: "Critical", date: "2023-11-15 08:30", status: "Active" },
  { id: "ALT-919", title: "Industrial Emission Violation", region: "Kanpur", severity: "Warning", date: "2023-11-15 06:15", status: "Pending" },
  { id: "ALT-918", title: "Stubble Burning Hotspot", region: "Punjab", severity: "Critical", date: "2023-11-14 18:45", status: "Active" },
  { id: "ALT-917", title: "Unhealthy O3 Levels", region: "Mumbai", severity: "Warning", date: "2023-11-14 14:20", status: "Resolved" },
  { id: "ALT-916", title: "Construction Dust", region: "Pune", severity: "Warning", date: "2023-11-13 09:00", status: "Resolved" },
];

function AdminAlerts() {
  return (
    <div className="font-sans max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Alert Management
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground font-sans max-w-lg leading-relaxed">
            Monitor and manage system-generated and manual environmental alerts.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-emerald-600 transition-colors">
          <Plus className="h-4 w-4" /> New Alert
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Critical Alerts" value="4" icon={<AlertTriangle className="text-red-500 h-5 w-5" />} color="red" />
        <StatCard title="Warning Alerts" value="12" icon={<ShieldAlert className="text-orange-500 h-5 w-5" />} color="orange" />
        <StatCard title="Pending Alerts" value="8" icon={<Clock className="text-blue-500 h-5 w-5" />} color="blue" />
        <StatCard title="Resolved Alerts" value="145" icon={<CheckCircle2 className="text-emerald-500 h-5 w-5" />} color="emerald" />
      </div>

      {/* Alert Table */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search alerts by region or ID..."
              className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-[300px]"
            />
          </div>
          <button className="h-9 px-4 rounded-xl border border-slate-200 bg-white shadow-sm text-xs font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Filter className="h-4 w-4" /> Filter Status
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-4 font-bold">Title</th>
                <th className="py-3 px-4 font-bold">Region</th>
                <th className="py-3 px-4 font-bold">Severity</th>
                <th className="py-3 px-4 font-bold">Created Date</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {alertData.map((alert) => (
                <tr key={alert.id} className="hover:bg-white/60 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-800">{alert.title}</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{alert.id}</p>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-600">{alert.region}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${alert.severity === "Critical" ? "bg-red-50 text-red-700 border border-red-100" : "bg-orange-50 text-orange-700 border border-orange-100"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${alert.severity === "Critical" ? "bg-red-600" : "bg-orange-500"}`} />
                      {alert.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-medium">{alert.date}</td>
                  <td className="py-3 px-4">
                    <span className={`font-bold ${alert.status === "Active" ? "text-red-600" : alert.status === "Pending" ? "text-blue-600" : "text-emerald-600"}`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Alert">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Alert">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-muted-foreground font-medium">
          <p>Showing 1 to 5 of 165 entries</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 rounded">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">2</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">3</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-sm p-4 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">{title}</p>
        <p className={`text-2xl font-black text-slate-800`}>{value}</p>
      </div>
      <div className={`p-3 rounded-xl bg-white shadow-sm border border-slate-100`}>
        {icon}
      </div>
    </div>
  );
}
