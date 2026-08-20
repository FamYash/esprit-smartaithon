import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Settings, Shield, Bell, User, Sliders, Save } from "lucide-react";

export const Route = createFileRoute("/app/admin/settings")({ component: AdminSettings });

const defaultSettings = {
  aqiCritical: 300,
  aqiWarning: 200,
  aqiModerate: 100,
  pm25Max: 60,
  pm10Max: 100,
  o3Max: 70,
  no2Max: 53
};

import { useReactiveStore } from "@/lib/atmo/storage";

function AdminSettings() {
  const [settings, setSettings] = useReactiveStore("atmoai_settings", defaultSettings);
  const [activeTab, setActiveTab] = useState("AQI Thresholds");

  const handleSave = () => {
    toast.success("Settings saved successfully.");
  };

  const handleChange = (key: keyof typeof defaultSettings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

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
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-emerald-600 transition-colors"
        >
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation Sidebar */}
        <div className="space-y-1">
          <SettingsTab 
            active={activeTab === "AQI Thresholds"} 
            onClick={() => setActiveTab("AQI Thresholds")}
            icon={<Sliders className="h-4 w-4" />} 
            label="AQI Thresholds" 
          />
          <SettingsTab 
            active={activeTab === "Notification Rules"} 
            onClick={() => setActiveTab("Notification Rules")}
            icon={<Bell className="h-4 w-4" />} 
            label="Notification Rules" 
          />
          <SettingsTab 
            active={activeTab === "Security & Access"} 
            onClick={() => setActiveTab("Security & Access")}
            icon={<Shield className="h-4 w-4" />} 
            label="Security & Access" 
          />
          <SettingsTab 
            active={activeTab === "Admin Profile"} 
            onClick={() => setActiveTab("Admin Profile")}
            icon={<User className="h-4 w-4" />} 
            label="Admin Profile" 
          />
        </div>

        {/* Settings Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {activeTab === "AQI Thresholds" && (
            <>
              {/* AQI Thresholds Panel */}
              <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-1">Global AQI Thresholds</h3>
                <p className="text-[11px] text-muted-foreground mb-6">Set the boundaries that trigger automated alerts across the network.</p>

                <div className="space-y-6 max-w-xl">
                  <ThresholdSlider 
                    label="Critical Alert Threshold (AQI)" 
                    value={settings.aqiCritical} 
                    onChange={(v) => handleChange("aqiCritical", v)}
                    max={500} 
                    color="bg-purple-500" 
                  />
                  <ThresholdSlider 
                    label="Warning Alert Threshold (AQI)" 
                    value={settings.aqiWarning} 
                    onChange={(v) => handleChange("aqiWarning", v)}
                    max={500} 
                    color="bg-red-500" 
                  />
                  <ThresholdSlider 
                    label="Moderate Alert Threshold (AQI)" 
                    value={settings.aqiModerate} 
                    onChange={(v) => handleChange("aqiModerate", v)}
                    max={500} 
                    color="bg-orange-500" 
                  />
                </div>
              </div>

              {/* Pollutant Specific Thresholds */}
              <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-1">Pollutant Rules</h3>
                <p className="text-[11px] text-muted-foreground mb-6">Specific concentration limits for individual pollutants.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">PM2.5 Max (μg/m³)</label>
                    <input 
                      type="number" 
                      value={settings.pm25Max} 
                      onChange={(e) => handleChange("pm25Max", Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">PM10 Max (μg/m³)</label>
                    <input 
                      type="number" 
                      value={settings.pm10Max} 
                      onChange={(e) => handleChange("pm10Max", Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">O3 Max (ppb)</label>
                    <input 
                      type="number" 
                      value={settings.o3Max} 
                      onChange={(e) => handleChange("o3Max", Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">NO2 Max (ppb)</label>
                    <input 
                      type="number" 
                      value={settings.no2Max} 
                      onChange={(e) => handleChange("no2Max", Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" 
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab !== "AQI Thresholds" && activeTab !== "Admin Profile" && (
            <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-12 shadow-sm text-center">
              <Shield className="h-10 w-10 text-slate-300 mx-auto mb-4" />
              <h3 className="text-base font-bold text-slate-700">UI control exists but downstream behavior is not currently implemented.</h3>
              <p className="text-xs text-muted-foreground mt-2">This module is part of the future feature roadmap.</p>
            </div>
          )}

          {activeTab === "Admin Profile" && (
            /* Admin Profile Overview */
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
              <button 
                onClick={() => toast("Profile editing is disabled in prototype mode.")}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function SettingsTab({ active, icon, label, onClick }: { active?: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${active ? 'bg-white shadow-sm border border-slate-100 text-emerald-600' : 'text-slate-600 hover:bg-white/50'}`}
    >
      {icon}
      {label}
    </button>
  );
}

function ThresholdSlider({ label, value, max, color, onChange }: { label: string; value: number; max: number; color: string; onChange: (val: number) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="font-bold text-slate-700">{label}</span>
        <span className={`font-black ${color.replace('bg-', 'text-')}`}>{value}</span>
      </div>
      <div className="relative flex items-center group">
        <input 
          type="range" 
          min={0} 
          max={max} 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full absolute opacity-0 cursor-pointer h-full z-10" 
        />
        <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
          <div className={`h-full rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }} />
        </div>
      </div>
      <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-1 uppercase">
        <span>0</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
