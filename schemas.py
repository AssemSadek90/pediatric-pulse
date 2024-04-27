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
    age: int
    profilePicture: str
    role: str

class Doctor(BaseModel):
    doctorId: int
    firstName: str
    lastName: str
    email: str
    userName: str
    createdAt: str
    rating: str
    numberOfRating: str
    price: str
    profilePicture: str
    role: str


class UserLoginResponse(BaseModel):
    accessToken: str
    user: User

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
    role: Optional[str] = 'customer'


class tokenData(BaseModel):
    user_id: Optional[int] = None