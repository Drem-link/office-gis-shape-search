from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path

app = FastAPI(title="Office GIS Shape Search")

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.get("/api/search")
def search():
    return {
        "count": 4,
        "items": [
            {"id": "1", "name": "Месторождение золото 1", "region": "Ярлык", "mineral": "золото", "category": "руда", "code": "GOLD-01", "latitude": 51.2198, "longitude": 55.5687},
            {"id": "2", "name": "Месторождение серебро", "region": "Алтай", "mineral": "серебро", "category": "металл", "code": "SIL-02", "latitude": 51.44, "longitude": 56.123},
            {"id": "3", "name": "Месторождение медь", "region": "Урал", "mineral": "медь", "category": "руда", "code": "COP-03", "latitude": 52.954, "longitude": 57.304},
            {"id": "4", "name": "Месторождение никель", "region": "Камчатка", "mineral": "никель", "category": "металл", "code": "NIK-04", "latitude": 53.101, "longitude": 58.997},
        ]
    }

@app.get("/")
def index():
    return FileResponse(STATIC_DIR / "index.html")
