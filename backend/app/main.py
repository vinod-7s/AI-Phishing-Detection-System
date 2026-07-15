from app.models.user import User
from fastapi import FastAPI
from app.api.export import router as export_router
from fastapi.middleware.cors import CORSMiddleware
from app.api.history import router as history_router
from app.api.auth import router as auth_router
from app.api.predict import router as predict_router
from app.core.database import Base, engine

# Import models before creating tables
from app.models.history import PredictionHistory


# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI-Powered Phishing Detection System",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(export_router)
app.include_router(auth_router)
app.include_router(predict_router)
app.include_router(history_router)

@app.get("/")
def home():
    return {"message": "Backend Running"}