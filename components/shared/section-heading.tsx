import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      <p className="mono-label mb-4 text-xs text-primary">{eyebrow}</p>
      <h2 className="text-3xl font-semibold leading-tight text-balance text-foreground sm:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p> : null}
    </div>
  );
}
