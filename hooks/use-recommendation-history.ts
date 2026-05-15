"use client";

import { create } from "zustand";
import type { Recommendation, RecommendationHistoryItem } from "@/types/recommendation";

const STORAGE_KEY = "moodfy-history";

interface RecommendationHistoryState {
  history: RecommendationHistoryItem[];
  hydrate: () => void;
  addHistory: (text: string, recommendations: Recommendation[]) => void;
  clearHistory: () => void;
}

function detectMood(recommendations: Recommendation[]) {
  return recommendations[0]?.emotion || "unknown";
}

export const useRecommendationHistory = create<RecommendationHistoryState>((set, get) => ({
  history: [],
  hydrate: () => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      set({ history: JSON.parse(raw) as RecommendationHistoryItem[] });
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  },
  addHistory: (text, recommendations) => {
    const item: RecommendationHistoryItem = {
      id: crypto.randomUUID(),
      text,
      mood: detectMood(recommendations),
      createdAt: new Date().toISOString(),
      recommendations
    };
    const next = [item, ...get().history].slice(0, 8);
    set({ history: next });
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  },
  clearHistory: () => {
    set({ history: [] });
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }
}));
