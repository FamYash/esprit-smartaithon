import { createFileRoute } from "@tanstack/react-router";
import { Filter, Calendar, MapPin, Wind, Activity, ArrowDownToLine, Droplets, FlaskConical, Beaker, MountainSnow } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export const Route = createFileRoute("/app/admin/monitoring")({ component: AirQualityMonitoring });

const historicalAqi = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2, '0')}:00`,
  aqi: Math.round(120 + Math.sin(i / 2) * 50 + Math.random() * 20),
}));

const pollutantComparison = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
  pm25: Math.round(60 + Math.random() * 40),
  pm10: Math.round(100 + Math.random() * 60),
  no2: Math.round(30 + Math.random() * 20),
  o3: Math.round(40 + Math.random() * 30),
}));

const hourlyData = Array.from({ length: 8 }, (_, i) => ({
  time: `${String(16 - i).padStart(2, '0')}:00`,
  aqi: Math.round(140 + Math.random() * 60),
  pm25: Math.round(80 + Math.random() * 30),
  pm10: Math.round(150 + Math.random() * 40),
}));

function AirQualityMonitoring() {
  return (
    <div className="font-sans max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Air Quality Monitoring
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground font-sans max-w-lg leading-relaxed">
            Consolidated analytics and real-time observations of atmospheric pollutants.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-4 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-100 shadow-sm flex-1 min-w-[200px]">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <select className="text-xs font-semibold text-slate-700 bg-transparent outline-none w-full">
            <option>Today (Real-time)</option>
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-100 shadow-sm flex-1 min-w-[200px]">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <select className="text-xs font-semibold text-slate-700 bg-transparent outline-none w-full">
            <option>All States</option>
            <option>Delhi</option>
            <option>Maharashtra</option>
            <option>Karnataka</option>
          </select>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-100 shadow-sm flex-1 min-w-[200px]">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <select className="text-xs font-semibold text-slate-700 bg-transparent outline-none w-full">
            <option>All Cities</option>
            <option>New Delhi</option>
            <option>Mumbai</option>
            <option>Bengaluru</option>
          </select>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-100 shadow-sm flex-1 min-w-[200px]">
          <Wind className="h-4 w-4 text-muted-foreground" />
          <select className="text-xs font-semibold text-slate-700 bg-transparent outline-none w-full">
            <option>All Pollutants</option>
            <option>PM2.5</option>
            <option>PM10</option>
            <option>O₃</option>
          </select>
        </div>
        <button className="h-10 w-10 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white flex items-center justify-center shadow-sm transition-colors">
          <Filter className="h-4 w-4" />
        </button>
      </div>

      {/* AQI Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <PollutantCard title="AQI" val="168" unit="" icon={<Activity className="text-orange-500" />} />
        <PollutantCard title="PM2.5" val="82.4" unit="μg/m³" icon={<MountainSnow className="text-amber-600" />} />
        <PollutantCard title="PM10" val="145.1" unit="μg/m³" icon={<Wind className="text-amber-500" />} />
        <PollutantCard title="NO₂" val="38.2" unit="ppb" icon={<FlaskConical className="text-blue-500" />} />
        <PollutantCard title="SO₂" val="12.4" unit="ppb" icon={<Beaker className="text-purple-500" />} />
        <PollutantCard title="CO" val="0.8" unit="ppm" icon={<Droplets className="text-slate-500" />} />
        <PollutantCard title="O₃" val="45.6" unit="ppb" icon={<Wind className="text-sky-500" />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-foreground">Historical AQI Trend</h3>
            <p className="text-[11px] text-muted-foreground">Observed values for selected period</p>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalAqi} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }} />
                <Line type="monotone" name="Observed AQI" dataKey="aqi" stroke="#F97316" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-foreground">Pollutant Comparison</h3>
            <p className="text-[11px] text-muted-foreground">Key components breakdown</p>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pollutantComparison} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }} />
                <Legend wrapperStyle={{ fontSize: 10, fontWeight: 'bold' }} iconType="circle" iconSize={6} />
                <Line type="monotone" dataKey="pm25" name="PM2.5" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="pm10" name="PM10" stroke="#F97316" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="no2" name="NO₂" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="o3" name="O₃" stroke="#06B6D4" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Hourly Monitoring Table */}
      <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-foreground">Hourly Monitoring Logs</h3>
            <p className="text-[11px] text-muted-foreground">Raw observations for New Delhi station</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <ArrowDownToLine className="h-3.5 w-3.5" /> Export Data
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="pb-2 font-bold px-2">Time</th>
                <th className="pb-2 font-bold px-2">AQI</th>
                <th className="pb-2 font-bold px-2">PM2.5 (μg/m³)</th>
                <th className="pb-2 font-bold px-2">PM10 (μg/m³)</th>
                <th className="pb-2 font-bold px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hourlyData.map((row, i) => (
                <tr key={i} className="hover:bg-white/50 transition-colors">
                  <td className="py-3 px-2 font-bold text-slate-700">{row.time}</td>
                  <td className="py-3 px-2 font-bold text-slate-900">{row.aqi}</td>
                  <td className="py-3 px-2 text-slate-600 font-medium">{row.pm25}</td>
                  <td className="py-3 px-2 text-slate-600 font-medium">{row.pm10}</td>
                  <td className="py-3 px-2">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-bold ${row.aqi > 150 ? "bg-red-100 text-red-700" : row.aqi > 100 ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {row.aqi > 150 ? "Unhealthy" : row.aqi > 100 ? "Sensitive" : "Moderate"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PollutantCard({ title, val, unit, icon }: { title: string; val: string; unit: string; icon: any }) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-sm p-3 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-2">
        <p className="text-[10px] font-bold uppercase text-slate-500">{title}</p>
        <div className="h-5 w-5 opacity-80">{icon}</div>
      </div>
      <div>
        <span className="text-xl font-black text-slate-800">{val}</span>
        {unit && <span className="text-[9px] font-bold text-slate-400 ml-1">{unit}</span>}
      </div>
    </div>
  );
}
