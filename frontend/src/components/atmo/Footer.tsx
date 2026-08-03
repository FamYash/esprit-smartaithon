import { Logo } from "./Logo";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer id="contact-footer" className="border-t border-border bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              AI-powered PM2.5 forecasting and air quality intelligence for India — built on LSTM + Transformer architectures for a healthier future.
            </p>
            <div className="mt-6 flex gap-3">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-muted-foreground transition hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Product</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href="#features" onClick={(e) => handleAnchor(e, "#features")} className="transition hover:text-primary">
                  Features
                </a>
              </li>
              <li>
                <a href="#forecasting" onClick={(e) => handleAnchor(e, "#forecasting")} className="transition hover:text-primary">
                  Forecasting
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-primary">API</a>
              </li>
              <li>
                <a href="#" className="transition hover:text-primary">Privacy Policy</a>
              </li>
              <li>
                <a href="https://github.com/Antra1312/atmoai-insights" target="_blank" rel="noopener noreferrer" className="transition hover:text-primary">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href="#about" onClick={(e) => handleAnchor(e, "#about")} className="transition hover:text-primary">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleAnchor(e, "#contact")} className="transition hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 AtmoAI. All rights reserved.</p>
          <p>Built for cleaner skies across India 🌿</p>
        </div>
      </div>
    </footer>
  );
}
