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
    token_data = oauth2.verify_access_token(appointment.parentId, token)
    if not token_data:
        raise HTTPException( status_code=401, detail= "unauthorized")
    if token_data == False:
        raise HTTPException( status_code=401, detail= "unauthorized")

    Appointment = db.query(models.Appointment).filter(models.Appointment.appointmentDate == appointment.appointmentDate).filter(models.Appointment.From == appointment.From).filter(models.Appointment.To == appointment.To).first()
    if Appointment:
        return {"message": " Appointment already exists"}
    new_appointment = models.Appointment(
        parentId = appointment.parentId,
        doctorId = appointment.doctorId,
        patientId = appointment.patientId,
        appointmentDate = appointment.appointmentDate,
        From = appointment.From,
        To = appointment.To,
        isTaken = appointment.isTaken
    )
    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)
    if not db.query(models.MRAccess).filter(models.MRAccess.patientId == appointment.patientId).filter(models.MRAccess.doctorId == appointment.doctorId).first():
        mra = models.MRAccess(
            patientId = appointment.patientId,
            doctorId = appointment.doctorId
        )
        db.add(mra)
        db.commit()
        db.refresh(mra)
    
    return{"message": "Appointment added successfully"}

@router.get("/get/appointment/{parentId}", status_code=status.HTTP_200_OK, description="This is a get request to get all appointments of a patient", response_model=schemas.AppointmentResponse)
async def get_appointment(parentId: int, token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(parentId, token)
    if not token_data:
        raise HTTPException( status_code=401, detail= "unauthorized")
    if token_data == False:
        raise HTTPException( status_code=401, detail= "unauthorized")
    appointments = db.query(models.Appointment).filter(models.Appointment.parentId == parentId).all()
    return appointments


@router.get("/get/doctor/appointments/table/{doctorId}/{userId}", status_code=status.HTTP_200_OK, description="This is a get request to get all appointments of a patient", response_model=schemas.AppointmentResponse)
async def get_appointment(doctorId: int, userId: int, token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(userId, token)
    if not token_data:
        raise HTTPException( status_code=401, detail= "unauthorized")
    appointments = db.query(models.Appointment).filter(models.Appointment.doctorId == doctorId).all()
    return appointments

@router.put('update/appointments/{adminId}/{appointmentId}', description="This route updates the appointment's info", response_model=schemas.AppointmentResponse)
async def update_appointments(appointment: schemas.updateAppointment, adminId: int, appointmentId: int, token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(adminId, token)
    if not token_data:
        raise HTTPException( status_code=401, detail= "unauthorized")
    # admin = db.query(models.User).filter(models.User.userId == adminId).first()
    # if admin.role != 'admin':
    #     raise HTTPException( status_code=401, detail= "unauthorized")
    appointment_query = db.query(models.Appointment).filter(models.Appointment.id == appointmentId)
    appointment_query.update({
        "parentId": appointment.parentId,
        "doctorId": appointment.doctorId,
        "patientId": appointment.patientId,
        "appointmentDate": appointment.appointmentDate,
        "From": appointment.From,
        "To": appointment.To,
        "isTaken": appointment.isTaken
    })
    db.commit()
    newAppointment = db.query(models.Appointment).filter(models.Appointment.id == appointmentId).first()

    return newAppointment

@router.delete("/delete/appointment/{appointmentId}/{adminId}", status_code=status.HTTP_200_OK, description="This is a delete request to delete an appointment")
async def delete_appointment(appointmentId: int, adminId:int, token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(adminId, token)
    if not token_data:
        raise HTTPException( status_code=401, detail= "unauthorized")
    if token_data == False:
        raise HTTPException( status_code=401, detail= "unauthorized")
    appointment = db.query(models.Appointment).filter(models.Appointment.id == appointmentId).first()
    mra = db.query(models.MRAccess).filter(models.MRAccess.patientId == appointment.patientId).filter(models.MRAccess.doctorId == appointment.doctorId).first()
    if not appointment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found.")
    db.delete(appointment)
    db.commit()
    appointment = db.query(models.Appointment).filter(models.Appointment.patientId == appointment.patientId).filter(models.Appointment.doctorId == appointment.doctorId).first()
    if not appointment:
        db.delete(mra)
        db.commit()
    return {"message": "Patient deleted successfully"}
