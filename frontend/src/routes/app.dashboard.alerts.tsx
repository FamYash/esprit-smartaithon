import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { ShieldAlert, Check, Bell, BellOff, Info } from "lucide-react";
import { useReactiveStore } from "@/lib/atmo/storage";

export const Route = createFileRoute("/app/dashboard/alerts")({
  component: UserAlertSystemView,
});

const defaultAlerts = [
  {
    id: "ALT-920",
    category: "Severe PM2.5 Alert",
    title: "Particulate Threshold Exceeded",
    region: "Jaipur",
    severity: "Critical",
    date: "2026-08-19 11:30",
    status: "Active",
    desc: "Local prediction nodes indicate PM2.5 levels exceeding 160 µg/m³. Wear N95 protective equipment outdoors.",
  },
  {
    id: "ALT-919",
    category: "Industrial Hotspot",
    title: "Elevated Particulate Drift",
    region: "Surat",
    severity: "Warning",
    date: "2026-08-19 09:15",
    status: "Active",
    desc: "Industrial corridor air indices are elevated at 155 µg/m³. Sensitive groups should limit outdoor exertion.",
  },
  {
    id: "ALT-918",
    category: "Urban Inversion Alert",
    title: "High Atmospheric Stagnation",
    region: "Lucknow",
    severity: "Critical",
    date: "2026-08-18 18:45",
    status: "Active",
    desc: "Boundary layer compression has trapped fine particles across the urban center (PM2.5: 145 µg/m³).",
  },
  {
    id: "ALT-917",
    category: "Health Advisory",
    title: "Moderate Air Quality Restored",
    region: "Chennai",
    severity: "Information",
    date: "2026-08-18 14:20",
    status: "Resolved",
    desc: "Coastal breeze dispersion has reduced local PM2.5 below 50 µg/m³.",
  },
  {
    id: "ALT-916",
    category: "Construction Advisory",
    title: "Local Dust Mitigation Active",
    region: "Bengaluru",
    severity: "Warning",
    date: "2026-08-17 09:00",
    status: "Resolved",
    desc: "Dust suppression protocols active near transit infrastructure zones.",
  },
];

function UserAlertSystemView() {
  const [alerts, setAlerts] = useReactiveStore<any[]>("atmoai_alerts", defaultAlerts);

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "Acknowledged", acknowledged: true } : a
      )
    );
  };

  const activeAlerts = alerts.filter(
    (a) => a.status !== "Resolved" && a.status !== "Dismissed"
  );
  const historyAlerts = alerts.filter(
    (a) => a.status === "Resolved" || a.status === "Dismissed"
  );

  return (
    <div className="space-y-6 font-sans max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Alert Notifications & Warnings
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Emergency regional advisories, pollution threshold alerts, and acknowledgement log
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground">
            {activeAlerts.filter((a) => a.status !== "Acknowledged").length} Unacknowledged Alerts
          </span>
        </div>
      </div>

      {/* Active System Notifications */}
      <div>
        <h2 className="text-sm sm:text-base font-bold text-foreground mb-3">
          Active Notifications
        </h2>
        {activeAlerts.length === 0 ? (
          <div className="py-12 text-center border rounded-2xl bg-card border-border p-6">
            <BellOff className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm font-semibold text-foreground">All Clear · No Active Alerts</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Air quality across your monitored region is within safe bounds or active warnings have
              been dismissed.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeAlerts.map((a) => {
              const isAck = a.status === "Acknowledged";
              const severityColors =
                a.severity === "Critical"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : a.severity === "Warning"
                    ? "bg-orange-50 text-orange-700 border-orange-200"
                    : "bg-blue-50 text-blue-700 border-blue-200";

              return (
                <div
                  key={a.id}
                  className={`rounded-2xl border p-4 shadow-card flex flex-col justify-between transition ${
                    isAck
                      ? "bg-accent/30 border-border/80 opacity-75"
                      : "bg-card border-border hover:shadow-soft"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-muted-foreground font-mono">
                        {a.region} · {a.date}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold border ${severityColors}`}
                      >
                        {a.severity}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground mt-2">{a.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      {a.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider ${
                        isAck ? "text-emerald-600" : "text-amber-600 animate-pulse"
                      }`}
                    >
                      {a.status}
                    </span>
                    {!isAck ? (
                      <button
                        onClick={() => handleAcknowledge(a.id)}
                        className="rounded-xl gradient-primary px-3 py-1.5 text-xs font-semibold text-white shadow-glow hover:opacity-90 flex items-center gap-1.5 transition"
                      >
                        Acknowledge
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" /> Acknowledged
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Alert History Table */}
      <Card
        title="Alert History Log"
        subtitle="Archived regional warnings and resolved events"
      >
        <div className="overflow-x-auto">
          {historyAlerts.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No historical alerts recorded.
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 font-semibold">Alert ID</th>
                  <th className="pb-3 font-semibold">Incident Date</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold text-right">Region</th>
                  <th className="pb-3 font-semibold text-right">Severity</th>
                  <th className="pb-3 font-semibold text-right">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {historyAlerts.map((h) => (
                  <tr key={h.id} className="hover:bg-accent/40">
                    <td className="py-3 font-semibold text-primary font-mono text-xs">{h.id}</td>
                    <td className="py-3 text-xs text-muted-foreground">{h.date}</td>
                    <td className="py-3 font-medium text-foreground text-xs">{h.category}</td>
                    <td className="py-3 text-right font-semibold text-xs">{h.region}</td>
                    <td className="py-3 text-right font-mono text-xs font-bold text-foreground">
                      {h.severity}
                    </td>
                    <td className="py-3 text-right">
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200/50">
                        {h.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
