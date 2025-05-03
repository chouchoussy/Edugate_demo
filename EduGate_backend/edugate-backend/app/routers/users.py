from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from ..fake_db import list_items, get_item, add_item, update_item, delete_item

router = APIRouter()
TABLE = "users"

class UserIn(BaseModel):
    email: EmailStr
    name: str
    role: str = "STUDENT"
    klass: Optional[str] = None
    status: str = "ACTIVE"

class UserOut(UserIn):
    id: str

@router.get("/", response_model=List[UserOut])
def list_users(role: str | None = None, klass: str | None = None, q: str | None = None):
    data = list_items(TABLE)
    if role:  data = [u for u in data if u["role"] == role]
    if klass: data = [u for u in data if u.get("klass") == klass]
    if q:     data = [u for u in data if q.lower() in u["name"].lower()]
    return data

@router.post("/", response_model=UserOut, status_code=201)
def create_user(user: UserIn):
    if any(u["email"] == user.email for u in list_items(TABLE)):
        raise HTTPException(400, "Email already exists")
    return add_item(TABLE, user.model_dump())

@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: str):
    u = get_item(TABLE, user_id)
    if not u: raise HTTPException(404)
    return u

@router.put("/{user_id}", response_model=UserOut)
def update_user_route(user_id: str, payload: UserIn):
    updated = update_item(TABLE, user_id, payload.model_dump())
    if not updated: raise HTTPException(404)
    return updated

@router.delete("/{user_id}", status_code=204)
def delete_user_route(user_id: str):
    delete_item(TABLE, user_id)
