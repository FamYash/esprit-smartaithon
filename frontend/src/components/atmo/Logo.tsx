import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/logo.png"
        alt="AtmoAI Air Intelligence"
        className="h-14 w-auto select-none object-contain sm:h-16"
      />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-foreground sm:text-xl">AtmoAI</span>
        <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:text-[10px] whitespace-nowrap">
          {"predict\u00A0prevent\u00A0protect"}
        </span>
      </span>
    </Link>
  );
}
