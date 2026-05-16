import sys
from pathlib import Path

from sentence_transformers import SentenceTransformer

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from models.recommender import MODEL_CACHE_DIR, MODEL_NAME


def main() -> None:
    MODEL_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    SentenceTransformer(MODEL_NAME, device="cpu", cache_folder=str(MODEL_CACHE_DIR))
    print(f"Downloaded {MODEL_NAME} to {MODEL_CACHE_DIR}")


if __name__ == "__main__":
    main()
