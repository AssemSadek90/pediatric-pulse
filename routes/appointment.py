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

    Appointment = db.query(models.Appointment).filter(models.Appointment.appointmentDate == appointment.appointmentDate).filter(models.Appointment.From == appointment.From).filter(models.Appointment.To == appointment.To).first()
    if Appointment:
        return {"message": " Appointment already exists"}
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

@router.get("/get/appointment/{parentId}", status_code=status.HTTP_200_OK, description="This is a get request to get all appointments of a patient")
async def get_appointment(parentId: int, token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(parentId, token)
    if not token_data:
        return {"message": "unauthorized"}
    if token_data == False:
        return {"message": "unauthorized"}
    appointments = db.query(models.Appointment).filter(models.Appointment.parentId == parentId).all()
    return appointments


@router.get("/get/doctor/appointments/table/{doctorId}/{userId}", status_code=status.HTTP_200_OK, description="This is a get request to get all appointments of a patient")
async def get_appointment(doctorId: int, userId: int, token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(userId, token)
    if not token_data:
        return {"message": "unauthorized"}
    appointments = db.query(models.Appointment).filter(models.Appointment.doctorId == doctorId).all()
    return appointments