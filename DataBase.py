from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = 'postgresql://root:f6fNhkowhipAa5lamaVwQQ6XhwBU9cBO@dpg-cojekhn109ks73f8qs60-a.oregon-postgres.render.com/hcis_b8rf'

try:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    connected = True
except OperationalError:
    connected = False

if connected:
    print("Connected to the database.")
else:
    print("Not connected to the database.")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

