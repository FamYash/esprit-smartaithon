import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { Wind, Thermometer, Droplets, Gauge, AlertOctagon, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/app/admin/pollution")({ component: AdminPollution });

const sensors = [
  {
    id: "S-101",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    pm25: 245,
    pm10: 360,
    status: "Active",
    health: "98.4%",
    temp: "34°C",
    humidity: "42%",
  },
  {
    id: "S-102",
    city: "Faridabad",
    state: "Haryana",
    pm25: 232,
    pm10: 340,
    status: "Active",
    health: "97.1%",
    temp: "33°C",
    humidity: "45%",
  },
  {
    id: "S-103",
    city: "Bhiwadi",
    state: "Rajasthan",
    pm25: 218,
    pm10: 310,
    status: "Active",
    health: "99.0%",
    temp: "36°C",
    humidity: "30%",
  },
  {
    id: "S-104",
    city: "Noida",
    state: "Uttar Pradesh",
    pm25: 195,
    pm10: 285,
    status: "Active",
    health: "98.9%",
    temp: "33°C",
    humidity: "44%",
  },
  {
    id: "S-105",
    city: "Patna",
    state: "Bihar",
    pm25: 185,
    pm10: 270,
    status: "Active",
    health: "96.5%",
    temp: "32°C",
    humidity: "55%",
  },
  {
    id: "S-106",
    city: "Gurugram",
    state: "Haryana",
    pm25: 175,
    pm10: 255,
    status: "Active",
    health: "99.3%",
    temp: "34°C",
    humidity: "40%",
  },
  {
    id: "S-107",
    city: "New Delhi Central",
    state: "Delhi",
    pm25: 152,
    pm10: 220,
    status: "Active",
    health: "99.9%",
    temp: "33°C",
    humidity: "46%",
  },
  {
    id: "S-108",
    city: "Lucknow Aliganj",
    state: "Uttar Pradesh",
    pm25: 162,
    pm10: 240,
    status: "Maintenance",
    health: "84.2%",
    temp: "33°C",
    humidity: "50%",
  },
  {
    id: "S-109",
    city: "Mumbai Bandra",
    state: "Maharashtra",
    pm25: 62,
    pm10: 95,
    status: "Active",
    health: "99.1%",
    temp: "31°C",
    humidity: "78%",
  },
  {
    id: "S-110",
    city: "Bengaluru Whitefield",
    state: "Karnataka",
    pm25: 46,
    pm10: 78,
    status: "Active",
    health: "98.7%",
    temp: "28°C",
    humidity: "62%",
  },
];

function AdminPollution() {
  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">
          Pollution Monitoring
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground font-sans">
          Real-time sensor feed monitoring, diagnostic reports and station statuses
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Active Sensors",
            value: "192 / 195",
            desc: "98.4% uptime",
            icon: <Wind className="h-5 w-5 text-primary" />,
          },
          {
            label: "Avg National PM2.5",
            value: "84.2 μg/m³",
            desc: "Moderately High",
            icon: <Gauge className="h-5 w-5 text-orange-500" />,
          },
          {
            label: "Critical Alerts",
            value: "3 Stations",
            desc: "Urgent check required",
            icon: <AlertOctagon className="h-5 w-5 text-red-500" />,
          },
          {
            label: "Last Sync Cycle",
            value: "12s ago",
            desc: "Continuous streams",
            icon: <Thermometer className="h-5 w-5 text-blue-500" />,
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-border bg-card p-6 shadow-card transition duration-200 hover:shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {card.label}
              </span>
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-surface)]">
                {card.icon}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Card
        title="Sensor Station Feed Audit"
        subtitle="Continuous particulate telemetry and status check"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border pb-3 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 font-semibold">Sensor ID</th>
                <th className="pb-3 font-semibold">City / Location</th>
                <th className="pb-3 font-semibold">State</th>
                <th className="pb-3 font-semibold text-right">PM2.5</th>
                <th className="pb-3 font-semibold text-right">PM10</th>
                <th className="pb-3 font-semibold text-right">Uptime Health</th>
                <th className="pb-3 font-semibold text-right">Temperature</th>
                <th className="pb-3 font-semibold text-right">Humidity</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {sensors.map((s) => (
                <tr key={s.id} className="hover:bg-accent/40">
                  <td className="py-3.5 font-semibold text-primary font-mono">{s.id}</td>
                  <td className="py-3.5 font-medium">{s.city}</td>
                  <td className="py-3.5 text-muted-foreground">{s.state}</td>
                  <td className="py-3.5 text-right font-bold text-primary">{s.pm25}</td>
                  <td className="py-3.5 text-right text-muted-foreground">{s.pm10}</td>
                  <td className="py-3.5 text-right font-semibold text-emerald-600">{s.health}</td>
                  <td className="py-3.5 text-right text-muted-foreground">{s.temp}</td>
                  <td className="py-3.5 text-right text-muted-foreground">{s.humidity}</td>
                  <td className="py-3.5 text-right">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        s.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {s.status}
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
