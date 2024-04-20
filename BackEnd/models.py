from sqlalchemy import TIMESTAMP, Column, Integer, String, Boolean, text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .DataBase import base 
from datetime import datetime

class User(base):
    __tablename__ = 'user'
    userId = Column(Integer, primary_key=True, autoincrement=True)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    email = Column(String, nullable=False)
    userName = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    createdAt = Column(DateTime, nullable=False, server_default=text('now()'))
    PhoneNumber = Column(String)
    age = Column(String)
    profilePicture = Column(String)
    role = Column(String, nullable=False)
    appointments = relationship('Appointment', back_populates='user')

class MedicalRecords(base):
    __tablename__ = 'medical_records'
    Id = Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    PatientId = Column(Integer, ForeignKey('patient.id'), nullable=False,)
    notes = Column(String)
    treatment = Column(String, nullable=False)
    createdAt = Column(DateTime, nullable=False, server_default=text('now()'))
    healthCondition = Column(String, nullable=False)

class Pationt(base):
    __tablename__ = 'patient'
    id = Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    age = Column(String)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    parentFirstName = Column(String, nullable=False)
    parentlastName = Column(String, nullable=False)
    parentPhoneNumber = Column(String, nullable=False)


class Appointment(base):
    __tablename__ = 'appointment'
    id = Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    patientId = Column(Integer, ForeignKey('patient.id'), nullable=False)
    doctorId = Column(Integer, ForeignKey('doctor.id'), nullable=False)
    appointmentDate = Column(DateTime, nullable=False)
    createdAt = Column(DateTime, nullable=False, server_default=text('now()'))
    appointmentStatus = Column(Boolean, nullable=False)
    userId = Column(Integer, ForeignKey('user.userId'), nullable=False)
    user = relationship('User', back_populates='appointments')


class Doctor(base):
    __tablename__ = 'doctor'
    id = Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    email = Column(String, nullable=False)
    userName = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    createdAt = Column(DateTime, nullable=False, server_default=text('now()'))
    rating = Column(Integer)
    numberOfRating = Column(Integer)
    price = Column(Integer, nullable=False)
    profilePicture = Column(String)
    role = Column(String, nullable=False)
