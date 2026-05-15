# Moodfy Backend

FastAPI service for Moodfy recommendation inference.

The backend loads the completed NLP assets:

- dataset: `backend/data/dataset_clean.csv`
- embedding: `backend/embeddings/hasil_lyricsEmbedding.npy`
- recommender module: `backend/models/recommender.py`

## Folder Structure

```txt
backend/
  data/
    dataset_clean.csv
  embeddings/
    hasil_lyricsEmbedding.npy
  models/
    recommender.py
  main.py
  requirements.txt
  railway.json
```

## Run Locally

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

Open API docs:

```txt
http://localhost:8000/docs
```

Health check:

```txt
http://localhost:8000/health
```

## Endpoints

```txt
GET /
GET /health
POST /api/recommend
```

`POST /api/recommend` expects:

```json
{
  "text": "user curhat"
}
```

and returns:

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

## Railway

Set the backend service root directory to:

```txt
backend
```

Railway uses `backend/railway.json`:

```json
{
  "deploy": {
    "startCommand": "python -m uvicorn main:app --host 0.0.0.0 --port $PORT",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 300
  }
}
```
