import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useState } from "react";
import { Menu, X, User, ShieldCheck } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Forecasting", href: "#forecasting" },
  { label: "Platform Preview", href: "#preview" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => scrollTo(e, l.href)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Role CTA buttons */}
        <div className="flex items-center gap-2">
          <Link
            to="/app/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100"
          >
            <User className="h-3.5 w-3.5" />
            Citizen Portal
          </Link>
          <Link
            to="/app/admin"
            className="inline-flex items-center gap-1.5 rounded-xl gradient-primary px-3.5 py-1.5 text-xs font-bold text-white shadow-glow transition hover:opacity-95 active:scale-95"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Admin Portal
          </Link>

          {/* Mobile toggle */}
          <button
            className="ml-1 grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition hover:border-primary hover:text-primary lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav className="border-t border-border bg-background/95 backdrop-blur-md px-4 py-3 space-y-1 lg:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => scrollTo(e, l.href)}
              className="block rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2 border-t border-border/60 space-y-1.5">
            <Link
              to="/app/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-800"
            >
              <User className="h-4 w-4" />
              Citizen Portal
            </Link>
            <Link
              to="/app/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl gradient-primary px-4 py-2.5 text-sm font-bold text-white"
            >
              <ShieldCheck className="h-4 w-4" />
              Admin Portal
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
