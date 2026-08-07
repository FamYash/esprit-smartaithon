import { createFileRoute } from "@tanstack/react-router";
import { Card, StatCard, countries, monthly } from "@/components/atmo/data";
import { IndiaHeatmap } from "@/components/atmo/Visualizations";
import {
  Users,
  Activity,
  Zap,
  AlertTriangle,
  Server,
  Database,
  Cpu,
  Target,
  Upload,
  RefreshCcw,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  ShieldCheck,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/app/admin/")({ component: AdminOverview });

const users = [
  {
    name: "Chrisha Dabhi",
    email: "chrisha@atmoai.com",
    country: "India",
    status: "Active",
    role: "Admin",
  },
  {
    name: "Antra Gajjar",
    email: "antra@atmoai.com",
    country: "India",
    status: "Active",
    role: "Researcher",
  },
  {
    name: "Pragati Varu",
    email: "pragati@atmoai.com",
    country: "India",
    status: "Active",
    role: "Data Scientist",
  },
  {
    name: "Dr. Rahul Mehta",
    email: "rahul@iitb.ac.in",
    country: "India",
    status: "Active",
    role: "Researcher",
  },
  { name: "Lin Wei", email: "lin@cas.cn", country: "China", status: "Pending", role: "Researcher" },
  {
    name: "Marie Dubois",
    email: "marie@inra.fr",
    country: "France",
    status: "Active",
    role: "Viewer",
  },
  {
    name: "Carlos Mendez",
    email: "carlos@unam.mx",
    country: "Mexico",
    status: "Inactive",
    role: "Researcher",
  },
];

function AdminOverview() {
  return (
    <div>
      {/* Title Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">
          Dashboard Overview
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground font-sans">
          Enterprise metrics, active states, system logs and configuration panel
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
        <StatCard
          label="Total Forecast Requests"
          value="2.8M"
          sub="Today"
          icon={<Zap className="h-5 w-5" />}
        />
        <StatCard
          label="Active Users"
          value="8,142"
          delta="3.4% WoW"
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          label="Pollution Hotspots"
          value="18 Cities"
          sub="Critically High"
          icon={<Activity className="h-5 w-5" />}
        />
        <StatCard
          label="Active Alerts"
          value="324"
          sub="Open alerts"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
        <StatCard
          label="Forecast Accuracy"
          value="94.7%"
          delta="0.6% MoM"
          icon={<Target className="h-5 w-5" />}
        />
        <StatCard
          label="System Status"
          value="Healthy"
          sub="3/3 nodes active"
          icon={<Server className="h-5 w-5" />}
        />
      </div>

      {/* Global Heatmap and Alert Control */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card title="India AQI Heatmap" subtitle="All monitored cities" className="lg:col-span-2">
          <IndiaHeatmap height={360} interactive />
        </Card>

        <Card title="Alert Control Panel">
          <div className="space-y-4">
            <Threshold label="Global AQI Threshold" value={150} max={300} />
            <Threshold label="PM2.5 Threshold" value={75} max={250} />
            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <div>
                <p className="text-sm font-semibold">Email Alerts</p>
                <p className="text-[11px] text-muted-foreground">SMTP gateway</p>
              </div>
              <Switch on />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <div>
                <p className="text-sm font-semibold">Push Notifications</p>
                <p className="text-[11px] text-muted-foreground">FCM + APNS</p>
              </div>
              <Switch on />
            </div>
          </div>
        </Card>
      </div>

      {/* Dataset & Model Management */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card
          title="Dataset Management"
          action={
            <button className="rounded-lg gradient-primary px-3 py-1.5 text-xs font-semibold text-white">
              + New Dataset
            </button>
          }
        >
          <div className="space-y-3">
            <DatasetRow
              name="EPA AirNow · Global"
              rows="48.2M rows"
              updated="2 hours ago"
              status="Validated"
            />
            <DatasetRow
              name="OpenAQ Live Feed"
              rows="12.4M rows"
              updated="Streaming"
              status="Live"
            />
            <DatasetRow
              name="Sentinel-5P Satellite"
              rows="2.1B obs"
              updated="Yesterday"
              status="Validated"
            />
            <DatasetRow
              name="ECMWF Meteorology"
              rows="892M rows"
              updated="6 hours ago"
              status="Validated"
            />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <button className="flex items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-xs font-semibold hover:border-primary hover:text-primary">
              <Upload className="h-3.5 w-3.5" /> Upload
            </button>
            <button className="flex items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-xs font-semibold hover:border-primary hover:text-primary">
              <RefreshCcw className="h-3.5 w-3.5" /> Update
            </button>
            <button className="flex items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-xs font-semibold hover:border-primary hover:text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" /> Validate
            </button>
          </div>
        </Card>

        <Card title="Model Management" subtitle="Production model · v3.2.1">
          <div className="grid grid-cols-2 gap-4">
            <Metric label="Accuracy" value="94.7%" delta="+0.6%" />
            <Metric label="RMSE" value="6.84" delta="-0.21" />
            <Metric label="MAE" value="4.92" delta="-0.18" />
            <Metric label="R² Score" value="0.921" delta="+0.012" />
          </div>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={monthly}>
                <defs>
                  <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F97316" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="oklch(0.93 0.01 250)"
                />
                <XAxis dataKey="month" fontSize={10} />
                <YAxis fontSize={10} hide />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Area
                  type="monotone"
                  dataKey="pm25"
                  stroke="#F97316"
                  strokeWidth={2}
                  fill="url(#mg)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Last trained: 4 days ago
            </span>
            <button className="rounded-lg gradient-primary px-3 py-1.5 text-xs font-semibold text-white shadow-glow">
              Retrain
            </button>
          </div>
        </Card>
      </div>

      {/* User Management and System Monitoring */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card title="User Management" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Country</th>
                  <th className="pb-3 font-semibold">Role</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.email} className="border-b border-border/60 last:border-0">
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-[10px] font-bold text-white">
                          {u.name
                            .split(" ")
                            .map((p) => p[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <p className="font-semibold leading-tight">{u.name}</p>
                          <p className="text-[11px] text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-xs">{u.country}</td>
                    <td className="py-3.5">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          u.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : u.status === "Pending"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button className="grid h-7 w-7 place-items-center rounded-lg hover:bg-accent">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="System Monitoring">
          <div className="space-y-3">
            <SystemRow
              icon={<Server className="h-4 w-4" />}
              label="API Health"
              value="Operational"
              pct={99.98}
            />
            <SystemRow
              icon={<Cpu className="h-4 w-4" />}
              label="Prediction Latency"
              value="68 ms"
              pct={92}
            />
            <SystemRow
              icon={<Database className="h-4 w-4" />}
              label="Database Status"
              value="Healthy"
              pct={100}
            />
            <SystemRow
              icon={<Activity className="h-4 w-4" />}
              label="Server Status"
              value="3/3 nodes"
              pct={100}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Threshold({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold">{label}</span>
        <span className="font-bold text-primary">{value}</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-muted">
        <div
          className="h-full rounded-full gradient-primary"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
}

function Switch({ on }: { on?: boolean }) {
  return (
    <div className={`relative h-6 w-11 rounded-full ${on ? "bg-primary" : "bg-muted"}`}>
      <div
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow ${on ? "left-[22px]" : "left-0.5"}`}
      />
    </div>
  );
}

function DatasetRow({
  name,
  rows,
  updated,
  status,
}: {
  name: string;
  rows: string;
  updated: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border p-3">
      <div>
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-[11px] text-muted-foreground">
          {rows} · updated {updated}
        </p>
      </div>
      <span
        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${status === "Live" ? "bg-emerald-50 text-emerald-700" : "bg-primary/10 text-primary"}`}
      >
        {status}
      </span>
    </div>
  );
}

function Metric({ label, value, delta }: { label: string; value: string; delta: string }) {
  const positive = delta.startsWith("+");
  return (
    <div className="rounded-xl border border-border p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-xl font-bold">{value}</p>
      <p
        className={`mt-0.5 text-[11px] font-semibold ${positive ? "text-emerald-600" : "text-blue-600"}`}
      >
        {delta}
      </p>
    </div>
  );
}

function SystemRow({
  icon,
  label,
  value,
  pct,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  pct: number;
}) {
  return (
    <div className="rounded-xl border border-border p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary">{icon}</span>
          <span className="text-sm font-semibold">{label}</span>
        </div>
        <span className="text-xs font-bold text-emerald-600">{value}</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-muted">
        <div className="h-full rounded-full gradient-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
