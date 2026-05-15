import { appConfig, mockRecommendations } from "@/constants/content";
import type { RecommendResponse } from "@/types/recommendation";

export class RecommendationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RecommendationError";
  }
}

export async function fetchRecommendations(text: string): Promise<RecommendResponse> {
  if (appConfig.useMock) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { recommendations: mockRecommendations };
  }

  const response = await fetch(appConfig.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text }),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new RecommendationError("The recommendation service is unavailable. Please try again.");
  }

  const data = (await response.json()) as RecommendResponse;

  if (!Array.isArray(data.recommendations)) {
    throw new RecommendationError("The recommendation response format is invalid.");
  }

  return data;
}
