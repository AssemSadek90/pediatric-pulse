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


@router.post("/add/patient", status_code=status.HTTP_201_CREATED, description="This is a post request add new patient to this user.", response_model=schemas.PatientResponse)
async def CreateUser(user: schemas.addPatient, db: session = Depends(DataBase.get_db)):

    # Check if the parent user exists
    parent_user = db.query(models.User).filter(models.User.userId == user.parentId).first()
    if parent_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {user.parentId} not found.")

    # Create a new instance of the Patient model with the hashed password
    new_patient = models.Patient(
        firstName=user.firstName,
        lastName=user.lastName,
        parentFirstName=parent_user.firstName,
        parentLastName=parent_user.lastName,
        parentPhoneNumber=parent_user.PhoneNumber,
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
    return new_patient


@router.get("/get/patients/{parentId}", description="This route returns patient data via parentId and takes the token in the header", response_model=list[schemas.PatientResponse])
async def get_patient(parentId: int,  token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(parentId, token)
    if not token_data:
        raise HTTPException( status_code=401, detail= "unauthorized")
    if token_data == False:
        raise HTTPException( status_code=401, detail= "unauthorized")
    patients = db.query(models.Patient).filter(models.Patient.parentId == parentId).all()

    return patients

@router.get("/get/patient/{patientId}/{parentId}", description="This route returns patient data via patientId and takes the token for parent in the header", response_model=schemas.PatientResponse)
async def get_patient(patientId: int, parentId:int,  token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(parentId, token)
    if not token_data:
        raise HTTPException( status_code=401, detail= "unauthorized")
    if token_data == False:
        raise HTTPException( status_code=401, detail= "unauthorized")
    patient = db.query(models.Patient).filter(models.Patient.id == patientId).first()
    return patient

@router.delete("/delete/patient/{patientId}", description="This route deletes a patient via patientId and takes the token for parent in the header")
async def delete_patient(patientId: int, token: str, db: session = Depends(DataBase.get_db)):
    patient = db.query(models.Patient).filter(models.Patient.id == patientId).first()
    token_data = oauth2.verify_access_token(patient.parentId, token)
    if not token_data:
        raise HTTPException( status_code=401, detail= "unauthorized")
    if token_data == False:
        raise HTTPException( status_code=401, detail= "unauthorized")
    if not patient:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found.")
    db.delete(patient)
    db.commit()
    return {"message": "Patient deleted successfully"}


@router.put("/update/patient/{patientId}/{parentId}", description="This route updates the patient's info", response_model=schemas.Patient)
async def update_doctor_pic(patient: schemas.updatePatient,patientId: int, parentId: int, token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(parentId ,token)
    if not token_data:
        raise HTTPException( status_code=401, detail= "unauthorized")

    user_query = db.query(models.Patient).filter(models.Patient.id == patientId)
    user_query.update({ 
        "age": patient.age,
        "firstName": patient.firstName, 
        "lastName": patient.lastName,
        "gender": patient.gender,
        })
    
    db.commit()

    patient= db.query(models.Patient).filter(models.Patient.id == patientId).first()
    
    return patient


@router.get('/patient/{patientId}/{doctorId}', description="This route returns the patient's info", response_model = schemas.returnPatient)
async def get_patient_info(patientId: int, doctorId: int, token: str, db: session = Depends(DataBase.get_db)):
    token = oauth2.verify_access_token(doctorId, token)
    if not token:
        raise HTTPException( status_code=401, detail= "unauthorized")
    patient = db.query(models.Patient).filter(models.Patient.id == patientId).first()
    parent = db.query(models.User).filter(models.User.userId == patient.parentId).first()
    pic = parent.profilePicture if parent.profilePicture is not None else "None"
    newPatient = {
        "firstName": patient.firstName,
        "lastName": patient.lastName,
        "parentFirstName": parent.firstName,
        "parentLastName": parent.lastName,
        "parentPic": pic,
        
    }
    return newPatient