from fastapi import FastAPI
from DataBase import engine
from models import base
from routes import auth, user, doctor, patient, appointment, MedicalRecord, reviews
from starlette.responses import RedirectResponse
from fastapi.openapi.utils import get_openapi
from fastapi.middleware.cors import CORSMiddleware

base.metadata.create_all(bind=engine)

# Define other components of your application
app = FastAPI()
#app.include_router(auth.router)
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(doctor.router)
app.include_router(patient.router)
app.include_router(appointment.router)
app.include_router(MedicalRecord.router)
app.include_router(reviews.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Pediatric-Pulse API Doc",
        version="1.0.0",
        description="This is an up to date version of the pediatric-pulse API doc.",
        routes=app.routes,
    )
    openapi_schema["info"]["x-logo"] = {
        "url": "https://i.imgur.com/jFo7NCX.png"  # Update this URL to point to your image
    }
    openapi_schema["info"]["title"] = "Pediatric-Pulse"
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi


@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")
