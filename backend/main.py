from fastapi import FastAPI
from routes.upload import router as upload_router
from routes.health import router as health_router
from routes.search import router as search_router
from routes.finance import router as finance_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="Aegis Intelligence")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(upload_router)
app.include_router(search_router)
app.include_router(finance_router)
@app.get("/")
def home():
    return {
        "message": "Welcome to Aegis Intelligence"
    }
    