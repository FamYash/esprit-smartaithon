import { createFileRoute } from "@tanstack/react-router";
import { Upload, Database, CheckCircle2, AlertTriangle, HardDrive, RefreshCcw, Trash2, Eye, Activity, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/app/admin/data-center")({ component: AdminDataCenter });

const datasets = [
  { name: "EPA AirNow · Global", rows: "48.2M", updated: "2 hours ago", status: "Validated", size: "1.2 GB" },
  { name: "OpenAQ Live Feed", rows: "12.4M", updated: "Streaming", status: "Live", size: "340 MB" },
  { name: "Sentinel-5P Satellite", rows: "2.1B", updated: "Yesterday", status: "Validated", size: "45.8 GB" },
  { name: "ECMWF Meteorology", rows: "892M", updated: "6 hours ago", status: "Validated", size: "12.4 GB" },
];

const stations = [
  { id: "STN-DEL-01", name: "Anand Vihar, Delhi", status: "Online", lastUpdate: "2 mins ago" },
  { id: "STN-MUM-04", name: "Bandra Kurla Complex", status: "Online", lastUpdate: "5 mins ago" },
  { id: "STN-PUN-02", name: "Shivaji Nagar, Pune", status: "Offline", lastUpdate: "3 hours ago" },
  { id: "STN-CHN-01", name: "Velachery, Chennai", status: "Online", lastUpdate: "1 min ago" },
  { id: "STN-KOL-03", name: "Salt Lake, Kolkata", status: "Warning", lastUpdate: "45 mins ago" },
];

function AdminDataCenter() {
  return (
    <div className="font-sans max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Data Center
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground font-sans max-w-lg leading-relaxed">
            Manage environmental datasets, monitoring stations, and data pipelines.
          </p>
        </div>
      </div>

      {/* Dataset Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Data Volume" value="84.5 TB" icon={<HardDrive className="text-blue-500 h-5 w-5" />} />
        <StatCard title="Active Streams" value="14" icon={<Activity className="text-emerald-500 h-5 w-5" />} />
        <StatCard title="Total Records" value="6.4B" icon={<Database className="text-purple-500 h-5 w-5" />} />
        <StatCard title="Data Quality Score" value="98.2%" icon={<ShieldCheck className="text-emerald-500 h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Spans 2): Datasets */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-foreground">Pollution Datasets</h3>
                <p className="text-[11px] text-muted-foreground">Manage raw data sources and uploads</p>
              </div>
              <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-emerald-600 transition-colors">
                <Upload className="h-4 w-4" /> Upload CSV
              </button>
            </div>
            
            <div className="space-y-3">
              {datasets.map((ds) => (
                <div key={ds.name} className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                      <Database className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{ds.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500 font-medium">
                        <span>{ds.rows} rows</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>{ds.size}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>Updated {ds.updated}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${ds.status === 'Live' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                      {ds.status === 'Live' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                      {ds.status}
                    </span>
                    <div className="flex items-center gap-2 border-l border-slate-100 pl-4">
                      <button className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg transition-colors" title="View Data">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors" title="Delete Dataset">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Validation & Stations */}
        <div className="space-y-6">
          {/* Data Validation Summary */}
          <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-foreground mb-4">Data Quality Summary</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-red-100 bg-red-50/50 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-red-700">Missing Records Detected</p>
                  <p className="text-[11px] text-red-600/80 mt-1 leading-relaxed">
                    142 gaps found in Sentinel-5P timeline between 02:00-04:00 UTC.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-amber-700">Duplicate Entries</p>
                  <p className="text-[11px] text-amber-600/80 mt-1 leading-relaxed">
                    84 duplicate observations flagged in OpenAQ Live Feed and quarantined.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-emerald-700">Validation Pipeline Active</p>
                  <p className="text-[11px] text-emerald-600/80 mt-1 leading-relaxed">
                    All other datasets passed schema validation and integrity checks.
                  </p>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2">
              <RefreshCcw className="h-3.5 w-3.5" /> Run Full Validation
            </button>
          </div>

          {/* Monitoring Stations */}
          <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm flex flex-col h-[340px]">
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h3 className="text-sm font-bold text-foreground">Monitoring Stations</h3>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">415 Active</span>
            </div>
            <div className="overflow-y-auto flex-1 pr-2 space-y-2">
              {stations.map((st) => (
                <div key={st.id} className="p-3 rounded-xl border border-slate-100 bg-white shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800">{st.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">{st.id}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block w-2 h-2 rounded-full mb-1 ${st.status === 'Online' ? 'bg-emerald-500' : st.status === 'Warning' ? 'bg-amber-500' : 'bg-red-500'}`} />
                    <p className="text-[9px] font-medium text-slate-400">{st.lastUpdate}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-100 mt-2 shrink-0">
               <button className="text-xs font-bold text-primary hover:text-emerald-700 transition-colors w-full text-center">
                 View All Stations
               </button>
            </div>
          </div>
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
