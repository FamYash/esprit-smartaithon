import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/atmo/Navbar";
import { Footer } from "@/components/atmo/Footer";
import { IndiaHeatmap, AQIGauge } from "@/components/atmo/Visualizations";
import { forecast24h, monthly, Card as DataCard } from "@/components/atmo/data";
import {
  AreaChart, Area, BarChart, Bar, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import {
  Wind, Activity, Map as MapIcon, BellRing, Sparkles,
  ArrowRight, Zap, Github, Linkedin, Twitter,
  ShieldCheck, Navigation2, MessageSquare, TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

// ShadCN UI
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  return (
    <TooltipProvider>
      <div className="bg-background font-sans antialiased">
        <Navbar />
        <Hero />
        <Forecasting />
        <Features />
        <PlatformPreview />
        <Contact />
        <Footer />
        <Toaster position="bottom-right" richColors />
      </div>
    </TooltipProvider>
  );
}

/* ══════════════════════════════════════════════
   §1 – HERO
══════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: "calc(100dvh - 3.5rem)" }}
    >
      {/* Animated blob glows */}
      <div className="animate-blob absolute -top-40 -right-20 h-[500px] w-[500px] rounded-full bg-orange-300/20 blur-3xl pointer-events-none" />
      <div className="animate-blob animation-delay-blob absolute -bottom-40 -left-20 h-[400px] w-[400px] rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.4 0.02 250) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* ── Copy ── */}
        <div className="flex flex-col gap-5 order-2 lg:order-1">
          {/* Animated badge */}
          <div className="animate-fade-up animate-pulse-badge">
            <Badge
              variant="outline"
              className="w-fit gap-1.5 rounded-full border-orange-200 bg-orange-50 px-3 py-1.5 text-[11px] font-semibold text-orange-600 shadow-sm"
            >
              <Sparkles className="h-3 w-3" />
              Powered by Deep Learning · LSTM + Transformer
            </Badge>
          </div>

          {/* Headline with shimmer accent */}
          <div className="animate-fade-up animation-delay-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold tracking-tight text-foreground leading-[1.12]">
              Predict Future Air Quality with{" "}
              <span className="shimmer-text">AI-Powered PM2.5 Forecasting</span>
            </h1>
          </div>

          <p className="animate-fade-up animation-delay-2 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-lg">
            Over{" "}
            <strong className="text-foreground font-semibold">1.67 million deaths</strong>{" "}
            in India are attributed to Air Pollution annually, causing an economic loss of approximately{" "}
            <strong className="text-foreground font-semibold">1.36% of India's GDP</strong>.
            AtmoAI leverages scientific machine learning to track, analyze, and forecast hazardous
            PM2.5 concentrations before they threaten public health.
          </p>

          {/* CTA buttons */}
          <div className="animate-fade-up animation-delay-3 flex flex-wrap gap-3 pt-1">
            <Button
              asChild
              size="lg"
              className="rounded-xl gradient-primary text-white shadow-glow hover:opacity-90 transition-all active:scale-95 gap-2"
            >
              <Link to="/app/dashboard">
                Explore Dashboard
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border-border hover:border-primary hover:text-primary transition-all active:scale-95"
            >
              <Link to="/app/dashboard/pollution">View Forecasts</Link>
            </Button>
          </div>

          {/* Trust row */}
          <div className="animate-fade-up animation-delay-4 flex flex-wrap items-center gap-4 pt-2">
            <div className="flex -space-x-2">
              {["bg-orange-400", "bg-amber-400", "bg-emerald-400", "bg-rose-400"].map((c, i) => (
                <div key={i} className={`h-7 w-7 rounded-full border-2 border-background ${c} shadow-sm`} />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              Trusted by <strong className="text-foreground">10,000+</strong> researchers &amp; agencies
            </span>
            <Separator orientation="vertical" className="h-4 hidden sm:block" />
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Open-source &amp; peer-reviewed</span>
            </div>
          </div>
        </div>

        {/* ── Floating map card ── */}
        <div className="relative animate-float order-1 lg:order-2">
          <div className="glow-border rounded-2xl border border-border bg-card p-3 shadow-soft">
            <IndiaHeatmap height={300} interactive />
          </div>

          {/* Accuracy pill */}
          <div className="absolute -left-4 top-8 hidden md:block rounded-xl glass p-3 shadow-soft animate-fade-up animation-delay-2">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                <Activity className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Forecast Accuracy</p>
                <p className="text-sm font-bold text-foreground">94.7%</p>
              </div>
            </div>
          </div>

          {/* PM2.5 pill */}
          <div className="absolute -bottom-4 -right-3 hidden md:block rounded-xl glass p-3 shadow-soft animate-fade-up animation-delay-3">
            <p className="text-[10px] text-muted-foreground">Next 10-hour prediction</p>
            <p className="text-base font-bold text-primary">PM2.5 · 68 μg/m³</p>
            <Badge className="mt-1 rounded-full bg-orange-100 text-orange-700 text-[9px] font-bold hover:bg-orange-100">
              Sensitive Groups
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   §2 – FORECASTING
══════════════════════════════════════════════ */
function Forecasting() {
  const objectives = [
    {
      icon: <Zap className="h-5 w-5" />,
      heading: "10-Hour Forecast Horizon",
      text: "Predicting dynamic PM2.5 distribution patterns using historical meteorological and pollution datasets fused through LSTM + Transformer architectures.",
      color: "from-orange-500/10 to-amber-500/5",
      iconBg: "gradient-primary",
    },
    {
      icon: <MapIcon className="h-5 w-5" />,
      heading: "Hotspot Tracking",
      text: "Identifying exactly where severe pollution zones will emerge across the Indian map, enabling precise location-level early intervention and routing.",
      color: "from-red-500/10 to-rose-500/5",
      iconBg: "bg-red-500",
    },
    {
      icon: <BellRing className="h-5 w-5" />,
      heading: "Early Warnings",
      text: "Providing data-driven insights to actively support public-health interventions, government policy responses, and community safety programmes.",
      color: "from-teal-500/10 to-emerald-500/5",
      iconBg: "bg-teal-600",
    },
  ];

  const stats = [
    { v: "10h",   l: "Forecast Horizon" },
    { v: "94.7%", l: "Model Accuracy" },
    { v: "12+",   l: "Indian Cities" },
    { v: "1.67M", l: "Lives at Risk / Yr" },
  ];

  return (
    <section
      id="forecasting"
      className="flex items-center border-t border-border bg-gradient-to-b from-orange-50/50 to-background"
      style={{ minHeight: "100dvh" }}
    >
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-10">
          <Badge variant="outline" className="mb-3 rounded-full border-primary/30 bg-primary/5 text-primary text-[11px] font-semibold tracking-widest uppercase">
            Core Objectives
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Forecasting PM2.5 Across India
          </h2>
          <blockquote className="mt-4 text-sm sm:text-base text-muted-foreground italic border-l-2 border-primary/40 pl-4 text-left mx-auto max-w-xl rounded-r-lg bg-orange-50/50 py-3 pr-3">
            "To design scientific machine learning models that can accurately forecast
            short-term PM2.5 concentration fields over India."
          </blockquote>
        </div>

        {/* Objective cards */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-3 mb-8">
          {objectives.map(({ icon, heading, text, color, iconBg }, idx) => (
            <Card key={heading} className={`card-hover border-border bg-gradient-to-br ${color} overflow-hidden animate-fade-up animation-delay-${idx + 1}`}>
              <CardHeader className="pb-3">
                <div className={`grid h-11 w-11 place-items-center rounded-xl ${iconBg} text-white shadow-glow mb-3`}>
                  {icon}
                </div>
                <CardTitle className="text-base">{heading}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs sm:text-sm leading-relaxed">{text}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Card key={s.l} className={`card-hover text-center border-border animate-fade-up animation-delay-${i + 4}`}>
              <CardContent className="pt-5 pb-5">
                <p className="text-2xl sm:text-3xl font-bold text-primary">{s.v}</p>
                <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground">{s.l}</p>
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
    { icon: <Wind />,         title: "PM2.5 Forecasting",        desc: "ML models predict PM2.5 concentration fields up to 10 hours ahead using historical meteorological and pollutant datasets across Indian regions.", accent: "text-orange-500 bg-orange-500/10" },
    { icon: <MapIcon />,       title: "Interactive Pollution Maps", desc: "Live, responsive heatmaps showcasing localised pollution spreads across Indian cities, overlaid on an accurate India physical map.",        accent: "text-blue-500 bg-blue-500/10" },
    { icon: <BellRing />,      title: "Emerging Hotspot Alerts",   desc: "Real-time identification and concise descriptions of rapidly deteriorating local air quality zones before they reach hazardous thresholds.",    accent: "text-red-500 bg-red-500/10" },
    { icon: <Navigation2 />,   title: "Nearest Safe Zone",         desc: "Smart geographical routing recommendations that guide users toward the closest clean-air locations based on live pollution data.",               accent: "text-teal-500 bg-teal-500/10" },
    { icon: <ShieldCheck />,   title: "Health Risk Assessment",    desc: "Personalised impact alerts and tailored safety guidance based on sensitive group vulnerabilities — children, elderly, and respiratory patients.", accent: "text-emerald-500 bg-emerald-500/10" },
    { icon: <MessageSquare />, title: "Civics & Trend Analytics",  desc: "An integrated feedback and pollution-complaint system combined with deep historical trend analysis tools for civic reporting.",               accent: "text-purple-500 bg-purple-500/10" },
  ];

  return (
    <section
      id="features"
      className="flex items-center border-t border-border"
      style={{ minHeight: "100dvh" }}
    >
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-10">
          <Badge variant="outline" className="mb-3 rounded-full border-primary/30 bg-primary/5 text-primary text-[11px] font-semibold tracking-widest uppercase">
            Features
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Everything you need to understand{" "}
            <span className="text-primary">the air around you</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            A modern intelligence layer for environmental data — built for India's unique climate and pollution patterns.
          </p>
        </div>

        {/* 3×2 grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon, title, desc, accent }, idx) => (
            <TooltipProvider key={title}>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Card className={`card-hover group cursor-default border-border relative overflow-hidden animate-fade-up animation-delay-${idx + 1}`}>
                    {/* Hover shimmer overlay */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <CardHeader className="pb-2">
                      <div className={`grid h-10 w-10 place-items-center rounded-xl ${accent} mb-3 transition-transform duration-300 group-hover:scale-110`}>
                        {icon}
                      </div>
                      <CardTitle className="text-sm sm:text-base">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs sm:text-sm leading-relaxed">{desc}</CardDescription>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs max-w-[220px]">
                  {desc}
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   §4 – PLATFORM PREVIEW
══════════════════════════════════════════════ */
function PlatformPreview() {
  return (
    <section
      id="preview"
      className="flex items-center border-t border-border bg-gradient-to-b from-background to-orange-50/30"
      style={{ minHeight: "100dvh" }}
    >
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="mx-auto max-w-2xl text-center mb-8">
          <Badge variant="outline" className="mb-3 rounded-full border-primary/30 bg-primary/5 text-primary text-[11px] font-semibold tracking-widest uppercase">
            Platform Preview
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            A control room for India's air quality
          </h2>
        </div>

        <Card className="border-border shadow-soft p-2 sm:p-4">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            {/* AQI Gauge */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Current AQI</CardTitle>
                <CardDescription className="text-xs">New Delhi, India</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <AQIGauge value={168} />
              </CardContent>
            </Card>

            {/* Forecast Area Chart */}
            <Card className="border-border bg-card lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">10-Hour PM2.5 Forecast</CardTitle>
                <CardDescription className="text-xs">μg/m³ · LSTM model</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={170}>
                  <AreaChart data={forecast24h.slice(0, 10)}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F97316" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false} />
                    <XAxis dataKey="time" stroke="oklch(0.5 0.02 250)" fontSize={10} />
                    <YAxis stroke="oklch(0.5 0.02 250)" fontSize={10} />
                    <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid oklch(0.93 0.01 250)", fontSize: 11 }} />
                    <Area type="monotone" dataKey="predicted" stroke="#F97316" strokeWidth={2} fill="url(#g1)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* India Heatmap */}
            <Card className="border-border bg-card lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">India AQI Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <IndiaHeatmap height={200} interactive />
              </CardContent>
            </Card>

            {/* Monthly Bar */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm">Monthly Comparison</CardTitle>
                    <CardDescription className="text-xs">2025 vs 2024</CardDescription>
                  </div>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={170}>
                  <BarChart data={monthly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false} />
                    <XAxis dataKey="month" stroke="oklch(0.5 0.02 250)" fontSize={9} />
                    <YAxis stroke="oklch(0.5 0.02 250)" fontSize={9} />
                    <Tooltip contentStyle={{ borderRadius: 10, fontSize: 11 }} />
                    <Bar dataKey="last" fill="#FDBA74" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pm25" fill="#F97316" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </Card>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   §5 – CONTACT  (Team + Form)
══════════════════════════════════════════════ */
function Contact() {
  const team = [
    { name: "Dabhi Chrisha Manish", role: "Team Leader",  photo: "/chrisha.JPG", init: "DC", color: "from-orange-400 to-amber-500" },
    { name: "Gajjar Antra",         role: "Team Member",  photo: "/antra.jpg",   init: "GA", color: "from-rose-400 to-pink-500" },
    { name: "Varu Pragati",          role: "Team Member",  photo: "/pragati.jpg", init: "VP", color: "from-teal-400 to-emerald-500" },
  ];

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Report received!", {
      description: "Our team will review your submission shortly.",
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="flex items-start border-t border-border"
      style={{ minHeight: "100dvh" }}
    >
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 py-12">

        {/* ── Team ── */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-3 rounded-full border-primary/30 bg-primary/5 text-primary text-[11px] font-semibold tracking-widest uppercase">
            Our Team
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            The minds behind AtmoAI
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A dedicated group of researchers and engineers building the future of air-quality intelligence for India.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 max-w-4xl mx-auto mb-12">
          {team.map((t, idx) => (
            <Card key={t.name} className={`card-hover border-border text-center animate-fade-up animation-delay-${idx + 1}`}>
              <CardContent className="pt-8 pb-6 flex flex-col items-center gap-3">
                <Avatar className={`h-24 w-24 ring-4 bg-gradient-to-br ${t.color} ring-primary/15 shadow-md`}>
                  <AvatarImage src={t.photo} alt={t.name} className="object-cover object-top" />
                  <AvatarFallback className={`text-xl font-bold text-white bg-gradient-to-br ${t.color}`}>
                    {t.init}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight">{t.name}</h3>
                  <p className="mt-0.5 text-xs sm:text-sm font-medium text-primary">{t.role}</p>
                </div>
                <div className="flex justify-center gap-2 pt-1">
                  {[
                    { Icon: Github,   label: "GitHub" },
                    { Icon: Linkedin, label: "LinkedIn" },
                    { Icon: Twitter,  label: "Twitter" },
                  ].map(({ Icon, label }) => (
                    <UITooltip key={label}>
                      <TooltipTrigger asChild>
                        <Button asChild variant="outline" size="icon" className="h-8 w-8 rounded-lg border-border hover:border-primary hover:text-primary">
                          <a href="#" aria-label={label}>
                            <Icon className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">{label}</TooltipContent>
                    </UITooltip>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-8 max-w-4xl mx-auto" />

        {/* ── Form ── */}
        <div className="mx-auto max-w-xl">
          <div className="text-center mb-6">
            <Badge variant="outline" className="mb-3 rounded-full border-primary/30 bg-primary/5 text-primary text-[11px] font-semibold tracking-widest uppercase">
              Get Involved
            </Badge>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Submit Feedback or Report Pollution
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              Help us improve forecasting accuracy or report severe localised pollution incidents directly to our team.
            </p>
          </div>

          <Card className="border-border shadow-soft">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="f-name" className="text-xs font-medium">Full Name</Label>
                    <Input
                      id="f-name" type="text" required placeholder="Chrisha Dabhi"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="rounded-xl border-border focus-visible:ring-primary/30 text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="f-email" className="text-xs font-medium">Email Address</Label>
                    <Input
                      id="f-email" type="email" required placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="rounded-xl border-border focus-visible:ring-primary/30 text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="f-msg" className="text-xs font-medium">Message / Incident Description</Label>
                  <Textarea
                    id="f-msg" required rows={4}
                    placeholder="Describe the pollution incident or your feedback..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="resize-none rounded-xl border-border focus-visible:ring-primary/30 text-sm"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-xl gradient-primary text-white shadow-glow hover:opacity-90 transition-all active:scale-95"
                >
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}
