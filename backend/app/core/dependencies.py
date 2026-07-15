from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import SECRET_KEY, ALGORITHM
from app.models.user import User

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    print("\n========== TOKEN ==========")
    print(token)

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("\n========== PAYLOAD ==========")
        print(payload)

        email = payload.get("sub")

        print("\n========== EMAIL ==========")
        print(email)

        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

    except JWTError as e:
        print("\n========== JWT ERROR ==========")
        print(str(e))
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = db.query(User).filter(User.email == email).first()

    print("\n========== USER ==========")
    print(user)

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user