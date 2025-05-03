from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from ..fake_db import list_items, add_item, get_item, update_item

router = APIRouter()
TABLE = "petitions"

class PetitionIn(BaseModel):
    title: str
    content: str
    status: str = "Sent"

class PetitionOut(PetitionIn):
    id: str

@router.get("/", response_model=List[PetitionOut])
def list_petitions():
    return list_items(TABLE)

@router.post("/", response_model=PetitionOut, status_code=201)
def create_petition(p: PetitionIn):
    return add_item(TABLE, p.model_dump())

@router.get("/{petition_id}", response_model=PetitionOut)
def get_petition(petition_id: str):
    p = get_item(TABLE, petition_id)
    if not p: raise HTTPException(404)
    return p

@router.put("/{petition_id}", response_model=PetitionOut)
def update_petition(petition_id: str, payload: PetitionIn):
    updated = update_item(TABLE, petition_id, payload.model_dump())
    if not updated: raise HTTPException(404)
    return updated
