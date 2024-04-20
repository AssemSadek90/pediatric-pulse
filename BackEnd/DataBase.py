from sqlalchemy import create_engine, false
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm  import sessionmaker


SQLALCHEMY_DATABASE_URL = 'postgresql://hcis:Hcis@1234@hcis00.postgres.database.azure.com/postgres'

engine = create_engine(SQLALCHEMY_DATABASE_URL)

sessionLocal = sessionmaker(autocommit=True, autoflush=True, bind=engine)

base = declarative_base()

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()