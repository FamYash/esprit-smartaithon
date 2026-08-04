import { ReactNode, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";
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
  Search,
  LogOut,
  ArrowUpRight,
} from "lucide-react";

const nav = [
  { label: "Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
  { label: "Analytics", to: "/app/dashboard/analytics", icon: BarChart3 },
  { label: "Today's Pollution", to: "/app/dashboard/pollution", icon: Activity },
  { label: "Alerts System", to: "/app/dashboard/alerts", icon: Bell },
  { label: "Air Across India", to: "/app/dashboard/air-india", icon: Globe },
  { label: "Safe Locations", to: "/app/dashboard/safe-locations", icon: ShieldCheck },
  { label: "Complaint & Feedback", to: "/app/dashboard/feedback", icon: MessageSquare },
  { label: "My Profile", to: "/app/dashboard/profile", icon: User },
] as const;

export function UserAppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const notifications = [
    {
      id: 1,
      text: "High PM2.5 Alert: Noida AQI has crossed 195",
      time: "10 mins ago",
      type: "critical",
    },
    { id: 2, text: "New Safe Location recommendation in Pune", time: "2 hours ago", type: "info" },
    {
      id: 3,
      text: "Your feedback ticket #1024 status updated to 'Resolved'",
      time: "Yesterday",
      type: "success",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--color-surface)]">
      {/* Sidebar */}
      <aside
        className={`${collapsed ? "w-20" : "w-64"} sticky top-0 flex h-screen flex-col border-r border-border bg-background transition-all duration-300 z-40`}
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
                User Console
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
          <div className="m-3 rounded-2xl border border-border/80 bg-accent/40 p-4">
            <p className="text-xs font-bold text-foreground">Need Enterprise Tools?</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Access neural net parameters, sensors telemetry, and audit logs.
            </p>
            <Link
              to="/app/admin"
              className="mt-3 flex items-center justify-center gap-1 rounded-xl bg-background border border-border py-1.5 text-xs font-semibold text-primary hover:border-primary transition"
            >
              Go to Admin Console <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border glass px-6">
          {/* Left search */}
          <div className="relative flex-1 max-w-sm hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search cities, pollutants, safety logs…"
              className="w-full rounded-xl border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Right utility items */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Local AQI Status Badge */}
            <div className="flex items-center gap-2 rounded-xl bg-orange-50 border border-orange-200 px-3.5 py-1.5 text-xs font-bold text-orange-700">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              AQI 168 · Unhealthy
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-background p-4 shadow-xl z-50">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    Notifications
                  </p>
                  <div className="space-y-2">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="border-b border-border/40 pb-2 last:border-0 last:pb-0"
                      >
                        <p className="text-xs font-semibold text-foreground">{n.text}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Avatar / Dropdown */}
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-1.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-xs font-bold text-white">
                JD
              </div>
              <div className="hidden text-left md:block">
                <p className="text-xs font-semibold leading-tight">John Doe</p>
                <p className="text-[10px] text-muted-foreground">Premium User</p>
              </div>
              <Link to="/" className="text-muted-foreground hover:text-red-500 transition ml-1.5">
                <LogOut className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
