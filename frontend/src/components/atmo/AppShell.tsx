import { ReactNode, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";
import {
  LayoutDashboard, LineChart, Map, BarChart3, Bell, FileText, Settings,
  Search, ChevronLeft, ShieldCheck,
} from "lucide-react";

const nav = [
  { label: "Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
  { label: "Forecast", to: "/app/forecast", icon: LineChart },
  { label: "AQI Map", to: "/app/map", icon: Map },
  { label: "Analytics", to: "/app/analytics", icon: BarChart3 },
  { label: "Alerts", to: "/app/alerts", icon: Bell },
  { label: "Reports", to: "/app/reports", icon: FileText },
  { label: "Admin", to: "/app/admin", icon: ShieldCheck },
  { label: "Settings", to: "/app/settings", icon: Settings },
] as const;

export function AppShell({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-[var(--color-surface)]">
      <aside className={`${collapsed ? "w-20" : "w-64"} sticky top-0 flex h-screen flex-col border-r border-border bg-background transition-all duration-300`}>
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          {!collapsed && <Logo />}
          {collapsed && <div className="mx-auto h-9 w-9 rounded-xl gradient-primary shadow-glow" />}
          <button onClick={() => setCollapsed(!collapsed)} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-accent">
            <ChevronLeft className={`h-4 w-4 transition ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => {
            const active = path.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "gradient-primary text-white shadow-glow"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        {!collapsed && (
          <div className="m-3 rounded-2xl glass-orange p-4">
            <p className="text-xs font-semibold text-foreground">Upgrade to Pro</p>
            <p className="mt-1 text-xs text-muted-foreground">Unlock unlimited forecasts & API access.</p>
            <button className="mt-3 w-full rounded-lg gradient-primary py-2 text-xs font-semibold text-white">Upgrade</button>
          </div>
        )}
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border glass px-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search country, city, region…"
              className="w-full rounded-xl border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
            </button>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-1.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-xs font-bold text-white">CD</div>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold leading-tight">Chrisha Dabhi</p>
                <p className="text-[10px] text-muted-foreground">Researcher</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
            {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
