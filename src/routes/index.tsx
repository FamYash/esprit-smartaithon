import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/atmo/Navbar";
import { Footer } from "@/components/atmo/Footer";
import { WorldHeatmap, AQIGauge } from "@/components/atmo/Visualizations";
import { forecast24h, monthly, StatCard, Card } from "@/components/atmo/data";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import {
  Wind, Activity, Map as MapIcon, TrendingUp, BellRing, Sparkles,
  ArrowRight, Globe2, Target, Users, Zap, Github, Linkedin, Twitter,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Preview />
      <About />
      <Team />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-secondary/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-20 lg:grid-cols-2 lg:gap-8 lg:pt-28">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by Deep Learning · LSTM + Transformer
          </div>
          <h1 className="mt-6 text-5xl font-bold tracking-tight text-foreground text-balance lg:text-6xl">
            Predict Future Air Quality with{" "}
            <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
              AI-Powered PM2.5
            </span>{" "}
            Forecasting
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Monitor pollution trends, forecast PM2.5 concentrations, and make data-driven environmental decisions across 190+ countries using machine learning.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/app/dashboard" className="group inline-flex items-center gap-2 rounded-2xl gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95">
              Explore Dashboard
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link to="/app/forecast" className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary">
              View Forecasts
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {["bg-orange-400","bg-amber-400","bg-emerald-400","bg-rose-400"].map((c,i)=>(
                <div key={i} className={`h-8 w-8 rounded-full border-2 border-background ${c}`} />
              ))}
            </div>
            <p>Trusted by <span className="font-semibold text-foreground">10,000+</span> researchers & agencies</p>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-3xl border border-border bg-card p-4 shadow-soft">
            <WorldHeatmap height={420} interactive />
          </div>
          {/* Floating cards */}
          <div className="absolute -left-6 top-12 hidden rounded-2xl glass p-4 shadow-soft md:block">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700"><Activity className="h-5 w-5"/></div>
              <div>
                <p className="text-xs text-muted-foreground">Forecast Accuracy</p>
                <p className="text-lg font-bold">94.7%</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl glass p-4 shadow-soft md:block">
            <p className="text-xs text-muted-foreground">Next 24h prediction</p>
            <p className="text-2xl font-bold text-primary">PM2.5 · 68 μg/m³</p>
            <div className="mt-1 inline-flex rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-700">Sensitive Groups</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { label: "Countries Monitored", value: "190+", icon: <Globe2 className="h-5 w-5"/> },
    { label: "Forecast Accuracy", value: "94.7%", icon: <Target className="h-5 w-5"/> },
    { label: "Active Users", value: "12.4K", icon: <Users className="h-5 w-5"/> },
    { label: "Daily Predictions", value: "2.8M", icon: <Zap className="h-5 w-5"/> },
  ];
  return (
    <section className="border-y border-border bg-[var(--color-surface)] py-14">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-4">
        {items.map((s) => (
          <div key={s.label} className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-primary text-white shadow-glow">{s.icon}</div>
            <div>
              <p className="text-3xl font-bold tracking-tight text-foreground">{s.value}</p>
              <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Wind, title: "PM2.5 Forecasting", desc: "ML models predict concentrations up to 30 days ahead with confidence intervals." },
    { icon: Activity, title: "Air Quality Monitoring", desc: "Real-time AQI, PM2.5, PM10, NO₂, SO₂ and O₃ tracked across 190 countries." },
    { icon: MapIcon, title: "Interactive AQI Maps", desc: "Global heatmaps with country drill-down, pollution hotspots and live markers." },
    { icon: TrendingUp, title: "Historical Trends", desc: "Decade-long historical analytics with monthly and seasonal comparisons." },
    { icon: BellRing, title: "Smart Alerts", desc: "Customizable thresholds with email and push notifications for sensitive groups." },
    { icon: Sparkles, title: "AI Insights", desc: "Explainable predictions powered by weather, seasonality and meteorological features." },
  ];
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Features</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground text-balance">Everything you need to understand the air around you</h2>
          <p className="mt-4 text-muted-foreground">A modern intelligence layer for environmental data — built on top of EPA, OpenAQ and satellite observations.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition group-hover:bg-primary/15" />
              <div className="relative grid h-12 w-12 place-items-center rounded-2xl gradient-primary text-white shadow-glow">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="relative mt-5 text-lg font-semibold text-foreground">{title}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Preview() {
  return (
    <section id="forecasting" className="bg-[var(--color-surface)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Platform Preview</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground">A control room for planetary air quality</h2>
        </div>
        <div className="mt-12 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card title="Current AQI" subtitle="New Delhi, India" className="flex flex-col items-center">
              <AQIGauge value={168} />
            </Card>
            <Card title="24-Hour PM2.5 Forecast" subtitle="μg/m³ · LSTM model" className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={forecast24h}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F97316" stopOpacity={0.4}/>
                      <stop offset="100%" stopColor="#F97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false}/>
                  <XAxis dataKey="time" stroke="oklch(0.5 0.02 250)" fontSize={11} interval={3}/>
                  <YAxis stroke="oklch(0.5 0.02 250)" fontSize={11}/>
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid oklch(0.93 0.01 250)' }}/>
                  <Area type="monotone" dataKey="predicted" stroke="#F97316" strokeWidth={2.5} fill="url(#g1)"/>
                  <Line type="monotone" dataKey="pm25" stroke="#FDBA74" strokeWidth={2} dot={false}/>
                </AreaChart>
              </ResponsiveContainer>
            </Card>
            <Card title="Global Pollution Heatmap" className="lg:col-span-2">
              <WorldHeatmap height={300} interactive/>
            </Card>
            <Card title="Monthly Comparison" subtitle="2025 vs 2024">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false}/>
                  <XAxis dataKey="month" stroke="oklch(0.5 0.02 250)" fontSize={10}/>
                  <YAxis stroke="oklch(0.5 0.02 250)" fontSize={10}/>
                  <Tooltip contentStyle={{ borderRadius: 12 }}/>
                  <Bar dataKey="last" fill="#FDBA74" radius={[6,6,0,0]}/>
                  <Bar dataKey="pm25" fill="#F97316" radius={[6,6,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">About AtmoAI</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground text-balance">Built for a generation that breathes cleaner air</h2>
          <p className="mt-5 text-muted-foreground">
            Air pollution causes 7 million premature deaths globally each year. AtmoAI exists to make air-quality intelligence accessible to governments, researchers and citizens — so we can act before the air becomes unbreathable.
          </p>
          <p className="mt-4 text-muted-foreground">
            Our forecasting engine combines historical PM2.5 data, meteorological signals, satellite imagery and country-level emissions inventories through an ensemble of LSTM and Transformer models.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[{n:"7M", l:"deaths/yr from pollution"},{n:"90%", l:"of humans breathe polluted air"},{n:"30d", l:"forecast horizon"}].map(s=>(
              <div key={s.l} className="rounded-2xl border border-border bg-card p-4">
                <p className="text-2xl font-bold text-primary">{s.n}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative rounded-3xl border border-border bg-gradient-to-br from-orange-50 to-amber-50 p-8 shadow-soft">
          <WorldHeatmap height={360}/>
        </div>
      </div>
    </section>
  );
}

function Team() {
  const team = [
    { name: "Chrisha Dabhi", role: "ML Engineer", init: "CD" },
    { name: "Antra Gajjar", role: "Full-Stack Developer", init: "AG" },
    { name: "Pragati Varu", role: "Data Scientist", init: "PV" },
  ];
  return (
    <section className="bg-[var(--color-surface)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Team</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground">The minds behind AtmoAI</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {team.map(t=>(
            <div key={t.name} className="group rounded-3xl border border-border bg-card p-8 text-center shadow-card transition hover:-translate-y-1 hover:shadow-soft">
              <div className="mx-auto grid h-24 w-24 place-items-center rounded-full gradient-primary text-2xl font-bold text-white shadow-glow">{t.init}</div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{t.name}</h3>
              <p className="text-sm text-primary">{t.role}</p>
              <div className="mt-4 flex justify-center gap-2">
                {[Github, Linkedin, Twitter].map((I,i)=>(
                  <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition hover:border-primary hover:text-primary">
                    <I className="h-4 w-4"/>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 text-center shadow-glow">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <h2 className="relative text-4xl font-bold tracking-tight text-white text-balance">Ready to forecast the air your country breathes?</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/90">Start with our free tier — 1,000 forecasts per month, no credit card required.</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/signup" className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-primary shadow-lg hover:bg-white/90">Create free account</Link>
            <Link to="/app/dashboard" className="rounded-2xl border border-white/30 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">Open dashboard</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
