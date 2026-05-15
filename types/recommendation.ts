export type Emotion =
  | "sad"
  | "calm"
  | "hopeful"
  | "angry"
  | "lonely"
  | "nostalgic"
  | "romantic"
  | "anxious"
  | "healing"
  | string;

export interface Recommendation {
  title: string;
  artist: string;
  similarity: number;
  thumbnail: string;
  lyrics_snippet: string;
  youtube_url: string;
  emotion: Emotion;
}

export interface RecommendRequest {
  text: string;
}

export interface RecommendResponse {
  recommendations: Recommendation[];
}

export interface RecommendationHistoryItem {
  id: string;
  text: string;
  mood: string;
  createdAt: string;
  recommendations: Recommendation[];
}
