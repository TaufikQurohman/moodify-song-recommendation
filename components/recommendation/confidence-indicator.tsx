import { formatPercent } from "@/lib/utils";

export function ConfidenceIndicator({ value }: { value: number }) {
  return (
    <div className="border border-foreground/10 bg-[#172033] p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-foreground">Recommendation confidence</p>
          <p className="mt-1 text-xs text-muted-foreground">Based on strongest lyric similarity</p>
        </div>
        <span className="text-2xl font-semibold text-primary">{formatPercent(value)}</span>
      </div>
      <div className="mt-4 h-2 rounded-full bg-foreground/10">
        <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: formatPercent(value) }} />
      </div>
    </div>
  );
}
