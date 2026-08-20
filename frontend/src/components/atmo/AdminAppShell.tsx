import { ReactNode, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useReactiveStore } from "@/lib/atmo/storage";
import {
  LayoutDashboard,
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
  Map,
  MessageSquareWarning,
  MapPin,
  Database,
  LogOut,
  User,
} from "lucide-react";

const nav = [
  { label: "Dashboard", to: "/app/admin", icon: LayoutDashboard },
  { label: "Air Quality Monitoring", to: "/app/admin/monitoring", icon: Wind },
  { label: "India AQI Explorer", to: "/app/admin/explorer", icon: Map },
  { label: "Alert Management", to: "/app/admin/alerts", icon: Bell },
  { label: "Complaints Management", to: "/app/admin/complaints", icon: MessageSquareWarning },
  { label: "Safe Locations Management", to: "/app/admin/safe-locations", icon: MapPin },
  { label: "User Management", to: "/app/admin/users", icon: Users },
  { label: "Data Center", to: "/app/admin/data-center", icon: Database },
  { label: "Reports & Exports", to: "/app/admin/reports", icon: FileText },
  { label: "Settings", to: "/app/admin/settings", icon: Settings },
] as const;

export function AdminAppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [alerts] = useReactiveStore<any[]>("atmoai_alerts", []);
  const [complaints] = useReactiveStore<any[]>("atmoai_complaints", []);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const activeAlertCount = alerts.filter(
    (a: any) => a.status !== "Resolved" && a.status !== "Dismissed"
  ).length;

  return (
    <div className="flex h-screen bg-transparent overflow-hidden">
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
        } fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-sidebar-border bg-[var(--sidebar)] backdrop-blur-md transition-all duration-300 lg:static lg:translate-x-0 ${
          collapsed && !mobileOpen ? "w-20" : "w-64"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          {(!collapsed || mobileOpen) && <Logo />}
          {collapsed && !mobileOpen && (
            <div className="mx-auto h-9 w-9 rounded-xl bg-primary shadow-glow" />
          )}

          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setMobileOpen(false);
              } else {
                setCollapsed(!collapsed);
              }
            }}
            className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-accent"
          >
            <ChevronLeft
              className={`h-4 w-4 transition ${collapsed ? "rotate-180" : ""} hidden lg:block`}
            />
            <X className="h-4 w-4 lg:hidden" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-3">
          <div>
            {(!collapsed || mobileOpen) && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Administrator Portal
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
                        ? "bg-sidebar-accent border border-sidebar-border text-sidebar-accent-foreground font-bold shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-transparent"
                    }`}
                  >
                    <Icon className={`h-5 w-5 shrink-0 ${active ? "text-primary" : ""}`} />
                    {(!collapsed || mobileOpen) && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {(!collapsed || mobileOpen) && (
          <div className="m-3 rounded-2xl bg-accent border border-border p-4 glass shadow-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <p className="text-xs font-semibold text-foreground font-sans">Administrator</p>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Municipal & National Oversight Authority
            </p>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-[rgba(255,255,255,0.72)] backdrop-blur-[18px] px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(true)}
              aria-label="Toggle navigation"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary border border-primary/20 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                ADMINISTRATOR PORTAL
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Switch to citizen view quick link */}
            <Link
              to="/app/dashboard"
              className="hidden sm:flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition"
              title="Open Citizen View"
            >
              <User className="h-3.5 w-3.5" />
              Citizen View
            </Link>

            {/* Alert bell */}
            <Link
              to="/app/admin/alerts"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground transition"
              aria-label={`${activeAlertCount} active alerts`}
            >
              <Bell className="h-4 w-4" />
              {activeAlertCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {activeAlertCount}
                </span>
              )}
            </Link>

            {/* Avatar / Identity */}
            <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-border bg-background px-2 sm:px-3 py-1.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-xs font-bold text-white shrink-0">
                AD
              </div>
              <div className="hidden text-left md:block">
                <p className="text-xs font-semibold leading-tight">Admin Console</p>
                <p className="text-[10px] text-muted-foreground">Officer / Bureau</p>
              </div>
              <Link
                to="/"
                className="text-muted-foreground hover:text-red-500 transition ml-1"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
