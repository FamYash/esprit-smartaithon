import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { FileText, Download, Calendar, Mail, FileSpreadsheet, FileArchive } from "lucide-react";

export const Route = createFileRoute("/app/admin/reports")({ component: AdminReports });

const reports = [
  { id: "REP-901", title: "National Air Quality Summary - May 2026", range: "May 01 - May 20", format: "PDF", size: "4.2 MB", createdBy: "System (Cron)" },
  { id: "REP-902", title: "Delhi NCR Pollution Hotspots In-Depth", range: "May 10 - May 17", format: "Excel", size: "12.8 MB", createdBy: "Antra Gajjar" },
  { id: "REP-903", title: "Model v3.2.1 Training & RMSE Validation", range: "May 15", format: "PDF", size: "1.8 MB", createdBy: "Pragati Varu" },
  { id: "REP-904", title: "Quarterly Environmental Agency Report Q1", range: "Jan 01 - Mar 31", format: "Zip Archive", size: "85.2 MB", createdBy: "Chrisha Dabhi" },
];

function AdminReports() {
  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">Reports & Export</h1>
          <p className="mt-1.5 text-sm text-muted-foreground font-sans">Download system generated pollution summaries, models performance data, and telemetry audits</p>
        </div>
        <button className="rounded-xl gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
          Generate New Report
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Scheduled Reports">
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-xl border border-border p-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-semibold">Weekly Telemetry Summary</p>
                <p className="text-xs text-muted-foreground mt-0.5">Every Sunday at 00:00 UTC</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border p-3">
              <Mail className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-semibold">Monthly Health Impact Report</p>
                <p className="text-xs text-muted-foreground mt-0.5">Dispatched to Environmental Ministry</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Quick Export Tools" subtitle="Direct database table queries">
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border p-4 hover:border-primary hover:text-primary transition">
              <FileSpreadsheet className="h-6 w-6" />
              <span className="text-xs font-bold">CSV / Excel</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border p-4 hover:border-primary hover:text-primary transition">
              <FileArchive className="h-6 w-6" />
              <span className="text-xs font-bold">JSON Dump</span>
            </button>
          </div>
        </Card>

        <Card title="Storage Allocation">
          <div>
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>Used Report Cache</span>
              <span className="text-primary">48.2 GB / 100 GB</span>
            </div>
            <div className="mt-3 h-2.5 rounded-full bg-muted">
              <div className="h-full rounded-full gradient-primary" style={{ width: "48.2%" }} />
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">Reports auto-expire after 90 days</p>
          </div>
        </Card>
      </div>

      <Card title="Generated Reports Log" subtitle="History logs of PDF, Excel and CSV bundles">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border pb-3 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 font-semibold">Report ID</th>
                <th className="pb-3 font-semibold">Report Title</th>
                <th className="pb-3 font-semibold">Date Range</th>
                <th className="pb-3 font-semibold text-right">Format</th>
                <th className="pb-3 font-semibold text-right">Size</th>
                <th className="pb-3 font-semibold text-right">Created By</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {reports.map(r => (
                <tr key={r.id} className="hover:bg-accent/40">
                  <td className="py-3.5 font-semibold text-primary font-mono">{r.id}</td>
                  <td className="py-3.5 font-medium">{r.title}</td>
                  <td className="py-3.5 text-muted-foreground">{r.range}</td>
                  <td className="py-3.5 text-right font-bold text-primary font-mono">{r.format}</td>
                  <td className="py-3.5 text-right text-muted-foreground">{r.size}</td>
                  <td className="py-3.5 text-right font-medium">{r.createdBy}</td>
                  <td className="py-3.5 text-right">
                    <button className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary transition ml-auto">
                      <Download className="h-3.5 w-3.5" /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
