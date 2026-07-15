from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.history import PredictionHistory
from app.models.user import User

import csv
import io

router = APIRouter(tags=["Export"])


@router.get("/export")
def export_csv(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    history = (
        db.query(PredictionHistory)
        .filter(PredictionHistory.user_id == current_user.id)
        .all()
    )

    output = io.StringIO()
    writer = csv.writer(output)

    writer.writerow([
        "ID",
        "URL",
        "Prediction",
        "Confidence",
        "Date"
    ])

    for item in history:
        writer.writerow([
            item.id,
            item.url,
            item.prediction,
            item.confidence,
            item.created_at
        ])

    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition":
            "attachment; filename=prediction_history.csv"
        }
    )