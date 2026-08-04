import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/atmo/Logo";
import { User, Mail, Lock, Globe, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/signup")({ component: SignUp });

function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/app/dashboard" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center bg-background px-6 py-12 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Start forecasting air quality in seconds — no credit card.
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <Field
              icon={<User className="h-4 w-4" />}
              label="Full Name"
              type="text"
              placeholder="Jane Doe"
            />
            <Field
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              type="email"
              placeholder="you@company.com"
            />
            <div className="grid grid-cols-2 gap-4">
              <Field
                icon={<Lock className="h-4 w-4" />}
                label="Password"
                type="password"
                placeholder="••••••••"
              />
              <Field
                icon={<Lock className="h-4 w-4" />}
                label="Confirm"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Country</label>
              <div className="relative mt-1.5">
                <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <select className="w-full appearance-none rounded-xl border border-input bg-background py-3 pl-10 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>India</option>
                  <option>United States</option>
                  <option>China</option>
                  <option>Brazil</option>
                  <option>Germany</option>
                  <option>Japan</option>
                </select>
              </div>
            </div>
            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-border accent-[color:var(--color-primary)]"
              />
              I agree to AtmoAI's{" "}
              <a className="text-primary font-semibold" href="#">
                Terms
              </a>{" "}
              and{" "}
              <a className="text-primary font-semibold" href="#">
                Privacy Policy
              </a>
              .
            </label>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl gradient-primary px-4 py-3 text-sm font-semibold text-white shadow-glow hover:opacity-95"
            >
              Create Account <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/signin" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden gradient-primary lg:block order-1 lg:order-2">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex h-full flex-col justify-center p-12 text-white">
          <h2 className="text-4xl font-bold leading-tight text-balance">
            Join the global air-quality intelligence network
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              "Forecast PM2.5 up to 30 days ahead",
              "Monitor 190+ countries in real-time",
              "Custom alerts & email notifications",
              "API access for researchers & teams",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  type,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-foreground">{label}</label>
      <div className="relative mt-1.5">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
}
