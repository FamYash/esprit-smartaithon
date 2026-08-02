import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-9 w-9">
        <div className="absolute inset-0 rounded-xl gradient-primary shadow-glow" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a7 7 0 0 0-7 7c0 3 2 5 2 7h10c0-2 2-4 2-7a7 7 0 0 0-7-7Z" />
            <path d="M9 18h6" />
            <path d="M10 22h4" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-base font-bold tracking-tight text-foreground">AtmoAI</span>
        <span className="text-[10px] font-medium text-muted-foreground">Air Intelligence</span>
      </div>
    </Link>
  );
}
