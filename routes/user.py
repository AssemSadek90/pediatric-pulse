from fastapi import HTTPException, status, Depends, APIRouter
from sqlalchemy.orm import session

import sys



sys.path.append('BackEnd')
import app.models as models
import app.DataBase as DataBase
import oauth2 as oauth2
import app.utils as utils
import app.schemas as schemas


router = APIRouter(
    tags= ["user"]
)


@router.post("/signup", status_code=201, description="this is a post request to create a regular user (customer) if the Password does not meet complexity requirements. Please choose a stronger password. and if the User with the same username or email already exists it returns 409")
def CreateUser(user: schemas.user, db: session = Depends(DataBase.get_db)):

    if db.query(models.User).filter(models.User.userName == user.userName).first() or db.query(models.User).filter(models.User.email == user.email).first(): raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with the same username or email already exists",
        )
    elif not utils.is_complex_password(user.password):
        raise HTTPException(
            status_code= 403 ,
            detail="Password does not meet complexity requirements. Please choose a stronger password.",
        )

    user.password = utils.hash(user.password)
    newUser = models.User(**user.dict())
    db.add(newUser)
    db.commit()
    db.refresh(newUser)
    return {"message": "new user created successfully"}
