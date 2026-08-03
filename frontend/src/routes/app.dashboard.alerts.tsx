import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { useState } from "react";
import { AlertCircle, Eye, EyeOff, ShieldAlert, Heart, Activity, Check } from "lucide-react";

export const Route = createFileRoute("/app/dashboard/alerts")({ component: UserAlertSystemView });

const initialAlerts = [
  { id: "AL-801", category: "Severe Pollution", title: "Noida Sector-62 AQI Crossed 210", timestamp: "10 mins ago", status: "Active", severity: "Critical", desc: "Local monitors indicate a major PM2.5 spike due to local brick kiln emissions and stagnation." },
  { id: "AL-802", category: "Emerging Hotspot", title: "Indirapuram Area Rising Trend Detected", timestamp: "1 hour ago", status: "Active", severity: "High", desc: "A rapid 25% increase in particulate density has been recorded over the last 3 hours." },
  { id: "AL-803", category: "Health Advisory", title: "CO Levels Elevated Near Expressway", timestamp: "3 hours ago", status: "Active", severity: "Moderate", desc: "Evening rush hour traffic congestion has caused carbon monoxide levels to hover near 8 ppm." },
  { id: "AL-804", category: "Weather Impact", title: "Atmospheric Inversion Layer Expected Tonight", timestamp: "6 hours ago", status: "Active", severity: "High", desc: "Cold air descent will lock particulate particulates close to the ground, deteriorating AQI." },
];

const alertHistory = [
  { id: "AL-795", date: "May 18, 2026", type: "Severe Pollution", duration: "12 hours", peakIndex: "245 AQI", outcome: "Resolved" },
  { id: "AL-796", date: "May 15, 2026", type: "Health Advisory", duration: "6 hours", peakIndex: "185 AQI", outcome: "Resolved" },
  { id: "AL-797", date: "May 12, 2026", type: "Emerging Hotspot", duration: "18 hours", peakIndex: "205 AQI", outcome: "Resolved" },
  { id: "AL-798", date: "May 09, 2026", type: "Severe Pollution", duration: "24 hours", peakIndex: "278 AQI", outcome: "Resolved" },
];

function UserAlertSystemView() {
  const [alerts, setAlerts] = useState(initialAlerts);

  const handleAcknowledge = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: "Acknowledged" } : a));
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">Alert System</h1>
          <p className="mt-1.5 text-sm text-muted-foreground font-sans">Emergency local notifications, pollution hot-spots warning, and system alert history</p>
        </div>
      </div>

      {/* Alert Categories cards */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">Active System Notifications</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {alerts.map(a => {
            const isAck = a.status === "Acknowledged";
            const severityColors =
              a.severity === "Critical" ? "bg-red-50 text-red-700 border-red-200" :
              a.severity === "High" ? "bg-orange-50 text-orange-700 border-orange-200" :
              "bg-yellow-50 text-yellow-700 border-yellow-200";

            return (
              <div
                key={a.id}
                className={`rounded-2xl border p-5 shadow-card flex flex-col justify-between transition ${
                  isAck ? "bg-accent/40 border-border/80 opacity-70" : "bg-card border-border"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-muted-foreground font-mono">{a.category} · {a.timestamp}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold border ${severityColors}`}>
                      {a.severity}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mt-3">{a.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{a.desc}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isAck ? "text-emerald-600" : "text-amber-500 animate-pulse"}`}>
                    {a.status}
                  </span>
                  {!isAck ? (
                    <button
                      onClick={() => handleAcknowledge(a.id)}
                      className="rounded-xl gradient-primary px-3.5 py-1.5 text-xs font-semibold text-white shadow-glow hover:opacity-90 flex items-center gap-1.5"
                    >
                      Acknowledge
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Checked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alert History Table */}
      <Card title="Alert Telemetry History Log" subtitle="Record of previous regional alerts and outcomes">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border pb-3 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 font-semibold">Alert ID</th>
                <th className="pb-3 font-semibold">Incident Date</th>
                <th className="pb-3 font-semibold">Alert Category</th>
                <th className="pb-3 font-semibold text-right">Duration</th>
                <th className="pb-3 font-semibold text-right">Peak Index</th>
                <th className="pb-3 font-semibold text-right">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {alertHistory.map(h => (
                <tr key={h.id} className="hover:bg-accent/40">
                  <td className="py-3.5 font-semibold text-primary font-mono">{h.id}</td>
                  <td className="py-3.5 font-medium">{h.date}</td>
                  <td className="py-3.5 text-muted-foreground">{h.type}</td>
                  <td className="py-3.5 text-right font-semibold">{h.duration}</td>
                  <td className="py-3.5 text-right font-extrabold text-red-500 font-mono">{h.peakIndex}</td>
                  <td className="py-3.5 text-right">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                      {h.outcome}
                    </span>
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
