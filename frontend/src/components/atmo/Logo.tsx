import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 max-w-full ${className}`}>
      <img
        src="/logo.png"
        alt="AtmoAI Air Intelligence"
        className="h-10 w-auto select-none object-contain sm:h-12 flex-shrink-0"
      />
      <div className="flex min-w-0 flex-col leading-none overflow-hidden">
        <span className="text-lg font-bold tracking-tight text-foreground truncate sm:text-xl">AtmoAI</span>
        <span className="text-[6px] font-medium uppercase tracking-[0.10em] text-muted-foreground sm:text-[7px] truncate">
          {"predict\u00A0prevent\u00A0protect"}
        </span>
      </div>
    </Link>
  );
}
