from pydantic import BaseModel, EmailStr
from typing import Optional

class UserLogin(BaseModel):
    userName: str
    password: str


class user(BaseModel):
    userName: str
    email: EmailStr
    password: str
    firstName: str
    lastName: str
    PhoneNumber: str


class tokenData(BaseModel):
    user_id: Optional[int] = None