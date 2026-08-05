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
  Menu,
  X,
} from "lucide-react";

const nav = [
  { label: "Dashboard", to: "/app/admin", icon: LayoutDashboard },
  { label: "Users", to: "/app/admin/users", icon: Users },
  { label: "Pollution", to: "/app/admin/pollution", icon: Wind },
  { label: "Reports", to: "/app/admin/reports", icon: FileText },
  { label: "Alerts", to: "/app/admin/alerts", icon: Bell },
  { label: "Analytics", to: "/app/admin/analytics", icon: BarChart3 },
  { label: "Settings", to: "/app/admin/settings", icon: Settings },
] as const;

export function AdminAppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={() => setMobileOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          collapsed ? "lg:w-20" : "lg:w-64"
        } fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-border bg-white transition-all duration-300 lg:static lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          {(!collapsed || mobileOpen) && <Logo />}
          {(collapsed && !mobileOpen) && <div className="mx-auto h-9 w-9 rounded-xl bg-emerald-500 shadow-glow" />}
          
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setMobileOpen(false);
              } else {
                setCollapsed(!collapsed);
              }
            }}
            className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-accent lg:flex"
          >
            <ChevronLeft className={`h-4 w-4 transition ${collapsed ? "rotate-180" : ""} hidden lg:block`} />
            <X className="h-4 w-4 lg:hidden" />
          </button>
        </div>
        
        <div className="flex-1 space-y-6 overflow-y-auto p-3">
          <div>
            {(!collapsed || mobileOpen) && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Admin Portal
              </p>
            )}
            <nav className="mt-2 space-y-1">
              {nav.map((item) => {
                const active = path === item.to || path === item.to + "/";
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-emerald-50 text-emerald-700 font-bold"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Icon className={`h-5 w-5 shrink-0 ${active ? "text-emerald-600" : ""}`} />
                    {(!collapsed || mobileOpen) && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {(!collapsed || mobileOpen) && (
          <div className="m-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 p-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <p className="text-xs font-semibold text-emerald-900 font-sans">Enterprise Tier</p>
            </div>
            <p className="mt-1 text-[11px] text-emerald-700/80">
              Monitoring active for 190+ countries
            </p>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="relative hidden max-w-md md:flex flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search datasets, models, users…"
                className="w-full rounded-xl border border-input bg-accent/50 py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>
            <div className="flex items-center gap-3 rounded-full border border-border bg-background py-1.5 pl-1.5 pr-4">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                AD
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-bold leading-tight">Admin Console</p>
                <p className="text-[10px] text-muted-foreground font-medium">Root Administrator</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
