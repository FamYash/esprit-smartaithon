import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/atmo/Navbar";
import { Footer } from "@/components/atmo/Footer";
import { IndiaHeatmap, AQIGauge } from "@/components/atmo/Visualizations";
import { forecast24h, monthly, Card } from "@/components/atmo/data";
import {
  AreaChart, Area, BarChart, Bar, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import {
  Wind, Activity, Map as MapIcon, BellRing, Sparkles,
  ArrowRight, Globe2, Target, Zap, Github, Linkedin, Twitter,
  ShieldCheck, Navigation2, MessageSquare,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: Landing });

/* ─────────────────────────────────────────────
   PAGE SHELL – scroll order:
   1. Hero
   2. Context & Problem Space
   3. Core Objectives
   4. Features (6 cards)
   5. Platform Preview
   6. Feedback Form
   7. Team
   8. Footer
───────────────────────────────────────────── */
function Landing() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <Hero />
      <ContextGrid />
      <Objectives />
      <Features />
      <PlatformPreview />
      <FeedbackForm />
      <Team />
      <Footer />
    </div>
  );
}

/* ══════════════════════════════════════════════
   SECTION 1 – HERO
══════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.4 0.02 250) 1px, transparent 1px), linear-gradient(90deg, oklch(0.4 0.02 250) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      {/* Ambient glows */}
      <div className="absolute -top-32 right-0 h-80 w-80 sm:h-[500px] sm:w-[500px] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-0 h-64 w-64 sm:h-[400px] sm:w-[400px] rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 pb-20 pt-14 sm:pt-20 lg:grid-cols-2 lg:gap-14 lg:pt-28 xl:pt-32">

        {/* ── Left: copy ── */}
        <div className="flex flex-col justify-center order-2 lg:order-1">
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-primary">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
            ✨ Powered by Deep Learning · LSTM + Transformer
          </div>

          {/* Headline */}
          <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-foreground text-balance leading-[1.12]">
            Predict Future Air Quality with{" "}
            <span className="text-orange-500 font-bold">
              AI-Powered PM2.5 Forecasting
            </span>
          </h1>

          {/* Sub-heading */}
          <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">
            Over{" "}
            <strong className="text-foreground font-semibold">1.67 million deaths</strong>{" "}
            in India are attributed to Air Pollution annually, causing an economic
            loss of approximately{" "}
            <strong className="text-foreground font-semibold">1.36% of India's GDP</strong>.
            AtmoAI leverages scientific machine learning to track, analyze, and
            forecast hazardous PM2.5 concentrations before they threaten public health.
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/app/dashboard"
              className="group inline-flex items-center gap-2 rounded-xl gradient-primary px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95 active:scale-95"
            >
              Explore Dashboard
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/app/dashboard/pollution"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary active:scale-95"
            >
              View Forecasts
            </Link>
          </div>

          {/* Trust bar */}
          <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {["bg-orange-400", "bg-amber-400", "bg-emerald-400", "bg-rose-400"].map((c, i) => (
                <div key={i} className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2 border-background ${c}`} />
              ))}
            </div>
            <p>
              Trusted by{" "}
              <span className="font-semibold text-foreground">10,000+</span>{" "}
              researchers &amp; agencies
            </p>
          </div>
        </div>

        {/* ── Right: floating dashboard card ── */}
        <div className="relative flex items-center order-1 lg:order-2">
          <div className="relative w-full rounded-2xl sm:rounded-3xl border border-border bg-card p-3 sm:p-4 shadow-soft">
            <IndiaHeatmap height={300} interactive />
          </div>

          {/* Floating pill – accuracy (hidden on smallest screens) */}
          <div className="absolute -left-3 sm:-left-6 top-8 hidden sm:block rounded-xl sm:rounded-2xl glass p-3 sm:p-4 shadow-soft">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-lg sm:rounded-xl bg-emerald-100 text-emerald-700">
                <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground">Forecast Accuracy</p>
                <p className="text-base sm:text-lg font-bold text-foreground">94.7%</p>
              </div>
            </div>
          </div>

          {/* Floating pill – prediction */}
          <div className="absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-4 hidden sm:block rounded-xl sm:rounded-2xl glass p-3 sm:p-4 shadow-soft">
            <p className="text-[10px] sm:text-[11px] text-muted-foreground">Next 10-hour prediction</p>
            <p className="text-lg sm:text-xl font-bold text-primary">PM2.5 · 68 μg/m³</p>
            <div className="mt-1 inline-flex rounded-full bg-orange-100 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-orange-700">
              Sensitive Groups
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 2 – CONTEXT & PROBLEM SPACE
══════════════════════════════════════════════ */
function ContextGrid() {
  const cards = [
    {
      icon: <Globe2 className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Rising Safety Deviations",
      text: "Many Indian cities frequently cross government-standardised AQI safety limits due to rapidly fluctuating and severe climatic conditions that are becoming harder to predict.",
    },
    {
      icon: <Target className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Proactive Supervision",
      text: "Direct emissions cause microscopic Particulate Matter (PM2.5) pollution. Accurate forecasting allows for timely precautions before conditions become critical for vulnerable populations.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Deep Health Risks",
      text: "These harmful pollutants penetrate deep into the lungs and bloodstream. Our systems account for weather dynamics like wind speed, temperature, and humidity for precision predictions.",
    },
  ];

  return (
    <section className="border-y border-border bg-[var(--color-surface)] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">The Problem</p>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground text-balance">
            The Environmental Crisis &amp; Real-Life Impact
          </h2>
        </div>

        <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon, title, text }) => (
            <div
              key={title}
              className="group flex h-full flex-col rounded-xl sm:rounded-2xl border border-border bg-card p-6 sm:p-7 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl sm:rounded-2xl bg-primary/8 text-primary flex-shrink-0">
                {icon}
              </div>
              <h3 className="mt-4 sm:mt-5 text-base sm:text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2.5 flex-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 3 – CORE OBJECTIVES
══════════════════════════════════════════════ */
function Objectives() {
  const bullets = [
    {
      icon: <Zap className="h-4 w-4 sm:h-5 sm:w-5" />,
      heading: "10-Hour Forecast Horizon",
      text: "Predicting dynamic PM2.5 distribution patterns using historical meteorological and pollution datasets fused through LSTM + Transformer architectures.",
    },
    {
      icon: <MapIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
      heading: "Hotspot Tracking",
      text: "Identifying exactly where severe pollution zones will emerge across the Indian map, enabling precise location-level early intervention and routing.",
    },
    {
      icon: <BellRing className="h-4 w-4 sm:h-5 sm:w-5" />,
      heading: "Early Warnings",
      text: "Providing data-driven insights to actively support public-health interventions, government policy responses, and community safety awareness programmes.",
    },
  ];

  return (
    <section id="forecasting" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">Core Objectives</p>
          <blockquote className="mt-4 text-lg sm:text-xl lg:text-2xl font-semibold leading-snug text-foreground text-balance italic">
            "To design scientific machine learning models that can accurately forecast
            short-term PM2.5 concentration fields over India."
          </blockquote>
        </div>

        <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {bullets.map(({ icon, heading, text }) => (
            <div
              key={heading}
              className="flex flex-col gap-4 rounded-xl sm:rounded-2xl border border-border bg-card p-6 sm:p-7 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-lg sm:rounded-xl gradient-primary text-white shadow-glow flex-shrink-0">
                {icon}
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-foreground">{heading}</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 4 – FEATURES (3×2 grid)
══════════════════════════════════════════════ */
function Features() {
  const items = [
    {
      icon: <Wind className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "PM2.5 Forecasting",
      desc: "ML models predict PM2.5 concentration fields up to 10 hours ahead using historical meteorological and pollutant datasets across Indian regions.",
    },
    {
      icon: <MapIcon className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Interactive Pollution Maps",
      desc: "Live, responsive heatmaps showcasing localised pollution spreads across Indian cities, overlaid on an accurate India physical map.",
    },
    {
      icon: <BellRing className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Emerging Hotspot Alerts",
      desc: "Real-time identification and concise descriptions of rapidly deteriorating local air quality zones before they reach hazardous thresholds.",
    },
    {
      icon: <Navigation2 className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Nearest Safe Zone",
      desc: "Smart geographical routing recommendations that guide users toward the closest clean-air locations based on live pollution data.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Health Risk Assessment",
      desc: "Personalised impact alerts and tailored safety guidance based on sensitive group vulnerabilities — children, elderly, and respiratory patients.",
    },
    {
      icon: <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Civics & Trend Analytics",
      desc: "An integrated feedback and pollution-complaint system combined with deep historical trend analysis tools for civic reporting.",
    },
  ];

  return (
    <section id="features" className="bg-[var(--color-surface)] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">Features</p>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground text-balance">
            Everything you need to understand the air around you
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
            A modern intelligence layer for environmental data — built for India's unique climate and pollution patterns.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card p-6 sm:p-7 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition group-hover:bg-primary/12 pointer-events-none" />
              <div className="relative grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl sm:rounded-2xl gradient-primary text-white shadow-glow flex-shrink-0">
                {icon}
              </div>
              <h3 className="relative mt-4 sm:mt-5 text-sm sm:text-base font-semibold text-foreground">{title}</h3>
              <p className="relative mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 5 – PLATFORM PREVIEW
══════════════════════════════════════════════ */
function PlatformPreview() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">Platform Preview</p>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            A control room for India's air quality
          </h2>
        </div>

        <div className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl border border-border bg-card p-4 sm:p-6 shadow-soft">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
            {/* AQI Gauge */}
            <Card title="Current AQI" subtitle="New Delhi, India" className="flex flex-col items-center">
              <AQIGauge value={168} />
            </Card>

            {/* Forecast chart */}
            <Card title="10-Hour PM2.5 Forecast" subtitle="μg/m³ · LSTM model" className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={200}>
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
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.93 0.01 250)", fontSize: 12 }} />
                  <Area type="monotone" dataKey="predicted" stroke="#F97316" strokeWidth={2.5} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* India heatmap */}
            <Card title="India AQI Heatmap" className="lg:col-span-2">
              <IndiaHeatmap height={260} interactive />
            </Card>

            {/* Monthly bar chart */}
            <Card title="Monthly Comparison" subtitle="2025 vs 2024">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false} />
                  <XAxis dataKey="month" stroke="oklch(0.5 0.02 250)" fontSize={9} />
                  <YAxis stroke="oklch(0.5 0.02 250)" fontSize={9} />
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                  <Bar dataKey="last" fill="#FDBA74" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pm25" fill="#F97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 6 – FEEDBACK FORM
══════════════════════════════════════════════ */
function FeedbackForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="bg-[var(--color-surface)] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">Get Involved</p>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Submit Feedback or Report Pollution
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
            Help us improve forecasting accuracy or report severe localised pollution incidents directly to our team.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 rounded-2xl sm:rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-8 sm:py-10 text-center">
              <div className="grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <ShieldCheck className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <p className="text-base sm:text-lg font-semibold text-foreground">Report received — thank you!</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Our team will review your submission shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs sm:text-sm font-medium text-foreground">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Chrisha Dabhi"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs sm:text-sm font-medium text-foreground">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs sm:text-sm font-medium text-foreground">Message / Incident Description</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Describe the pollution incident or your feedback in detail..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl gradient-primary py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95 active:scale-95"
              >
                Submit Report
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 7 – TEAM
══════════════════════════════════════════════ */
function Team() {
  const team = [
    {
      name: "Dabhi Chrisha Manish",
      role: "Team Leader",
      photo: "/chrisha.JPG",
      init: "DC",
    },
    {
      name: "Gajjar Antra",
      role: "Team Member",
      photo: "/antra.jpg",
      init: "GA",
    },
    {
      name: "Varu Pragati",
      role: "Team Member",
      photo: "/pragati.jpg",
      init: "VP",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">Our Team</p>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            The minds behind AtmoAI
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
            A dedicated group of researchers and engineers building the future of
            air-quality intelligence for India.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-3 justify-center max-w-4xl mx-auto">
          {team.map((t) => (
            <div
              key={t.name}
              className="group flex flex-col items-center rounded-2xl sm:rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10 text-center transition hover:-translate-y-1 hover:shadow-soft"
            >
              {/* Photo with gradient ring fallback */}
              <div className="relative mx-auto h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0">
                <img
                  src={t.photo}
                  alt={t.name}
                  onError={(e) => {
                    // fallback to initials if image fails
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                  className="h-full w-full rounded-full object-cover object-top ring-4 ring-primary/15 shadow-md"
                />
                {/* Initials fallback (hidden by default) */}
                <div
                  className="hidden h-full w-full rounded-full gradient-primary items-center justify-center text-2xl font-bold text-white shadow-glow ring-4 ring-primary/15"
                  aria-hidden="true"
                >
                  {t.init}
                </div>
              </div>

              <h3 className="mt-5 text-base sm:text-lg font-semibold text-foreground leading-tight">{t.name}</h3>
              <p className="mt-1 text-xs sm:text-sm font-medium text-primary">{t.role}</p>

              {/* Social icons */}
              <div className="mt-5 flex justify-center gap-2">
                {[Github, Linkedin, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-lg sm:rounded-xl border border-border text-muted-foreground transition hover:border-primary hover:text-primary"
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
