import type { Recommendation } from "@/types/recommendation";

export const appConfig = {
  name: "Ventify",
  subtitle: "AI Song Recommendation",
  tagline: "Find songs that understand what your words cannot finish.",
  maxCharacters: 1200,
  endpoint: process.env.NEXT_PUBLIC_RECOMMEND_API_URL || "/api/recommend",
  useMock: process.env.NEXT_PUBLIC_USE_MOCK_RECOMMENDATIONS === "true"
};

export const promptExamples = [
  "Aku capek terlihat baik-baik saja, padahal setiap malam rasanya kosong banget.",
  "Hari ini aku kangen seseorang yang sudah lama pergi, tapi memorinya masih tinggal.",
  "Aku sedang jatuh cinta, tapi takut terlalu berharap dan akhirnya kecewa lagi."
];

export const flowSteps = [
  {
    title: "Write your curhat",
    description: "Share the feeling in natural language, mixed Indonesian or English is fine."
  },
  {
    title: "Semantic emotion matching",
    description: "SBERT maps your confession and lyric embeddings into the same meaning space."
  },
  {
    title: "Top-10 songs",
    description: "Cosine similarity ranks the lyrics that emotionally resonate the closest."
  }
];

export const previewRecommendations: Recommendation[] = [
  {
    title: "Hati-Hati di Jalan",
    artist: "Tulus",
    similarity: 0.94,
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop",
    lyrics_snippet: "Perjalanan membawamu bertemu denganku, ku bertemu kamu...",
    youtube_url: "https://youtube.com",
    emotion: "nostalgic"
  },
  {
    title: "Evaluasi",
    artist: "Hindia",
    similarity: 0.9,
    thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop",
    lyrics_snippet: "Yang tak bisa terobati, biarlah mengering sendiri...",
    youtube_url: "https://youtube.com",
    emotion: "healing"
  },
  {
    title: "Rehat",
    artist: "Kunto Aji",
    similarity: 0.88,
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop",
    lyrics_snippet: "Tenangkan hati, semua ini bukan salahmu...",
    youtube_url: "https://youtube.com",
    emotion: "calm"
  }
];

export const mockRecommendations: Recommendation[] = [
  ...previewRecommendations,
  {
    title: "Secukupnya",
    artist: "Hindia",
    similarity: 0.86,
    thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
    lyrics_snippet: "Kapan terakhir kali kamu dapat tertidur tenang?",
    youtube_url: "https://youtube.com",
    emotion: "anxious"
  },
  {
    title: "Untuk Hati Yang Terluka",
    artist: "Isyana Sarasvati",
    similarity: 0.84,
    thumbnail: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?q=80&w=800&auto=format&fit=crop",
    lyrics_snippet: "Untuk hati yang terluka, tenanglah kau tak sendiri...",
    youtube_url: "https://youtube.com",
    emotion: "healing"
  },
  {
    title: "Bertaut",
    artist: "Nadin Amizah",
    similarity: 0.82,
    thumbnail: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=800&auto=format&fit=crop",
    lyrics_snippet: "Bun, hidup berjalan seperti bajingan...",
    youtube_url: "https://youtube.com",
    emotion: "lonely"
  },
  {
    title: "To the Bone",
    artist: "Pamungkas",
    similarity: 0.8,
    thumbnail: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=800&auto=format&fit=crop",
    lyrics_snippet: "Take me home, I am falling...",
    youtube_url: "https://youtube.com",
    emotion: "romantic"
  },
  {
    title: "Monokrom",
    artist: "Tulus",
    similarity: 0.78,
    thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop",
    lyrics_snippet: "Lembaran foto hitam putih, aku coba ingat lagi...",
    youtube_url: "https://youtube.com",
    emotion: "nostalgic"
  },
  {
    title: "Amin Paling Serius",
    artist: "Sal Priadi, Nadin Amizah",
    similarity: 0.76,
    thumbnail: "https://images.unsplash.com/photo-1458560871784-56d23406c091?q=80&w=800&auto=format&fit=crop",
    lyrics_snippet: "Aku tahu kamu lahir dari cantik utuh cahaya rembulan...",
    youtube_url: "https://youtube.com",
    emotion: "hopeful"
  },
  {
    title: "Sampai Jadi Debu",
    artist: "Banda Neira",
    similarity: 0.74,
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    lyrics_snippet: "Badai tuan telah berlalu, salahkah ku menuntut mesra...",
    youtube_url: "https://youtube.com",
    emotion: "sad"
  }
];
