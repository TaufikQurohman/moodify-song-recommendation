"use client";

import { Music2 } from "lucide-react";
import Image from "next/image";
import { Waveform } from "@/components/shared/waveform";
import type { Recommendation } from "@/types/recommendation";

export function NowPlayingWidget({ song }: { song?: Recommendation }) {
  if (!song) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 mx-auto max-w-md rounded-md border border-foreground/10 bg-[#172033] p-3 shadow-soft md:left-auto md:right-6 md:mx-0">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-lg">
          <Image src={song.thumbnail} alt="" fill className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-xs text-primary">
            <Music2 className="h-3.5 w-3.5" />
            Closest emotional match
          </p>
          <p className="truncate text-sm font-medium text-foreground">{song.title}</p>
        </div>
        <Waveform className="h-8 scale-75" />
      </div>
    </div>
  );
}
