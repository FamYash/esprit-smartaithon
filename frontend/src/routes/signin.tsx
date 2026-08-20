import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/atmo/Logo";
import { Mail, Lock, ArrowRight, User, ShieldCheck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/signin")({ component: SignIn });

function SignIn() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"citizen" | "admin">("citizen");
  const [email, setEmail] = useState("citizen@atmoai.com");
  const [password, setPassword] = useState("••••••••");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "admin") {
      navigate({ to: "/app/admin" });
    } else {
      navigate({ to: "/app/dashboard" });
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Illustration side */}
      <div className="relative hidden overflow-hidden gradient-primary lg:block">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Logo className="[&_span]:text-white [&_span:last-child]:text-white/70" />
          <div>
            <h2 className="text-4xl font-bold leading-tight text-balance">
              Breathe smarter.
              <br />
              Forecast cleaner.
            </h2>
            <p className="mt-4 max-w-md text-white/90">
              Join environmental researchers, municipal bureaus, and citizens using AtmoAI to make the
              invisible visible.
            </p>
            <div className="mt-10 rounded-3xl glass p-6 backdrop-blur-xl border border-white/20">
              <p className="text-sm italic text-white/95">
                "AtmoAI cut our forecasting workflow from days to minutes. Our team relies on it
                daily."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-sm font-bold">
                  DR
                </div>
                <div>
                  <p className="text-sm font-semibold">Dr. Rahul Mehta</p>
                  <p className="text-xs text-white/80">Senior Researcher, Environmental Analytics</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-white/70">© 2026 AtmoAI · All rights reserved</p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Welcome to AtmoAI</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Select your portal to access predictions, maps, and environmental intelligence.
          </p>

          {/* Role selector tab */}
          <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-muted/50 p-1.5 border border-border">
            <button
              type="button"
              onClick={() => {
                setRole("citizen");
                setEmail("citizen@atmoai.com");
              }}
              className={`flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition ${
                role === "citizen"
                  ? "bg-background text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="h-4 w-4 text-emerald-600" />
              Citizen Portal
            </button>
            <button
              type="button"
              onClick={() => {
                setRole("admin");
                setEmail("admin@atmoai.gov.in");
              }}
              className={`flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition ${
                role === "admin"
                  ? "bg-background text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ShieldCheck className="h-4 w-4 text-primary" />
              Admin Portal
            </button>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs font-semibold text-foreground">Email Account</label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground">Password</label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl gradient-primary px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95 mt-6"
            >
              Enter {role === "admin" ? "Administrator Portal" : "Citizen Portal"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Quick Direct Links */}
          <div className="mt-8 pt-6 border-t border-border space-y-2">
            <p className="text-[11px] font-bold text-muted-foreground uppercase text-center">
              Direct Quick Entry (No Password Required)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/app/dashboard"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 text-center transition"
              >
                <User className="h-3.5 w-3.5" /> Citizen Portal
              </Link>
              <Link
                to="/app/admin"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-bold text-primary hover:bg-primary/20 text-center transition"
              >
                <ShieldCheck className="h-3.5 w-3.5" /> Admin Portal
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/" className="font-semibold text-primary hover:underline">
              ← Back to AtmoAI Overview
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
