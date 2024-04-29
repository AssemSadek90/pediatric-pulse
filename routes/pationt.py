from fastapi import HTTPException, status, Depends, APIRouter
from sqlalchemy.orm import session

import sys

sys.path.append('BackEnd')

import models
import DataBase
import oauth2
import utils
import schemas

router = APIRouter(
    tags=["patient"]
)


@router.post("/add/patient", status_code=status.HTTP_201_CREATED, description="This is a post request to create a regular user (customer).")
async def CreateUser(user: schemas.addPatient, db: session = Depends(DataBase.get_db)):

    # Create a new instance of the User model with the hashed password
    new_user = models.Patient(
        firstName = user.firstName,
        lastName = user.lastName,
        parentFirstName = user.parentFirstName,
        parentLastName = user.parentLastName,
        parentPhoneNumber = user.parentPhoneNumber,
        parentId = user.parentId,
        age = user.age,
        gender = user.gender
    )

    # Add the new_user instance to the session
    db.add(new_user)
    # Commit the session to persist the changes
    db.commit()
    # Refresh the new_user instance to ensure it has the latest data from the database
    db.refresh(new_user)

    
    # Return the response with the access token, role, and userId
    return {"patient": new_user}
