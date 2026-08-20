import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/atmo/Navbar";
import { Footer } from "@/components/atmo/Footer";
import { AQIGauge } from "@/components/atmo/Visualizations";
import { forecast24h, monthly, Card as DataCard } from "@/components/atmo/data";

import {
  AreaChart, Area, BarChart, Bar, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import {
  Wind, Activity, Map as MapIcon, BellRing, Sparkles,
  ArrowRight, Zap, Github, Linkedin, Twitter,
  ShieldCheck, Navigation2, MessageSquare, TrendingUp,
  CheckCircle2, Mail, User, ShieldAlert, ChevronDown, HelpCircle,
} from "lucide-react";
import { lazy, Suspense, useState, useEffect } from "react";

// Lazy-load the heavy WebGL Particles component
const Particles = lazy(() => import("@/components/atmo/Particles"));

// Lazy-load Leaflet map component to prevent "window is not defined" error in SSR
const DynamicMap = lazy(() =>
  import("@/components/atmo/DynamicMap").then((m) => ({ default: m.DynamicMap }))
);

// ShadCN UI
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const [modelOutput, setModelOutput] = useState<{
    summary: { location: string; pm25: number; category: string };
    predictions: any[];
    prediction_window: string;
    pm25: number;
    location: string;
    category: string;
  }>({
    summary: { location: "Bengaluru", pm25: 68, category: "Moderate" },
    predictions: [],
    prediction_window: "10-hour",
    pm25: 68,
    location: "Bengaluru",
    category: "Moderate",
  });

  const [heatmapHtml, setHeatmapHtml] = useState<string>("");

  useEffect(() => {
    fetch("/model_prediction.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.summary) {
          setModelOutput({
            summary: data.summary,
            predictions: data.predictions || [],
            prediction_window: data.prediction_window || "10-hour",
            pm25: data.summary.pm25,
            location: data.summary.location,
            category: data.summary.category,
          });
        }
      })
      .catch(() => {});

    fetch("/india_air_quality_heatmap.html")
      .then((res) => res.text())
      .then((html) => setHeatmapHtml(html))
      .catch(() => {});
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* Background WebGL animation */}
      <Suspense fallback={null}>
        <div className="fixed inset-0 pointer-events-none z-0 opacity-45">
          <Particles />
        </div>
      </Suspense>

      <Navbar />

      <main className="relative z-10 space-y-0">
        <Hero modelOutput={modelOutput} predictions={modelOutput.predictions} />
        <Forecasting />
        <Features />
        <PlatformPreview heatmapHtml={heatmapHtml} predictions={modelOutput.predictions} />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

/* ══════════════════════════════════════════════
   §1 – HERO (ABOVE THE FOLD)
══════════════════════════════════════════════ */
function Hero({ modelOutput, predictions }: { modelOutput: any; predictions: any[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { label: "Predictive Target", value: "PM2.5", color: "text-emerald-600" },
    { label: "Forecast Horizon", value: "10 Hours", color: "text-amber-600" },
    { label: "Spatial Grid", value: "Nationwide", color: "text-blue-600" },
    { label: "Update Interval", value: "Hourly", color: "text-purple-600" },
  ];

  return (
    <section className="relative pt-6 pb-12 md:pt-10 md:pb-16 border-b border-border/40 bg-gradient-to-b from-orange-50/40 via-background to-background">
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline, CTAs, Role Entry */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="rounded-full border-emerald-500/30 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 gap-1.5 shadow-sm">
                <Sparkles className="h-3 w-3 text-emerald-600" />
                AtmoAI · AI-Powered Air Quality Intelligence
              </Badge>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-foreground">
                Predict PM2.5 Pollution <br />
                <span className="shimmer-text">Before It Hits.</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                Real-time AI spatial forecasting and health risk intelligence across Indian cities for citizens and environmental authorities.
              </p>
            </div>

            {/* Role Entry Action Buttons */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-glow px-5 font-bold transition-all text-sm gap-2">
                  <Link to="/app/dashboard">
                    <User className="h-4 w-4" />
                    Continue as Citizen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11 rounded-xl border-2 border-primary/40 bg-primary/5 px-5 font-bold text-sm hover:border-primary hover:bg-primary/10 transition-all gap-2">
                  <Link to="/app/admin">
                    <ShieldAlert className="h-4 w-4 text-primary" />
                    Administrator Portal
                  </Link>
                </Button>
              </div>

              {/* Compact Role Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <Link
                  to="/app/dashboard"
                  className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-2.5 hover:bg-emerald-50 transition flex items-center gap-2.5 group"
                >
                  <div className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-600 text-white text-xs font-bold shrink-0">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-950 flex items-center gap-1">
                      Citizen Portal <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5 text-emerald-700" />
                    </p>
                    <p className="text-[10px] text-emerald-800/80 leading-tight">
                      AQI, health advisories, safe zones & alerts
                    </p>
                  </div>
                </Link>

                <Link
                  to="/app/admin"
                  className="rounded-xl border border-border/80 bg-background/80 p-2.5 hover:bg-accent/60 transition flex items-center gap-2.5 group"
                >
                  <div className="grid h-7 w-7 place-items-center rounded-lg gradient-primary text-white text-xs font-bold shrink-0">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground flex items-center gap-1">
                      Administrator Portal <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5 text-primary" />
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-tight">
                      Sensors, complaints, alerts & monitoring
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Stat ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border/40">
              {stats.map((s) => (
                <div key={s.label} className="rounded-lg border border-border/60 bg-background/70 p-2 text-left">
                  <span className={`text-sm font-black block ${s.color}`}>{s.value}</span>
                  <span className="text-[10px] text-muted-foreground leading-tight block">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual Map Preview */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl border border-border/80 bg-card p-2 shadow-lg overflow-hidden">
              <div className="h-[320px] sm:h-[380px] lg:h-[400px] w-full rounded-xl overflow-hidden">
                {mounted ? (
                  <Suspense fallback={<div className="h-full w-full bg-slate-900/5 flex items-center justify-center text-xs text-muted-foreground">Loading Map...</div>}>
                    <DynamicMap predictions={predictions} />
                  </Suspense>
                ) : (
                  <div className="h-full w-full bg-slate-900/5 flex items-center justify-center text-xs text-muted-foreground">Loading Map...</div>
                )}
              </div>

              {/* Floating Live Badge */}
              <div className="absolute top-4 left-4 z-[400] flex items-center gap-2 rounded-xl border border-border/80 bg-background/90 px-3 py-1.5 text-xs font-bold backdrop-blur-md shadow-md">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live PM2.5 Forecast Node
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   §2 – FORECASTING OBJECTIVES
══════════════════════════════════════════════ */
function Forecasting() {
  const objectives = [
    {
      icon: <Zap className="h-4 w-4" />,
      heading: "Short-Term PM2.5 Forecasting",
      text: "Forecast PM2.5 concentrations using spatial neural modeling to predict risks before exposure.",
      color: "from-orange-500/10 to-amber-500/5",
      iconBg: "gradient-primary",
    },
    {
      icon: <MapIcon className="h-4 w-4" />,
      heading: "Air-Quality Risk Assessment",
      text: "Classify high-risk industrial and urban regions using standard WHO/CPCB air quality thresholds.",
      color: "from-red-500/10 to-rose-500/5",
      iconBg: "bg-red-500",
    },
    {
      icon: <BellRing className="h-4 w-4" />,
      heading: "Actionable Preventive Guidance",
      text: "Translate spatial predictions into personalized health advisories for citizens and vulnerable groups.",
      color: "from-emerald-500/10 to-teal-500/5",
      iconBg: "bg-emerald-600",
    },
  ];

  return (
    <section id="forecasting" className="py-12 border-b border-border bg-muted/20">
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center mb-8">
          <Badge variant="outline" className="mb-2 rounded-full border-primary/30 bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase">
            Platform Mission
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Preventing Exposure with Intelligence
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
            Converting complex ML forecasts into clear, preventive action plans for individuals and authorities.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          {objectives.map(({ icon, heading, text, color, iconBg }) => (
            <Card key={heading} className={`bg-gradient-to-br ${color} border-border hover:border-primary/40 transition-all`}>
              <CardHeader className="p-4 pb-2">
                <div className={`grid h-9 w-9 place-items-center rounded-lg ${iconBg} text-white shadow-sm mb-2`}>
                  {icon}
                </div>
                <CardTitle className="text-sm sm:text-base font-bold">{heading}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <CardDescription className="text-xs leading-relaxed text-muted-foreground">{text}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   §3 – FEATURES
══════════════════════════════════════════════ */
function Features() {
  const items = [
    { icon: <Wind className="h-4 w-4" />, title: "PM2.5 Spatial Forecasting", desc: "Predict future PM2.5 levels across urban grid coordinates.", accent: "text-orange-500 bg-orange-500/10" },
    { icon: <MapIcon className="h-4 w-4" />, title: "Interactive Leaflet Heatmaps", desc: "Visualize pollution intensity and vector markers dynamically.", accent: "text-blue-500 bg-blue-500/10" },
    { icon: <ShieldCheck className="h-4 w-4" />, title: "Safe Air Zone Identification", desc: "Rank cities and parks with lowest particulate levels.", accent: "text-emerald-500 bg-emerald-500/10" },
    { icon: <BellRing className="h-4 w-4" />, title: "Real-Time Emergency Alerts", desc: "Notify citizens when local PM2.5 crosses safe thresholds.", accent: "text-red-500 bg-red-500/10" },
    { icon: <TrendingUp className="h-4 w-4" />, title: "Historical Trends & Analytics", desc: "Compare historical trajectories and municipal statistics.", accent: "text-purple-500 bg-purple-500/10" },
    { icon: <MessageSquare className="h-4 w-4" />, title: "Public Grievance System", desc: "Report industrial emissions directly to municipal bureaus.", accent: "text-teal-500 bg-teal-500/10" },
  ];

  return (
    <section id="features" className="py-12 border-b border-border bg-background">
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center mb-8">
          <Badge variant="outline" className="mb-2 rounded-full border-primary/30 bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase">
            Capabilities
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Complete Air Quality Ecosystem
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
            Designed for seamless accessibility across mobile, tablet, and desktop devices.
          </p>
        </div>

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon, title, desc, accent }) => (
            <Card key={title} className="border-border hover:border-primary/40 transition-all p-4">
              <div className="flex items-start gap-3">
                <div className={`grid h-9 w-9 place-items-center rounded-lg ${accent} shrink-0`}>
                  {icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   §4 – PLATFORM PREVIEW
══════════════════════════════════════════════ */
function PlatformPreview({ predictions }: { heatmapHtml: string; predictions: any[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="preview" className="py-12 border-b border-border bg-muted/20">
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center mb-8">
          <Badge variant="outline" className="mb-2 rounded-full border-primary/30 bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase">
            Live Preview
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Inside AtmoAI Intelligence
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
            Real-time prediction snapshots and spatial visualizations.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <Card className="border-border bg-card p-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Selected Location AQI</h3>
            <div className="flex flex-col items-center">
              <AQIGauge value={68} />
              <p className="mt-2 text-xs font-bold text-foreground">Bengaluru · PM2.5: 68 µg/m³</p>
            </div>
          </Card>

          <Card className="border-border bg-card p-4 lg:col-span-2">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">10-Hour PM2.5 Forecast Trajectory</h3>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecast24h.slice(0, 8)}>
                  <defs>
                    <linearGradient id="previewGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="time" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 11 }} />
                  <Area type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={2} fill="url(#previewGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   §5 – FAQ
══════════════════════════════════════════════ */
function FAQ() {
  const faqs = [
    { q: "How is PM2.5 predicted?", a: "AtmoAI models spatial and temporal air quality observations to forecast upcoming PM2.5 concentration levels." },
    { q: "What is the difference between Citizen and Admin portals?", a: "Citizens view local AQI, health advisories, safe locations, and submit complaints. Admins manage monitoring nodes, alerts, complaints, and platform parameters." },
    { q: "Are map coordinates geographically accurate?", a: "Yes. All markers and heatmaps use exact latitude, longitude, and PM2.5 values from the authoritative prediction dataset." },
    { q: "Is AtmoAI responsive on mobile devices?", a: "Yes. AtmoAI is engineered for fluid responsiveness from 375px mobile screens to 1440px desktop displays." },
  ];

  return (
    <section className="py-12 border-b border-border bg-background">
      <div className="w-full mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-2 rounded-full border-primary/30 bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase">
            FAQ
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-border p-4 bg-card">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                {faq.q}
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   §6 – CTA
══════════════════════════════════════════════ */
function CTA() {
  return (
    <section className="py-12 bg-gradient-to-br from-emerald-900 to-slate-900 text-white text-center">
      <div className="w-full mx-auto max-w-4xl px-4 sm:px-6 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          Ready to forecast cleaner air?
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl mx-auto">
          Access local PM2.5 risk advisories as a citizen or manage municipal monitoring nodes as an administrator.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button asChild size="lg" className="h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs gap-2">
            <Link to="/app/dashboard">
              <User className="h-4 w-4" />
              Citizen Portal
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-11 rounded-xl border-white/30 bg-white/10 text-white hover:bg-white/20 font-bold text-xs gap-2">
            <Link to="/app/admin">
              <ShieldAlert className="h-4 w-4" />
              Admin Portal
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
