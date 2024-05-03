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
    tags=["Medical Record"]
)



@router.get('/get/medicalRecord/{patientId}/{parentId}', description='this get request returns all the medical records for a certain patient', response_model=list[schemas.medicalRecordResponse])
async def getMedicalRecord(patientId: int, parentId: int,token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(parentId, token)
    if not token_data:
        return {"message": "unauthorized"}
    if token_data == False:
        return {"message": "unauthorized"}
    medicalRecords = db.query(models.MedicalRecord).filter(models.MedicalRecord.patientId == patientId).all()
    patients = []
    for patient in medicalRecords:
        patient.createdAt = patient.createdAt.isoformat()  # Convert datetime to string
        patients.append(patient)
    
    return patients