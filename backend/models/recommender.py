"""
recommender.py — Modul Sistem Rekomendasi Lagu
Kelompok 28 - Capstone Data Science

Penggunaan di app.py (Streamlit):

    from recommender import load_assets, recommend

    model, df, lyrics_embeddings = load_assets()
    results = recommend(curhat_text, model, df, lyrics_embeddings)
"""

import os
import re
from pathlib import Path

import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

BASE_DIR = Path(__file__).resolve().parents[1]
MODEL_NAME = "paraphrase-multilingual-MiniLM-L12-v2"
# Use HuggingFace's standard cache directory (~/.cache/huggingface)
# This is where download_model.py caches the model during build
MODEL_CACHE_DIR = os.path.expanduser("~/.cache/huggingface")
DATASET_PATH = "dataset_clean.csv"
EMBEDDING_PATH = "hasil_lyricsEmbedding.npy"


def load_assets(
    dataset_path: str = DATASET_PATH,
    embedding_path: str = EMBEDDING_PATH
):
    """
    Load semua aset yang dibutuhkan sistem rekomendasi.
    Panggil SEKALI di awal app.py menggunakan @st.cache_resource.

    Returns:
        model              : SentenceTransformer
        df                 : pd.DataFrame (dataset lagu)
        lyrics_embeddings  : np.ndarray (pre-computed)
    """
    model = SentenceTransformer(MODEL_NAME, device="cpu", cache_folder=MODEL_CACHE_DIR)
    df = pd.read_csv(dataset_path)
    lyrics_embeddings = np.load(embedding_path)

    assert len(df) == len(lyrics_embeddings), (
        f"MISMATCH: dataset {len(df)} baris vs embedding {len(lyrics_embeddings)} baris!"
    )
    return model, df, lyrics_embeddings


def preprocess_curhat(text: str) -> str:
    """Lowercase → hapus simbol → normalisasi spasi."""
    if not isinstance(text, str) or text.strip() == "":
        raise ValueError("Input teks curhat tidak boleh kosong.")
    text = text.lower()
    text = re.sub(r"[^a-zA-Z\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def recommend(
    curhat_text: str,
    model: SentenceTransformer,
    df: pd.DataFrame,
    lyrics_embeddings: np.ndarray,
    top_n: int = 10
) -> pd.DataFrame:
    """
    Pipeline: teks curhat mentah → Top-N rekomendasi lagu.

    Parameters:
        curhat_text       : teks curhat dari pengguna
        model             : SentenceTransformer (sudah di-load)
        df                : DataFrame dataset lagu
        lyrics_embeddings : np.ndarray embedding lirik (pre-computed)
        top_n             : jumlah rekomendasi (default 10)

    Returns:
        pd.DataFrame kolom: [rank, title, artist, similarity_score, url/link]
    """
    # Step 1 — Preprocess curhat
    clean = preprocess_curhat(curhat_text)

    # Step 2 — Embed curhat (real-time)
    curhat_emb = model.encode([clean], convert_to_numpy=True)

    # Step 3 — Cosine similarity vs. semua lirik
    scores = cosine_similarity(curhat_emb, lyrics_embeddings)[0]

    # Step 4 — Sort & ambil Top-N
    top_indices = np.argsort(scores)[::-1][:top_n]
    results = df.iloc[top_indices].copy()
    results["similarity_score"] = np.round(scores[top_indices], 4)
    results["rank"] = range(1, top_n + 1)

    # Pilih kolom output
    output_cols = ["rank", "title", "artist", "similarity_score"]
    for url_col in ["youtube_url", "url", "link"]:
        if url_col in results.columns:
            output_cols.append(url_col)
            break

    return results[output_cols].reset_index(drop=True)
