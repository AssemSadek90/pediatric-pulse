from fastapi import HTTPException, status, Depends, APIRouter
from sqlalchemy.orm import session

import sys

sys.path.append('BackEnd')

import models
import DataBase
import oauth2
import utils
import schemas

router = APIRouter(
    tags=["user"]
)


@router.post("/signup", status_code=status.HTTP_201_CREATED, description="This is a post request to create a regular user (customer).")
async def CreateUser(user: schemas.userSginup, db: session = Depends(DataBase.get_db)):
    existing_user = db.query(models.User).filter(
        (models.User.userName == user.userName) | (models.User.email == user.email)
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with the same username or email already exists"
        )

    # Hash the password before creating the user
    hashed_password = utils.hash(user.password)
    
    # Create a new instance of the User model with the hashed password
    new_user = models.User(userName=user.userName, email=user.email, password=hashed_password, firstName = user.firstName, lastName = user.lastName, PhoneNumber = user.phone, role = "customer")
    
    # Add the new_user instance to the session
    db.add(new_user)
    
    # Commit the session to persist the changes
    db.commit()
    
    # Refresh the new_user instance to ensure it has the latest data from the database
    db.refresh(new_user)
    
    # Generate an access token for the new user
    access_token = oauth2.create_access_token(data={"user_id": new_user.userId, "type": "user"})
    
    # Return the response with the access token, role, and userId
    return {"accessToken": access_token, "role": user.role, "userId": new_user.userId}



@router.get("/get/user/{userId}", description="This route returns user data via userId and takes the token in the header")
async def get_user_by_id(userId: int, token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(userId, token)
    if not token_data:
        return {"message": "unauthorized"}
    if token_data == False:
        return {"message": "unauthorized"}
    user = db.query(models.User).filter(models.User.userId == userId).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Construct the user data dictionary using the schema structure
    user_data = {
        "userId": user.userId,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "userName": user.userName,
        "createdAt": str(user.createdAt),  # Convert datetime to string
        "phone": user.PhoneNumber,
        "age": user.age,
        "profilePicture": user.profilePicture,
        "role": user.role
    }

    return {"user": user_data}
