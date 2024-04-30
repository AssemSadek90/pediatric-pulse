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


@router.post("/add/patient", status_code=status.HTTP_201_CREATED, description="This is a post request add new patient to this user.")
async def CreateUser(user: schemas.addPatient, db: session = Depends(DataBase.get_db)):

    # Check if the parent user exists
    parent_user = db.query(models.User).filter(models.User.userId == user.parentId).first()
    if parent_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {user.parentId} not found.")

    # Create a new instance of the Patient model with the hashed password
    new_patient = models.Patient(
        firstName=user.firstName,
        lastName=user.lastName,
        parentFirstName=user.parentFirstName,
        parentLastName=user.parentLastName,
        parentPhoneNumber=user.parentPhoneNumber,
        parentId=user.parentId,
        age=user.age,
        gender=user.gender
    )

    # Add the new_patient instance to the session
    db.add(new_patient)
    # Commit the session to persist the changes
    db.commit()
    # Refresh the new_patient instance to ensure it has the latest data from the database
    db.refresh(new_patient)

    # Return the response with the newly created patient
    return {"patient": new_patient}
