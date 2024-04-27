from fastapi import HTTPException, Depends, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import session
import sys



sys.path.append('BackEnd')
import models as models
import DataBase as DataBase
import oauth2 as oauth2

router = APIRouter(
    tags= ["authentication"]
)

@router.post("/login" , description="this requisite for login a user or Doctor")
async def userLogin(userInfo: OAuth2PasswordRequestForm = Depends() ,db: session = Depends(DataBase.get_db)):
    user = db.query(models.User).filter(models.User.userName == userInfo.username).first()
    user = db.query(models.Doctor).filter(models.Doctor.userName == userInfo.username).first()
    if not user:
        user = db.query(models.User).filter(models.User.email == userInfo.username).first()
        if not user:
            user = db.query(models.Doctor).filter(models.Doctor.email == userInfo.username).first()
            if not user:
                raise HTTPException(status_code=403, detail= "User not found")
    accessToken = oauth2.create_access_token(data = {"user_id": user.userId, "type":"user"})
    return {[accessToken, user]}


