# Moodfy

Moodfy is an AI Song Recommendation web app for emotional music discovery. Users write a curhat, then the app calls a recommendation endpoint that returns Top-10 songs ranked by semantic similarity between the confession and lyric embeddings.

Subtitle: **AI Song Recommendation**.

## Stack

- Next.js 15 App Router
- TypeScript
- TailwindCSS
- shadcn/ui-style components
- Framer Motion
- Lucide Icons
- Zustand local recommendation history
- FastAPI backend integration

## Recommendation Contract

```http
POST /api/recommend
Content-Type: application/json
```

```json
{
  "text": "user curhat"
}
```

```json
{
  "recommendations": [
    {
      "title": "Song title",
      "artist": "Artist",
      "similarity": 0.92,
      "thumbnail": "https://...",
      "lyrics_snippet": "Short lyric snippet",
      "youtube_url": "https://youtube.com/...",
      "emotion": "sad"
    }
  ]
}
```

## Environment

```bash
NEXT_PUBLIC_RECOMMEND_API_URL=/api/recommend
NEXT_PUBLIC_USE_MOCK_RECOMMENDATIONS=false
RECOMMENDATION_BACKEND_URL=http://localhost:8000/api/recommend
```

## Run

Backend:

```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

Frontend:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
