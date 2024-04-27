from fastapi import FastAPI, HTTPException, Depends, APIRouter
from app.DataBase import engine, get_db
from app.models import base, User, Doctor
from routes import auth,user
from oauth2 import create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import session

base.metadata.create_all(bind=engine)

# Define other components of your application
app = FastAPI()
app.include_router(auth.router)
app.include_router(user.router)


