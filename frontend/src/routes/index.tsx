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
  ArrowRight, Zap, Github, Linkedin, Twitter,
  ShieldCheck, Navigation2, MessageSquare,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: Landing });

/* ─────────────────────────────────────────────
   Scroll order  (mirrors navbar exactly):
   1. #home          Hero
   2. #forecasting   Core Objectives
   3. #features      Features (6 cards)
   4. #preview       Platform Preview
   5. #contact       Team + Feedback Form
───────────────────────────────────────────── */
function Landing() {
  return (
    <div className="bg-background font-sans antialiased">
      <Navbar />
      <Hero />
      <Forecasting />
      <Features />
      <PlatformPreview />
      <Contact />
      <Footer />
    </div>
  );
}

/* ══════════════════════════════════════════════
   §1 – HOME / HERO
   Full viewport, split layout
══════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: "calc(100dvh - 3.5rem)" }}
    >
      {/* Dot-grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.4 0.02 250) 1px,transparent 1px),linear-gradient(90deg,oklch(0.4 0.02 250) 1px,transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      {/* Ambient glows */}
      <div className="absolute -top-24 right-0 h-72 w-72 md:h-[440px] md:w-[440px] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-0 h-56 w-56 md:h-[340px] md:w-[340px] rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        {/* Copy */}
        <div className="flex flex-col gap-5 order-2 lg:order-1">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-primary">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
            ✨ Powered by Deep Learning · LSTM + Transformer
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold tracking-tight text-foreground leading-[1.12]">
            Predict Future Air Quality with{" "}
            <span className="text-orange-500">AI-Powered PM2.5 Forecasting</span>
          </h1>

          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-lg">
            Over{" "}
            <strong className="text-foreground font-semibold">1.67 million deaths</strong>{" "}
            in India are attributed to Air Pollution annually, causing an economic loss of approximately{" "}
            <strong className="text-foreground font-semibold">1.36% of India's GDP</strong>.
            AtmoAI leverages scientific machine learning to track, analyze, and forecast hazardous PM2.5 concentrations before they threaten public health.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              to="/app/dashboard"
              className="group inline-flex items-center gap-2 rounded-xl gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:opacity-95 active:scale-95"
            >
              Explore Dashboard
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/app/dashboard/pollution"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary active:scale-95"
            >
              View Forecasts
            </Link>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
            <div className="flex -space-x-2">
              {["bg-orange-400", "bg-amber-400", "bg-emerald-400", "bg-rose-400"].map((c, i) => (
                <div key={i} className={`h-7 w-7 rounded-full border-2 border-background ${c}`} />
              ))}
            </div>
            <p>Trusted by <span className="font-semibold text-foreground">10,000+</span> researchers &amp; agencies</p>
          </div>
        </div>

        {/* Map dashboard */}
        <div className="relative order-1 lg:order-2">
          <div className="rounded-2xl border border-border bg-card p-3 shadow-soft">
            <IndiaHeatmap height={300} interactive />
          </div>
          <div className="absolute -left-3 top-6 hidden md:block rounded-xl glass p-3 shadow-soft">
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
          <div className="absolute -bottom-4 -right-2 hidden md:block rounded-xl glass p-3 shadow-soft">
            <p className="text-[10px] text-muted-foreground">Next 10-hour prediction</p>
            <p className="text-base font-bold text-primary">PM2.5 · 68 μg/m³</p>
            <div className="mt-1 inline-flex rounded-full bg-orange-100 px-2 py-0.5 text-[9px] font-bold text-orange-700">Sensitive Groups</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   §2 – FORECASTING / CORE OBJECTIVES
══════════════════════════════════════════════ */
function Forecasting() {
  const bullets = [
    {
      icon: <Zap className="h-5 w-5" />,
      heading: "10-Hour Forecast Horizon",
      text: "Predicting dynamic PM2.5 distribution patterns using historical meteorological and pollution datasets fused through LSTM + Transformer architectures.",
    },
    {
      icon: <MapIcon className="h-5 w-5" />,
      heading: "Hotspot Tracking",
      text: "Identifying exactly where severe pollution zones will emerge across the Indian map, enabling precise location-level early intervention and routing.",
    },
    {
      icon: <BellRing className="h-5 w-5" />,
      heading: "Early Warnings",
      text: "Providing data-driven insights to actively support public-health interventions, government policy responses, and community safety awareness programmes.",
    },
  ];

  return (
    <section
      id="forecasting"
      className="flex items-center border-t border-border bg-[var(--color-surface)]"
      style={{ minHeight: "100dvh" }}
    >
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">Core Objectives</p>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Forecasting PM2.5 Across India
          </h2>
          <blockquote className="mt-4 text-sm sm:text-base text-muted-foreground italic border-l-2 border-primary/30 pl-4 text-left max-w-xl mx-auto">
            "To design scientific machine learning models that can accurately forecast short-term PM2.5 concentration fields over India."
          </blockquote>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-3">
          {bullets.map(({ icon, heading, text }) => (
            <div
              key={heading}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-white shadow-glow flex-shrink-0">
                {icon}
              </div>
              <h3 className="text-base font-semibold text-foreground">{heading}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground flex-1">{text}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { v: "10h", l: "Forecast Horizon" },
            { v: "94.7%", l: "Model Accuracy" },
            { v: "12+", l: "Indian Cities" },
            { v: "1.67M", l: "Lives at Risk / Year" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-border bg-card px-5 py-4 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-primary">{s.v}</p>
              <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground">{s.l}</p>
            </div>
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
    {
      icon: <Wind className="h-5 w-5" />,
      title: "PM2.5 Forecasting",
      desc: "ML models predict PM2.5 concentration fields up to 10 hours ahead using historical meteorological and pollutant datasets across Indian regions.",
    },
    {
      icon: <MapIcon className="h-5 w-5" />,
      title: "Interactive Pollution Maps",
      desc: "Live, responsive heatmaps showcasing localised pollution spreads across Indian cities, overlaid on an accurate India physical map.",
    },
    {
      icon: <BellRing className="h-5 w-5" />,
      title: "Emerging Hotspot Alerts",
      desc: "Real-time identification and concise descriptions of rapidly deteriorating local air quality zones before they reach hazardous thresholds.",
    },
    {
      icon: <Navigation2 className="h-5 w-5" />,
      title: "Nearest Safe Zone",
      desc: "Smart geographical routing recommendations that guide users toward the closest clean-air locations based on live pollution data.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Health Risk Assessment",
      desc: "Personalised impact alerts and tailored safety guidance based on sensitive group vulnerabilities — children, elderly, and respiratory patients.",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Civics & Trend Analytics",
      desc: "An integrated feedback and pollution-complaint system combined with deep historical trend analysis tools for civic reporting.",
    },
  ];

  return (
    <section
      id="features"
      className="flex items-center border-t border-border"
      style={{ minHeight: "100dvh" }}
    >
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">Features</p>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Everything you need to understand the air around you
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            A modern intelligence layer for environmental data — built for India's unique climate and pollution patterns.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-primary/5 blur-xl transition group-hover:bg-primary/10 pointer-events-none" />
              <div className="relative grid h-10 w-10 place-items-center rounded-xl gradient-primary text-white shadow-glow flex-shrink-0">
                {icon}
              </div>
              <h3 className="relative mt-4 text-sm font-semibold text-foreground">{title}</h3>
              <p className="relative mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
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
      className="flex items-center border-t border-border bg-[var(--color-surface)]"
      style={{ minHeight: "100dvh" }}
    >
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="mx-auto max-w-2xl text-center mb-8">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">Platform Preview</p>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            A control room for India's air quality
          </h2>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <Card title="Current AQI" subtitle="New Delhi, India" className="flex flex-col items-center">
              <AQIGauge value={168} />
            </Card>

            <Card title="10-Hour PM2.5 Forecast" subtitle="μg/m³ · LSTM model" className="lg:col-span-2">
              <ResponsiveContainer width="100%" height={180}>
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
            </Card>

            <Card title="India AQI Heatmap" className="lg:col-span-2">
              <IndiaHeatmap height={220} interactive />
            </Card>

            <Card title="Monthly Comparison" subtitle="2025 vs 2024">
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.93 0.01 250)" vertical={false} />
                  <XAxis dataKey="month" stroke="oklch(0.5 0.02 250)" fontSize={9} />
                  <YAxis stroke="oklch(0.5 0.02 250)" fontSize={9} />
                  <Tooltip contentStyle={{ borderRadius: 10, fontSize: 11 }} />
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
   §5 – CONTACT  (Team + Feedback Form)
══════════════════════════════════════════════ */
function Contact() {
  const team = [
    { name: "Dabhi Chrisha Manish", role: "Team Leader",  photo: "/chrisha.JPG", init: "DC" },
    { name: "Gajjar Antra",         role: "Team Member",  photo: "/antra.jpg",   init: "GA" },
    { name: "Varu Pragati",          role: "Team Member",  photo: "/pragati.jpg", init: "VP" },
  ];

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section
      id="contact"
      className="flex items-start border-t border-border"
      style={{ minHeight: "100dvh" }}
    >
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 py-10">

        {/* ── Team ── */}
        <div className="text-center mb-8">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">Our Team</p>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            The minds behind AtmoAI
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A dedicated group of researchers and engineers building the future of air-quality intelligence for India.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 max-w-4xl mx-auto mb-12">
          {team.map((t) => (
            <div
              key={t.name}
              className="group flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0">
                <img
                  src={t.photo}
                  alt={t.name}
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.style.display = "none";
                    const fb = img.nextElementSibling as HTMLElement | null;
                    if (fb) fb.style.display = "flex";
                  }}
                  className="h-full w-full rounded-full object-cover object-top ring-4 ring-primary/15 shadow-md"
                />
                <div
                  className="hidden h-full w-full rounded-full gradient-primary items-center justify-center text-xl font-bold text-white shadow-glow ring-4 ring-primary/15"
                  aria-hidden="true"
                >
                  {t.init}
                </div>
              </div>
              <h3 className="mt-4 text-sm sm:text-base font-semibold text-foreground leading-tight">{t.name}</h3>
              <p className="mt-1 text-xs sm:text-sm font-medium text-primary">{t.role}</p>
              <div className="mt-4 flex justify-center gap-2">
                {[Github, Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground transition hover:border-primary hover:text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Feedback Form ── */}
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-6">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary">Get Involved</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Submit Feedback or Report Pollution
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              Help us improve forecasting accuracy or report severe localised pollution incidents directly to our team.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <p className="text-base font-semibold text-foreground">Report received — thank you!</p>
                <p className="text-sm text-muted-foreground">Our team will review your submission shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="f-name" className="text-xs font-medium text-foreground">Full Name</label>
                    <input
                      id="f-name" type="text" required placeholder="Chrisha Dabhi"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="f-email" className="text-xs font-medium text-foreground">Email Address</label>
                    <input
                      id="f-email" type="email" required placeholder="you@example.com"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="f-msg" className="text-xs font-medium text-foreground">Message / Incident Description</label>
                  <textarea
                    id="f-msg" required rows={4} placeholder="Describe the pollution incident or your feedback..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
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

      </div>
    </section>
  );
}
