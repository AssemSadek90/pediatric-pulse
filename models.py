from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from DataBase import base

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
    age = Column(Integer)  # Change data type to integer for age
    profilePicture = Column(String)
    role = Column(String, nullable=False)
    appointments = relationship('Appointment', back_populates='user')
    patients = relationship('Patient', back_populates='parent')

class MedicalRecord(base):
    __tablename__ = 'medical_record'
    id = Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    patientId = Column(Integer, ForeignKey('patient.id'), nullable=False)
    notes = Column(String)
    treatment = Column(String, nullable=False)
    createdAt = Column(DateTime, nullable=False, server_default=text('now()'))
    healthCondition = Column(String, nullable=False)
    vaccin = Column(String, nullable=False)

class Patient(base):
    __tablename__ = 'patient'
    id = Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    age = Column(Integer)  # Change data type to integer for age
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    parentFirstName = Column(String, nullable=False)
    parentLastName = Column(String, nullable=False)
    parentPhoneNumber = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    parentId = Column(Integer, ForeignKey('user.userId'), nullable=False)
    parent = relationship('User', back_populates='patients')

class Appointment(base):
    __tablename__ = 'appointment'
    id = Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    patientId = Column(Integer, ForeignKey('patient.id'), nullable=False)
    doctorId = Column(Integer, ForeignKey('doctor.id'), nullable=False)
    appointmentDate = Column(DateTime, nullable=False)
    Date = Column(String, nullable=False)
    From = Column(String, nullable=False)
    To = Column(String, nullable=False)
    appointmentStatus = Column(String, nullable=False)
    isTaken = Column(Boolean, default=False)  # Change data type for appointmentStatus
    userId = Column(Integer, ForeignKey('user.userId'), nullable=False)
    user = relationship('User', back_populates='appointments')
    doctor = relationship('Doctor', back_populates='appointments')

class Doctor(base):
    __tablename__ = 'doctor'
    id = Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    email = Column(String, nullable=False)
    userName = Column(String)
    password = Column(String, nullable=False)
    createdAt = Column(DateTime, nullable=False, server_default=text('now()'))
    rating = Column(Integer)
    numberOfRating = Column(Integer)
    price = Column(Integer, nullable=False)
    profilePicture = Column(String)
    role = Column(String, nullable=False)
    appointments = relationship('Appointment', back_populates='doctor')

# class history(base):
#     __tablename__ = 'history'
#     id = Column(Integer, nullable=False, primary_key=True, autoincrement=True)
#     allergies = Column(String)
#     surgicalHistory = Column(String)
#     medicationHistory = Column(String)