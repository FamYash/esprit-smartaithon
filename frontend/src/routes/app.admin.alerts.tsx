import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { AlertCircle, ShieldAlert, BellRing, Settings2, Trash2 } from "lucide-react";

export const Route = createFileRoute("/app/admin/alerts")({ component: AdminAlerts });

const activeAlerts = [
  { id: "A-501", region: "Ghaziabad Hub", type: "Severe AQI Spike", threshold: "AQI > 200", recipients: 4500, status: "Active", time: "10 mins ago" },
  { id: "A-502", region: "Patna Central", type: "PM2.5 Peak Alert", threshold: "PM2.5 > 150", recipients: 1800, status: "Active", time: "30 mins ago" },
  { id: "A-503", region: "Faridabad Sector-15", type: "CO Level Warning", threshold: "CO > 10 ppm", recipients: 2100, status: "Active", time: "1 hour ago" },
  { id: "A-504", region: "Mumbai Bandra", type: "Humidity High Warning", threshold: "RH > 90%", recipients: 920, status: "Suppressed", time: "4 hours ago" },
];

function AdminAlerts() {
  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">Alerts Management</h1>
          <p className="mt-1.5 text-sm text-muted-foreground font-sans">Configure threshold parameters, SMS notifications, and system warnings</p>
        </div>
        <button className="rounded-xl gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
          + Create Alert Rule
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Alert Gateway Status">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-muted-foreground">SMS Gateway (Twilio)</span>
              <span className="font-bold text-emerald-600">Connected</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-muted-foreground">SMTP Gateway (SendGrid)</span>
              <span className="font-bold text-emerald-600">Connected</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-muted-foreground">Webhooks Trigger</span>
              <span className="font-bold text-amber-500">2 Retries pending</span>
            </div>
          </div>
        </Card>

        <Card title="Total Dispatched Alerts" subtitle="Volume statistics today">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-4xl font-extrabold text-foreground">12,840</p>
              <p className="text-xs text-muted-foreground mt-1">Recipients notified today</p>
            </div>
            <BellRing className="h-10 w-10 text-primary opacity-80" />
          </div>
        </Card>

        <Card title="Suppression Settings">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Active Suppression</p>
              <p className="text-xs text-muted-foreground mt-0.5">Mute redundant state changes</p>
            </div>
            <div className="relative h-6 w-11 rounded-full bg-primary">
              <div className="absolute top-0.5 left-[22px] h-5 w-5 rounded-full bg-white shadow" />
            </div>
          </div>
        </Card>
      </div>

      <Card title="Configured Alert Trigger Rules" subtitle="System automated thresholds">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border pb-3 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 font-semibold">Rule ID</th>
                <th className="pb-3 font-semibold">Trigger Region</th>
                <th className="pb-3 font-semibold">Trigger Type</th>
                <th className="pb-3 font-semibold text-right">Condition Threshold</th>
                <th className="pb-3 font-semibold text-right">Subscribers</th>
                <th className="pb-3 font-semibold text-right">Last Triggered</th>
                <th className="pb-3 font-semibold text-right">Status</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {activeAlerts.map(a => (
                <tr key={a.id} className="hover:bg-accent/40">
                  <td className="py-3.5 font-semibold text-primary font-mono">{a.id}</td>
                  <td className="py-3.5 font-medium">{a.region}</td>
                  <td className="py-3.5 text-muted-foreground">{a.type}</td>
                  <td className="py-3.5 text-right font-bold text-red-500 font-mono">{a.threshold}</td>
                  <td className="py-3.5 text-right font-semibold">{a.recipients.toLocaleString()} users</td>
                  <td className="py-3.5 text-right text-xs text-muted-foreground">{a.time}</td>
                  <td className="py-3.5 text-right">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      a.status === "Active" ? "bg-red-50 text-red-700" : "bg-muted text-muted-foreground"
                    }`}>{a.status}</span>
                  </td>
                  <td className="py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="grid h-7 w-7 place-items-center rounded-lg hover:bg-accent"><Settings2 className="h-4 w-4"/></button>
                      <button className="grid h-7 w-7 place-items-center rounded-lg text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4"/></button>
                    </div>
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
