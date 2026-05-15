import Link from "next/link";
import { ArrowRight, BrainCircuit, ListMusic, Music2, PenLine } from "lucide-react";
import { AmbientBackground } from "@/components/shared/ambient-background";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <AmbientBackground />
      <main className="min-h-screen px-4 text-foreground">
        <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center py-20">
          <nav className="mb-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Music2 className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-lg font-semibold leading-none">Moodfy</span>
                <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  AI Song Recommendation
                </span>
              </span>
            </Link>
            <Button asChild variant="outline">
              <Link href="/app">Open App</Link>
            </Button>
          </nav>

          <div className="max-w-4xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1 text-sm text-muted-foreground">
              <BrainCircuit className="h-4 w-4 text-primary" />
              SBERT semantic lyric similarity
            </p>
            <h1 className="text-6xl font-semibold leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-8xl">
              Temukan lagu yang paling dekat dengan perasaanmu.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
              Tulis ceritamu dengan jujur. Moodfy memetakan makna emosionalnya, lalu mencocokkannya
              dengan embedding lirik untuk menampilkan Top 10 lagu yang terasa paling relevan.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/app">
                  Mulai Curhat
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="#how-it-works">How it works</a>
              </Button>
            </div>
          </div>

          <div id="how-it-works" className="mt-24 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: PenLine,
                title: "Write naturally",
                description: "Tulis curhat apa adanya, pendek atau panjang, dalam bahasa sehari-hari."
              },
              {
                icon: BrainCircuit,
                title: "Match semantics",
                description: "Model SBERT membandingkan makna curhat dengan embedding lirik lagu."
              },
              {
                icon: ListMusic,
                title: "Get Top 10",
                description: "Hasilnya berupa daftar lagu dengan similarity score, mood, dan link YouTube."
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-foreground/10 bg-[#172033] p-5">
                  <Icon className="h-5 w-5 text-primary" />
                  <h2 className="mt-5 text-lg font-semibold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
