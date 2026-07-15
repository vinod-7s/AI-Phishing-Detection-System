from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.history import PredictionHistory
from app.models.user import User

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.get("/")
def get_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    history = (
        db.query(PredictionHistory)
        .filter(PredictionHistory.user_id == current_user.id)
        .all()
    )

    return history


@router.delete("/{history_id}")
def delete_history(
    history_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    record = (
        db.query(PredictionHistory)
        .filter(
            PredictionHistory.id == history_id,
            PredictionHistory.user_id == current_user.id
        )
        .first()
    )

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Record not found"
        )

    db.delete(record)
    db.commit()

    return {
        "message": "History deleted successfully"
    }