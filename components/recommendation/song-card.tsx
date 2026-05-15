"use client";

import { motion } from "framer-motion";
import { ExternalLink, Youtube } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatPercent } from "@/lib/utils";
import type { Recommendation } from "@/types/recommendation";

interface SongCardProps {
  song: Recommendation;
  rank: number;
}

export function SongCard({ song, rank }: SongCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: rank * 0.035 }}
      className="rounded-2xl border border-foreground/10 bg-[#172033] p-4 transition-colors duration-200 hover:border-primary/35"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex items-center gap-4 sm:contents">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-foreground/10 text-sm font-semibold text-muted-foreground">
            {rank + 1}
          </div>
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={song.thumbnail}
              alt={`${song.title} album thumbnail`}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="break-words text-xl font-semibold leading-snug text-foreground">{song.title}</h3>
                <Badge>{song.emotion}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{song.artist}</p>
            </div>

            <div className="w-full shrink-0 lg:w-44">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Similarity</span>
                <span className="font-semibold text-primary">{formatPercent(song.similarity)}</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-foreground/10">
                <div className="h-full rounded-full bg-primary" style={{ width: formatPercent(song.similarity) }} />
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-muted-foreground">{song.lyrics_snippet}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild size="sm" variant="secondary">
              <a href={song.youtube_url} target="_blank" rel="noreferrer">
                <Youtube className="h-4 w-4" />
                YouTube
              </a>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost">
                  <ExternalLink className="h-4 w-4" />
                  Lyrics
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{song.title}</DialogTitle>
                </DialogHeader>
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
                    <Image src={song.thumbnail} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                    <Badge className="mt-3">{song.emotion}</Badge>
                  </div>
                </div>
                <blockquote className="rounded-md border border-foreground/10 bg-[#111827] p-4 text-base leading-8 text-foreground">
                  {song.lyrics_snippet}
                </blockquote>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
