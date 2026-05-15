import Link from "next/link";
import { ArrowRight, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TypingHeadline } from "@/components/landing/typing-headline";

export function HeroSection() {
  return (
    <section className="relative px-4 pb-20 pt-32">
      <div className="container max-w-5xl text-center">
        <Badge className="mb-8 gap-2" variant="secondary">
          <BrainCircuit className="h-3.5 w-3.5 text-primary" />
          SBERT + cosine lyric matching
        </Badge>
        <h1 className="mx-auto max-w-5xl text-5xl font-semibold leading-[0.98] text-balance text-foreground sm:text-7xl lg:text-8xl">
          Find songs for the feeling behind your <TypingHeadline />
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
          Write a curhat, then get ten songs whose lyrics are semantically closest to your emotion.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/app">
              Start Curhat
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#flow">How it works</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
