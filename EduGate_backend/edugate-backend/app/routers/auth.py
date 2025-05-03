from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from ..fake_db import list_items

router = APIRouter()

class LoginIn(BaseModel):
    email: EmailStr
    password: str

@router.post("/auth/login")
def login(payload: LoginIn):
    user = next((u for u in list_items("users") if u["email"] == payload.email), None)
    if not user or user["password"] != payload.password:
        raise HTTPException(401, "Invalid credentials")
    # token demo: role.email
    token = f"{user['role']}.{user['email']}"
    return {"access_token": token, "token_type": "bearer", "user": user}

