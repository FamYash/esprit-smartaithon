import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, FileJson, FileSpreadsheet, Plus, Filter, Search, Calendar } from "lucide-react";

export const Route = createFileRoute("/app/admin/reports")({ component: AdminReports });

const reportHistory = [
  { id: "REP-4091", name: "Daily AQI National Summary", type: "PDF", date: "2023-11-15 06:00", size: "2.4 MB", author: "System" },
  { id: "REP-4090", name: "Monthly Pollution Trends (Oct)", type: "Excel", date: "2023-11-01 08:30", size: "15.1 MB", author: "Pragati Varu" },
  { id: "REP-4089", name: "Q3 Alert Resolutions", type: "CSV", date: "2023-10-15 14:20", size: "840 KB", author: "Chrisha Dabhi" },
  { id: "REP-4088", name: "Public Complaints Summary", type: "PDF", date: "2023-10-10 11:15", size: "4.2 MB", author: "Antra Gajjar" },
  { id: "REP-4087", name: "Delhi Deep Dive Report", type: "PDF", date: "2023-10-05 09:45", size: "12.8 MB", author: "Dr. Rahul Mehta" },
];

function AdminReports() {
  return (
    <div className="font-sans max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Reports & Exports
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground font-sans max-w-lg leading-relaxed">
            Generate, schedule, and download environmental compliance and analytics reports.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-emerald-600 transition-colors">
          <Plus className="h-4 w-4" /> Custom Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generate Reports Templates */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-foreground">Standard Templates</h3>
          
          <ReportTemplate 
            title="Daily AQI Report"
            description="24-hour summary of national air quality, hotspots, and active alerts."
            icon={<Calendar className="text-blue-500" />}
          />
          <ReportTemplate 
            title="Monthly Pollution Report"
            description="Comprehensive analysis of pollution trends, station uptime, and ML forecast accuracy."
            icon={<FileText className="text-purple-500" />}
          />
          <ReportTemplate 
            title="Complaint Summary"
            description="Overview of public grievances, resolution times, and recurring issues by region."
            icon={<FileSpreadsheet className="text-amber-500" />}
          />
          <ReportTemplate 
            title="Alert & Incident Summary"
            description="Log of all critical alerts, system responses, and automated actions taken."
            icon={<FileJson className="text-emerald-500" />}
          />
        </div>

        {/* Report History Table */}
        <div className="lg:col-span-2 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-sm font-bold text-foreground">Report History</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="rounded-xl border border-slate-200 bg-white py-1.5 pl-9 pr-4 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-[200px]"
                />
              </div>
              <button className="h-8 px-3 rounded-xl border border-slate-200 bg-white shadow-sm text-xs font-bold text-slate-700 flex items-center gap-1.5 hover:bg-slate-50 transition-colors">
                <Filter className="h-3.5 w-3.5" /> Filter
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 px-4 font-bold">Report Name</th>
                  <th className="py-3 px-4 font-bold">Generated</th>
                  <th className="py-3 px-4 font-bold">Author</th>
                  <th className="py-3 px-4 font-bold">Size</th>
                  <th className="py-3 px-4 font-bold text-right">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reportHistory.map((rep) => (
                  <tr key={rep.id} className="hover:bg-white/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg border ${rep.type === 'PDF' ? 'bg-red-50 border-red-100 text-red-500' : rep.type === 'Excel' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                          {rep.type === 'PDF' ? <FileText className="h-4 w-4" /> : rep.type === 'Excel' ? <FileSpreadsheet className="h-4 w-4" /> : <FileJson className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{rep.name}</p>
                          <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{rep.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-medium">{rep.date}</td>
                    <td className="py-3 px-4 font-medium text-slate-700">{rep.author}</td>
                    <td className="py-3 px-4 text-slate-500 font-medium">{rep.size}</td>
                    <td className="py-3 px-4 text-right">
                      <button className="flex items-center justify-end gap-1.5 ml-auto rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-700 shadow-sm hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors">
                        <Download className="h-3 w-3" /> {rep.type}
                      </button>
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

function ReportTemplate({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-sm p-4 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-white shadow-sm border border-slate-100 shrink-0 group-hover:scale-105 transition-transform">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-slate-800">{title}</h4>
          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{description}</p>
          <div className="mt-3 flex items-center gap-2">
             <button className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">Generate PDF</button>
             <button className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">Export Excel</button>
             <button className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">Export CSV</button>
          </div>
        </div>
      </div>
    </div>
  );
}
