import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/atmo/data";
import { Settings, Shield, Server, Database, Save, Eye } from "lucide-react";

export const Route = createFileRoute("/app/admin/settings")({ component: AdminSettings });

function AdminSettings() {
  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans">
          System Settings
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground font-sans">
          Configure platform parameters, neural network thresholds, API tokens, and sync windows
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* General System Config */}
          <Card
            title="Neural Network Threshold Settings"
            subtitle="Calibrate prediction sensitivity criteria"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-foreground">
                    Forecast Window (Days)
                  </label>
                  <select className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>7 Days (Fast)</option>
                    <option>15 Days (Standard)</option>
                    <option>30 Days (Deep Analysis)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground">
                    Spatial Grid Resolution
                  </label>
                  <select className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>1 km² Grid (High accuracy)</option>
                    <option>5 km² Grid (Balanced)</option>
                    <option>10 km² Grid (Coarse)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-foreground">
                  Model Calibration Confidence Interval
                </label>
                <div className="mt-2 flex items-center gap-4">
                  <input
                    type="range"
                    min="80"
                    max="99"
                    defaultValue="95"
                    className="flex-1 accent-[color:var(--color-primary)]"
                  />
                  <span className="text-sm font-bold text-primary">95%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Database & Sync */}
          <Card
            title="Database & Sync Windows"
            subtitle="Satellite and telemetry updates frequency"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div>
                  <p className="text-sm font-semibold">Sentinel Satellite Updates</p>
                  <p className="text-xs text-muted-foreground">
                    Sync orbit logs when they cross coordinates
                  </p>
                </div>
                <select className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-bold focus:outline-none">
                  <option>Every 6 Hours</option>
                  <option>Every 12 Hours</option>
                  <option>Every 24 Hours</option>
                </select>
              </div>
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div>
                  <p className="text-sm font-semibold">Ground Sensor Push Cycle</p>
                  <p className="text-xs text-muted-foreground">Particulate feed batch writes</p>
                </div>
                <select className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-bold focus:outline-none">
                  <option>Real-time (Stream)</option>
                  <option>Batch 5 Mins</option>
                  <option>Batch 15 Mins</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-6">
          <Card title="Global API Token Keys" subtitle="Production token keys for partners">
            <div className="space-y-3">
              <div className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">
                    IIT-B RESEARCH KEY
                  </span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                    Active
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between bg-accent/50 rounded-lg p-2 font-mono text-xs text-foreground">
                  <span>atmo_live_f8a92...</span>
                  <Eye className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </div>
              </div>
              <button className="w-full rounded-xl border border-dashed border-border py-2.5 text-xs font-bold text-muted-foreground hover:border-primary hover:text-primary transition">
                + Generate Partner API Key
              </button>
            </div>
          </Card>

          <Card title="System Actions">
            <div className="space-y-2">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl gradient-primary py-2.5 text-xs font-bold text-white shadow-glow">
                <Save className="h-3.5 w-3.5" /> Save Changes
              </button>
              <button className="w-full rounded-xl border border-border py-2.5 text-xs font-bold hover:bg-accent text-foreground transition">
                System Diagnostics Run
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
