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



@router.get('/get/medicalRecord/{parentId}/{patientId}', description='this get request returns all the medical records for a certain patient', response_model=list[schemas.medicalRecordResponse])
async def getMedicalRecord(patientId: int, parentId: int,token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(parentId, token)
    if not token_data:
        raise HTTPException( status_code=401, detail= "unauthorized")
    if token_data == False:
        raise HTTPException( status_code=401, detail= "unauthorized")
    medicalRecords = db.query(models.MedicalRecord).filter(models.MedicalRecord.patientId == patientId).all()
    patients = []
    for patient in medicalRecords:
        patient.createdAt = patient.createdAt.isoformat()  # Convert datetime to string
        patients.append(patient)
    
    return patients


@router.get('/getMedicalRecord/{doctorId}/{patientId}', description='this get request returns all the medical records for a certain patient', response_model=list[schemas.medicalRecordResponse])
async def getMedicalRecord(doctorId: int, patientId: int,token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(doctorId, token)
    if not token_data:
        raise HTTPException( status_code=401, detail= "unauthorized")
    if token_data == False:
        raise HTTPException( status_code=401, detail= "unauthorized")
    medicalRecords = db.query(models.MedicalRecord).filter(models.MedicalRecord.patientId == patientId).all()
    patients = []
    for patient in medicalRecords:
        patient.createdAt = patient.createdAt.isoformat()  # Convert datetime to string
        patients.append(patient)
    
    return patients




@router.put('/update/medicalRecord/{patientId}/{docotrId}', description='this update request updates the medical record for a certain patient')
async def updateMedicalRecord(record : schemas.updateMedicalRecord, patientId: int, docotrId: int, token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(docotrId, token)
    if not token_data:
        raise HTTPException( status_code=401, detail= "unauthorized")
    MR = db.query(models.MedicalRecord).filter(models.MedicalRecord.patientId == patientId)
    MR.update({
       "notes": record.notes,
        "treatment": record.treatment,
        "healthCondition": record.healthCondition,
        "vaccin": record.vaccin,
        "allergies": record.allergies,
        "pastConditions": record.pastConditions,
        "chronicConditions": record.chronicConditions,
        "surgicalHistory": record.surgicalHistory,
        "medications": record.medications,
        "radiologyReport": record.radiologyReport
    })
    db.commit()

    return{"message": "Medical Record updated successfully"}