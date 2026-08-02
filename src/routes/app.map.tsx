import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/atmo/AppShell";
import { WorldHeatmap } from "@/components/atmo/Visualizations";
import { countries, aqiCategory, Card } from "@/components/atmo/data";
import { Plus, Minus, Locate, Thermometer, Droplets, Wind, Activity } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/map")({ component: AQIMap });

function AQIMap() {
  const [selected, setSelected] = useState(countries[0]);
  const cat = aqiCategory(selected.aqi);

  return (
    <AppShell title="Air Quality Map" subtitle="Live country-wise PM2.5 monitoring across 190 countries">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="relative lg:col-span-2">
          <div className="relative rounded-2xl border border-border bg-card p-4 shadow-card">
            <WorldHeatmap height={560} interactive/>
            <div className="absolute right-6 top-6 flex flex-col gap-1.5">
              <button className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-background shadow-card hover:bg-accent"><Plus className="h-4 w-4"/></button>
              <button className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-background shadow-card hover:bg-accent"><Minus className="h-4 w-4"/></button>
              <button className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-background shadow-card hover:bg-accent"><Locate className="h-4 w-4"/></button>
            </div>
            <div className="absolute left-6 top-6 rounded-xl glass p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Live Monitoring</p>
              <p className="mt-0.5 text-sm font-bold">12,408 stations</p>
              <p className="text-[10px] text-emerald-600">● Streaming · 30s refresh</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card title="Selected Country">
            <div>
              <select value={selected.code} onChange={(e)=>setSelected(countries.find(c=>c.code===e.target.value)||countries[0])} className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm">
                {countries.map(c=><option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
              <div className={`mt-5 rounded-2xl ${cat.bg} p-5`}>
                <p className={`text-xs font-semibold uppercase tracking-wider ${cat.text}`}>{cat.label}</p>
                <p className="mt-1 text-5xl font-bold text-foreground">{selected.aqi}</p>
                <p className="mt-1 text-xs text-muted-foreground">Current AQI · {selected.name}</p>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Metric icon={<Wind className="h-4 w-4"/>} label="PM2.5" value={`${selected.pm25} μg/m³`}/>
                <Metric icon={<Activity className="h-4 w-4"/>} label="PM10" value={`${selected.pm10} μg/m³`}/>
                <Metric icon={<Thermometer className="h-4 w-4"/>} label="Temperature" value={`${selected.temp}°C`}/>
                <Metric icon={<Droplets className="h-4 w-4"/>} label="Humidity" value={`${selected.humidity}%`}/>
              </div>
            </div>
          </Card>

          <Card title="Pollution Hotspots" subtitle="Top 5 countries by AQI">
            <ul className="space-y-2">
              {[...countries].sort((a,b)=>b.aqi-a.aqi).slice(0,5).map((c,i)=>{
                const cc = aqiCategory(c.aqi);
                return (
                  <li key={c.code} className="flex items-center justify-between rounded-xl border border-border p-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-muted text-xs font-bold">{i+1}</span>
                      <span className="text-sm font-medium">{c.name}</span>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${cc.bg} ${cc.text}`}>AQI {c.aqi}</span>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border p-3">
      <div className="flex items-center gap-2 text-muted-foreground">{icon}<span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span></div>
      <p className="mt-1.5 text-base font-bold">{value}</p>
    </div>
  );
}
