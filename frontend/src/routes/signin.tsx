import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/atmo/Logo";
import { Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/signin")({ component: SignIn });

function SignIn() {
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
            <h2 className="text-4xl font-bold leading-tight text-balance">Breathe smarter.<br/>Forecast cleaner.</h2>
            <p className="mt-4 max-w-md text-white/90">Join thousands of environmental researchers and agencies using AtmoAI to make the invisible visible.</p>
            <div className="mt-10 rounded-3xl glass p-6 backdrop-blur-xl border border-white/20">
              <p className="text-sm italic text-white/95">"AtmoAI cut our forecasting workflow from days to minutes. Our team relies on it daily."</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-sm font-bold">DR</div>
                <div>
                  <p className="text-sm font-semibold">Dr. Rahul Mehta</p>
                  <p className="text-xs text-white/80">Senior Researcher, IIT Bombay</p>
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
          <div className="mb-8 lg:hidden"><Logo/></div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to continue forecasting air quality.</p>

          <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold transition hover:bg-accent">
            <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l3.66-2.83Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38Z"/></svg>
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
          </div>

          <form className="space-y-4">
            <Field icon={<Mail className="h-4 w-4"/>} label="Email" type="email" placeholder="you@company.com"/>
            <Field icon={<Lock className="h-4 w-4"/>} label="Password" type="password" placeholder="••••••••"/>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="h-4 w-4 rounded border-border accent-[color:var(--color-primary)]"/>
                Remember me
              </label>
              <a href="#" className="font-semibold text-primary hover:underline">Forgot password?</a>
            </div>
            <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl gradient-primary px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95">
              Sign In <ArrowRight className="h-4 w-4"/>
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-primary hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ icon, label, type, placeholder }: { icon: React.ReactNode; label: string; type: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs font-semibold text-foreground">{label}</label>
      <div className="relative mt-1.5">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        <input type={type} placeholder={placeholder} className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"/>
      </div>
    </div>
  );
}
