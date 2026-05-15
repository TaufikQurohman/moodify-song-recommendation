import { cn } from "@/lib/utils";

export function Waveform({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-10 items-center gap-1.5", className)} aria-hidden>
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          className="h-8 w-1 rounded-full bg-primary/60 animate-waveform"
          style={{
            animationDelay: `${index * 70}ms`,
            opacity: 0.35 + (index % 5) * 0.11
          }}
        />
      ))}
    </div>
  );
}
