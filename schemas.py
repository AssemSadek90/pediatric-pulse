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
    price: str
    profilePicture: Optional[str]
    role: str

class doctorList(BaseModel):
    title: Optional[str]
    link: Optional[str]
    thumbnail: Optional[str]
    id: Optional[int]

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

class addDoctor(BaseModel):
    email: str
    password: str
    firstName: str
    lastName: str
    price: int


class tokenData(BaseModel):
    user_id: int


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




class addPatient(BaseModel):
    firstName: str
    lastName: str
    age: int
    gender: str
    parentId: int


class addApointment(BaseModel):
    doctorId: int
    patientId: int
    appointmentDate: str
    From: str
    To: str
    isTaken: bool


