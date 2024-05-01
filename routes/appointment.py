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
    tags=["Appointment"]
)


@router.post("/add/appointment", status_code=status.HTTP_201_CREATED, description="This is a post request add a new appointment")
async def add_appointment(appointment: schemas.addApointment, token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(appointment.patientId, token)
    if not token_data:
        return {"message": "unauthorized"}
    if token_data == False:
        return {"message": "unauthorized"}
    new_appointment = models.Appointment(
        parentId = appointment.patientId,
        doctorId = appointment.doctorId,
        appointmentDate = appointment.appointmentDate,
        From = appointment.From,
        To = appointment.To,
        isTaken = appointment.isTaken
    )
    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)
    return{"message": "Appointment added successfully"}

@router.get("/get/appointment/{parentId}", status_code=status.HTTP_200_OK, description="This is a get request to get all appointments of a patient", response_model=list[schemas.AppointmentResponse])
async def get_appointment(parentId: int, token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(parentId, token)
    if not token_data:
        return {"message": "unauthorized"}
    if token_data == False:
        return {"message": "unauthorized"}
    appointments = db.query(models.Appointment).filter(models.Appointment.parentId == parentId).all()
    return appointments


@router.get("/get/appointment/{doctorId}", status_code=status.HTTP_200_OK, description="This is a get request to get all appointments of a patient", response_model=list[schemas.AppointmentResponse])
async def get_appointment(doctorId: int, token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(doctorId, token)
    if not token_data:
        return {"message": "unauthorized"}
    if token_data == False:
        return {"message": "unauthorized"}
    appointments = db.query(models.Appointment).filter(models.Appointment.doctorId == doctorId).all()
    return appointments