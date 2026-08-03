import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home",             href: "#home" },
  { label: "Forecasting",      href: "#forecasting" },
  { label: "Features",         href: "#features" },
  { label: "Platform Preview", href: "#preview" },
  { label: "Contact",          href: "#contact" },
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
        <nav className="hidden items-center gap-0.5 lg:flex">
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

        {/* CTA buttons */}
        <div className="flex items-center gap-2">
          <Link
            to="/signin"
            className="hidden rounded-xl px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent sm:inline-flex"
          >
            Sign In
          </Link>
          <Link
            to="/app/dashboard"
            className="inline-flex items-center gap-1.5 rounded-xl gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:opacity-95 active:scale-95"
          >
            Get Started
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
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
        <nav className="border-t border-border bg-background/95 backdrop-blur-md px-4 py-3 space-y-0.5 lg:hidden">
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
          <Link
            to="/signin"
            className="block rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
          >
            Sign In
          </Link>
        </nav>
      )}
    </header>
  );
}
