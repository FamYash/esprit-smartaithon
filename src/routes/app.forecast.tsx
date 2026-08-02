import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/atmo/AppShell";
import { Card, forecast24h, forecast7d, monthly, countries, aqiCategory } from "@/components/atmo/data";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceArea } from "recharts";
import { Calendar, MapPin, Thermometer, Droplets, Wind as WindIcon, Sun, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/forecast")({ component: Forecast });

function Forecast() {
  const [horizon, setHorizon] = useState<"24"|"7"|"30">("7");
  const data = horizon==="24"?forecast24h:horizon==="7"?forecast7d:monthly;
  const xKey = horizon==="24"?"time":horizon==="7"?"day":"month";
  const predicted = 92;
  const cat = aqiCategory(168);

  return (
    <AppShell title="Forecast" subtitle="AI-driven PM2.5 predictions with confidence intervals">
      <div className="grid gap-6 lg:grid-cols-4">
        <Card title="Configuration" className="lg:col-span-1">
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold">Country</label>
              <div className="relative mt-1.5">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                <select className="w-full appearance-none rounded-xl border border-input bg-background py-2.5 pl-10 pr-3 text-sm">
                  {countries.map(c=><option key={c.code}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold">Date Range</label>
              <div className="relative mt-1.5">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                <input className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-3 text-sm" defaultValue="2026-05-20 → 2026-06-20"/>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold">Forecast Horizon</label>
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                {(["24","7","30"] as const).map(h=>(
                  <button key={h} onClick={()=>setHorizon(h)} className={`rounded-xl border py-2 text-xs font-semibold transition ${horizon===h?"border-primary bg-primary text-white shadow-glow":"border-border hover:border-primary"}`}>
                    {h==="24"?"24 Hours":h==="7"?"7 Days":"30 Days"}
                  </button>
                ))}
              </div>
            </div>
            <button className="w-full rounded-xl gradient-primary py-2.5 text-sm font-semibold text-white shadow-glow">
              Run Forecast
            </button>
          </div>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl glass-orange p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Predicted PM2.5</p>
              <p className="mt-2 text-4xl font-bold">{predicted}<span className="ml-1 text-base font-medium text-muted-foreground">μg/m³</span></p>
              <p className="mt-1 text-xs text-muted-foreground">Next 7-day average</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">AQI Category</p>
              <p className="mt-2 text-2xl font-bold">{cat.label}</p>
              <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${cat.bg} ${cat.text}`}>AQI 168</span>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confidence Interval</p>
              <p className="mt-2 text-2xl font-bold">±8.4 μg/m³</p>
              <p className="mt-1 text-xs text-muted-foreground">95% CI · MAE 6.2</p>
            </div>
          </div>

          <Card title="Forecast Graph" subtitle="Predicted vs Observed PM2.5 with 95% confidence band">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F97316" stopOpacity={0.35}/>
                    <stop offset="100%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.93 0.01 250)"/>
                <XAxis dataKey={xKey} fontSize={11}/><YAxis fontSize={11}/>
                <Tooltip contentStyle={{ borderRadius: 12 }}/>
                <Area type="monotone" dataKey="pm25" stroke="#F97316" strokeWidth={2.5} fill="url(#fg)"/>
                {"predicted" in data[0] && <Area type="monotone" dataKey="predicted" stroke="#FDBA74" strokeWidth={2} fill="none" strokeDasharray="5 5"/>}
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card title="AI Insights" subtitle="Factors influencing this prediction" action={<span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"><Sparkles className="h-3 w-3"/> SHAP explainability</span>}>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                { icon: Thermometer, label: "Temperature", val: "32°C", impact: "+18%", desc: "Higher temps amplify ground-level ozone" },
                { icon: Droplets, label: "Humidity", val: "68%", impact: "+9%", desc: "Traps particulates close to ground" },
                { icon: WindIcon, label: "Wind Speed", val: "6 km/h", impact: "-22%", desc: "Low dispersion increases concentration" },
                { icon: Sun, label: "Seasonal Trend", val: "Pre-monsoon", impact: "+15%", desc: "Dust and crop residue contribution" },
              ].map(({icon:I, label, val, impact, desc}) => (
                <div key={label} className="flex items-start gap-4 rounded-xl border border-border p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><I className="h-5 w-5"/></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">{label}</p>
                      <span className={`text-xs font-bold ${impact.startsWith("+")?"text-red-600":"text-emerald-600"}`}>{impact}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{val} · {desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="rounded-2xl gradient-primary p-6 text-white shadow-glow">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-90">Forecast Summary</p>
            <p className="mt-3 text-lg leading-relaxed">
              PM2.5 concentrations in <strong>New Delhi</strong> are projected to remain in the <strong>Unhealthy for Sensitive Groups</strong> range over the next 7 days, peaking at <strong>112 μg/m³</strong> on Thursday. Sensitive populations should limit outdoor exposure between 8 AM–11 AM.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
