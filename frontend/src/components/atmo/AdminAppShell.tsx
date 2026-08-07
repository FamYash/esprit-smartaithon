import { ReactNode, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";
import {
  LayoutDashboard,
  BarChart3,
  Wind,
  Bell,
  FileText,
  Users,
  Settings,
  ChevronLeft,
  Search,
  ShieldCheck,
} from "lucide-react";

const nav = [
  { label: "Dashboard Overview", to: "/app/admin", icon: LayoutDashboard },
  { label: "Analytics", to: "/app/admin/analytics", icon: BarChart3 },
  { label: "Pollution Monitoring", to: "/app/admin/pollution", icon: Wind },
  { label: "Alerts", to: "/app/admin/alerts", icon: Bell },
  { label: "Reports", to: "/app/admin/reports", icon: FileText },
  { label: "Users", to: "/app/admin/users", icon: Users },
  { label: "Settings", to: "/app/admin/settings", icon: Settings },
] as const;

export function AdminAppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-[var(--color-surface)]">
      {/* Sidebar */}
      <aside
        className={`${collapsed ? "w-20" : "w-64"} sticky top-0 flex h-screen flex-col border-r border-border bg-background transition-all duration-300`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          {!collapsed && <Logo />}
          {collapsed && <div className="mx-auto h-9 w-9 rounded-xl gradient-primary shadow-glow" />}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-accent"
          >
            <ChevronLeft className={`h-4 w-4 transition ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
        <div className="flex-1 space-y-6 overflow-y-auto p-3">
          <div>
            {!collapsed && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Admin Portal
              </p>
            )}
            <nav className="mt-2 space-y-1">
              {nav.map((item) => {
                const active = path === item.to;
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
          </div>
        </div>

        {!collapsed && (
          <div className="m-3 rounded-2xl glass-orange p-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <p className="text-xs font-semibold text-foreground font-sans">Enterprise Tier</p>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Monitoring active for 190+ countries
            </p>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border glass px-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search datasets, models, users…"
              className="w-full rounded-xl border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
            </button>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-1.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-xs font-bold text-white">
                AD
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold leading-tight">Admin Console</p>
                <p className="text-[10px] text-muted-foreground">Root Administrator</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
