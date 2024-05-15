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


from sqlalchemy.exc import IntegrityError

@router.post("/add/patient", status_code=status.HTTP_201_CREATED, description="This is a post request to add a new patient.", response_model=schemas.PatientResponse)
async def CreateUser(user: schemas.addPatient, token:str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(user.parentId, token)
    if not token_data:
        raise HTTPException(status_code=401, detail="Unauthorized")

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

    # Create a new medical record for the patient
    new_medical_record = models.MedicalRecord(
        patientId = new_patient.id,
    )
    try:
        db.add(new_medical_record)
        db.commit()
        db.refresh(new_medical_record)
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error creating medical record: {e}")

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






@router.get('/patientList/{doctorId}', description="This route returns all the patients of a doctor", response_model = list[schemas.patientList])
async def listPatients(doctorId: int, token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(doctorId, token)
    if not token_data:
        raise HTTPException( status_code=401, detail= "unauthorized")
    patientsId = db.query(models.MRAccess).filter(models.MRAccess.doctorId == doctorId).all()
    patients = []
    for id in patientsId:
        patientS = db.query(models.Patient).filter(models.Patient.id == id.patientId).all()
        for patient in patientS:
            parent = db.query(models.User).filter(models.User.userId == patient.parentId).first()
            pic = parent.profilePicture if parent.profilePicture is not None else "None"
            new_patient = {
                "parentPic": pic,
                "patientFirstName": patient.firstName,
                "patientLastName": patient.lastName,
                "parentFirstName": parent.firstName,
                "parentLastName": parent.lastName,
                "patientId": patient.id,   
            }
            patients.append(new_patient)
    return patients



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
        "age": patient.age,
        "id": patientId
        
    }
    return newPatient



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



@router.delete("/delete/patient/{patientId}/{userId}", description="This route deletes a patient via patientId and takes the token for parent in the header")
async def delete_patient(patientId: int, userId: int, token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(userId, token)
    if not token_data:
        raise HTTPException( status_code=401, detail= "unauthorized")
    if token_data == False:
        raise HTTPException( status_code=401, detail= "unauthorized")
    
    patient = db.query(models.Patient).filter(models.Patient.id == patientId).first()
    
    if not patient:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found.")
    

    db.delete(patient)
    db.commit()
    return {"message": "Patient deleted successfully"}
