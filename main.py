from fastapi import FastAPI, HTTPException, Depends, APIRouter
from DataBase import engine, get_db
from models import base, User, Doctor
from routes import auth,user, doctor, patient
from oauth2 import create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import session
from fastapi.middleware.cors import CORSMiddleware
import models, DataBase, oauth2, utils, schemas

base.metadata.create_all(bind=engine)

# Define other components of your application
app = FastAPI()
#app.include_router(auth.router)
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(doctor.router)
app.include_router(patient.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this to allow requests from your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


