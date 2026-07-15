from datetime import datetime, timedelta, timezone
from jose import jwt
from passlib.context import CryptContext

# Password Hashing
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# JWT Configuration
SECRET_KEY = "your_super_secret_key_change_this_in_production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 43200


def hash_password(password):
    print("\n========== HASH PASSWORD ==========")
    print("Value:", repr(password))
    print("Type:", type(password))
    print("Length:", len(password))
    print("===================================")

    return pwd_context.hash(password)


def verify_password(password, hashed):
    print("\n========== VERIFY PASSWORD ==========")
    print("Password:", repr(password))
    print("Hashed:", repr(hashed))
    print("====================================")

    return pwd_context.verify(password, hashed)


def create_access_token(data: dict):
    """
    Create JWT Access Token
    """
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    print("\n========== JWT DEBUG ==========")
    print("Current UTC :", datetime.now(timezone.utc))
    print("Expires UTC :", expire)

    to_encode.update({
        "exp": expire
    })

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    print("Generated Token:", token)
    print("================================")

    return token