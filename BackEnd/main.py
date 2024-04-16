from fastapi import FastAPI
from . import models
from .DataBase import engine


models.base.metadata.create_all(bind=engine)

app = FastAPI()
