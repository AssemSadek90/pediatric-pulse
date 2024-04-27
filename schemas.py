from pydantic import BaseModel
from typing import Optional

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