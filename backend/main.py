from functools import lru_cache
from pathlib import Path
from urllib.parse import quote_plus

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from models.recommender import load_assets, recommend as recommend_songs

app = FastAPI(title="Moodfy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
DATASET_PATH = BASE_DIR / "data" / "dataset_clean.csv"
EMBEDDING_PATH = BASE_DIR / "embeddings" / "hasil_lyricsEmbedding.npy"


class RecommendRequest(BaseModel):
    text: str


@lru_cache(maxsize=1)
def get_assets():
    return load_assets(
        dataset_path=str(DATASET_PATH),
        embedding_path=str(EMBEDDING_PATH),
    )


def build_thumbnail(title: str, artist: str, rank: int) -> str:
    seed = quote_plus(f"{title}-{artist}-{rank}")
    return f"https://picsum.photos/seed/{seed}/480/480"


def build_lyric_snippet(row: dict) -> str:
    lyrics = str(row.get("lyrics", "") or row.get("lyrics_clean", ""))
    cleaned = " ".join(lyrics.split())
    return cleaned[:180] + ("..." if len(cleaned) > 180 else "")


def map_emotion(row: dict) -> str:
    label = str(row.get("sentiment_label", "")).lower()
    if label in {"positive", "joy", "happy"}:
        return "hopeful"
    if label in {"negative", "sad"}:
        return "sad"
    return label or "reflective"


@app.post("/api/recommend")
def recommend(payload: RecommendRequest):
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail="Text is required")

    try:
        model, songs_df, lyric_embeddings = get_assets()
        result_df = recommend_songs(
            payload.text,
            model,
            songs_df,
            lyric_embeddings,
            top_n=10,
        )
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(status_code=500, detail="Recommendation failed") from error

    recommendations = []

    for index, result in result_df.iterrows():
        rank = int(result.get("rank", index + 1))
        title = str(result.get("title", "Unknown Title"))
        artist = str(result.get("artist", "Unknown Artist"))
        youtube_url = str(result.get("youtube_url") or result.get("url") or result.get("link") or "")
        source_match = songs_df[
            (songs_df["title"].astype(str) == title)
            & (songs_df["artist"].astype(str) == artist)
        ]
        source_row = source_match.iloc[0].to_dict() if not source_match.empty else result.to_dict()

        recommendations.append(
            {
                "title": title,
                "artist": artist,
                "similarity": float(result.get("similarity_score", 0)),
                "thumbnail": build_thumbnail(title, artist, rank),
                "lyrics_snippet": build_lyric_snippet(source_row),
                "youtube_url": youtube_url,
                "emotion": map_emotion(source_row),
            }
        )

    return {"recommendations": recommendations}


@app.get("/health")
def health():
    return {"status": "ok"}
