"use client";

import { motion } from "framer-motion";

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="ambient-mesh absolute inset-x-0 top-0 h-px opacity-80"
        animate={{ opacity: [0.4, 0.82, 0.52] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute right-0 top-0 h-full w-[32vw] bg-[linear-gradient(to_left,rgba(34,211,238,0.07),transparent)]" />
      <div className="absolute bottom-0 left-0 h-72 w-full bg-[linear-gradient(to_top,#0f172a,transparent)]" />
    </div>
  );
}
