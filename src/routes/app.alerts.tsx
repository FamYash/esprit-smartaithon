import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/atmo/AppShell";
import { Card } from "@/components/atmo/data";
import { Bell, Mail, Smartphone, AlertTriangle, Activity, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/app/alerts")({ component: Alerts });

const alerts = [
  { sev: "Critical", color: "bg-red-50 text-red-700 border-red-200", icon: AlertTriangle, title: "PM2.5 exceeded 200 μg/m³", country: "Lahore, Pakistan", time: "12 min ago" },
  { sev: "Warning", color: "bg-orange-50 text-orange-700 border-orange-200", icon: TrendingUp, title: "Forecast risk: AQI 175 expected", country: "New Delhi, India", time: "1 hour ago" },
  { sev: "Moderate", color: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: Activity, title: "PM2.5 threshold reached (80)", country: "Beijing, China", time: "3 hours ago" },
  { sev: "Info", color: "bg-blue-50 text-blue-700 border-blue-200", icon: Bell, title: "Air quality improved to Good", country: "Sydney, Australia", time: "5 hours ago" },
  { sev: "Critical", color: "bg-red-50 text-red-700 border-red-200", icon: AlertTriangle, title: "Hazardous AQI > 300 detected", country: "Mexico City, Mexico", time: "Yesterday" },
];

function Alerts() {
  return (
    <AppShell title="Alerts" subtitle="Manage thresholds, notifications and active warnings">
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "High AQI Alerts", value: 24, sub: "Last 7 days", color: "from-red-500 to-orange-500", icon: AlertTriangle },
          { label: "PM2.5 Threshold", value: 12, sub: "Crossed today", color: "from-orange-500 to-amber-500", icon: Activity },
          { label: "Forecast Warnings", value: 8, sub: "Active right now", color: "from-amber-500 to-yellow-500", icon: TrendingUp },
        ].map(({label, value, sub, color, icon: I})=>(
          <div key={label} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                <p className="mt-2 text-4xl font-bold">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
              </div>
              <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-glow`}><I className="h-6 w-6"/></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card title="Notification Timeline" subtitle="Most recent alerts" className="lg:col-span-2">
          <ol className="relative space-y-5 border-l-2 border-border pl-6">
            {alerts.map((a,i)=>{
              const Icon = a.icon;
              return (
                <li key={i} className="relative">
                  <span className="absolute -left-[34px] grid h-6 w-6 place-items-center rounded-full border-2 border-background gradient-primary text-white shadow-glow">
                    <Icon className="h-3 w-3"/>
                  </span>
                  <div className={`rounded-xl border ${a.color} p-4`}>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{a.title}</p>
                      <span className="rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-bold">{a.sev}</span>
                    </div>
                    <p className="mt-1 text-xs opacity-80">{a.country} · {a.time}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Card>

        <div className="space-y-6">
          <Card title="Alert Settings">
            <div className="space-y-4">
              <Threshold label="AQI Threshold" value={150} max={300}/>
              <Threshold label="PM2.5 Threshold (μg/m³)" value={75} max={250}/>
              <Threshold label="PM10 Threshold (μg/m³)" value={120} max={400}/>
            </div>
          </Card>
          <Card title="Notification Channels">
            <div className="space-y-3">
              <Toggle icon={<Mail className="h-4 w-4"/>} label="Email Alerts" sub="alerts@atmoai.com" on/>
              <Toggle icon={<Smartphone className="h-4 w-4"/>} label="Push Notifications" sub="Mobile app" on/>
              <Toggle icon={<Bell className="h-4 w-4"/>} label="In-app Notifications" sub="Real-time toasts"/>
            </div>
            <button className="mt-5 w-full rounded-xl gradient-primary py-2.5 text-sm font-semibold text-white shadow-glow">Save Preferences</button>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function Threshold({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = (value/max)*100;
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold">{label}</span>
        <span className="font-bold text-primary">{value}</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-muted">
        <div className="h-full rounded-full gradient-primary" style={{ width: `${pct}%` }}/>
      </div>
    </div>
  );
}

function Toggle({ icon, label, sub, on }: { icon: React.ReactNode; label: string; sub: string; on?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-3 hover:border-primary/40">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">{icon}</div>
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-[11px] text-muted-foreground">{sub}</p>
        </div>
      </div>
      <div className={`relative h-6 w-11 rounded-full transition ${on?"bg-primary":"bg-muted"}`}>
        <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${on?"left-[22px]":"left-0.5"}`}/>
      </div>
    </label>
  );
}
