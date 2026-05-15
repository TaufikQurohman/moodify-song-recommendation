"use client";

import { ListMusic } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ConfidenceIndicator } from "@/components/recommendation/confidence-indicator";
import { SongCard } from "@/components/recommendation/song-card";
import type { Recommendation } from "@/types/recommendation";

export function RecommendationResults({ recommendations }: { recommendations: Recommendation[] }) {
  const top = recommendations[0];

  if (!recommendations.length) {
    return (
      <div className="border border-foreground/10 bg-[#172033] p-10 text-center">
        <ListMusic className="mx-auto h-8 w-8 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">No recommendations yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">Write a curhat and the Top-10 songs will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {top ? <ConfidenceIndicator value={top.similarity} /> : null}
      <AnimatePresence>
        <motion.div className="grid gap-4">
          {recommendations.map((song, index) => (
            <SongCard key={`${song.title}-${song.artist}-${index}`} song={song} rank={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
