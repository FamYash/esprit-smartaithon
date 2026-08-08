import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 max-w-full ${className}`}>
      <img
        src="/logo.png"
        alt="AtmoAI Air Intelligence"
        className="h-10 w-auto select-none object-contain sm:h-12 flex-shrink-0"
      />
      <span className="flex flex-col leading-none overflow-hidden">
        <span className="text-lg font-bold tracking-tight text-foreground sm:text-xl truncate">AtmoAI</span>
        <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:text-[10px] truncate">
          {"predict\u00A0prevent\u00A0protect"}
        </span>
      </span>
    </Link>
  );
}
