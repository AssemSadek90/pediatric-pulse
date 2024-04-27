from pydantic import BaseModel
from typing import Optional

class UserLogin(BaseModel):
    userName: str
    password: str


class user(BaseModel):
    userName: str
    email: str
    password: str
    firstName: str
    lastName: str
    PhoneNumber: str


class tokenData(BaseModel):
    user_id: Optional[int] = None