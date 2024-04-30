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