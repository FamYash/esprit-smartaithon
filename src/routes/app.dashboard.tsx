import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/atmo/AppShell";
import { AQIGauge, WorldHeatmap } from "@/components/atmo/Visualizations";
import { Card, StatCard, forecast24h, forecast7d, monthly, countries, aqiCategory } from "@/components/atmo/data";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { Wind, Activity, Gauge, Target, Download, Shield, AlertTriangle, Users } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/dashboard")({ component: Dashboard });

function Dashboard() {
  const [range, setRange] = useState<"24h"|"7d"|"month">("24h");
  return (
    <AppShell title="Dashboard" subtitle="Real-time air quality intelligence for New Delhi, India">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Current AQI" value="168" sub="Unhealthy for Sensitive" delta="3.2% vs yesterday" icon={<Gauge className="h-5 w-5"/>}/>
        <StatCard label="PM2.5" value="89 μg/m³" sub="WHO limit: 15 μg/m³" delta="1.8% improving" icon={<Wind className="h-5 w-5"/>}/>
        <StatCard label="PM10" value="142 μg/m³" sub="24-hr avg" delta="0.9% improving" icon={<Activity className="h-5 w-5"/>}/>
        <StatCard label="Forecast Accuracy" value="94.7%" sub="Last 30 days" delta="2.1% MoM" icon={<Target className="h-5 w-5"/>}/>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card title="Air Quality Status" subtitle="New Delhi · Live" className="flex flex-col items-center justify-center">
          <AQIGauge value={168}/>
          <p className="mt-4 max-w-xs text-center text-xs text-muted-foreground">Sensitive groups may experience health effects. General public is less likely to be affected.</p>
        </Card>

        <Card title="PM2.5 Forecast" subtitle="LSTM ensemble · confidence 94.7%" className="lg:col-span-2"
          action={
            <div className="flex rounded-xl border border-border p-1 text-xs">
              {(["24h","7d","month"] as const).map(r=>(
                <button key={r} onClick={()=>setRange(r)} className={`rounded-lg px-3 py-1.5 font-semibold transition ${range===r?"bg-primary text-white shadow-glow":"text-muted-foreground hover:text-foreground"}`}>
                  {r==="24h"?"24 Hours":r==="7d"?"7 Days":"Monthly"}
                </button>
              ))}
            </div>
          }>
          <ResponsiveContainer width="100%" height={260}>
            {range==="24h" ? (
              <AreaChart data={forecast24h}>
                <defs>
                  <linearGradient id="dg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F97316" stopOpacity={0.35}/>
                    <stop offset="100%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false}/>
                <XAxis dataKey="time" fontSize={11} stroke="oklch(0.5 0.02 250)" interval={2}/>
                <YAxis fontSize={11} stroke="oklch(0.5 0.02 250)"/>
                <Tooltip contentStyle={{ borderRadius: 12 }}/>
                <Area type="monotone" dataKey="predicted" stroke="#F97316" strokeWidth={2.5} fill="url(#dg1)"/>
                <Line type="monotone" dataKey="pm25" stroke="#FDBA74" strokeWidth={2} dot={false}/>
              </AreaChart>
            ) : range==="7d" ? (
              <BarChart data={forecast7d}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false}/>
                <XAxis dataKey="day" fontSize={11}/>
                <YAxis fontSize={11}/>
                <Tooltip contentStyle={{ borderRadius: 12 }}/>
                <Bar dataKey="pm25" fill="#F97316" radius={[8,8,0,0]}/>
                <Bar dataKey="pm10" fill="#FDBA74" radius={[8,8,0,0]}/>
              </BarChart>
            ) : (
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false}/>
                <XAxis dataKey="month" fontSize={11}/>
                <YAxis fontSize={11}/>
                <Tooltip contentStyle={{ borderRadius: 12 }}/>
                <Line type="monotone" dataKey="pm25" stroke="#F97316" strokeWidth={3} dot={{r:4}}/>
                <Line type="monotone" dataKey="last" stroke="#FDBA74" strokeWidth={2} dot={false} strokeDasharray="4 4"/>
              </LineChart>
            )}
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card title="Global Pollution Heatmap"
          action={
            <select className="rounded-lg border border-input bg-background px-3 py-1.5 text-xs">
              {countries.map(c=> <option key={c.code}>{c.name}</option>)}
            </select>
          }
          className="lg:col-span-2">
          <WorldHeatmap height={340} interactive/>
        </Card>

        <Card title="Health Advisory" subtitle="Based on current AQI">
          <div className="space-y-3">
            {[
              { icon: Shield, t: "Wear an N95 mask outdoors", c: "text-orange-700 bg-orange-50" },
              { icon: AlertTriangle, t: "Limit prolonged outdoor activity", c: "text-red-700 bg-red-50" },
              { icon: Users, t: "Sensitive groups stay indoors", c: "text-purple-700 bg-purple-50" },
            ].map(({icon: I, t, c}) => (
              <div key={t} className={`flex items-start gap-3 rounded-xl ${c} p-3.5`}>
                <I className="mt-0.5 h-5 w-5 shrink-0"/>
                <p className="text-sm font-medium">{t}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background py-2.5 text-sm font-semibold hover:border-primary hover:text-primary">
            <Download className="h-4 w-4"/> Download Report
          </button>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Historical Trend (12 months)" subtitle="PM2.5 daily average">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthly}>
              <defs>
                <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#F97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.93 0.01 250)"/>
              <XAxis dataKey="month" fontSize={11}/><YAxis fontSize={11}/>
              <Tooltip contentStyle={{ borderRadius: 12 }}/>
              <Area type="monotone" dataKey="pm25" stroke="#F97316" fill="url(#hg)" strokeWidth={2.5}/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Recent Alerts">
          <div className="space-y-3">
            {[
              { t: "PM2.5 exceeded 150 μg/m³ in Lahore, PK", time: "12 min ago", sev: "Unhealthy", c: "bg-red-50 text-red-700" },
              { t: "Forecast risk warning: Beijing next 24h", time: "1 hr ago", sev: "Moderate", c: "bg-yellow-50 text-yellow-700" },
              { t: "AQI improved to Good in Sydney, AU", time: "3 hr ago", sev: "Good", c: "bg-emerald-50 text-emerald-700" },
              { t: "Threshold reached: New Delhi PM2.5 > 80", time: "5 hr ago", sev: "Sensitive", c: "bg-orange-50 text-orange-700" },
            ].map(a=>(
              <div key={a.t} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{a.t}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.time}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${a.c}`}>{a.sev}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
