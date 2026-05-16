import { Loader2 } from "lucide-react";
import { appConfig } from "@/constants/content";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        Loading {appConfig.name}
      </div>
    </div>
  );
}
