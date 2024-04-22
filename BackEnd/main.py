from fastapi import FastAPI
from models import base
from DataBase import engine

base.metadata.create_all(bind=engine)

app = FastAPI()
