import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/atmo/AppShell";
import { Card, monthly, forecast7d, countries, aqiDistribution } from "@/components/atmo/data";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";

export const Route = createFileRoute("/app/analytics")({ component: Analytics });

const seasonal = ["Spring","Summer","Monsoon","Autumn","Winter"].map((s,i)=>({
  season: s, pm25: [42,68,55,78,124][i], pm10: [78,112,95,130,180][i],
}));
const comparison = countries.slice(0,6).map(c=>({ country: c.code, current: c.pm25, last: Math.round(c.pm25*0.85+10) }));

function Analytics() {
  return (
    <AppShell title="Analytics" subtitle="Advanced visualizations & historical insights">
      <div className="mb-6 flex flex-wrap gap-3">
        <FilterSelect label="Country" options={countries.map(c=>c.name)}/>
        <FilterSelect label="Year" options={["2026","2025","2024","2023"]}/>
        <FilterSelect label="Month" options={["All","January","February","March","April","May"]}/>
        <button className="ml-auto rounded-xl gradient-primary px-5 py-2 text-sm font-semibold text-white shadow-glow">Export Insights</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Historical PM2.5 Trends" subtitle="12-month rolling average" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthly}>
              <defs>
                <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity={0.4}/>
                  <stop offset="100%" stopColor="#F97316" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FDBA74" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#FDBA74" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.93 0.01 250)"/>
              <XAxis dataKey="month" fontSize={11}/><YAxis fontSize={11}/>
              <Tooltip contentStyle={{ borderRadius: 12 }}/>
              <Legend wrapperStyle={{ fontSize: 12 }}/>
              <Area type="monotone" name="2026" dataKey="pm25" stroke="#F97316" strokeWidth={2.5} fill="url(#ag1)"/>
              <Area type="monotone" name="2025" dataKey="last" stroke="#FDBA74" strokeWidth={2} fill="url(#ag2)"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="AQI Distribution" subtitle="Country-share of categories">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={aqiDistribution} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={3}>
                {aqiDistribution.map(d=><Cell key={d.name} fill={d.color}/>)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12 }}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {aqiDistribution.map(d=>(
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{background:d.color}}/>{d.name}</div>
                <span className="font-semibold">{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Country Comparison" subtitle="Current vs last year PM2.5" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={comparison}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.93 0.01 250)"/>
              <XAxis dataKey="country" fontSize={11}/><YAxis fontSize={11}/>
              <Tooltip contentStyle={{ borderRadius: 12 }}/>
              <Legend wrapperStyle={{ fontSize: 12 }}/>
              <Bar name="Last Year" dataKey="last" fill="#FDBA74" radius={[6,6,0,0]}/>
              <Bar name="Current" dataKey="current" fill="#F97316" radius={[6,6,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Seasonal Trends" subtitle="PM2.5 vs PM10">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={seasonal}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.93 0.01 250)"/>
              <XAxis dataKey="season" fontSize={11}/><YAxis fontSize={11}/>
              <Tooltip contentStyle={{ borderRadius: 12 }}/>
              <Legend wrapperStyle={{ fontSize: 12 }}/>
              <Line type="monotone" dataKey="pm25" stroke="#F97316" strokeWidth={3} dot={{r:5}}/>
              <Line type="monotone" dataKey="pm10" stroke="#FDBA74" strokeWidth={2} dot={{r:4}}/>
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Monthly Trends · weekly resolution" className="lg:col-span-3">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={forecast7d.concat(forecast7d).map((d,i)=>({...d, day:`W${i+1}`}))}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.93 0.01 250)"/>
              <XAxis dataKey="day" fontSize={11}/><YAxis fontSize={11}/>
              <Tooltip contentStyle={{ borderRadius: 12 }}/>
              <Bar dataKey="pm25" fill="#F97316" radius={[6,6,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </AppShell>
  );
}

function FilterSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
      <span className="text-xs font-semibold text-muted-foreground">{label}:</span>
      <select className="bg-transparent text-sm font-medium focus:outline-none">
        {options.map(o=><option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
