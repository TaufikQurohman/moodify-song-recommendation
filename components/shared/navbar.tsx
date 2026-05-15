import Link from "next/link";
import { Music2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/constants/content";

export function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-4 pt-4">
      <nav className="mx-auto grid h-14 max-w-6xl grid-cols-[1fr_auto] items-center rounded-md border border-foreground/10 bg-[#172033]/95 px-3 shadow-[0_18px_48px_rgba(0,0,0,0.22)] sm:grid-cols-[1fr_auto_1fr] sm:px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
            <Music2 className="h-4 w-4" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-wide text-foreground">{appConfig.name}</span>
            <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:block">
              {appConfig.subtitle}
            </span>
          </span>
        </Link>
        <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <Link className="transition-colors hover:text-foreground" href="/#flow">
            Flow
          </Link>
          <Link className="transition-colors hover:text-foreground" href="/#preview">
            Preview
          </Link>
          <Link className="transition-colors hover:text-foreground" href="/app">
            Curhat
          </Link>
        </div>
        <div className="justify-self-end">
          <Button asChild size="sm">
            <Link href="/app">
              <Sparkles className="h-4 w-4" />
              Start
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
