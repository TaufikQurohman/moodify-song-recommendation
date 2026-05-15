"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, ArrowRight, Clock3, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RecommendationResults } from "@/components/recommendation/recommendation-results";
import { RecommendationSkeleton } from "@/components/recommendation/recommendation-skeleton";
import { NowPlayingWidget } from "@/components/recommendation/now-playing-widget";
import { promptExamples, appConfig } from "@/constants/content";
import { fetchRecommendations } from "@/services/recommendation-service";
import { useRecommendationHistory } from "@/hooks/use-recommendation-history";
import type { Recommendation } from "@/types/recommendation";
import { cn } from "@/lib/utils";

export function RecommendationForm() {
  const [text, setText] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { history, hydrate, addHistory, clearHistory } = useRecommendationHistory();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const detectedMood = useMemo(() => recommendations[0]?.emotion, [recommendations]);
  const charCount = text.length;
  const trimmedText = text.trim();
  const isTooShort = trimmedText.length > 0 && trimmedText.length < 12;
  async function handleSubmit() {
    setError("");
    if (trimmedText.length < 12) {
      setError("Tulis sedikit lebih panjang supaya sistem bisa menangkap konteks emosinya. Minimal 12 karakter.");
      return;
    }
    setIsLoading(true);
    try {
      const data = await fetchRecommendations(trimmedText);
      setRecommendations(data.recommendations);
      addHistory(trimmedText, data.recommendations);
      window.setTimeout(() => document.getElementById("recommendations")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section className="px-4 pb-20 pt-28">
        <div className="container max-w-6xl">
          <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <p className="mono-label text-xs text-primary">Curhat input</p>
              <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[0.98] text-foreground sm:text-6xl">
                Describe the feeling. Receive the listening list.
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Write naturally. The backend embeds your text and compares it against the lyric embedding space.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-[#172033] p-5 shadow-soft sm:p-7">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-400 to-transparent" />
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-foreground/10 pb-4">
                <span className="mono-label text-xs text-muted-foreground">Emotion transcript</span>
                {detectedMood ? <Badge>Mood: {detectedMood}</Badge> : null}
              </div>

              <label htmlFor="curhat" className="sr-only">
                Curhat text
              </label>
              <Textarea
                id="curhat"
                value={text}
                maxLength={appConfig.maxCharacters}
                onChange={(event) => setText(event.target.value)}
                placeholder="Tulis curhat kamu di sini. Tidak perlu rapi, cukup jujur..."
                className="min-h-[300px] resize-none border-0 bg-[#111827] text-lg leading-8 focus:border-primary/45"
              />
              <div className="mt-3 flex items-center justify-between gap-4 text-xs text-muted-foreground">
                <span className={cn(isTooShort && "text-primary")}>
                  {isTooShort ? "Sedikit lagi. Minimal 12 karakter untuk rekomendasi yang masuk akal." : "Minimum 12 characters for a meaningful semantic match."}
                </span>
                <span className={cn(charCount > appConfig.maxCharacters * 0.9 && "text-primary")}>
                  {charCount}/{appConfig.maxCharacters}
                </span>
              </div>

              <div className="mt-6 grid gap-2 md:grid-cols-3">
                {promptExamples.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => setText(example)}
                    className="cursor-pointer border border-foreground/10 bg-[#1d2940] px-3 py-3 text-left text-xs leading-5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {example}
                  </button>
                ))}
              </div>

              {error ? (
                <div className="mt-5 flex gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive-foreground">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  {error}
                </div>
              ) : null}

              <Button onClick={handleSubmit} disabled={isLoading} size="lg" className="mt-6 w-full sm:w-auto">
                <Sparkles className="h-4 w-4" />
                {isLoading ? "Finding emotional matches..." : "Find My Songs"}
                {!isLoading ? <ArrowRight className="h-4 w-4" /> : null}
              </Button>
            </motion.div>

            <aside className="h-fit rounded-2xl border border-foreground/10 bg-[#172033] p-5 shadow-soft">
              <div className="flex items-center justify-between gap-3 border-b border-foreground/10 pb-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Recent sessions</p>
                  <p className="mt-1 text-xs text-muted-foreground">Saved in this browser only.</p>
                </div>
                {history.length ? (
                  <Button size="sm" variant="ghost" onClick={clearHistory}>
                    Clear
                  </Button>
                ) : null}
              </div>
              <div className="mt-5 space-y-3">
                {history.length ? (
                  history.slice(0, 4).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setText(item.text);
                        setRecommendations(item.recommendations);
                      }}
                      className="w-full cursor-pointer border border-foreground/10 bg-[#111827] p-3 text-left transition-colors hover:border-primary/35"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <Badge variant="secondary">{item.mood}</Badge>
                        <Clock3 className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                    </button>
                  ))
                ) : (
                  <p className="border border-dashed border-foreground/15 p-4 text-sm leading-6 text-muted-foreground">
                    Your recent curhat sessions will appear here after the first recommendation.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="recommendations" className="px-4 pb-32">
        <div className="container max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-foreground/10 pb-4">
            <div>
              <p className="mono-label text-xs text-primary">Top 10</p>
              <h2 className="mt-2 text-3xl font-semibold text-foreground">Recommended songs</h2>
            </div>
          </div>
          {isLoading ? <RecommendationSkeleton /> : <RecommendationResults recommendations={recommendations} />}
        </div>
      </section>

      <NowPlayingWidget song={recommendations[0]} />
    </>
  );
}
