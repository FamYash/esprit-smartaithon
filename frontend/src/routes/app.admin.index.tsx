import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  Clock,
  Calendar,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Activity,
  Award,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

export const Route = createFileRoute("/app/admin/")({ component: AdminOverview });

const monthlyTrends = [
  { month: "JAN", val: 38 },
  { month: "FEB", val: 33 },
  { month: "MAR", val: 32 },
  { month: "APR", val: 27 },
  { month: "MAY", val: 27 },
];

const topCities = [
  { name: "Delhi", aqi: 210, photo: "/chrisha.JPG" },
  { name: "Noida", aqi: 206, photo: "/antra.jpg" },
  { name: "Gurugram", aqi: 204, photo: "/pragati.jpg" },
  { name: "Faridabad", aqi: 191, photo: "/antra.jpg" },
  { name: "Meerut", aqi: 188, photo: "/chrisha.JPG" },
];

const topAlertRegions = [
  { id: 1, name: "Delhi NCR", val: "70.0 Hrs", photo: "/chrisha.JPG", color: "bg-[#F59E0B]" },
  { id: 2, name: "Punjab (Rural)", val: "69.0 Hrs", photo: "/antra.jpg", color: "bg-[#EC4899]" },
  { id: 3, name: "Mumbai (Bandra)", val: "61.0 Hrs", photo: "/pragati.jpg", color: "bg-[#3B82F6]" },
  { id: 4, name: "Kanpur Central", val: "61.0 Hrs", photo: "/antra.jpg", color: "bg-[#F59E0B]" },
  { id: 5, name: "Ahmedabad (East)", val: "54.0 Hrs", photo: "/chrisha.JPG", color: "bg-[#3B82F6]" },
];

function AdminOverview() {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  return (
    <div className="font-sans text-[#1E293B] max-w-7xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
            ATMOAI ADMIN PANEL
          </p>
        </div>
        <div className="rounded-full border border-emerald-100 bg-emerald-50/50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
          May 21, 2026
        </div>
      </div>

      {/* Month Selector Bar */}
      <div className="flex flex-wrap items-center gap-4 xl:gap-8 rounded-2xl bg-white p-2 px-4 shadow-sm">
        <div className="flex items-center gap-3 font-semibold">
          <button className="text-muted-foreground hover:text-foreground"><ChevronLeft className="h-4 w-4" /></button>
          <span>2026</span>
          <button className="text-muted-foreground hover:text-foreground"><ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="flex flex-1 items-center justify-between overflow-x-auto no-scrollbar gap-2 text-xs font-semibold text-muted-foreground">
          {months.map((m) => (
            <button
              key={m}
              className={`rounded-full px-4 py-1.5 transition-colors whitespace-nowrap ${
                m === "MAY" ? "bg-[#1E293B] text-white" : "hover:text-[#1E293B] hover:bg-slate-100"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="h-2 w-2 rounded-full bg-emerald-400 hidden lg:block" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN (Takes 2/3 space on desktop) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Top 3 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
                <Users className="h-4 w-4" /> ACTIVE USERS
              </div>
              <div className="text-4xl font-bold text-[#1E293B]">8,142</div>
            </div>
            
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
                <Clock className="h-4 w-4" /> FORECAST HOURS
              </div>
              <div className="text-4xl font-bold text-[#1E293B]">1,047.5</div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
                <Calendar className="h-4 w-4" /> ACTIVE MODELS
              </div>
              <div className="text-4xl font-bold text-[#1E293B]">6</div>
            </div>
          </div>

          {/* Person Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-50 rounded-bl-full -z-0" />
              <div className="flex items-center gap-3 z-10">
                <div className="relative">
                  <img src="/chrisha.JPG" className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-orange-400 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white">⭐</div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">SYSTEM ADMIN</p>
                  <p className="text-sm font-bold">Chrisha Dabhi</p>
                </div>
              </div>
              <div className="text-right z-10">
                <p className="text-xl font-bold">37</p>
                <p className="text-[10px] text-muted-foreground font-semibold">ALERTS</p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-blue-50 rounded-bl-full -z-0" />
              <div className="flex items-center gap-3 z-10">
                <div className="relative">
                  <img src="/antra.jpg" className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white">🌿</div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">TOP RESEARCHER</p>
                  <p className="text-sm font-bold">Antra Gajjar</p>
                </div>
              </div>
              <div className="text-right z-10">
                <p className="text-xl font-bold">70.0</p>
                <p className="text-[10px] text-muted-foreground font-semibold">HOURS</p>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-auto lg:h-[320px]">
            {/* Bar Chart: Top 5 Hotspots */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 flex flex-col">
              <div className="flex items-center gap-2 text-orange-500 text-xs font-bold uppercase tracking-wider mb-6">
                <Activity className="h-4 w-4" /> TOP 5 HOTSPOTS (AQI)
              </div>
              <div className="flex-1 min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topCities} margin={{ top: 20, right: 0, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={false}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#94A3B8' }} 
                      domain={[0, 250]}
                      ticks={[0, 55, 110, 165, 220]}
                    />
                    <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="aqi" radius={[6, 6, 0, 0]} barSize={24}>
                      {topCities.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? "#F59E0B" : "#F97316"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Custom X-axis labels with avatars */}
              <div className="flex justify-between px-6 mt-[-10px]">
                {topCities.map((city, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5">
                    <img src={city.photo} className="h-6 w-6 rounded-full object-cover ring-2 ring-white shadow-sm" />
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">{city.name.slice(0,5)}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-orange-500 uppercase">TOTAL HOTSPOTS 35+</span>
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1"><TrendingUp className="h-3 w-3"/> +12.4%</span>
              </div>
            </div>

            {/* Line Chart: Monthly Trends */}
            <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 flex flex-col">
              <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-wider mb-6">
                <TrendingUp className="h-4 w-4" /> MONTHLY TRENDS
              </div>
              <div className="flex-1 min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false}
                      tick={false}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#94A3B8' }}
                      domain={[0, 40]}
                      ticks={[0, 10, 20, 30, 40]}
                    />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line 
                      type="monotone" 
                      dataKey="val" 
                      stroke="#10B981" 
                      strokeWidth={3} 
                      dot={{ r: 5, fill: "#10B981", strokeWidth: 2, stroke: "#fff" }} 
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Custom X-axis labels with avatars */}
              <div className="flex justify-between px-4 mt-[-10px]">
                {topCities.map((city, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5">
                    <img src={city.photo} className="h-6 w-6 rounded-full object-cover ring-2 ring-white shadow-sm" />
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">{city.name.slice(0,5)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Takes 1/3 space on desktop) */}
        <div className="space-y-6">
          
          {/* Highlights Box */}
          <div className="rounded-3xl bg-[#F8FAFC] p-6 shadow-sm border border-slate-200 relative overflow-hidden">
            {/* Decorative background dots */}
            <div className="absolute top-4 right-4 h-2 w-2 bg-emerald-300 rounded-full" />
            <div className="absolute top-12 right-12 h-1.5 w-1.5 bg-orange-300 rounded-full" />
            <div className="absolute bottom-10 right-8 h-2.5 w-2.5 bg-blue-300 rounded-full" />
            
            <div className="grid grid-cols-2 gap-y-8 gap-x-4 relative z-10">
              <div>
                <p className="text-3xl font-extrabold text-[#1E293B]">4<span className="text-emerald-500 text-2xl">+</span></p>
                <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-wider">AI MODELS</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-[#1E293B]">35<span className="text-emerald-500 text-2xl">+</span></p>
                <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-wider">DATA SOURCES</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-[#1E293B]">10<span className="text-emerald-500 text-2xl">+</span></p>
                <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-wider">NO. OF SENSORS</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-[#1E293B]">20<span className="text-emerald-500 text-2xl">+</span></p>
                <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-wider">SERVER NODES</p>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-slate-200/60">
              <span className="text-xs font-bold italic text-slate-500">AtmoAI Intelligence Suite</span>
            </div>
          </div>

          {/* Top Hours Dedicated List */}
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100 h-auto xl:h-[432px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                <Clock className="h-4 w-4" /> TOP ALERT REGIONS
              </div>
              <button><MoreHorizontal className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            
            <div className="flex-1 space-y-4 mt-2">
              {topAlertRegions.map((region) => (
                <div key={region.id} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold text-emerald-600 border border-slate-100">
                    {region.id}
                  </div>
                  <img src={region.photo} className="h-8 w-8 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <p className="text-xs font-bold">{region.name}</p>
                      <p className="text-xs font-bold text-muted-foreground">{region.val}</p>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${region.color} rounded-full`} style={{ width: `${90 - (region.id * 8)}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">TOTAL HOURS</p>
                <p className="text-xl font-bold">1047.5</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-emerald-500 flex items-center gap-1 justify-end">
                  <TrendingUp className="h-3 w-3" /> 0.0%
                </p>
                <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1">VS LAST MONTH</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
