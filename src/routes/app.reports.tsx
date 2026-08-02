import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/atmo/AppShell";
import { Card, countries, aqiCategory } from "@/components/atmo/data";
import { FileText, Download, FileSpreadsheet, Calendar, Globe } from "lucide-react";

export const Route = createFileRoute("/app/reports")({ component: Reports });

const reports = [
  { type: "Country", icon: Globe, title: "India — Q2 2026 Air Quality Report", date: "May 15, 2026", size: "2.4 MB", pages: 38 },
  { type: "Monthly", icon: Calendar, title: "Global Monthly Forecast — April 2026", date: "May 02, 2026", size: "1.8 MB", pages: 24 },
  { type: "Annual", icon: FileText, title: "AtmoAI Annual Air Quality Index 2025", date: "Jan 12, 2026", size: "8.6 MB", pages: 142 },
  { type: "Country", icon: Globe, title: "China — Beijing-Tianjin-Hebei Report", date: "Apr 28, 2026", size: "3.1 MB", pages: 52 },
  { type: "Monthly", icon: Calendar, title: "Southeast Asia Monthly Digest", date: "Apr 10, 2026", size: "1.4 MB", pages: 18 },
  { type: "Country", icon: Globe, title: "EU Air Quality Compliance Q1 2026", date: "Mar 31, 2026", size: "4.2 MB", pages: 76 },
];

function Reports() {
  return (
    <AppShell title="Reports" subtitle="Download forecast reports, raw data and compliance summaries">
      <div className="grid gap-6 md:grid-cols-3">
        {reports.map((r)=>{
          const Icon = r.icon;
          return (
            <div key={r.title} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-primary text-white shadow-glow"><Icon className="h-6 w-6"/></div>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">{r.type}</span>
              </div>
              <h3 className="mt-5 text-base font-semibold leading-snug">{r.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{r.date} · {r.pages} pages · {r.size}</p>
              <div className="mt-5 flex gap-2">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl gradient-primary px-3 py-2 text-xs font-semibold text-white shadow-glow hover:opacity-95">
                  <Download className="h-3.5 w-3.5"/> PDF
                </button>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold hover:border-primary hover:text-primary">
                  <FileSpreadsheet className="h-3.5 w-3.5"/> CSV
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <Card title="Data Summary" subtitle="Top-10 countries by current PM2.5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 font-semibold">Country</th>
                  <th className="pb-3 font-semibold">AQI</th>
                  <th className="pb-3 font-semibold">PM2.5</th>
                  <th className="pb-3 font-semibold">PM10</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...countries].sort((a,b)=>b.pm25-a.pm25).map(c=>{
                  const cat = aqiCategory(c.aqi);
                  return (
                    <tr key={c.code} className="border-b border-border/60 last:border-0">
                      <td className="py-4 font-semibold">{c.name}</td>
                      <td className="py-4">{c.aqi}</td>
                      <td className="py-4">{c.pm25} μg/m³</td>
                      <td className="py-4">{c.pm10} μg/m³</td>
                      <td className="py-4"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${cat.bg} ${cat.text}`}>{cat.label}</span></td>
                      <td className="py-4 text-right">
                        <button className="text-xs font-semibold text-primary hover:underline">View →</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
