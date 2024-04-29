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
    tags=["doctor"]
)


def updatUserName(email, db):
    doctor = db.query(models.Doctor).filter(models.Doctor.email == email).first()

    # Check if the doctor exists
    if not doctor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found"
        )

    # Update the username
    doctor.userName += doctor.id

    # Commit the changes to the database
    db.commit()



import random

@router.post("/add/doctor", status_code=status.HTTP_201_CREATED, description="This is a post request to create a regular user (customer).")
async def CreateUser(user: schemas.addDoctor, db: session = Depends(DataBase.get_db)):
    existing_user = db.query(models.Doctor).filter(
        models.Doctor.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with the same email already exists"
        )

    # Hash the password before creating the user
    hashed_password = utils.hash(user.password)

    # Generate a random number between 1 and 10000
    random_number = random.randint(1, 10000)

    user_name = user.firstName + user.lastName + str(random_number)

    while db.query(models.Doctor).filter(models.Doctor.userName == user_name).first():
        user_name = user.firstName + user.lastName + str(random_number)

    # Create a new instance of the User model with the hashed password
    new_user = models.Doctor(
        userName=user_name,
        email=user.email,
        password=hashed_password,
        firstName=user.firstName,
        lastName=user.lastName,
        price=user.price,
        role="doctor"
    )

    # Add the new_user instance to the session
    db.add(new_user)
    # Commit the session to persist the changes
    db.commit()
    # Refresh the new_user instance to ensure it has the latest data from the database
    db.refresh(new_user)

    # Generate an access token for the new user
    access_token = oauth2.create_access_token(data={"user_id": new_user.id, "type": "doctor"})
    
    # Return the response with the access token, role, and userId
    return {"accessToken": access_token, "role": user.role, "doctorId": new_user.id}



@router.get("/get/doctor/{userId}", description="This route returns doctor data via doctorId and takes the token in the header")
async def get_user_by_id(userId: int, token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(userId, token)
    if not token_data:
        return {"message": "unauthorized"}
    if token_data == False:
        return {"message": "unauthorized"}
    user = db.query(models.Doctor).filter(models.Doctor.id == userId).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Construct the user data dictionary using the schema structure
    user_data = {
        "doctorId": user.id,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "userName": user.userName,
        "createdAt": str(user.createdAt),  # Convert datetime to string
        "profilePicture": user.profilePicture,
        "role": user.role,
        "rating": user.rating,
        "numberOfRating": user.numberOfRating,
        "price": user.price
    }

    return {"doctor": user_data}

@router.put("/update/doctor/pic", description="This route updates the doctor's profile picture")
async def update_doctor_pic(doctor: schemas.updateDoctor, token: str, db: session = Depends(DataBase.get_db)):
    token_data = oauth2.verify_access_token(token)
    if not token_data:
        return {"message": "Invalid token"}
    user_query = db.query(models.Doctor).filter(models.Doctor.id == doctor.id)
    user_query.update({"profilePicture":doctor.profilePic})
    db.commit()
    return {"message": "Profile picture updated"}



@router.get("/doctorList", description="This is a GET request to fetch all doctors.")
async def doctorList(db: session = Depends(DataBase.get_db)):
    users = db.query(models.Doctor).all()

    if not users:
        raise HTTPException(status_code=404, detail="No doctors found")
    doctors_data = []
    for user in users:
        # Construct the user data dictionary using the schema structure
        title = "Dr. " + user.firstName + " " + user.lastName
        user_data = {
            "title":title,
            "link": "/Signup",
            "thumbnail": user.profilePicture,
            "id": user.id
            }
        doctors_data.append(user_data)

    return doctors_data

    