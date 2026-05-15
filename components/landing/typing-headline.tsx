"use client";

import { useEffect, useState } from "react";

const phrases = ["kesepian tengah malam", "rindu yang belum selesai", "lelah yang sulit dijelaskan"];

export function TypingHeadline() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visible, setVisible] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    const timeout = window.setTimeout(
      () => {
        if (!deleting) {
          setVisible(phrase.slice(0, visible.length + 1));
          if (visible.length + 1 === phrase.length) {
            window.setTimeout(() => setDeleting(true), 900);
          }
          return;
        }

        setVisible(phrase.slice(0, visible.length - 1));
        if (visible.length === 0) {
          setDeleting(false);
          setPhraseIndex((phraseIndex + 1) % phrases.length);
        }
      },
      deleting ? 42 : 72
    );

    return () => window.clearTimeout(timeout);
  }, [deleting, phraseIndex, visible]);

  return (
    <span className="inline-flex min-h-[1.2em] items-center text-primary">
      {visible}
      <span className="ml-1 h-[0.9em] w-px animate-pulse bg-primary" />
    </span>
  );
}
