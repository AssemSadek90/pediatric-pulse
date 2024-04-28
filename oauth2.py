from fastapi import Depends, HTTPException
from jose import JWTError, jwt
from datetime import datetime, timedelta
from schemas import tokenData
from fastapi.security import OAuth2PasswordBearer
import jwt.exceptions
from pydantic import BaseModel, ValidationError




oauth2_schema = OAuth2PasswordBearer(tokenUrl='login')

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b822545618e8d3e992e3esgsfe312edw"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 525600


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({'exp': expire})

    encoded_iwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_iwt



def verify_access_token(token: str, credentials_exception=None):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")

        if not user_id:
            if credentials_exception:
                raise credentials_exception
            else:
                return {"message": "User ID not found in token"}

        return {"id": user_id}  # Return a dictionary with 'id' key

    except jwt.exceptions.DecodeError:
        if credentials_exception:
            raise credentials_exception
        else:
            return {"message": "Error decoding token"}
    except jwt.exceptions.InvalidTokenError:
        if credentials_exception:
            raise credentials_exception
        else:
            return {"message": "Invalid token"}


        
def get_current_user(token:str = Depends(oauth2_schema)):
    credentials_exception = HTTPException(status_code=401, detail= "couldent validate credentials", headers={"www-Authenticate":"Bearer"})
    return verify_access_token(token, credentials_exception)