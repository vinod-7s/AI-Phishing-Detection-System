from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import traceback

from app.core.database import get_db
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    print("STEP 1")

    existing_email = db.query(User).filter(User.email == user.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already exists")

    print("STEP 2")

    existing_username = db.query(User).filter(User.username == user.username).first()
    if existing_username:
        raise HTTPException(status_code=400, detail="Username already exists")

    print("STEP 3")

    hashed_password = hash_password(user.password)

    print("STEP 4")
    print(hashed_password)

    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password
    )

    print("STEP 5")

    db.add(new_user)

    print("STEP 6")

    db.commit()

    print("STEP 7")

    db.refresh(new_user)

    print("STEP 8")

    return {"message": "Registered"}

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    print("\n========== LOGIN REQUEST ==========")
    print("Email:", user.email)
    print("Password Length:", len(user.password))
    print("===================================\n")

    db_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        data={
            "sub": db_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "username": db_user.username
    }