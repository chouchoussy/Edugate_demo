from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import auth, users, events, petitions, rewards, grades

app = FastAPI(title="EduGate API", version="0.1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=["Auth"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(events.router, prefix="/events", tags=["Events"])
app.include_router(petitions.router, prefix="/petitions", tags=["Petitions"])
app.include_router(rewards.router, prefix="/rewards", tags=["Rewards"])
app.include_router(grades.router, prefix="/grades", tags=["Grades"])
