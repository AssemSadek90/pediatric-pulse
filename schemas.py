from pydantic import BaseModel
from typing import Optional

from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    userId: int
    firstName: str
    lastName: str
    email: str
    userName: str
    createdAt: str
    phone: str
    age: Optional[int]
    profilePicture: Optional[str]
    role: str

class Doctor(BaseModel):
    doctorId: int
    firstName: str
    lastName: str
    email: str
    userName: str
    createdAt: str
    rating: Optional[int]
    numberOfRating: Optional[int]
    price: int
    profilePicture: Optional[str]
    role: str

class doctorList(BaseModel):
    title: Optional[str]
    link: Optional[str]
    thumbnail: Optional[str]
    id: Optional[int]
    numberOfReviews: Optional[int]
    avarageRating: Optional[float]

class PatientResponse(BaseModel):
    id: Optional[int]
    lastName: Optional[str]
    parentLastName: Optional[str]
    gender: Optional[str]
    age: Optional[int]
    firstName: Optional[str]
    parentFirstName: Optional[str]
    parentPhoneNumber: Optional[str]
    parentId: Optional[int] 
class UserLoginResponse(BaseModel):
    accessToken: str
    role: str 
    userId: int


class DoctorLoginResponse(BaseModel):
    accessToken: str
    role: str 
    docotrId: int

class DoctorLoginResponse(BaseModel):
    accessToken: str
    doctor: Doctor

    
class UserLogin(BaseModel):
    username: str
    password: str

class userSginup(BaseModel):
    userName: str
    email: str
    password: str
    firstName: str
    lastName: str
    phone: str

class addUser(BaseModel):
    userName: str
    email: str
    password: str
    firstName: str
    lastName: str
    phone: str
    role: str
class addDoctor(BaseModel):
    email: str
    password: str
    firstName: str
    lastName: str
    price: int


class tokenData(BaseModel):
    user_id: Optional[int] = None


class LoginResponse(BaseModel):
    accessToken: str
    role: str
    userId: int


class updateDoctor(BaseModel):
    userName: str
    email: str
    password: str
    firstName: str
    lastName: str
    profilePic: str
    price: int

class updateUser(BaseModel):
    userName: str
    email: str
    password: str
    firstName: str
    lastName: str
    phoneNumber: Optional[str]
    age: Optional[int]
    profilePicture: str

class updatePatient(BaseModel):
    age: int
    firstName: str
    lastName: str
    gender: str

class Patient(BaseModel):
    id: int
    age: int
    firstName: str
    lastName: str
    parentFirstName: str
    parentLastName: str
    parentPhoneNumber: str
    gender: str
    parentId: int



class addPatient(BaseModel):
    firstName: str
    lastName: str
    age: int
    gender: str
    parentId: int


class addApointment(BaseModel):
    parentId: int
    doctorId: int
    patientId: int
    appointmentDate: str
    From: str
    To: str
    isTaken: bool



class medicalRecordResponse(BaseModel):
    id: int
    patientId: int
    notes: str
    treatment: str
    createdAt: str
    healthCondition: str
    vaccin: str
    allergies: str
    pastConditions: str
    chronicConditions: str
    surgicalHistory: str
    medications: str
    radiologyReport: str


class AppointmentResponse(BaseModel):
    id: int
    parentId: int
    doctorId:int
    appointmentDate: str
    From: str
    To: str
    isTaken: bool


class reviews(BaseModel):
    parentId: int
    doctorId: int
    review: str
    rating: int


class reviewsResponse(BaseModel):
    reviewerName: str
    docotrName: str
    review: str 
    rating: int

class returnPatient(BaseModel):
    firstName: str
    lastName: str
    parentFirstName: str
    parentLastName: str
    parentPic: str
    age: int


class barChart(BaseModel):
    number: int
    stars: int

class avgRating(BaseModel):
    avgRating: float
    count: int


class patientList(BaseModel):
    parentPic: str
    patientFirstName: str
    patientLastName: str
    parentFirstName: str
    parentLastName: str
    patientId: int

class updateMedicalRecord(BaseModel):
    notes: Optional[str] = "None"
    treatment: Optional[str] = "None"
    healthCondition: Optional[str] = "None"
    vaccin: Optional[str] = "None"
    allergies: Optional[str] = "None"
    pastConditions: Optional[str] = "None"
    chronicConditions: Optional[str] = "None"
    surgicalHistory: Optional[str] = "None"
    medications: Optional[str] = "None"
    radiologyReport: Optional[str] = "None"