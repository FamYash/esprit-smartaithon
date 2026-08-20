import { ReactNode, useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { classifyAirQuality } from "@/lib/atmo/classification";
import { useReactiveStore } from "@/lib/atmo/storage";
import {
  LayoutDashboard,
  Activity,
  Bell,
  Globe,
  ShieldCheck,
  MessageSquare,
  User,
  BarChart3,
  ChevronLeft,
  LogOut,
  Menu,
  X,
  MapPin,
  ShieldAlert,
} from "lucide-react";

const nav = [
  { label: "Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
  { label: "Today's Pollution", to: "/app/dashboard/pollution", icon: Activity },
  { label: "Air Across India", to: "/app/dashboard/air-india", icon: Globe },
  { label: "Safe Locations", to: "/app/dashboard/safe-locations", icon: ShieldCheck },
  { label: "Alerts", to: "/app/dashboard/alerts", icon: Bell },
  { label: "Air Quality Insights", to: "/app/dashboard/analytics", icon: BarChart3 },
  { label: "Feedback", to: "/app/dashboard/feedback", icon: MessageSquare },
  { label: "My Profile", to: "/app/dashboard/profile", icon: User },
] as const;

export function UserAppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modelSummary, setModelSummary] = useState<any>({ location: "Bengaluru", pm25: 68 });
  const [alerts] = useReactiveStore<any[]>("atmoai_alerts", []);
  const [profile] = useReactiveStore<any>("atmoai_user_profile", { name: "Yash Kumavat" });
  const [selectedCity] = useReactiveStore<string>("atmoai_selected_city", "Bengaluru");
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    fetch("/model_prediction.json")
      .then((r) => r.json())
      .then((data) => {
        if (data.summary) setModelSummary(data.summary);
      })
      .catch(() => {});
  }, []);

  const alertCount = alerts.filter(
    (a: any) =>
      a.status !== "Resolved" &&
      a.status !== "Dismissed" &&
      a.status !== "Acknowledged" &&
      !a.acknowledged
  ).length;

  const activeCity = selectedCity || modelSummary.location || "Bengaluru";
  const aqClass = classifyAirQuality(modelSummary.pm25);
  const initials = (profile.name || "Yash Kumavat")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-screen bg-[var(--color-surface)] overflow-hidden font-sans">
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
          collapsed && !mobileOpen ? "w-20" : "w-60"
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          {(!collapsed || mobileOpen) && <Logo />}
          {collapsed && !mobileOpen && (
            <div className="mx-auto h-8 w-8 rounded-xl bg-primary shadow-glow" />
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

        <div className="flex-1 space-y-4 overflow-y-auto p-2.5">
          <div>
            {(!collapsed || mobileOpen) && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Citizen Portal
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
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                      active
                        ? "bg-sidebar-accent border border-sidebar-border text-sidebar-accent-foreground font-bold shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-transparent"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${active ? "text-primary" : ""}`} />
                    {(!collapsed || mobileOpen) && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom role card */}
        {(!collapsed || mobileOpen) && (
          <div className="m-2.5 rounded-xl bg-accent/60 border border-border p-3 glass shadow-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
              <p className="text-xs font-bold text-foreground truncate">{activeCity}</p>
            </div>
            <p className="mt-1 text-[11px] font-medium text-muted-foreground">
              PM2.5: {modelSummary.pm25} µg/m³ · <span className="font-semibold text-foreground">{aqClass.shortCategory}</span>
            </p>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Portal Title & Selected City */}
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-700 border border-emerald-500/20 flex items-center gap-1">
                <User className="h-3 w-3" />
                CITIZEN PORTAL
              </span>
              <span className="hidden sm:inline text-xs text-muted-foreground">·</span>
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-foreground">
                <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                {activeCity}
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${aqClass.bg} ${aqClass.text} ${aqClass.border} border`}
                >
                  PM2.5 {modelSummary.pm25} · {aqClass.shortCategory}
                </span>
              </div>
            </div>
          </div>

          {/* Right utility items */}
          <div className="flex items-center gap-2.5 ml-auto">
            {/* Quick toggle to Admin */}
            <Link
              to="/app/admin"
              className="hidden md:flex items-center gap-1.5 rounded-xl border border-border bg-background px-2.5 py-1 text-xs font-bold text-muted-foreground hover:text-foreground transition"
              title="Open Administrator Portal"
            >
              <ShieldAlert className="h-3.5 w-3.5 text-primary" />
              Admin Portal
            </Link>

            {/* Alerts bell */}
            <Link
              to="/app/dashboard/alerts"
              className="relative grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground transition"
              aria-label={`${alertCount} active alerts`}
            >
              <Bell className="h-4 w-4" />
              {alertCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {alertCount}
                </span>
              )}
            </Link>

            {/* Avatar / Identity */}
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-2.5 py-1">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-600 text-[11px] font-bold text-white shrink-0">
                {initials}
              </div>
              <div className="hidden text-left md:block">
                <p className="text-xs font-bold leading-tight text-foreground">{profile.name || "Yash Kumavat"}</p>
                <p className="text-[10px] text-emerald-700 font-semibold leading-tight">Citizen</p>
              </div>
              <Link
                to="/"
                className="text-muted-foreground hover:text-red-500 transition ml-1"
                aria-label="Sign out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 p-4 sm:p-5 lg:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
