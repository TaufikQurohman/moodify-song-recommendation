# Ventify

**AI Song Recommendation**

Ventify is an emotional music recommendation platform. Users write a short curhat or confession text, then the app recommends Top-10 songs whose lyrics are semantically close to the user's feeling.

The NLP recommendation engine is handled by the backend using:

- SBERT `paraphrase-multilingual-MiniLM-L12-v2`
- cosine similarity
- precomputed lyric embeddings `.npy`
- Top-10 retrieval

## Live Links

- Frontend: https://ventify.up.railway.app
- Backend API: https://zesty-wholeness-production-80d3.up.railway.app
- Backend health check: https://zesty-wholeness-production-80d3.up.railway.app/health

## Tech Stack

- Next.js 15 App Router
- TypeScript
- TailwindCSS
- shadcn/ui-style components
- Framer Motion
- Lucide Icons
- Zustand for local recommendation history
- FastAPI backend

## Main Features

- Landing page for Ventify
- Curhat input page at `/app`
- Character counter and example prompts
- Top-10 song recommendations
- Similarity percentage
- Lyric snippet preview
- Mood badge
- YouTube link button
- Local recommendation history
- Loading, empty, and error states
- Railway-ready frontend and backend integration

## Project Structure

```txt
music-recommender/
  app/
    page.tsx              # landing page
    app/page.tsx          # recommendation page
    api/recommend/route.ts
    version/page.tsx
  backend/
    data/dataset_clean.csv
    embeddings/hasil_lyricsEmbedding.npy
    models/recommender.py
    main.py
    requirements.txt
    railway.json
  components/
  constants/
  hooks/
  lib/
  services/
  types/
```

## Environment Variables

Create `.env.local` for local frontend development:

```env
NEXT_PUBLIC_RECOMMEND_API_URL=/api/recommend
NEXT_PUBLIC_USE_MOCK_RECOMMENDATIONS=false
RECOMMENDATION_BACKEND_URL=http://localhost:8000/api/recommend
```

For Railway frontend service variables:

```env
NEXT_PUBLIC_RECOMMEND_API_URL=/api/recommend
NEXT_PUBLIC_USE_MOCK_RECOMMENDATIONS=false
RECOMMENDATION_BACKEND_URL=https://zesty-wholeness-production-80d3.up.railway.app/api/recommend
```

## Run Locally

Install frontend dependencies:

```bash
npm install
```

Run backend:

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

Run frontend in another terminal:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## API Contract

Recommendation endpoint:

```http
POST /api/recommend
Content-Type: application/json
```

Request:

```json
{
  "text": "Aku lagi capek banget dan butuh lagu yang menenangkan."
}
```

Response:

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

Backend utility endpoints:

```txt
GET /
GET /health
POST /api/recommend
```

## Deployment Notes

Frontend Railway service:

- Root directory: repository root
- Build command: `npm run build`
- Start command: `npm run start`

Backend Railway service:

- Root directory: `backend`
- Start command: `python -m uvicorn main:app --host 0.0.0.0 --port $PORT`
- Healthcheck path: `/health`

## Verification

Check frontend landing:

```bash
curl https://ventify.up.railway.app/
```

Check backend health:

```bash
curl https://zesty-wholeness-production-80d3.up.railway.app/health
```
