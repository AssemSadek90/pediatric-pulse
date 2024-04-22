from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = 'postgres://root:gDCGDjRNUOvcekWqoVJHOGoZlSiYvaC9@dpg-cojcj8icn0vc73dsv7b0-a.oregon-postgres.render.com/hcis'

# Attempt to create an engine
try:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    connected = True
except OperationalError:
    connected = False

# Print whether connected or not
if connected:
    print("Connected to the database.")
else:
    print("Not connected to the database.")

# Define other components of your application
sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
base = declarative_base()

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()
