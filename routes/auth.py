from fastapi import HTTPException, Depends, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import session
import sys

sys.path.append('BackEnd')
import models as models
import DataBase as DataBase
import oauth2 as oauth2
import schemas as schemas

router = APIRouter(tags=["authentication"])

@router.post("/login", description="This route is for user or doctor login")
async def user_login(userInfo: schemas.UserLogin = Depends(), db: session = Depends(DataBase.get_db)):
    # Check doctors first
    user = (
        db.query(models.Doctor)
        .filter(models.Doctor.userName == userInfo.username)
        .first()
    )
    if not user:
        # If not found among doctors, check users
        user = (
            db.query(models.User)
            .filter(models.User.userName == userInfo.username)
            .first()
        )
        if not user:
            # If still not found, check emails
            user = (
                db.query(models.User)
                .filter(models.User.email == userInfo.username)
                .first()
            )
            if not user:
                user = (
                    db.query(models.Doctor)
                    .filter(models.Doctor.email == userInfo.username)
                    .first()
                )
                if not user:
                    raise HTTPException(status_code=403, detail="User not found")

    # Create an access token
    access_token = oauth2.create_access_token(data={"user_id": user.userId, "type": "user"})
    return [access_token, user]