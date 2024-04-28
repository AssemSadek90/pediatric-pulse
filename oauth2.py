from fastapi import Depends, HTTPException
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import session


import sys
sys.path.append('BackEnd')

import models
import DataBase
import oauth2
import utils
import schemas
from routes import user


oauth2_schema = OAuth2PasswordBearer(tokenUrl='login')

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({'exp': expire})

    encoded_iwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_iwt

import jwt
def verify_access_token(token: str, credentials_exception=None):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    user_id: str = payload.get("user_id")

    if not user_id:
        if credentials_exception:
            raise credentials_exception
        else:
            return {"message": "User ID not found in token"}

    return {"id": user_id}  # Return a dictionary with 'id' key
