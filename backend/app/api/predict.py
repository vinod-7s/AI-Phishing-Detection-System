from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import joblib
import os

from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.predict import URLRequest
from app.models.history import PredictionHistory
from app.core.database import get_db

router = APIRouter(prefix="/predict", tags=["Prediction"])

# Path to ml-model folder
BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "..")
)
ML_DIR = os.path.join(BASE_DIR, "ml-model")

# Load model and vectorizer
model = joblib.load(os.path.join(ML_DIR, "model.pkl"))
vectorizer = joblib.load(os.path.join(ML_DIR, "vectorizer.pkl"))


@router.post("/")
def predict(
    request: URLRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Convert URL to TF-IDF vector
    url_vector = vectorizer.transform([request.url])

    prediction = model.predict(url_vector)[0]
    confidence = float(model.predict_proba(url_vector).max())

    result = "Phishing" if prediction == 1 else "Safe"

    # Save to database
    history = PredictionHistory(
        url=request.url,
        prediction=result,
        confidence=confidence,
        user_id=current_user.id
    )

    db.add(history)
    db.commit()
    db.refresh(history)

    return {
        "url": request.url,
        "prediction": result,
        "confidence": confidence,
    }