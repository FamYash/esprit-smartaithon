import { createFileRoute } from "@tanstack/react-router";
import { Search, MapPin, Activity, Wind, Filter } from "lucide-react";

export const Route = createFileRoute("/app/admin/explorer")({ component: AdminExplorer });

const stateData = [
  { name: "Delhi", aqi: 248, pm25: 145, status: "Severe", stations: 38 },
  { name: "Uttar Pradesh", aqi: 210, pm25: 120, status: "Very Poor", stations: 45 },
  { name: "Haryana", aqi: 195, pm25: 110, status: "Poor", stations: 22 },
  { name: "Punjab", aqi: 185, pm25: 95, status: "Poor", stations: 18 },
  { name: "Maharashtra", aqi: 110, pm25: 55, status: "Moderate", stations: 62 },
  { name: "Karnataka", aqi: 85, pm25: 42, status: "Satisfactory", stations: 35 },
  { name: "Kerala", aqi: 42, pm25: 18, status: "Good", stations: 14 },
];

function AdminExplorer() {
  return (
    <div className="font-sans max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col pb-4">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/40 pb-4 mb-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            India AQI Explorer
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground font-sans max-w-lg leading-relaxed">
            Geospatial intelligence and state-level pollution monitoring.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search states or cities..."
              className="rounded-xl border border-white/40 bg-white/60 backdrop-blur-sm py-2 pl-9 pr-4 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-[250px]"
            />
          </div>
          <button className="h-9 px-4 rounded-xl border border-white/40 bg-white/60 backdrop-blur-sm shadow-sm text-xs font-bold text-slate-700 flex items-center gap-2 hover:bg-white transition-colors">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Left 70%: Large Map */}
        <div className="lg:w-[70%] rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-sm flex flex-col overflow-hidden relative">
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">National Overview</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1">Live AQI Heatmap</p>
          </div>
          
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-2 px-3 shadow-sm border border-slate-100 text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Avg AQI</p>
              <p className="text-sm font-black text-orange-500">168</p>
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-xl p-2 px-3 shadow-sm border border-slate-100 text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Hotspots</p>
              <p className="text-sm font-black text-red-500">14</p>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 z-10 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-sm border border-slate-100">
             <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-600">
               <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Good</div>
               <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> Satisfactory</div>
               <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-500"></span> Poor</div>
               <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500"></span> Very Poor</div>
               <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-purple-600"></span> Severe</div>
             </div>
          </div>

          <div className="flex-1 w-full h-full bg-[#f8fafc] relative overflow-hidden flex items-center justify-center">
            {/* SVG Heatmap Implementation */}
            <svg viewBox="0 0 800 800" className="w-full h-full max-h-[800px] opacity-90 drop-shadow-xl p-10">
              {/* Abstracted India SVG Path (Simplified placeholder for the real SVG) */}
              <g stroke="white" strokeWidth="2" strokeLinejoin="round">
                <path d="M250,150 L300,50 L350,100 L400,80 L450,120 L550,200 L650,250 L750,300 L700,400 L650,550 L500,750 L450,780 L400,750 L300,600 L200,450 L100,350 L150,250 Z" fill="#F1F5F9" />
                
                {/* State approximations colored by AQI */}
                <path d="M300,50 L350,100 L300,150 Z" fill="#F59E0B" className="hover:opacity-80 transition-opacity cursor-pointer" /> {/* JK/Ladakh */}
                <path d="M300,150 L350,100 L400,150 L350,200 Z" fill="#EF4444" className="hover:opacity-80 transition-opacity cursor-pointer" /> {/* Delhi/Haryana */}
                <path d="M350,200 L400,150 L500,250 L450,300 Z" fill="#9333EA" className="hover:opacity-80 transition-opacity cursor-pointer" /> {/* UP */}
                <path d="M200,300 L300,150 L350,200 L250,350 Z" fill="#F97316" className="hover:opacity-80 transition-opacity cursor-pointer" /> {/* Rajasthan */}
                <path d="M200,450 L250,350 L350,400 L300,500 Z" fill="#F59E0B" className="hover:opacity-80 transition-opacity cursor-pointer" /> {/* Gujarat/MH */}
                <path d="M350,400 L450,300 L550,400 L450,500 Z" fill="#F59E0B" className="hover:opacity-80 transition-opacity cursor-pointer" /> {/* MP */}
                <path d="M300,500 L450,500 L400,650 L350,600 Z" fill="#10B981" className="hover:opacity-80 transition-opacity cursor-pointer" /> {/* Karnataka/Kerala */}
                <path d="M400,650 L450,500 L550,550 L450,750 Z" fill="#10B981" className="hover:opacity-80 transition-opacity cursor-pointer" /> {/* TN/AP */}
                <path d="M500,250 L650,250 L600,400 L550,350 Z" fill="#F97316" className="hover:opacity-80 transition-opacity cursor-pointer" /> {/* Bihar/Bengal */}
                <path d="M650,250 L750,300 L700,400 L600,350 Z" fill="#10B981" className="hover:opacity-80 transition-opacity cursor-pointer" /> {/* NE */}
              </g>

              {/* Data points */}
              <circle cx="350" cy="180" r="15" fill="#9333EA" className="animate-pulse" />
              <circle cx="450" cy="250" r="12" fill="#EF4444" className="animate-pulse" />
              <circle cx="280" cy="380" r="8" fill="#F97316" />
              <circle cx="380" cy="580" r="8" fill="#10B981" />
              <circle cx="620" cy="300" r="10" fill="#F97316" />
            </svg>
          </div>
        </div>

        {/* Right 30%: Selected State Panel */}
        <div className="lg:w-[30%] flex flex-col gap-4 overflow-hidden">
          {/* State Card */}
          <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-sm shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-slate-800">New Delhi</h2>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Severe
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">AQI</p>
                <p className="text-3xl font-black text-purple-700">248</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">PM2.5</p>
                <p className="text-3xl font-black text-red-600">145</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white/50 p-3 rounded-xl border border-slate-100">
              <Activity className="h-4 w-4 text-purple-600" />
              Primary Pollutant: PM2.5
            </div>
          </div>

          {/* State List */}
          <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-sm flex-1 flex flex-col min-h-0">
            <div className="p-4 border-b border-slate-100/50 shrink-0">
              <h3 className="text-sm font-bold text-foreground">Top Polluted Regions</h3>
            </div>
            <div className="overflow-y-auto p-2 flex-1">
              <div className="space-y-1">
                {stateData.map((state, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/60 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${state.aqi > 200 ? 'bg-purple-500' : state.aqi > 150 ? 'bg-red-500' : state.aqi > 100 ? 'bg-orange-500' : state.aqi > 50 ? 'bg-yellow-500' : 'bg-emerald-500'}`} />
                      <div>
                        <p className="text-sm font-bold text-slate-800">{state.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{state.stations} Stations</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-700">{state.aqi}</p>
                      <p className={`text-[9px] font-bold uppercase ${state.aqi > 200 ? 'text-purple-600' : state.aqi > 150 ? 'text-red-600' : state.aqi > 100 ? 'text-orange-600' : state.aqi > 50 ? 'text-yellow-600' : 'text-emerald-600'}`}>
                        {state.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
