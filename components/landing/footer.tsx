import { Music2 } from "lucide-react";
import { appConfig } from "@/constants/content";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 px-4 py-10">
      <div className="container flex max-w-6xl flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-foreground">
          <Music2 className="h-4 w-4 text-primary" />
          <span className="font-medium">{appConfig.name}</span>
        </div>
        <p>SBERT multilingual lyric embeddings · cosine similarity · Top-10 retrieval</p>
      </div>
    </footer>
  );
}
