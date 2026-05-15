import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { previewRecommendations } from "@/constants/content";
import { formatPercent } from "@/lib/utils";

export function PreviewSection() {
  return (
    <section id="preview" className="px-4 py-20">
      <div className="container max-w-5xl">
        <SectionHeading
          eyebrow="Preview"
          title="Readable song recommendations."
          description="Mood, similarity, artist, and lyric snippet stay visible without clutter."
        />
        <div className="mt-12 space-y-3">
          {previewRecommendations.map((song, index) => (
            <article key={song.title} className="flex gap-4 rounded-lg border border-foreground/10 bg-[#172033] p-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image src={song.thumbnail} alt={`${song.title} album artwork`} fill sizes="80px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">#{index + 1}</span>
                  <h3 className="font-semibold text-foreground">{song.title}</h3>
                  <Badge>{song.emotion}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{song.artist} - {formatPercent(song.similarity)}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{song.lyrics_snippet}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
