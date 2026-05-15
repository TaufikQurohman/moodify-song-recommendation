# Backend Assets

Taruh file sistem rekomendasi NLP kamu di folder ini.

Struktur:

```txt
backend/
  data/
    dataset_lagu.csv
  embeddings/
    lyric_embeddings.npy
  models/
    recommender.py
  main.py
  requirements.txt
```

Catatan:

- `data/` untuk dataset lagu, metadata, dan hasil preprocessing.
- `embeddings/` untuk file embedding `.npy`.
- `models/` untuk `recommender.py` atau modul rekomendasi Python.
- `main.py` nanti bisa dipakai untuk FastAPI/Flask endpoint `/api/recommend`.

Frontend Next.js tidak membaca file `.csv` atau `.npy` langsung. Frontend hanya memanggil endpoint backend melalui:

```env
RECOMMENDATION_BACKEND_URL=http://localhost:8000/api/recommend
```

Run backend:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
