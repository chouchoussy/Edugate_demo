from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from ..fake_db import list_items, add_item

router = APIRouter()
TABLE = "rewards"

class RewardIn(BaseModel):
    student: str
    type: str  # REWARD or DISCIPLINE
    reason: str
    date: str

class RewardOut(RewardIn):
    id: str

@router.get("/", response_model=List[RewardOut])
def list_rewards():
    return list_items(TABLE)

@router.post("/", response_model=RewardOut, status_code=201)
def create_reward(r: RewardIn):
    return add_item(TABLE, r.model_dump())
