import { createFileRoute } from "@tanstack/react-router";
import { Settings, Shield, Bell, User, Sliders, Save } from "lucide-react";

export const Route = createFileRoute("/app/admin/settings")({ component: AdminSettings });

function AdminSettings() {
  return (
    <div className="font-sans max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Platform Settings
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground font-sans max-w-lg leading-relaxed">
            Configure global thresholds, alert rules, and administrative preferences.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-emerald-600 transition-colors">
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation Sidebar */}
        <div className="space-y-1">
          <SettingsTab active icon={<Sliders className="h-4 w-4" />} label="AQI Thresholds" />
          <SettingsTab icon={<Bell className="h-4 w-4" />} label="Notification Rules" />
          <SettingsTab icon={<Shield className="h-4 w-4" />} label="Security & Access" />
          <SettingsTab icon={<User className="h-4 w-4" />} label="Admin Profile" />
        </div>

        {/* Settings Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* AQI Thresholds Panel */}
          <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-1">Global AQI Thresholds</h3>
            <p className="text-[11px] text-muted-foreground mb-6">Set the boundaries that trigger automated alerts across the network.</p>

            <div className="space-y-6 max-w-xl">
              <ThresholdSlider label="Critical Alert Threshold (AQI)" value={300} max={500} color="bg-purple-500" />
              <ThresholdSlider label="Warning Alert Threshold (AQI)" value={200} max={500} color="bg-red-500" />
              <ThresholdSlider label="Moderate Alert Threshold (AQI)" value={100} max={500} color="bg-orange-500" />
            </div>
          </div>

          {/* Pollutant Specific Thresholds */}
          <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-1">Pollutant Rules</h3>
            <p className="text-[11px] text-muted-foreground mb-6">Specific concentration limits for individual pollutants.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">PM2.5 Max (μg/m³)</label>
                <input type="number" defaultValue={60} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">PM10 Max (μg/m³)</label>
                <input type="number" defaultValue={100} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">O3 Max (ppb)</label>
                <input type="number" defaultValue={70} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">NO2 Max (ppb)</label>
                <input type="number" defaultValue={53} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>
            </div>
          </div>

          {/* Admin Profile Overview */}
          <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-6 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xl font-bold shadow-sm">
                CD
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Chrisha Dabhi</h3>
                <p className="text-sm font-medium text-slate-500">Root Administrator</p>
                <p className="text-[11px] text-muted-foreground mt-1">chrisha@atmoai.com</p>
              </div>
            </div>
            <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ active, icon, label }: { active?: boolean; icon: React.ReactNode; label: string }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${active ? 'bg-white shadow-sm border border-slate-100 text-emerald-600' : 'text-slate-600 hover:bg-white/50'}`}>
      {icon}
      {label}
    </button>
  );
}

function ThresholdSlider({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="font-bold text-slate-700">{label}</span>
        <span className={`font-black ${color.replace('bg-', 'text-')}`}>{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200 overflow-hidden relative">
        <div className={`absolute left-0 top-0 h-full rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }} />
      </div>
      <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-1 uppercase">
        <span>0</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
